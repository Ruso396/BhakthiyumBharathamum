import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCog,
  GraduationCap,
  CheckCircle,
  Clock,
  XCircle,
  LogOut,
} from 'lucide-react';

const sidebarItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/participants', label: 'Participants', icon: Users },
  { path: '/admin/masters', label: 'Masters', icon: UserCog },
  { path: '/admin/students', label: 'Students', icon: GraduationCap },
  { path: '/admin/payments/approved', label: 'Approved Payments', icon: CheckCircle },
  { path: '/admin/payments/pending', label: 'Pending Payments', icon: Clock },
  { path: '/admin/payments/rejected', label: 'Rejected Payments', icon: XCircle },
];

const AdminSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    window.location.href = '/admin/login';
  };

  return (
    <aside
      className="w-64 text-white min-h-screen fixed left-0 top-0 z-40 flex flex-col
        bg-gradient-to-b from-[#5A0F17] via-[#6D1220] to-[#7A1824]
        shadow-[4px_0_20px_rgba(0,0,0,0.4)]
        rounded-r-2xl
        border-r border-[#C8A45D]/20"
    >
      {/* Logo Area */}
      <div className="px-6 pt-8 pb-6 border-b border-[#C8A45D]/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-[#C8A45D]/20 border border-[#C8A45D]/40 flex items-center justify-center flex-shrink-0">
            <LayoutDashboard className="w-5 h-5 text-[#C8A45D]" />
          </div>
          <div>
            <h2 className="text-[17px] font-bold tracking-wide text-white leading-tight">
              Bhakthiyum
            </h2>
            <h2 className="text-[17px] font-bold tracking-wide text-white leading-tight">
              Bharathamum
            </h2>
          </div>
        </div>
        <div className="mt-2 pl-[52px]">
          <p className="text-[11px] uppercase tracking-[3px] text-[#C8A45D]/80 font-medium">
            Admin Panel
          </p>
          <p className="text-[10px] text-white/40 mt-0.5 font-light tracking-wider">
            2026
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'bg-[#3A0A0E] text-white border-l-2 border-[#C8A45D] shadow-[inset_0_0_12px_rgba(200,164,93,0.08)]'
                      : 'text-white/80 hover:bg-[#8A1F2E] hover:text-white hover:border-l-2 hover:border-[#C8A45D]/50'
                  }`
                }
              >
                <item.icon
                  className="w-[18px] h-[18px] flex-shrink-0 transition-transform duration-200"
                  style={{ transition: 'transform 0.2s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                <span className="truncate">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Logout */}
      <div className="px-3 pb-6 pt-4 border-t border-[#C8A45D]/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-medium
            bg-[#3A0A0E] text-white/80
            hover:bg-[#8A1F2E] hover:text-white hover:border hover:border-[#C8A45D]/40
            w-full transition-all duration-200 group"
        >
          <LogOut
            className="w-[18px] h-[18px] flex-shrink-0 transition-transform duration-200"
            style={{ transition: 'transform 0.2s ease' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;