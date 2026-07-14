import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getParticipant, updatePaymentStatus, getUploadUrl } from '../services/api';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import type { Participant } from '../types';

const ParticipantDetail = () => {
  const { id } = useParams();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (id) fetchParticipant();
  }, [id]);

  const fetchParticipant = async () => {
    try {
      const response = await getParticipant(parseInt(id!));
      if (response.success) {
        setParticipant(response.data);
      }
    } catch (err: any) {
      setToast({ message: 'Failed to load participant details', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentStatus = async (status: string) => {
    if (!participant) return;
    try {
      const response = await updatePaymentStatus(participant.id, status);
      if (response.success) {
        setToast({ message: response.message, type: 'success' });
        fetchParticipant();
      }
    } catch (err: any) {
      setToast({ message: err.response?.data?.message || 'Update failed', type: 'error' });
    }
  };

  if (loading) return <Loader />;
  if (!participant) return <div className="text-red-500 p-4">Participant not found</div>;

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-maroon-800">Participant Details</h1>
          <p className="text-gray-500 text-sm">Registration: {participant.registration_number}</p>
        </div>
        <div className="flex gap-2">
          {participant.payment_status !== 'Approved' && (
            <button
              onClick={() => handlePaymentStatus('Approved')}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              Approve Payment
            </button>
          )}
          {participant.payment_status !== 'Rejected' && (
            <button
              onClick={() => handlePaymentStatus('Rejected')}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
            >
              Reject Payment
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Details */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Registration Number</label>
              <p className="text-lg font-semibold text-maroon-700">{participant.registration_number}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Category</label>
              <p className="text-lg font-semibold">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  participant.category === 'Master' ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'
                }`}>{participant.category}</span>
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Full Name</label>
              <p className="text-lg font-semibold">{participant.name}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Father's Name</label>
              <p className="text-lg font-semibold">{participant.father_name}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Phone Number</label>
              <p className="text-lg font-semibold">{participant.phone}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Age</label>
              <p className="text-lg font-semibold">{participant.age} years</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">District</label>
              <p className="text-lg font-semibold">{participant.district}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">State</label>
              <p className="text-lg font-semibold">{participant.state}</p>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-500 uppercase tracking-wide">Address</label>
              <p className="text-lg">{participant.address}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">UPI ID</label>
              <p className="text-lg font-semibold">{participant.upi_id}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Payment Status</label>
              <p className="text-lg font-semibold">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  participant.payment_status === 'Approved' ? 'bg-green-100 text-green-700' :
                  participant.payment_status === 'Rejected' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>{participant.payment_status}</span>
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Registration Date</label>
              <p className="text-lg font-semibold">{new Date(participant.created_at).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Payment Screenshot */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Payment Screenshot</h3>
          <a
            href={getUploadUrl(participant.payment_screenshot)}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={getUploadUrl(participant.payment_screenshot)}
              alt="Payment Screenshot"
              className="w-full rounded-lg shadow cursor-pointer hover:opacity-90 transition-all"
            />
          </a>
          <p className="text-xs text-gray-400 mt-2 text-center">Click to view full size</p>
        </div>
      </div>
    </div>
  );
};

export default ParticipantDetail;