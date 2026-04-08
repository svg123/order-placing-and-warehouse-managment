// ===== User Roles =====
export const ROLES = {
  STAFF: 'STAFF',
  MANAGEMENT: 'MANAGEMENT',
  ADMIN: 'ADMIN',
};

// ===== Order Statuses =====
export const ORDER_STATUSES = {
  PLACED: 'PLACED',
  PROCESSING: 'PROCESSING',
  AT_SUBSTATION: 'AT_SUBSTATION',
  DISPATCHING: 'DISPATCHING',
  DISPATCHED: 'DISPATCHED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

// ===== Order Status Config (label + color) =====
export const ORDER_STATUS_CONFIG = {
  PLACED: { label: 'Placed', color: 'info' },
  PROCESSING: { label: 'Processing', color: 'warning' },
  AT_SUBSTATION: { label: 'At Sub-Station', color: 'warning' },
  DISPATCHING: { label: 'Dispatching', color: 'primary' },
  DISPATCHED: { label: 'Dispatched', color: 'success' },
  COMPLETED: { label: 'Completed', color: 'success' },
  CANCELLED: { label: 'Cancelled', color: 'danger' },
};

// ===== Request Statuses =====
export const REQUEST_STATUSES = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

// ===== Request Types =====
export const REQUEST_TYPES = {
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
  MODIFY: 'MODIFY',
};

// ===== Sub-Station Statuses =====
export const SUBSTATION_STATUSES = {
  ACTIVE: 'ACTIVE',
  IDLE: 'IDLE',
  MAINTENANCE: 'MAINTENANCE',
};

// ===== Timeline Status Icons =====
export const TIMELINE_STATUS = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in_progress',
  PENDING: 'pending',
};

// ===== Sidebar Navigation Items =====
export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'dashboard',
    roles: [ROLES.STAFF, ROLES.MANAGEMENT, ROLES.ADMIN],
  },
  {
    id: 'order-tracking',
    label: 'Order Tracking',
    path: '/order-tracking',
    icon: 'tracking',
    roles: [ROLES.STAFF, ROLES.MANAGEMENT, ROLES.ADMIN],
  },
  {
    id: 'barcode-generator',
    label: 'Barcode Generator',
    path: '/barcode-generator',
    icon: 'barcode',
    roles: [ROLES.STAFF, ROLES.MANAGEMENT, ROLES.ADMIN],
  },
  {
    id: 'substation-status',
    label: 'Sub-Station Status',
    path: '/substation-status',
    icon: 'substation',
    roles: [ROLES.STAFF, ROLES.MANAGEMENT, ROLES.ADMIN],
  },
  {
    id: 'divider-1',
    label: '',
    path: '',
    icon: '',
    roles: [ROLES.STAFF, ROLES.MANAGEMENT, ROLES.ADMIN],
    isDivider: true,
  },
  {
    id: 'request-raiser',
    label: 'Raise Request',
    path: '/request-raiser',
    icon: 'request',
    roles: [ROLES.STAFF, ROLES.MANAGEMENT, ROLES.ADMIN],
  },
  {
    id: 'requests',
    label: 'Request Management',
    path: '/requests',
    icon: 'requests',
    roles: [ROLES.MANAGEMENT, ROLES.ADMIN],
  },
  {
    id: 'divider-2',
    label: '',
    path: '',
    icon: '',
    roles: [ROLES.MANAGEMENT, ROLES.ADMIN],
    isDivider: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/analytics',
    icon: 'analytics',
    roles: [ROLES.MANAGEMENT, ROLES.ADMIN],
  },
  {
    id: 'user-management',
    label: 'User Management',
    path: '/user-management',
    icon: 'users',
    roles: [ROLES.ADMIN],
  },
  {
    id: 'audit-logs',
    label: 'Audit Logs',
    path: '/audit-logs',
    icon: 'audit',
    roles: [ROLES.ADMIN],
  },
  {
    id: 'system-config',
    label: 'System Config',
    path: '/system-config',
    icon: 'config',
    roles: [ROLES.ADMIN],
  },
];
