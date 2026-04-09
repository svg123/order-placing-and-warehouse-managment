import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatsStart, fetchStatsSuccess, fetchStatsFailure } from '../redux/slices/dashboardSlice';
import StatCard from '../components/common/StatCard';
import { PageLoader } from '../components/common/LoadingSpinner';
import OrderPipeline from '../components/dashboard/OrderPipeline';
import OrderTimerRow from '../components/dashboard/OrderTimerRow';
import { formatCurrency, formatNumber, getUrgencyLevel } from '../utils/formatters';

// Helper to create relative timestamps for mock data
const hoursAgo = (h) => new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
const minsAgo = (m) => new Date(Date.now() - m * 60 * 1000).toISOString();

// Mock data with statusChangedAt timestamps for urgency testing
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
    // DELAYED orders (> 4 hours) — sorted to top
    { id: 'ORD-20260408-001', pharmacy: 'MediCare Hub', totalAmount: 31000, status: 'PLACED', date: hoursAgo(5), statusChangedAt: hoursAgo(5), items: 12 },
    { id: 'ORD-20260408-005', pharmacy: 'Apollo Pharmacy', totalAmount: 54000, status: 'PROCESSING', date: hoursAgo(4.5), statusChangedAt: hoursAgo(4.5), items: 20 },
    { id: 'ORD-20260407-052', pharmacy: 'Netra Medicals', totalAmount: 15800, status: 'DISPATCHING', date: hoursAgo(6), statusChangedAt: hoursAgo(6), items: 6 },

    // WARNING orders (3-4 hours)
    { id: 'ORD-20260408-003', pharmacy: 'Delhi Medical Store', totalAmount: 24500, status: 'DISPATCHING', date: hoursAgo(3.5), statusChangedAt: hoursAgo(3.5), items: 8 },
    { id: 'ORD-20260408-008', pharmacy: 'LifeCare Pharma', totalAmount: 19200, status: 'PLACED', date: hoursAgo(3.2), statusChangedAt: hoursAgo(3.2), items: 7 },

    // NORMAL orders (< 2 hours)
    { id: 'ORD-20260408-002', pharmacy: 'Health Plus Pharmacy', totalAmount: 18200, status: 'PROCESSING', date: hoursAgo(1.5), statusChangedAt: hoursAgo(1.5), items: 5 },
    { id: 'ORD-20260408-009', pharmacy: 'City Pharma', totalAmount: 8900, status: 'PLACED', date: hoursAgo(0.5), statusChangedAt: hoursAgo(0.5), items: 3 },
    { id: 'ORD-20260408-010', pharmacy: 'Wellness Drug House', totalAmount: 42300, status: 'DISPATCHING', date: minsAgo(45), statusChangedAt: minsAgo(45), items: 15 },

    // COMPLETED / DISPATCHED — still in pipeline
    { id: 'ORD-20260408-004', pharmacy: 'Sanjeevani Store', totalAmount: 6700, status: 'DISPATCHED', date: hoursAgo(2), statusChangedAt: hoursAgo(1), items: 2 },
    { id: 'ORD-20260408-006', pharmacy: 'Green Cross Pharmacy', totalAmount: 27500, status: 'COMPLETED', date: hoursAgo(3), statusChangedAt: hoursAgo(0.5), items: 9 },
    { id: 'ORD-20260408-007', pharmacy: 'MedPlus Express', totalAmount: 11800, status: 'COMPLETED', date: hoursAgo(4), statusChangedAt: hoursAgo(0.2), items: 4 },
  ],
};

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { stats, recentOrders, isLoading } = useSelector((state) => state.dashboard);
  const [pipelineFilter, setPipelineFilter] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      dispatch(fetchStatsStart());
      try {
        dispatch(fetchStatsSuccess(mockStats));
      } catch (err) {
        dispatch(fetchStatsFailure(err.message));
      }
    };
    loadStats();
  }, [dispatch]);

  if (isLoading) return <PageLoader />;

  // Filter and sort orders
  const filteredOrders = pipelineFilter
    ? recentOrders.filter((o) => o.status === pipelineFilter)
    : recentOrders;

  // Sort: oldest first (most urgent at top)
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const urgencyOrder = { delayed: 0, warning: 1, normal: 2 };
    const aUrgency = getUrgencyLevel(a.statusChangedAt);
    const bUrgency = getUrgencyLevel(b.statusChangedAt);
    if (urgencyOrder[aUrgency] !== urgencyOrder[bUrgency]) {
      return urgencyOrder[aUrgency] - urgencyOrder[bUrgency];
    }
    // Within same urgency, oldest first
    return new Date(a.statusChangedAt) - new Date(b.statusChangedAt);
  });

  // Count urgency levels
  const delayedCount = recentOrders.filter((o) => getUrgencyLevel(o.statusChangedAt) === 'delayed').length;
  const warningCount = recentOrders.filter((o) => getUrgencyLevel(o.statusChangedAt) === 'warning').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Real-time overview of order operations</p>
        </div>
        {/* Urgency summary badges */}
        <div className="flex items-center gap-3">
          {delayedCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-sm font-semibold text-red-700">{delayedCount} Delayed</span>
            </div>
          )}
          {warningCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-sm font-semibold text-amber-700">{warningCount} Warning</span>
            </div>
          )}
        </div>
      </div>

      {/* Today's Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Orders"
          value={formatNumber(stats.todayOrders)}
          subtitle="Placed today"
          icon="orders"
          color="blue"
        />
        <StatCard
          title="Pending"
          value={formatNumber(stats.todayOrders - stats.todayDispatched)}
          subtitle="Awaiting processing"
          icon="pending"
          color="yellow"
        />
        <StatCard
          title="Dispatched"
          value={formatNumber(stats.todayDispatched)}
          subtitle="Completed today"
          icon="dispatched"
          color="purple"
        />
        <StatCard
          title="Today's Revenue"
          value={formatCurrency(stats.todayRevenue)}
          subtitle="Collected today"
          icon="revenue"
          color="green"
        />
      </div>

      {/* Order Pipeline — Interactive */}
      <OrderPipeline
        orders={recentOrders}
        activeFilter={pipelineFilter}
        onFilterChange={setPipelineFilter}
      />

      {/* Orders with Live Timers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main: Order List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900">
              {pipelineFilter ? 'Filtered Orders' : 'Active Orders'}
            </h3>
            <span className="text-sm text-gray-400">{sortedOrders.length} orders</span>
          </div>

          <div className="space-y-2">
            {sortedOrders.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-gray-400">No orders in this stage</p>
              </div>
            ) : (
              sortedOrders.map((order) => (
                <OrderTimerRow key={order.id} order={order} />
              ))
            )}
          </div>
        </div>

        {/* Sidebar: Today's Summary */}
        <div className="card h-fit">
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

            {/* Urgency Breakdown */}
            <div className="border-t border-gray-100 pt-3 mt-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Urgency Breakdown</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="text-sm text-gray-600">Delayed (&gt;4h)</span>
                  </div>
                  <span className="text-sm font-semibold text-red-600">{delayedCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="text-sm text-gray-600">Warning (3-4h)</span>
                  </div>
                  <span className="text-sm font-semibold text-amber-600">{warningCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="text-sm text-gray-600">Normal (&lt;2h)</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    {recentOrders.length - delayedCount - warningCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
