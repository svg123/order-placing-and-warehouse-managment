# Track Order Feature - Testing Guide

## Test Execution Steps

### Setup
1. Start dev server: `npm run dev`
2. Open browser: `http://localhost:5173`
3. Login with credentials:
   - User ID: `PHARM001`
   - PIN: `123456`
4. Click "Track Order" on Dashboard

---

## Test Scenarios

### Test 1: Page Load & Default Selection
**Expected:** Page loads with first order auto-selected

Steps:
1. Click "Track Order" from Dashboard
2. Observe page loading

**Assertions:**
- [ ] Page loads without errors
- [ ] First order is selected in dropdown
- [ ] All components render (Timeline, Delivery Info, Map)
- [ ] No console errors

---

### Test 2: Order Dropdown Selection
**Expected:** Selecting different orders updates all components

Steps:
1. Click order dropdown
2. Select different order from list
3. Observe page update with loading spinner

**Assertions:**
- [ ] Dropdown opens
- [ ] All orders display in list
- [ ] Selected order shows checkmark
- [ ] Loading spinner appears
- [ ] Components update after loading
- [ ] Selected order ID updates in dropdown

---

### Test 3: Search Functionality
**Expected:** Search filters orders by ID or date

Steps:
1. Click dropdown to open
2. Type "ORD-" in search box
3. Observe filtered results
4. Clear search and try date search

**Assertions:**
- [ ] Search input appears in dropdown
- [ ] Results filter as you type
- [ ] Results only show matching orders
- [ ] "No orders found" message if no matches
- [ ] Search works for both ID and date

---

### Test 4: Active Orders Filter
**Expected:** Toggle shows only active orders (PENDING, CONFIRMED, SHIPPED)

Steps:
1. Click dropdown
2. Check "Show active orders only" checkbox
3. Observe filtered list
4. Uncheck to show all orders

**Assertions:**
- [ ] Checkbox toggles filter
- [ ] Only active orders show when checked
- [ ] Count updates correctly
- [ ] Delivered/Cancelled orders hidden when checked
- [ ] All orders show when unchecked

---

### Test 5: Timeline for Pending Order
**Expected:** Timeline shows only Pending event as active

Steps:
1. Select order with status: PENDING
2. View OrderTimeline component

**Assertions:**
- [ ] "Order Placed" event shows completed (checkmark)
- [ ] Other events show as incomplete
- [ ] Progress bar at 20%
- [ ] "Current Status" badge shows on Pending event
- [ ] Timeline renders without errors

---

### Test 6: Timeline for Confirmed Order
**Expected:** Timeline shows Pending & Confirmed events completed

Steps:
1. Select order with status: CONFIRMED
2. View OrderTimeline component

**Assertions:**
- [ ] "Order Placed" and "Order Confirmed" completed
- [ ] "Shipped" event incomplete
- [ ] Progress bar at 40%
- [ ] "Current Status" badge on Confirmed event
- [ ] Timestamps display for each event

---

### Test 7: Timeline for Shipped Order
**Expected:** Timeline shows Pending, Confirmed, Shipped completed

Steps:
1. Select order with status: SHIPPED
2. View OrderTimeline component

**Assertions:**
- [ ] First 3 events completed
- [ ] "Out for Delivery" incomplete
- [ ] Progress bar at 60%
- [ ] "Current Status" badge on Shipped event
- [ ] Timeline visual connection lines complete

---

### Test 8: Timeline for Out-for-Delivery Order
**Expected:** Timeline shows 4 events completed, delivery in progress

Steps:
1. Select order with status: OUT_FOR_DELIVERY
2. View OrderTimeline and DeliveryInfo

**Assertions:**
- [ ] First 4 events completed
- [ ] "Delivered" event incomplete
- [ ] Progress bar at 80%
- [ ] "Current Status" badge on Out for Delivery event
- [ ] Pulsing animation on current event
- [ ] DeliveryInfo shows "out for delivery today"
- [ ] TrackingMap shows live indicator

---

### Test 9: Timeline for Delivered Order
**Expected:** All events completed, success message shows

Steps:
1. Select order with status: DELIVERED
2. View all components

**Assertions:**
- [ ] All events completed with checkmarks
- [ ] Progress bar at 100%
- [ ] Green completion message shows
- [ ] "Completed" badge on Delivered event
- [ ] DeliveryInfo shows "Rate Delivery" and "Reorder" buttons
- [ ] Delivery confirmation message visible

---

### Test 10: Timeline for Cancelled Order
**Expected:** Timeline shows cancelled status, no map display

Steps:
1. Select order with status: CANCELLED
2. View all components

**Assertions:**
- [ ] Cancelled event shows with X icon
- [ ] Progress bar at 0%
- [ ] Red cancellation message shows
- [ ] "Cancelled" badge displays
- [ ] DeliveryInfo shows "Contact Support" button only
- [ ] TrackingMap does not render
- [ ] Error/help message displays

---

### Test 11: Delivery Info - Status Card
**Expected:** Status card shows current status with progress

Steps:
1. Select any order
2. View DeliveryInfo component

