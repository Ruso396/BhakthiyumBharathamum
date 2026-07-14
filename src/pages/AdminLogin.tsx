import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';
import Toast from '../components/Toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setToast({ message: 'Please enter username and password', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const response = await loginAdmin(username, password);
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_username', response.data.username);
      setToast({ message: 'Login successful!', type: 'success' });
      setTimeout(() => navigate('/admin/dashboard'), 500);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setToast({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon-800 via-maroon-900 to-gold-900 flex items-center justify-center p-4">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🪔</div>
          <h1 className="text-2xl font-bold text-maroon-800">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">Bhakthiyum Bharathamum 2026</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-maroon-700 to-maroon-800 text-white py-3 rounded-xl font-bold hover:from-maroon-800 hover:to-maroon-900 transition-all disabled:opacity-50 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;