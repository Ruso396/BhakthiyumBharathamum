import { useState, useRef } from 'react';
import { registerParticipant } from '../services/api';
import Toast from '../components/Toast';
import type { FormErrors } from '../types';
import qrCodeImage from '../assets/gpay-screenshot.jpg';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const Registration = () => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    father_name: '',
    phone: '',
    age: '',
    address: '',
    district: '',
    state: '',
    upi_id: '',
  });
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [regNumber, setRegNumber] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.father_name.trim()) newErrors.father_name = 'Father name is required';
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be exactly 10 digits';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (!/^[0-9]+$/.test(formData.age) || parseInt(formData.age) < 1 || parseInt(formData.age) > 150) {
      newErrors.age = 'Please enter a valid age';
    }

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.upi_id.trim()) newErrors.upi_id = 'UPI ID is required';

    if (!screenshot) {
      newErrors.payment_screenshot = 'Payment screenshot is required';
    } else if (!['image/jpeg', 'image/png', 'image/jpg'].includes(screenshot.type)) {
      newErrors.payment_screenshot = 'Only JPG, JPEG, and PNG files are allowed';
    } else if (screenshot.size > 10 * 1024 * 1024) {
      newErrors.payment_screenshot = 'File size must be less than 10MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      if (errors.payment_screenshot) {
        setErrors((prev) => ({ ...prev, payment_screenshot: '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (screenshot) data.append('payment_screenshot', screenshot);

      const response = await registerParticipant(data);
      setRegNumber(response.data.registration_number);
      setSubmitted(true);
      setToast({ message: response.message, type: 'success' });
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setToast({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg border ${errors[field] ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all bg-white`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-maroon-50 to-gold-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-maroon-800 mb-2">Registration Successful!</h2>
          <p className="text-maroon-600 mb-4">Your registration number is:</p>
          <div className="bg-maroon-50 border-2 border-maroon-200 rounded-xl p-4 mb-6">
            <h3 className="text-3xl font-bold text-maroon-800 tracking-wider">{regNumber}</h3>
          </div>
          <p className="text-sm text-gray-500 mb-6">Please save this registration number for future reference.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-maroon-700 text-white px-8 py-3 rounded-lg hover:bg-maroon-800 transition-all font-semibold"
          >
            Register Another Participant
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon-50 via-white to-gold-50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-maroon-800 via-maroon-700 to-gold-700 text-white py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">🪔</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Bhakthiyum Bharathamum 2026</h1>
          <p className="text-maroon-100 text-lg">1008 Bharatanatyam Artists - World Record Event</p>
          <div className="mt-4 inline-block bg-gold-500 text-maroon-900 px-6 py-2 rounded-full font-semibold text-sm">
            Registration Form
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 -mt-6 pb-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass('category')}
              >
                <option value="">Select Category</option>
                <option value="Master">Master</option>
                <option value="Student">Student</option>
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputClass('name')}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Father Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Father's Name *</label>
              <input
                type="text"
                name="father_name"
                value={formData.father_name}
                onChange={handleChange}
                placeholder="Enter your father's name"
                className={inputClass('father_name')}
              />
              {errors.father_name && <p className="mt-1 text-sm text-red-500">{errors.father_name}</p>}
            </div>

            {/* Phone & Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10 digit mobile number"
                  maxLength={10}
                  className={inputClass('phone')}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Your age"
                  className={inputClass('age')}
                />
                {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="Enter your complete address"
                className={inputClass('address')}
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>

            {/* District & State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">District *</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="Enter your district"
                  className={inputClass('district')}
                />
                {errors.district && <p className="mt-1 text-sm text-red-500">{errors.district}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={inputClass('state')}
                >
                  <option value="">Select State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
              </div>
            </div>

            {/* Scan & Pay - QR Code */}
            <div className="bg-gradient-to-br from-maroon-50 to-gold-50 rounded-2xl p-6 border-2 border-maroon-100 shadow-lg">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">📱</div>
                <h3 className="text-xl font-bold text-maroon-800">Scan QR Code & Complete Payment</h3>
                <p className="text-sm text-maroon-600 mt-1">Scan this QR code using any UPI app to make the payment</p>
              </div>
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-xl shadow-inner max-w-xs w-full">
                  <img
                    src={qrCodeImage}
                    alt="UPI QR Code for Payment"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-maroon-500">
                  After payment, enter your UPI ID and upload the payment screenshot below
                </p>
              </div>
            </div>

            {/* UPI ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">UPI ID *</label>
              <input
                type="text"
                name="upi_id"
                value={formData.upi_id}
                onChange={handleChange}
                placeholder="e.g. example@paytm"
                className={inputClass('upi_id')}
              />
              {errors.upi_id && <p className="mt-1 text-sm text-red-500">{errors.upi_id}</p>}
            </div>

            {/* Payment Screenshot */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Screenshot *</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  preview ? 'border-green-400 bg-green-50' : errors.payment_screenshot ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-maroon-400 hover:bg-maroon-50'
                }`}
              >
                {preview ? (
                  <div className="space-y-3">
                    <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg shadow" />
                    <p className="text-sm text-green-600 font-medium">✓ Screenshot uploaded</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setScreenshot(null);
                        setPreview('');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-sm text-red-500 hover:text-red-700 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-4xl">📸</div>
                    <p className="text-gray-600 font-medium">Click to upload payment screenshot</p>
                    <p className="text-sm text-gray-400">JPG, JPEG, PNG (Max 10MB)</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {errors.payment_screenshot && <p className="mt-1 text-sm text-red-500">{errors.payment_screenshot}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-maroon-700 to-maroon-800 text-white py-4 rounded-xl font-bold text-lg hover:from-maroon-800 hover:to-maroon-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-maroon-200"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Submitting...
                </span>
              ) : (
                'Submit Registration'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;