import { ROLES } from './constants';

/**
 * Check if a user has access to a specific route/feature
 */
export function hasAccess(userRole, requiredRoles) {
  if (!userRole || !requiredRoles) return false;
  if (typeof requiredRoles === 'string') return userRole === requiredRoles;
  if (Array.isArray(requiredRoles)) return requiredRoles.includes(userRole);
  return false;
}

/**
 * Check if user is admin
 */
export function isAdmin(userRole) {
  return userRole === ROLES.ADMIN;
}

/**
 * Check if user is management or above
 */
export function isManagementOrAbove(userRole) {
  return [ROLES.MANAGEMENT, ROLES.ADMIN].includes(userRole);
}

/**
 * Get role display label
 */
export function getRoleLabel(role) {
  const labels = {
    [ROLES.STAFF]: 'Staff',
    [ROLES.MANAGEMENT]: 'Management',
    [ROLES.ADMIN]: 'Administrator',
  };
  return labels[role] || role;
}

/**
 * Get role badge color class
 */
export function getRoleBadgeColor(role) {
  const colors = {
    [ROLES.STAFF]: 'badge-info',
    [ROLES.MANAGEMENT]: 'badge-warning',
    [ROLES.ADMIN]: 'badge-success',
  };
  return colors[role] || 'badge-gray';
}

/**
 * Filter nav items based on user role
 */
export function filterNavByRole(navItems, userRole) {
  return navItems.filter((item) => item.roles.includes(userRole));
}
