import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatsStart, fetchStatsSuccess, fetchStatsFailure } from '../redux/slices/dashboardSlice';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import { PageLoader } from '../components/common/LoadingSpinner';
import { formatCurrency, formatNumber, formatDate } from '../utils/formatters';

// Mock data for development
const mockStats = {
  stats: {
    totalOrders: 1247,
    pendingOrders: 89,
    dispatchingOrders: 156,
    completedOrders: 1002,
    todayOrders: 42,
    todayDispatched: 28,
    todayRevenue: 875000,
  },
  recentOrders: [
    { id: 'ORD-20260408-001', pharmacy: 'Delhi Medical Store', totalAmount: 24500, status: 'DISPATCHING', date: '2026-04-08T10:30:00Z', items: 8 },
    { id: 'ORD-20260408-002', pharmacy: 'Health Plus Pharmacy', totalAmount: 18200, status: 'PROCESSING', date: '2026-04-08T09:45:00Z', items: 5 },
    { id: 'ORD-20260408-003', pharmacy: 'MediCare Hub', totalAmount: 31000, status: 'PLACED', date: '2026-04-08T09:15:00Z', items: 12 },
    { id: 'ORD-20260407-048', pharmacy: 'City Pharma', totalAmount: 8900, status: 'DISPATCHED', date: '2026-04-07T16:20:00Z', items: 3 },
    { id: 'ORD-20260407-047', pharmacy: 'Wellness Drug House', totalAmount: 42300, status: 'COMPLETED', date: '2026-04-07T14:10:00Z', items: 15 },
  ],
};

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { stats, recentOrders, isLoading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    const loadStats = async () => {
      dispatch(fetchStatsStart());
      try {
        // TODO: Replace with actual API call
        // const data = await dashboardService.getStats();
        dispatch(fetchStatsSuccess(mockStats));
      } catch (err) {
        dispatch(fetchStatsFailure(err.message));
      }
    };
    loadStats();
  }, [dispatch]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Real-time overview of order operations</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Orders"
          value={formatNumber(stats.totalOrders)}
          subtitle="This month"
          icon="orders"
          color="blue"
        />
        <StatCard
          title="Pending Orders"
          value={formatNumber(stats.pendingOrders)}
          subtitle="Awaiting processing"
          icon="pending"
          color="yellow"
        />
        <StatCard
          title="Dispatching"
          value={formatNumber(stats.dispatchingOrders)}
          subtitle="In progress"
          icon="dispatched"
          color="purple"
        />
        <StatCard
          title="Today's Revenue"
          value={formatCurrency(stats.todayRevenue)}
          subtitle={`${formatNumber(stats.todayOrders)} orders today`}
          icon="revenue"
          color="green"
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 card">
          <div className="card-header flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">Recent Orders</h3>
            <a href="/order-tracking" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View all →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pharmacy</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-medium text-primary-600">{order.id}</td>
                    <td className="px-6 py-3.5 text-sm text-gray-700">{order.pharmacy}</td>
                    <td className="px-6 py-3.5 text-sm text-gray-700">{formatCurrency(order.totalAmount)}</td>
                    <td className="px-6 py-3.5"><StatusBadge status={order.status} /></td>
                    <td className="px-6 py-3.5 text-sm text-gray-500">{formatDate(order.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Daily Stats */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-base font-semibold text-gray-900">Today's Summary</h3>
          </div>
          <div className="card-body space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-500">Orders Placed</span>
              <span className="text-lg font-semibold text-gray-900">{stats.todayOrders}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-500">Dispatched</span>
              <span className="text-lg font-semibold text-green-600">{stats.todayDispatched}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-500">Pending</span>
              <span className="text-lg font-semibold text-yellow-600">
                {stats.todayOrders - stats.todayDispatched}
              </span>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Revenue</span>
                <span className="text-xl font-bold text-gray-900">{formatCurrency(stats.todayRevenue)}</span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Dispatch Progress</span>
                <span>{Math.round((stats.todayDispatched / stats.todayOrders) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-primary-600 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(stats.todayDispatched / stats.todayOrders) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
