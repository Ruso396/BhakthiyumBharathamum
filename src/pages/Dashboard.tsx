import { useEffect, useState } from 'react';
import { getDashboardData } from '../services/api';
import Loader from '../components/Loader';
import type { DashboardData } from '../types';

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboardData();
      if (response.success) {
        setData(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!data) return null;

  const cards = [
    { label: 'Total Registrations', value: data.total_registrations, color: 'bg-blue-600', icon: '📋' },
    { label: 'Total Masters', value: data.total_masters, color: 'bg-purple-600', icon: '🎭' },
    { label: 'Total Students', value: data.total_students, color: 'bg-teal-600', icon: '🎓' },
    { label: 'Pending Payments', value: data.pending_payments, color: 'bg-yellow-600', icon: '⏳' },
    { label: 'Approved Payments', value: data.approved_payments, color: 'bg-green-600', icon: '✅' },
    { label: 'Rejected Payments', value: data.rejected_payments, color: 'bg-red-600', icon: '❌' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-maroon-800">Dashboard</h1>
        <p className="text-gray-500 text-sm">Welcome back, {localStorage.getItem('admin_username')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              <span className={`${card.color} text-white text-xs px-2 py-1 rounded-full`}>{card.label.split(' ')[0]}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{card.value.toLocaleString()}</h3>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Registrations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Recent Registrations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="p-3 font-semibold text-gray-600">Reg No</th>
                <th className="p-3 font-semibold text-gray-600">Name</th>
                <th className="p-3 font-semibold text-gray-600">Category</th>
                <th className="p-3 font-semibold text-gray-600">Phone</th>
                <th className="p-3 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recent_registrations.map((p) => (
                <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="p-3 font-medium text-maroon-700">{p.registration_number}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      p.category === 'Master' ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'
                    }`}>
                      {p.category}
                    </span>
                  </td>
                  <td className="p-3">{p.phone}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      p.payment_status === 'Approved' ? 'bg-green-100 text-green-700' :
                      p.payment_status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {p.payment_status}
                    </span>
                  </td>
                </tr>
              ))}
              {data.recent_registrations.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">No registrations yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;