import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './pages/Registration';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Participants from './pages/Participants';
import ParticipantDetail from './pages/ParticipantDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="participants" element={<Participants />} />
          <Route path="masters" element={<Participants categoryFilter="Master" title="Masters" />} />
          <Route path="students" element={<Participants categoryFilter="Student" title="Students" />} />
          <Route path="payments/approved" element={<Participants paymentFilter="Approved" title="Approved Payments" />} />
          <Route path="payments/pending" element={<Participants paymentFilter="Pending" title="Pending Payments" />} />
          <Route path="payments/rejected" element={<Participants paymentFilter="Rejected" title="Rejected Payments" />} />
          <Route path="participant/:id" element={<ParticipantDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;