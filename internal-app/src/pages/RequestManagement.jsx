import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRequestsStart,
  fetchRequestsSuccess,
  fetchRequestsFailure,
  setRequestFilter,
  updateRequestStatusStart,
  updateRequestStatusSuccess,
  updateRequestStatusFailure,
} from '../redux/slices/requestSlice';
import { REQUEST_STATUSES } from '../utils/constants';
import { formatDate, formatDateTime } from '../utils/formatters';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { PageLoader } from '../components/common/LoadingSpinner';

const mockRequests = [
  {
    id: 'REQ-001',
    orderId: 'ORD-20260408-001',
    substation: 'Mankind Pharma',
    requestedBy: 'Operator-1',
    type: 'SUBTRACT',
    productName: 'Telmikind 20',
    quantity: 5,
    reason: 'Stock mismatch - only 45 available vs 50 ordered',
    status: 'PENDING',
    createdAt: '2026-04-08T14:30:00Z',
  },
  {
    id: 'REQ-002',
    orderId: 'ORD-20260408-002',
    substation: 'Abbott India',
    requestedBy: 'Operator-3',
    type: 'ADD',
    productName: 'Crocin 650',
    quantity: 10,
    reason: 'Customer requested additional quantity via phone',
    status: 'PENDING',
    createdAt: '2026-04-08T13:15:00Z',
  },
  {
    id: 'REQ-003',
    orderId: 'ORD-20260407-045',
    substation: 'Cipla Ltd',
    requestedBy: 'Operator-2',
    type: 'SUBTRACT',
    productName: 'Dolo 650',
    quantity: 3,
    reason: 'Damaged stock found during packing',
    status: 'APPROVED',
    createdAt: '2026-04-07T16:45:00Z',
  },
  {
    id: 'REQ-004',
    orderId: 'ORD-20260407-040',
    substation: 'Mankind Pharma',
    requestedBy: 'Operator-1',
    type: 'MODIFY',
    productName: 'Montair LC',
    quantity: 15,
    reason: 'Wrong batch - need to replace with fresh stock',
    status: 'REJECTED',
    createdAt: '2026-04-07T11:20:00Z',
  },
];

const filterTabs = [
  { key: 'ALL', label: 'All' },
  { key: 'PENDING', label: 'Pending' },
  { key: 'APPROVED', label: 'Approved' },
  { key: 'REJECTED', label: 'Rejected' },
];

const typeColors = {
  ADD: 'badge-success',
  SUBTRACT: 'badge-danger',
  MODIFY: 'badge-warning',
};

const statusColors = {
  PENDING: 'badge-warning',
  APPROVED: 'badge-success',
  REJECTED: 'badge-danger',
};

export default function RequestManagementPage() {
  const dispatch = useDispatch();
  const { requests, isLoading, filter } = useSelector((state) => state.request);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    dispatch(fetchRequestsStart());
    setTimeout(() => {
      dispatch(fetchRequestsSuccess({ requests: mockRequests, total: mockRequests.length }));
    }, 500);
  }, [dispatch]);

  const filteredRequests = filter === 'ALL'
    ? requests
    : requests.filter((r) => r.status === filter);

  const handleApprove = (req) => {
    setConfirmAction({ type: 'approve', request: req });
  };

  const handleReject = (req) => {
    setConfirmAction({ type: 'reject', request: req });
  };

  const confirmApproveReject = async () => {
    if (!confirmAction) return;
    const { type, request } = confirmAction;
    dispatch(updateRequestStatusStart());

    try {
      // TODO: Replace with actual API call
      const newStatus = type === 'approve' ? 'APPROVED' : 'REJECTED';
      dispatch(
        updateRequestStatusSuccess({
          ...request,
          status: newStatus,
          processedAt: new Date().toISOString(),
        })
      );
    } catch (err) {
      dispatch(updateRequestStatusFailure(err.message));
    }
    setConfirmAction(null);
  };

  if (isLoading && requests.length === 0) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Request Management</h1>
        <p className="page-subtitle">Review and manage order modification requests</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-px">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => dispatch(setRequestFilter(tab.key))}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              filter === tab.key
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {tab.key !== 'ALL' && (
              <span className="ml-1.5 text-xs">
                ({requests.filter((r) => r.status === tab.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Request Cards */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500">No requests found</p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div key={req.id} className="card">
              <div className="card-body">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-sm font-semibold text-gray-900">{req.id}</h4>
                      <span className={typeColors[req.type]}>{req.type}</span>
                      <span className={statusColors[req.status]}>{req.status}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Order</p>
                        <p className="font-medium text-primary-600">{req.orderId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Product</p>
                        <p className="font-medium text-gray-900">{req.productName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Quantity</p>
                        <p className="font-medium text-gray-900">{req.quantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Station</p>
                        <p className="font-medium text-gray-900">{req.substation}</p>
                      </div>
                    </div>

                    <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Reason:</span> {req.reason}
                      </p>
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                      By {req.requestedBy} • {formatDateTime(req.createdAt)}
                    </p>
                  </div>

                  {/* Actions */}
                  {req.status === 'PENDING' && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleApprove(req)}
                        className="btn-success btn-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(req)}
                        className="btn-danger btn-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={!!confirmAction}
        title={confirmAction?.type === 'approve' ? 'Approve Request' : 'Reject Request'}
        message={
          confirmAction
            ? `Are you sure you want to ${confirmAction.type} request ${confirmAction.request.id} for ${confirmAction.request.productName}?`
            : ''
        }
        confirmLabel={confirmAction?.type === 'approve' ? 'Approve' : 'Reject'}
        onConfirm={confirmApproveReject}
        onCancel={() => setConfirmAction(null)}
        danger={confirmAction?.type === 'reject'}
      />
    </div>
  );
}
