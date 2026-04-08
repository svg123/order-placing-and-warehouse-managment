import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSearch, FiPackage, FiCheck, FiClock, FiCircle } from 'react-icons/fi';
import StatusBadge from '../components/common/StatusBadge';
import { PageLoader } from '../components/common/LoadingSpinner';
import { formatCurrency, formatDate, formatDateTime } from '../utils/formatters';

const mockTimeline = {
  orderId: 'ORD-20260408-001',
  pharmacy: 'Delhi Medical Store',
  totalAmount: 24500,
  date: '2026-04-08T10:30:00Z',
  timeline: [
    { status: 'PLACED', timestamp: '2026-04-08T10:30:00Z', location: 'Central', completed: true },
    { status: 'PROCESSING', timestamp: '2026-04-08T10:45:00Z', location: 'Central', completed: true },
    { status: 'AT_SUBSTATION', timestamp: '2026-04-08T11:30:00Z', location: 'Mankind Sub-Station', completed: true, substation: 'Mankind Pharma' },
    { status: 'AT_SUBSTATION', timestamp: '2026-04-08T13:15:00Z', location: 'Abbott Sub-Station', completed: false, substation: 'Abbott India', inProgress: true },
    { status: 'AT_SUBSTATION', timestamp: null, location: 'Cipla Sub-Station', completed: false, substation: 'Cipla Ltd' },
    { status: 'DISPATCHED', timestamp: null, location: 'Dispatch', completed: false },
  ],
  itemsAtCurrentStation: [
    { productName: 'Telmikind 20', orderedQty: 50, filledQty: 30 },
    { productName: 'Crocin 650', orderedQty: 20, filledQty: 0 },
  ],
};

function TimelineStep({ step, isLast }) {
  const isCompleted = step.completed;
  const isInProgress = step.inProgress;

  return (
    <div className="flex gap-4">
      {/* Icon Column */}
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isCompleted
              ? 'bg-green-100 text-green-600'
              : isInProgress
              ? 'bg-blue-100 text-blue-600 ring-4 ring-blue-50'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {isCompleted ? (
            <FiCheck className="w-4 h-4" />
          ) : isInProgress ? (
            <FiClock className="w-4 h-4" />
          ) : (
            <FiCircle className="w-4 h-4" />
          )}
        </div>
        {!isLast && (
          <div className={`w-0.5 h-12 ${isCompleted ? 'bg-green-200' : 'bg-gray-200'}`} />
        )}
      </div>

      {/* Content */}
      <div className="pb-6">
        <p className={`text-sm font-medium ${isCompleted || isInProgress ? 'text-gray-900' : 'text-gray-400'}`}>
          {step.location}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {isCompleted ? formatDate(step.timestamp, 'dd MMM, HH:mm') : isInProgress ? 'In progress...' : 'Pending'}
        </p>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  const [searchId, setSearchId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setSearching(true);
    // TODO: Replace with actual API call
    setTimeout(() => {
      setTrackingData(mockTimeline);
      setSearching(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Order Tracking</h1>
        <p className="page-subtitle">Track orders through the dispatch pipeline</p>
      </div>

      {/* Search */}
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="input-field pl-10"
                placeholder="Enter Order ID (e.g., ORD-20260408-001)"
              />
            </div>
            <button type="submit" disabled={searching} className="btn-primary">
              {searching ? 'Searching...' : 'Track Order'}
            </button>
          </form>
        </div>
      </div>

      {/* Tracking Result */}
      {trackingData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-2 card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Order: {trackingData.orderId}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {trackingData.pharmacy} • {formatCurrency(trackingData.totalAmount)}
                  </p>
                </div>
                <StatusBadge status={trackingData.timeline.find((s) => s.inProgress)?.status || 'PLACED'} />
              </div>
            </div>
            <div className="card-body">
              <div className="mt-2">
                {trackingData.timeline.map((step, index) => (
                  <TimelineStep
                    key={index}
                    step={step}
                    isLast={index === trackingData.timeline.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Current Sub-Station Items */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-base font-semibold text-gray-900">Items at Current Station</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                {trackingData.itemsAtCurrentStation.map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">Ordered: {item.orderedQty}</span>
                      <span className="text-xs text-gray-500">Filled: {item.filledQty}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-primary-600 rounded-full h-1.5"
                        style={{ width: `${(item.filledQty / item.orderedQty) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