**Assertions:**
- [ ] Status color matches order status
- [ ] Status icon displays correctly
- [ ] Progress bar shows correct percentage
- [ ] Progress percentage text accurate
- [ ] Status text uppercase and clear

---

### Test 12: Delivery Info - Address & Contact
**Expected:** Address and contact info displays correctly

Steps:
1. Select any order
2. View DeliveryInfo cards

**Assertions:**
- [ ] Delivery address displays
- [ ] City, state, ZIP show correctly
- [ ] Contact person name displays
- [ ] Contact phone displays
- [ ] All fields properly formatted
- [ ] Phone number clickable (mobile)

---

### Test 13: Delivery Info - Action Buttons (Active Order)
**Expected:** Show Reschedule and Help buttons for active orders

Steps:
1. Select order with status PENDING/CONFIRMED/SHIPPED
2. View DeliveryInfo actions

**Assertions:**
- [ ] "Reschedule Delivery" button shows
- [ ] "Delivery Help" button shows
- [ ] Both buttons are clickable
- [ ] Buttons don't show for delivered/cancelled

---

### Test 14: Delivery Info - Action Buttons (Delivered Order)
**Expected:** Show Rate and Reorder buttons for delivered orders

Steps:
1. Select order with status DELIVERED
2. View DeliveryInfo actions

**Assertions:**
- [ ] "Rate Delivery" button shows
- [ ] "Reorder" button shows
- [ ] Other action buttons don't show
- [ ] Buttons are clickable

---

### Test 15: Delivery Info - Action Buttons (Cancelled Order)
**Expected:** Show Contact Support button only for cancelled

Steps:
1. Select order with status CANCELLED
2. View DeliveryInfo actions

**Assertions:**
- [ ] Only "Contact Support" button shows
- [ ] Other action buttons don't show
- [ ] Button is clickable
- [ ] Delivery help buttons don't show

---

### Test 16: Tracking Map - Display
**Expected:** Map renders with locations and info

Steps:
1. Select order with status SHIPPED or OUT_FOR_DELIVERY
2. View TrackingMap component

**Assertions:**
- [ ] Map container renders
- [ ] Grid background pattern shows
- [ ] "Live Tracking" or "Delivery Route" header shows
- [ ] Three location cards display
- [ ] No errors in console

---

### Test 17: Tracking Map - Locations (Active Order)
**Expected:** Show pharmacy, vehicle, and destination

Steps:
1. Select order with status OUT_FOR_DELIVERY
2. View TrackingMap locations

**Assertions:**
- [ ] 🏥 Pharmacy location shows "Start"
- [ ] 🚚 Delivery Vehicle shows "Current" (animated)
- [ ] 📍 Delivery Location shows "Destination"
- [ ] All coordinates display
- [ ] Vehicle location updates (every 3 seconds)
- [ ] Bouncing animation on vehicle

---

### Test 18: Tracking Map - Locations (Shipped Order)
**Expected:** Show pharmacy and destination only

Steps:
1. Select order with status SHIPPED
2. View TrackingMap locations

**Assertions:**
- [ ] 🏥 Pharmacy location shows
- [ ] 🚚 Delivery Vehicle does NOT show
- [ ] 📍 Delivery Location shows
- [ ] No live indicator badge
- [ ] Only 2 location cards visible

---

### Test 19: Tracking Map - Distance & ETA
**Expected:** Show realistic distance and ETA info

Steps:
1. View TrackingMap footer info

**Assertions:**
- [ ] Distance shows "2.3 km away"
- [ ] ETA shows (15 min for out-for-delivery, 45 min for shipped)
- [ ] Average speed shows "30 km/h"
- [ ] All values in correct format
- [ ] Info cards properly styled

---

### Test 20: Tracking Map - Driver Info (Out for Delivery)
**Expected:** Show driver name and vehicle for active delivery

Steps:
1. Select order with OUT_FOR_DELIVERY status
2. View TrackingMap footer

**Assertions:**
- [ ] Driver Name shows
- [ ] Vehicle Number shows (plate format)
- [ ] Both fields populated with realistic data
- [ ] Labels display clearly

---

### Test 21: Navigation - Back Button
**Expected:** Back button returns to Dashboard

Steps:
1. Click "Back to Dashboard" button
2. Observe navigation

**Assertions:**
- [ ] Page navigates to Dashboard
- [ ] URL changes to `/dashboard`
- [ ] Dashboard page loads
- [ ] Previous selections don't persist

---

### Test 22: Navigation - Help Buttons
**Expected:** Help buttons are clickable (stubs for now)

Steps:
1. Click "Contact Support" button
2. Try other help buttons

**Assertions:**
- [ ] Buttons are clickable
- [ ] No console errors
- [ ] Ready for future modal implementation

---

### Test 23: Mobile Responsiveness (375px)
**Expected:** All components fit and display correctly on mobile

Steps:
1. Open DevTools
2. Set device to iPhone SE (375px)
3. Navigate to Track Order page
4. Scroll through all content

