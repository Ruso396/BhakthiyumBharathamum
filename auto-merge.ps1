param(
    [string]$Branch = "main",
    [string]$Remote = "origin",
    [string]$StashMessage = "Auto-stash before merge"
)

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  ZERO-CONFLICT Git Auto-Merge Script" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Stash local changes
Write-Host "[1/8] Stashing local changes..." -ForegroundColor Yellow
$stashResult = git stash push -m $StashMessage 2>&1
if ($LASTEXITCODE -eq 0) {
    if ($stashResult -match "No local changes") {
        Write-Host "  -> No local changes to stash." -ForegroundColor Green
        $stashed = $false
    } else {
        Write-Host "  -> Local changes stashed successfully." -ForegroundColor Green
        $stashed = $true
    }
} else {
    Write-Host "  -> Error during stash: $stashResult" -ForegroundColor Red
    exit 1
}

# Step 2: Fetch latest from remote
Write-Host "[2/8] Fetching latest from $Remote..." -ForegroundColor Yellow
git fetch $Remote 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  -> Fetch completed." -ForegroundColor Green
} else {
    Write-Host "  -> Fetch failed." -ForegroundColor Red
    if ($stashed) { git stash pop | Out-Null }
    exit 1
}

# Step 3: Pull and merge friend's changes
Write-Host "[3/8] Pulling and merging $Remote/$Branch..." -ForegroundColor Yellow
$pullResult = git pull $Remote $Branch --no-rebase --no-edit 2>&1
$pullExitCode = $LASTEXITCODE

if ($pullExitCode -eq 0) {
    Write-Host "  -> Pull and merge completed successfully." -ForegroundColor Green
} else {
    Write-Host "  -> Merge conflict detected!" -ForegroundColor Red
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Magenta
    Write-Host "  AUTO-RESOLVING CONFLICTS (Keeping Both)" -ForegroundColor Magenta
    Write-Host "============================================" -ForegroundColor Magenta
    
    # Step 4: Auto-resolve conflicts by keeping both sides
    $conflictedFiles = git diff --name-only --diff-filter=U
    
    foreach ($file in $conflictedFiles) {
        Write-Host "  Resolving: $file" -ForegroundColor Yellow
        
        $content = Get-Content $file -Raw
        # Loop until all nested conflict markers are resolved
        while ($content -match '(?s)<<<<<<< .*?\n(.*?)=======\n(.*?)>>>>>>> .*?\n') {
            $content = [regex]::Replace($content, '(?s)<<<<<<< .*?\n(.*?)=======\n(.*?)>>>>>>> .*?\n', {
                $param1 = $_.Groups[1].Value
                $param2 = $_.Groups[2].Value
                # Keep BOTH sides, remove markers
                return $param1.TrimEnd() + "`n" + $param2.TrimEnd() + "`n"
            })
        }
        # Also remove any remaining partial conflict markers that regex may have missed
        $content = $content -replace '(?m)^<{7,} .*$', ''
        $content = $content -replace '(?m)^={7,}.*$', ''
        $content = $content -replace '(?m)^>{7,} .*$', ''
        
        [System.IO.File]::WriteAllText((Resolve-Path $file).Path, $content)
        Write-Host "    -> Resolved (kept both sides)." -ForegroundColor Green
    }
    
    # Stage and commit the auto-resolution
    git add .
    git commit -m "Auto-merged: kept both local and remote changes"
    Write-Host "  -> Conflict auto-resolution committed." -ForegroundColor Green
}

# Step 5: Restore stashed changes
Write-Host "[5/8] Restoring stashed changes..." -ForegroundColor Yellow
if ($stashed) {
    $popResult = git stash pop 2>&1
    $popExitCode = $LASTEXITCODE
    
    if ($popExitCode -eq 0) {
        Write-Host "  -> Stash restored successfully." -ForegroundColor Green
    } else {
        Write-Host "  -> Conflict when restoring stash (stash preserved)!" -ForegroundColor Red
        Write-Host "  -> Auto-resolving stash conflicts..." -ForegroundColor Yellow
        
        $stashConflicts = git diff --name-only --diff-filter=U
        foreach ($file in $stashConflicts) {
            Write-Host "  Resolving stash conflict: $file" -ForegroundColor Yellow
            $content = Get-Content $file -Raw
            while ($content -match '(?s)<<<<<<< .*?\n(.*?)=======\n(.*?)>>>>>>> .*?\n') {
                $content = [regex]::Replace($content, '(?s)<<<<<<< .*?\n(.*?)=======\n(.*?)>>>>>>> .*?\n', {
                    $param1 = $_.Groups[1].Value
                    $param2 = $_.Groups[2].Value
                    return $param1.TrimEnd() + "`n" + $param2.TrimEnd() + "`n"
                })
            }
            $content = $content -replace '(?m)^<{7,} .*$', ''
            $content = $content -replace '(?m)^={7,}.*$', ''
            $content = $content -replace '(?m)^>{7,} .*$', ''
            [System.IO.File]::WriteAllText((Resolve-Path $file).Path, $content)
            Write-Host "    -> Resolved (kept both sides)." -ForegroundColor Green
        }
        
        # Drop the stash since we've resolved
        git stash drop
    }
}

# Step 6: Stage all changes
Write-Host "[6/8] Staging all changes..." -ForegroundColor Yellow
git add .
Write-Host "  -> Changes staged." -ForegroundColor Green

# Step 7: Commit the merged code
Write-Host "[7/8] Committing merged code..." -ForegroundColor Yellow
$status = git status --porcelain
if ($status) {
    git commit -m "Final merge: local + remote changes [auto-merge]"
    Write-Host "  -> Committed." -ForegroundColor Green
} else {
    Write-Host "  -> Nothing new to commit (already up to date)." -ForegroundColor Green
}

# Step 8: Push back to GitHub
Write-Host "[8/8] Pushing to $Remote/$Branch..." -ForegroundColor Yellow
git push $Remote $Branch 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  -> Push successful!" -ForegroundColor Green
} else {
    Write-Host "  -> Push failed. Check your network or permissions." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  MERGE COMPLETE - All changes preserved!" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan