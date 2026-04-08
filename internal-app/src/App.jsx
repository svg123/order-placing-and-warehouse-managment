import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { restoreAuth } from './redux/slices/authSlice';
import { restoreSidebar } from './redux/slices/uiSlice';

// Layout
import Layout from './components/layout/Layout';

// Pages
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import OrderTrackingPage from './pages/OrderTracking';
import BarcodeGeneratorPage from './pages/BarcodeGenerator';
import SubStationStatusPage from './pages/SubStationStatus';
import RequestManagementPage from './pages/RequestManagement';
import RequestRaiserPage from './pages/RequestRaiser';
import UserManagementPage from './pages/UserManagement';
import AnalyticsPage from './pages/Analytics';
import AuditLogsPage from './pages/AuditLogs';
import SystemConfigPage from './pages/SystemConfig';
import NotFoundPage from './pages/NotFound';

// Common
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(restoreAuth());
    dispatch(restoreSidebar());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />

        {/* Protected Routes - All wrapped in Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/order-tracking" element={<OrderTrackingPage />} />
            <Route path="/barcode-generator" element={<BarcodeGeneratorPage />} />
            <Route path="/substation-status" element={<SubStationStatusPage />} />
            <Route path="/requests" element={<RequestManagementPage />} />
            <Route path="/request-raiser" element={<RequestRaiserPage />} />

            {/* Management+ Routes */}
            <Route
              path="/analytics"
              element={
                <ProtectedRoute requiredRoles={['MANAGEMENT', 'ADMIN']} />
              }
            />
            <Route
              path="/user-management"
              element={
                <ProtectedRoute requiredRoles={['ADMIN']} />
              }
            />
            <Route
              path="/audit-logs"
              element={
                <ProtectedRoute requiredRoles={['ADMIN']} />
              }
            />
            <Route
              path="/system-config"
              element={
                <ProtectedRoute requiredRoles={['ADMIN']} />
              }
            />
          </Route>
        </Route>

        {/* Default & 404 */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