**Assertions:**
- [ ] No horizontal scrolling needed
- [ ] All text readable (font size OK)
- [ ] Touch targets are 44px+
- [ ] Buttons stack vertically
- [ ] Images/icons scale correctly
- [ ] No text overflow
- [ ] Dropdown works on mobile

---

### Test 24: Mobile Responsiveness (768px)
**Expected:** Tablet layout displays correctly

Steps:
1. Set device to iPad (768px)
2. View Track Order page
3. Check component layout

**Assertions:**
- [ ] 2-column layout works
- [ ] Components properly spaced
- [ ] All content visible without scrolling
- [ ] Touch interaction smooth

---

### Test 25: Desktop Responsiveness (1920px)
**Expected:** Full desktop layout with 3 columns

Steps:
1. Set device to Desktop (1920px)
2. View Track Order page

**Assertions:**
- [ ] 3-column layout (Timeline, Info, Map visible side-by-side on desktop)
- [ ] Proper spacing and padding
- [ ] Maximum width constraints applied
- [ ] All components visible without scrolling

---

### Test 26: URL Parameters - Order ID
**Expected:** Load specific order from URL parameter

Steps:
1. Manually type URL: `http://localhost:5173/track-order?orderId=ORD-001`
2. Observe page load

**Assertions:**
- [ ] Page loads and selects ORD-001
- [ ] Components render with ORD-001 data
- [ ] Dropdown shows ORD-001 as selected
- [ ] All components match order status

---

### Test 27: Error Handling - Empty Order List
**Expected:** Show message when no orders available

Steps:
1. (Simulate by removing orders from Redux - for dev only)
2. Navigate to Track Order

**Assertions:**
- [ ] "No orders available to track" message shows
- [ ] "View Order History" link displays
- [ ] Page doesn't break
- [ ] Navigation still works

---

### Test 28: Authentication Check
**Expected:** Redirect to login if not authenticated

Steps:
1. Logout from any page
2. Type `/track-order` in URL
3. Observe behavior

**Assertions:**
- [ ] Redirects to `/login`
- [ ] Cannot access tracking page without auth
- [ ] Auth check works on page load

---

### Test 29: Loading State
**Expected:** Show loading spinner when selecting order

Steps:
1. Click dropdown
2. Select an order
3. Observe loading state

**Assertions:**
- [ ] Loading spinner appears
- [ ] Components don't update immediately
- [ ] After 500ms, components update
- [ ] Spinner disappears
- [ ] No janky UI transitions

---

### Test 30: Console Checks
**Expected:** No errors or warnings in console

Steps:
1. Open DevTools Console
2. Use all features (select orders, search, filter, etc.)
3. Check console throughout

**Assertions:**
- [ ] No red error messages
- [ ] No warnings
- [ ] No deprecation notices
- [ ] Redux actions dispatch correctly

---

## Browser Testing

### Chrome/Edge
- [ ] Test all scenarios
- [ ] Check responsive design
- [ ] Verify animations smooth

### Firefox
- [ ] Test all scenarios
- [ ] Check CSS rendering
- [ ] Verify all interactive elements

### Safari
- [ ] Test all scenarios
- [ ] Check mobile Safari
- [ ] Verify touch interactions

### Mobile Browsers
- [ ] Test on actual iPhone
- [ ] Test on actual Android
- [ ] Verify mobile UX

---

## Performance Testing

### Load Time
- [ ] Page loads in < 2 seconds
- [ ] Components render smoothly
- [ ] No jank or stuttering

### Live Updates
- [ ] Vehicle location updates every 3 seconds
- [ ] No lag or delays
- [ ] Smooth animation transitions

### Memory
- [ ] No memory leaks when selecting orders
- [ ] Intervals properly cleaned up
- [ ] DevTools shows stable memory usage

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all elements
- [ ] Dropdown accessible via keyboard
- [ ] Enter activates buttons
- [ ] Escape closes dropdown

### Screen Reader
- [ ] All buttons labeled properly
- [ ] Status information announced
- [ ] Form labels associated
- [ ] ARIA attributes used correctly

### Color Contrast
- [ ] Status colors meet WCAG AA
- [ ] Text readable on all backgrounds
- [ ] Icons have text equivalents

---

## Regression Testing

### After Changes
- [ ] All previous scenarios still pass
- [ ] No broken functionality
- [ ] No new console errors
- [ ] Performance maintained

---

## Summary Checklist

- [ ] Test 1-30: All passed
- [ ] Browser testing: All passed
- [ ] Performance testing: All passed
- [ ] Accessibility testing: All passed
- [ ] Regression testing: All passed
- [ ] Mobile testing: All passed
- [ ] Console: No errors
- [ ] Ready for production: YES

---

**Total Test Cases:** 30  
**Estimated Time:** 2-3 hours  
**Status:** Ready to execute ✅

**Test Results:**
- ✅ PASSED: 0/30
- ⏳ IN PROGRESS: 0/30
- ❌ FAILED: 0/30

---

*Last Updated: March 18, 2026*  
*Feature: Track Order*  
*Version: 1.0*
