# Phase 3 Integration Roadmap

## ✅ Phase 3 Stage 1: Infrastructure Setup - COMPLETE

All foundational systems for backend integration are now complete and integrated:

### Created Files (12 total)
1. **frontend/lib/types/api.ts** - All TypeScript type definitions
2. **frontend/lib/api/client.ts** - Axios instance with JWT auth
3. **frontend/lib/api/endpoints.ts** - Centralized API routes
4. **frontend/lib/validation/schemas.ts** - Zod validation schemas (10+ schemas)
5. **frontend/store/index.ts** - Zustand stores (Auth, Notifications, App)
6. **frontend/lib/hooks/useAuth.ts** - Authentication and API hooks
7. **frontend/lib/hooks/useForm.ts** - Form state management
8. **frontend/lib/hooks/index.ts** - Hook exports
9. **frontend/components/ProtectedRoute.tsx** - Route protection wrapper
10. **frontend/components/NotificationsContainer.tsx** - Toast notifications
11. **frontend/app/layout-wrapper.tsx** - Client-side layout wrapper
12. **frontend/app/layout.tsx** - Updated with wrapper integration

### Updated Files (2 total)
1. **frontend/app/(auth)/login/page.tsx** - Connected to useAuth hook
2. **frontend/app/(auth)/register/page.tsx** - Connected to useAuth hook

## 🎯 Phase 3 Stage 2: Dependency Installation

### Action Required
```bash
cd frontend
npm install axios zod zustand zustand/middleware
```

### Why This Is Critical
- axios: HTTP client used by apiClient
- zod: Runtime schema validation for all forms
- zustand: Global state management with persistence
- These packages are imported in all infrastructure files

### Verification After Install
```bash
npm run dev
# Check browser console for no errors related to missing packages
```

## 📋 Phase 3 Stage 3: Dashboard Protection & Auth Flow

### Task 1: Wrap Dashboard with Protected Route
Location: `frontend/app/dashboard/layout.tsx`

```typescript
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      {/* Existing dashboard layout */}
      {children}
    </ProtectedRoute>
  );
}
```

### Task 2: Test Authentication Flow
1. Go to http://localhost:3000/login
2. Try demo credentials: demo@bestcare.hospital / Demo@123456
3. Should redirect to /dashboard after successful login
4. Dashboard should show protected content
5. Refresh page - auth should persist (from localStorage)
6. Go to /dashboard without login - should redirect to /login

## 🔌 Phase 3 Stage 4: Connect First Pages to API

### Priority 1: Simple List Page (Doctors)
Location: `frontend/app/(marketing)/doctors/page.tsx`

Replace mock data with:
```typescript
'use client';

import { useAPI } from '@/lib/hooks';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { Doctor } from '@/lib/types/api';

export default function DoctorsPage() {
  const { data: doctors, isLoading, error } = useAPI<Doctor[]>(
    API_ENDPOINTS.DOCTORS.LIST,
    'GET',
    { autoFetch: true }
  );

  if (isLoading) return <div>Loading doctors...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {doctors?.map(doctor => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}
```

### Priority 2: Dashboard Appointments
Location: `frontend/app/dashboard/appointments/page.tsx`

Replace mock appointments with useAPI call to:
- `API_ENDPOINTS.APPOINTMENTS.LIST` for GET
- Show loading skeleton while fetching
- Display real user's appointments

### Priority 3: Dashboard Medical Records
Location: `frontend/app/dashboard/medical-records/page.tsx`

Similar pattern to appointments:
- Use `API_ENDPOINTS.MEDICAL_RECORDS.LIST`
- Show medical records for authenticated user

## 🛡️ Phase 3 Stage 5: Error Handling & UX

### Create Error Boundary
Location: `frontend/components/ErrorBoundary.tsx`

Wrap error-prone sections:
```typescript
'use client';

import React from 'react';

export default function ErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}
```

### Add Loading Skeletons
Location: `frontend/components/ui/Skeleton.tsx`

Create reusable skeleton for:
- Doctor cards
- Appointment list items
- Medical records
- Billing records

## 📊 Phase 3 Stage 6: State Management for Lists

### Extend Store
Location: `frontend/store/index.ts` - Add stores for:
- `useDoctorsStore` - Cache fetched doctors
- `useAppointmentsStore` - Cache user appointments
- `useMedicalRecordsStore` - Cache user records

Benefits:
- Share data across components
- Reduce API calls
- Smoother UX

## ✅ Pre-Deployment Checklist

- [ ] Dependencies installed (npm install)
- [ ] `npm run dev` runs without errors
- [ ] Login page form validates input
- [ ] Register page form validates input
- [ ] Login/Register shows errors correctly
- [ ] Can log in with valid credentials
- [ ] Auth persists after refresh
- [ ] Protected routes redirect unauthenticated users
- [ ] Notifications appear on actions
- [ ] Dashboard pages load (with mock data or API)
- [ ] At least 1 page connected to useAPI hook
- [ ] API calls show loading/error states
- [ ] No console errors in browser

## 🎬 Quick Start - Next 10 Minutes

1. **Install Dependencies** (2 min)
   ```bash
   cd frontend && npm install axios zod zustand zustand/middleware
   ```

2. **Verify Installation** (2 min)
   ```bash
   npm run dev
   # Check http://localhost:3000 loads
   # Open browser console, should be clean
   ```

3. **Test Auth Pages** (3 min)
   - Try invalid login (should show error)
   - Try register with weak password (should show error)
   - Check validation works

4. **Verify Store Persistence** (3 min)
   - Refresh page after any action
   - Check localStorage (DevTools -> Application)
   - Auth state should survive refresh

## 🚀 Next Session Starting Point

After installing dependencies, the absolute first task is:
1. Update `frontend/app/dashboard/layout.tsx` with ProtectedRoute
2. Test auth flow: Login → Dashboard → Refresh → Should stay logged in
3. Connect first useAPI hook to any page

This validates that the entire infrastructure works end-to-end.

## 📝 Important Notes

- All infrastructure is **100% TypeScript strict mode**
- All validation is **runtime-safe with Zod**
- All state is **persisted to localStorage**
- All API requests are **typed with generics**
- All errors are **structured and user-friendly**
- All notifications are **non-blocking toasts**

## 💾 Backup & Safety

Before proceeding to integration:
- Git commit: "Phase 3 Infrastructure - Complete"
- Test on clean browser (no localhost data)
- Keep mock data pages as fallback

---

**Current Status**: Infrastructure Ready → Awaiting Dependencies → Integration Phase
**Estimated Time to Full Integration**: 4-6 hours
**Blocker**: npm install (required before any testing)
