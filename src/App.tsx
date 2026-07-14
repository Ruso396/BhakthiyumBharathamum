// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Landing Page Components
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import HeroBanner from './pages/HeroBanner';
import QRScanner from './pages/QRScanner';
import VideoSection from './pages/AboutSection';
import StatsBar from './pages/StatsBar';
import Gallery from './pages/Gallery';
import Details from './pages/Details';
import Perks from './pages/Perks';
import FeeBox from './pages/FeeBox';

// Admin Pages
import Registration from './pages/Registration';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Participants from './pages/Participants';
import ParticipantDetail from './pages/ParticipantDetail';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream font-inter text-[#1a1a1a] overflow-x-hidden w-full max-w-full">
      <Navbar />
      <HeroBanner />
      <QRScanner />
      <VideoSection />
      <StatsBar />
      <Gallery />
      <Details />
      <Perks />
      <FeeBox />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Registration */}
        <Route path="/registration" element={<Registration />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="participants" element={<Participants />} />
          <Route
            path="masters"
            element={<Participants categoryFilter="Master" title="Masters" />}
          />
          <Route
            path="students"
            element={<Participants categoryFilter="Student" title="Students" />}
          />
          <Route
            path="payments/approved"
            element={
              <Participants
                paymentFilter="Approved"
                title="Approved Payments"
              />
            }
          />
          <Route
            path="payments/pending"
            element={
              <Participants
                paymentFilter="Pending"
                title="Pending Payments"
              />
            }
          />
          <Route
            path="payments/rejected"
            element={
              <Participants
                paymentFilter="Rejected"
                title="Rejected Payments"
              />
            }
          />
          <Route path="participant/:id" element={<ParticipantDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;