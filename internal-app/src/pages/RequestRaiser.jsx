import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  submitRequestStart,
  submitRequestSuccess,
  submitRequestFailure,
} from '../redux/slices/requestSlice';
import { FiSend, FiPlus, FiMinus } from 'react-icons/fi';

export default function RequestRaiserPage() {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    orderId: '',
    productName: '',
    productId: '',
    operation: 'SUBTRACT',
    quantity: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      setTimeout(() => {
        dispatch(
          submitRequestSuccess({
            id: `REQ-${Date.now().toString().slice(-6)}`,
            ...form,
            quantity: Number(form.quantity),
            status: 'PENDING',
            requestedBy: 'Current User',
            createdAt: new Date().toISOString(),
          })
        );
        setSubmitted(true);
        setLoading(false);
      }, 600);
    } catch (err) {
      dispatch(submitRequestFailure(err.message));
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      orderId: '',
      productName: '',
      productId: '',
      operation: 'SUBTRACT',
      quantity: '',
      reason: '',
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="page-header">
          <h1 className="page-title">Raise Request</h1>
        </div>
        <div className="card">
          <div className="card-body text-center py-12">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Request Submitted</h3>
            <p className="text-sm text-gray-500 mb-6">
              Your modification request has been sent for approval.
            </p>
            <button onClick={handleReset} className="btn-primary">
              Raise Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Raise Request</h1>
        <p className="page-subtitle">Submit an order modification request for approval</p>
      </div>

      <div className="max-w-2xl">
        <div className="card">
          <div className="card-header">
            <h3 className="text-base font-semibold text-gray-900">New Modification Request</h3>
          </div>
          <form onSubmit={handleSubmit} className="card-body space-y-5">
            {/* Order ID */}
            <div>
              <label className="label">Sales Order ID <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="orderId"
                value={form.orderId}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., ORD-20260408-001"
                required
              />
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Product Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="productName"
                  value={form.productName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Telmikind 20"
                  required
                />
              </div>
              <div>
                <label className="label">Product ID <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="productId"
                  value={form.productId}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., PROD-001"
                  required
                />
              </div>
            </div>

            {/* Operation & Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Operation <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, operation: 'SUBTRACT' }))}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      form.operation === 'SUBTRACT'
                        ? 'border-red-300 bg-red-50 text-red-700'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FiMinus className="w-4 h-4" /> Subtract
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, operation: 'ADD' }))}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      form.operation === 'ADD'
                        ? 'border-green-300 bg-green-50 text-green-700'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FiPlus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>
              <div>
                <label className="label">Quantity <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter quantity"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="label">Reason <span className="text-red-500">*</span></label>
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                className="input-field min-h-[80px] resize-none"
                placeholder="Describe the reason for this modification..."
                required
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={handleReset} className="btn-secondary">
                Clear
              </button>
              <button type="submit" disabled={loading} className="btn-primary flex-1">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FiSend className="w-4 h-4" /> Submit Request
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
