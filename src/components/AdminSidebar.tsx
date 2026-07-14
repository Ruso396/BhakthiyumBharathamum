import { NavLink } from 'react-router-dom';

const sidebarItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/admin/participants', label: 'Participants', icon: '👥' },
  { path: '/admin/masters', label: 'Masters', icon: '🎭' },
  { path: '/admin/students', label: 'Students', icon: '🎓' },
  { path: '/admin/payments/approved', label: 'Approved Payments', icon: '✅' },
  { path: '/admin/payments/pending', label: 'Pending Payments', icon: '⏳' },
  { path: '/admin/payments/rejected', label: 'Rejected Payments', icon: '❌' },
];

const AdminSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    window.location.href = '/admin/login';
  };

  return (
    <aside className="w-64 bg-maroon-900 text-white min-h-screen fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-maroon-700">
        <h2 className="text-lg font-bold text-gold-400">Admin Panel</h2>
        <p className="text-xs text-maroon-200 mt-1">Bhakthiyum Bharathamum 2026</p>
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    isActive
                      ? 'bg-gold-500 text-maroon-950 font-semibold'
                      : 'text-maroon-100 hover:bg-maroon-800'
                  }`
                }
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-maroon-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-maroon-200 hover:bg-red-700 hover:text-white w-full transition-all"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;