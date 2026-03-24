# PUBLIC APP - FRONTEND

**Pharmaceutical Wholesale Order Management System**
**Pharmacist Portal - Customer Facing Application**

---

## 📁 Project Structure

```
/frontend
├── src/
│   ├── components/        ← React components (buttons, forms, tables, etc)
│   ├── pages/            ← Page components (Login, Dashboard, Orders, etc)
│   ├── services/         ← API services (auth, orders, products)
│   ├── redux/            ← Redux store, slices (auth, order, product, ui)
│   ├── hooks/            ← Custom React hooks
│   ├── utils/            ← Utility functions & helpers
│   ├── config/           ← Configuration files
│   ├── styles/           ← CSS & Tailwind styles
│   ├── App.jsx           ← Root component
│   └── main.jsx          ← Entry point
├── public/               ← Static assets
├── index.html            ← HTML template
├── vite.config.js        ← Vite configuration
├── tailwind.config.js    ← Tailwind CSS configuration
├── package.json          ← Dependencies
└── .env.example          ← Environment variables template
```

---

## 🚀 Getting Started

### Installation

```bash
# Navigate to frontend directory
cd /home/ubuntu/ivr-pharma/code/public-app/frontend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env
```

### Development Server

```bash
# Start Vite dev server
npm run dev

# Server will be at http://localhost:5173
```

### Build for Production

```bash
# Create optimized build
npm run build

# Preview the production build
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format
```

---

## 🔐 Authentication

### Login Credentials (Demo)
```
User ID: PHARM001
PIN: 123456
```

### Features
- PIN-based authentication
- JWT token storage in localStorage
- Automatic session restoration
- Protected routes with role-based access

---

## 📦 Dependencies

### Core
- **React 18.2.0** - UI library
- **Vite 5.4.21** - Build tool with HMR
- **React Router v6** - Client-side routing

### State Management
- **Redux 4.2.1** - State container
- **@reduxjs/toolkit 1.9.7** - Redux utilities
- **react-redux 8.1.3** - React Redux bindings

### HTTP Client
- **Axios 1.6.2** - HTTP requests

### Styling
- **Tailwind CSS 3.3.6** - Utility-first CSS
- **PostCSS 8.4.32** - CSS transformation
- **Autoprefixer** - Browser prefixes

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 🎯 Features

### Authentication
- ✅ Login with User ID & PIN
- ✅ JWT token management
- ✅ Session persistence
- ✅ Protected routes

### Dashboard
- ✅ KPI cards (Total, Pending, Completed orders)
- ✅ Quick action buttons
- ✅ Welcome message

### Coming Soon
- Order placement (3-step form)
- Order history with filters
- Order tracking
- Order details view
- Account management

---

## 🔄 Data Flow

```
┌──────────────────────┐
│  React Components    │
└──────────┬───────────┘
           │ dispatch
           ▼
┌──────────────────────┐
│  Redux Store         │
│  (4 Slices)          │
└──────────┬───────────┘
           │ subscribe
           ▼
┌──────────────────────┐
│  API Services        │
│  (Axios)             │
└──────────┬───────────┘
           │ HTTP
           ▼
┌──────────────────────┐
│  Backend API         │
│  (Express.js)        │
└──────────────────────┘
```

---

## 📝 Redux Slices

### authSlice
- Manages user authentication
- Handles login/logout
- Stores JWT token and user info

### orderSlice
- Manages orders state
- Handles CRUD operations
- Pagination and filtering

### productSlice
- Manages products state
- Category filtering
- Product search

### uiSlice
- Manages UI state
- Notifications
- Modal state
- Theme settings

---

## 🧪 Testing

```bash
# Run tests (to be configured)
npm run test

# Test coverage
npm run test:coverage
```

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel** - Recommended for React
- **Netlify** - Easy deployment
- **AWS S3 + CloudFront** - Static hosting
- **Heroku** - Full-stack hosting

---

## 📚 Environment Variables

Create `.env` file:
```
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=30000
VITE_APP_NAME=Pharma Wholesale - Public Portal
VITE_ENVIRONMENT=development
VITE_ENABLE_MOCK_API=true
VITE_ENABLE_DEBUG=true
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- --port 5174
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CSS Not Loading
```bash
# Rebuild Tailwind CSS
npm run dev
```

---

## 📖 Reference Documentation

- `FRONTEND_ORDER_PLACEMENT_IMPLEMENTATION_PLAN.md` - Full implementation plan
- `PHARMACIST_PORTAL_DESIGN.md` - UI/UX specifications
- `FRONTEND_SYSTEM_DESIGN.md` - System architecture
- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- Tailwind Docs: https://tailwindcss.com
- Redux Docs: https://redux.js.org

---

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review Redux store state
3. Check browser console for errors
4. Verify API endpoint configuration

---

## ✅ Checklist

- [x] Project initialized with npm
- [x] Vite configured
- [x] React installed
- [x] Redux store setup
- [x] Tailwind CSS configured
- [x] Basic routing configured
- [x] Login page created
- [x] Dashboard page created
- [ ] API services created
- [ ] Custom hooks created
- [ ] UI components library created
- [ ] Place Order feature implemented
- [ ] Order History implemented
- [ ] Order tracking implemented
- [ ] Integration tests
- [ ] Production build & deployment

---

**Status:** ✅ Setup Complete - Ready for Development

**Next Steps:**
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Open browser: http://localhost:5173
4. Login with PHARM001 / 123456
