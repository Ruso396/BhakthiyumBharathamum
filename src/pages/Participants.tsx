import { useEffect, useState } from 'react';
import { getParticipants, deleteParticipant, updatePaymentStatus, getUploadUrl } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import type { Participant, ParticipantsResponse } from '../types';

interface Props {
  categoryFilter?: string;
  paymentFilter?: string;
  title?: string;
}

const Participants = ({ categoryFilter, paymentFilter, title = 'Participants' }: Props) => {
  const navigate = useNavigate();
  const [data, setData] = useState<ParticipantsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState(categoryFilter || '');
  const [filterPayment, setFilterPayment] = useState(paymentFilter || '');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (filterCategory) params.category = filterCategory;
      if (filterPayment) params.payment_status = filterPayment;
      if (filterDistrict) params.district = filterDistrict;
      if (dateFrom) params.date_from = dateFrom;
      if (dateTo) params.date_to = dateTo;

      const response = await getParticipants(params);
      if (response.success) {
        setData(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load participants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [filterCategory, filterPayment, filterDistrict, dateFrom, dateTo]);

  const handleSearch = () => {
    fetchParticipants();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this participant?')) return;

    try {
      const response = await deleteParticipant(id);
      if (response.success) {
        setToast({ message: 'Participant deleted successfully', type: 'success' });
        fetchParticipants();
      }
    } catch (err: any) {
      setToast({ message: err.response?.data?.message || 'Delete failed', type: 'error' });
    }
  };

  const handlePaymentStatus = async (id: number, status: string) => {
    try {
      const response = await updatePaymentStatus(id, status);
      if (response.success) {
        setToast({ message: response.message, type: 'success' });
        fetchParticipants();
      }
    } catch (err: any) {
      setToast({ message: err.response?.data?.message || 'Update failed', type: 'error' });
    }
  };

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Approved: 'bg-green-100 text-green-700',
      Rejected: 'bg-red-100 text-red-700',
      Pending: 'bg-yellow-100 text-yellow-700',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.Pending}`}>
        {status}
      </span>
    );
  };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-maroon-800">{title}</h1>
        <p className="text-gray-500 text-sm">Manage participant registrations</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, reg no, phone..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-maroon-700 text-white rounded-lg text-sm hover:bg-maroon-800"
            >
              Search
            </button>
          </div>
          {!categoryFilter && (
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">All Categories</option>
              <option value="Master">Master</option>
              <option value="Student">Student</option>
            </select>
          )}
          {!paymentFilter && (
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">All Payments</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          )}
          <select
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="">All Districts</option>
            {data?.districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            title="From date"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            title="To date"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <Loader />
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-3 font-semibold text-gray-600">Reg No</th>
                  <th className="p-3 font-semibold text-gray-600">Category</th>
                  <th className="p-3 font-semibold text-gray-600">Name</th>
                  <th className="p-3 font-semibold text-gray-600">Father Name</th>
                  <th className="p-3 font-semibold text-gray-600">Phone</th>
                  <th className="p-3 font-semibold text-gray-600">District</th>
                  <th className="p-3 font-semibold text-gray-600">UPI ID</th>
                  <th className="p-3 font-semibold text-gray-600">Screenshot</th>
                  <th className="p-3 font-semibold text-gray-600">Status</th>
                  <th className="p-3 font-semibold text-gray-600">Date</th>
                  <th className="p-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.participants.map((p: Participant) => (
                  <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="p-3 font-medium text-maroon-700">{p.registration_number}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.category === 'Master' ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'
                      }`}>{p.category}</span>
                    </td>
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.father_name}</td>
                    <td className="p-3">{p.phone}</td>
                    <td className="p-3">{p.district}</td>
                    <td className="p-3 text-xs">{p.upi_id}</td>
                    <td className="p-3">
                      <a
                        href={getUploadUrl(p.payment_screenshot)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-maroon-600 hover:text-maroon-800 underline text-xs"
                      >
                        View
                      </a>
                    </td>
                    <td className="p-3">{statusBadge(p.payment_status)}</td>
                    <td className="p-3 text-xs">{new Date(p.created_at).toLocaleDateString()}</td>
                    <td className="p-3">
                      <div className="flex gap-1 flex-wrap">
                        <button
                          onClick={() => navigate(`/admin/participant/${p.id}`)}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                          View
                        </button>
                        {p.payment_status !== 'Approved' && (
                          <button
                            onClick={() => handlePaymentStatus(p.id, 'Approved')}
                            className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                          >
                            Approve
                          </button>
                        )}
                        {p.payment_status !== 'Rejected' && (
                          <button
                            onClick={() => handlePaymentStatus(p.id, 'Rejected')}
                            className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                          >
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!data?.participants || data.participants.length === 0) && (
                  <tr>
                    <td colSpan={11} className="p-8 text-center text-gray-400">No participants found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Participants;