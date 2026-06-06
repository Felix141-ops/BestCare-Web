# BestCare Hospital - RESTful API Design

**Version**: 1.0  
**API Version**: v1  
**Status**: Phase 1 Design  
**Framework**: FastAPI

---

## API Overview

The BestCare Hospital API is a RESTful API built with FastAPI, providing secure access to hospital operations including appointments, patient records, billing, and analytics. The API uses JWT authentication, role-based access control, and follows OpenAPI 3.0 specifications.

**Base URL**: `https://api.bestcare.hospital/api/v1`

---

## API Principles

1. **RESTful Design**: Resource-based endpoints with standard HTTP methods
2. **Consistent Responses**: Standardized JSON response format
3. **Error Handling**: Comprehensive error codes and messages
4. **API Versioning**: `/api/v1/` for backward compatibility
5. **Rate Limiting**: 1000 requests/hour per user
6. **Pagination**: All list endpoints support offset/limit
7. **Filtering**: Support for query-based filtering
8. **Sorting**: Configurable result sorting

---

## Core API Endpoints

### Authentication
```
POST   /auth/login                 # User login
POST   /auth/register              # Patient registration
POST   /auth/refresh               # Refresh token
GET    /users/me                   # Get current user profile
```

### Appointments
```
POST   /appointments               # Create appointment
GET    /appointments               # List appointments
GET    /appointments/:id           # Get appointment
PUT    /appointments/:id           # Update appointment
DELETE /appointments/:id           # Cancel appointment
GET    /appointments/available-slots  # Get available slots
```

### Doctors & Departments
```
GET    /doctors                    # List doctors
GET    /doctors/:id                # Get doctor profile
GET    /doctors/:id/schedule       # Get doctor schedule
GET    /departments                # List departments
GET    /departments/:id            # Get department details
```

### Patients & Medical Records
```
GET    /patients/:id               # Get patient profile
PUT    /patients/:id               # Update patient profile
GET    /patients/:id/medical-records  # Get medical records
GET    /patients/:id/appointments  # Get patient appointments
```

### Lab Results
```
GET    /lab-tests                  # List available lab tests
GET    /lab-results                # List lab results
GET    /lab-results/:id            # Get lab result
GET    /lab-results/:id/pdf        # Download lab result PDF
```

### Prescriptions
```
GET    /prescriptions              # List prescriptions
GET    /prescriptions/:id          # Get prescription
POST   /prescriptions              # Create prescription
```

### Billing & Payments
```
GET    /invoices                   # List invoices
GET    /invoices/:id               # Get invoice
POST   /payments                   # Process payment
GET    /payments/:id               # Get payment details
```

### Analytics & Reports
```
GET    /analytics/revenue          # Revenue analytics
GET    /analytics/appointments     # Appointment statistics
GET    /analytics/patients         # Patient demographics
GET    /reports/appointments       # Generate appointment report
```

---

## Response Format

### Success Response
```json
{
  "status": "success",
  "data": { },
  "message": "Operation completed successfully",
  "timestamp": "2026-05-26T10:30:45Z"
}
```

### Error Response
```json
{
  "status": "error",
  "error": {
    "code": "APPOINTMENT_CONFLICT",
    "message": "Selected time slot is not available"
  },
  "timestamp": "2026-05-26T10:30:45Z"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 500 | Server Error |

---

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <access_token>
```

---

## Rate Limiting

Default: 1000 requests/hour per user

Rate limit info in response headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1674320400
```

---

## Document Status
- **Version**: 1.0
- **Status**: Phase 1 Complete
- **Last Updated**: May 26, 2026
