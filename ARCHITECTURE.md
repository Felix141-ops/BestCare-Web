# BestCare Hospital - Enterprise System Architecture

**Version**: 1.0  
**Date**: May 26, 2026  
**Status**: Phase 1 - Design & Planning  
**Author**: Senior Architect

---

## Executive Summary

BestCare Hospital website is a comprehensive hospital information and patient management system built with modern, scalable, and secure technologies. The architecture follows clean principles with clear separation of concerns, enabling maintainability, testability, and horizontal scaling.

## Architecture Principles

1. **Separation of Concerns**: Clear separation between presentation, business logic, and data layers
2. **Modularity**: Self-contained modules with well-defined interfaces
3. **Scalability**: Designed to scale horizontally and vertically
4. **Security**: Security-first approach with encryption, authentication, and authorization
5. **Performance**: Optimized for speed with caching, pagination, and lazy loading
6. **Maintainability**: Clean code, comprehensive documentation, and test coverage
7. **Extensibility**: Easy to add new features without affecting existing functionality
8. **DDD (Domain-Driven Design)**: Business logic organized around domains

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ with TypeScript
- **UI Library**: React 18+
- **Styling**: Tailwind CSS v3
- **Components**: ShadCN UI
- **Animation**: Framer Motion
- **State Management**: React Context API + Hooks
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Charts**: Recharts or Chart.js
- **Authentication**: JWT via Cookies/Local Storage

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **ORM**: SQLAlchemy 2.0
- **Database**: PostgreSQL 14+
- **Authentication**: JWT (Python-Jose)
- **Validation**: Pydantic v2
- **Migrations**: Alembic
- **API Documentation**: OpenAPI/Swagger
- **Async**: AsyncIO + ASGI (Uvicorn)
- **PDF Generation**: WeasyPrint
- **Task Queue**: Celery (optional for background tasks)

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL 14+ with pgAdmin
- **API Gateway**: Nginx (reverse proxy)
- **Environment Management**: Environment variables via .env files
- **Version Control**: Git
- **CI/CD**: GitHub Actions (optional)

## Directory Structure

```
bestcareweb/
├── frontend/                    # Next.js frontend application
│   ├── app/                    # App router pages and layouts
│   │   ├── (marketing)/        # Public pages (home, about, etc)
│   │   ├── (auth)/             # Authentication pages (login, register)
│   │   ├── dashboard/          # Protected dashboard pages
│   │   ├── api/                # API routes
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── common/             # Navigation, footer, layout components
│   │   ├── sections/           # Page sections (hero, testimonials, etc)
│   │   ├── forms/              # Form components
│   │   └── ui/                 # ShadCN UI wrapper components
│   ├── lib/                    # Utility functions
│   ├── hooks/                  # Custom React hooks
│   ├── context/                # React context providers
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Helper functions
│   ├── styles/                 # Global styles
│   ├── public/                 # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── next.config.js
│
├── backend/                     # FastAPI backend application
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/   # API route handlers
│   │   │       ├── dependencies.py
│   │   │       └── router.py
│   │   ├── models/              # SQLAlchemy models
│   │   ├── schemas/             # Pydantic request/response models
│   │   ├── core/
│   │   │   ├── config.py        # Configuration management
│   │   │   ├── security.py      # JWT, hashing, RBAC
│   │   │   └── constants.py     # Application constants
│   │   ├── services/            # Business logic layer
│   │   │   ├── reporting/       # PDF/Report generation
│   │   │   └── analytics/       # Analytics queries
│   │   ├── repositories/        # Data access layer
│   │   ├── utils/
│   │   │   ├── logger.py
│   │   │   ├── email.py
│   │   │   └── exceptions.py
│   │   ├── main.py              # FastAPI app initialization
│   │   └── database.py          # Database connection
│   ├── alembic/                 # Database migrations
│   │   ├── versions/
│   │   ├── env.py
│   │   └── script.py.mako
│   ├── tests/                   # Unit and integration tests
│   ├── requirements.txt
│   ├── .env.example
│   └── alembic.ini
│
├── infrastructure/              # Infrastructure and deployment
│   ├── docker/
│   │   ├── Dockerfile.frontend
│   │   ├── Dockerfile.backend
│   │   └── docker-compose.yml
│   ├── k8s/                     # Kubernetes manifests (future)
│   └── nginx/
│       └── nginx.conf
│
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_DESIGN.md
│   ├── DEPLOYMENT.md
│   └── USER_GUIDE.md
│
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

## System Design Layers

### 1. Presentation Layer (Frontend)
- Next.js pages and components
- Responsive UI with Tailwind CSS
- Real-time data visualization
- Form validation and error handling
- Authentication state management

### 2. API Gateway Layer (Backend)
- Nginx reverse proxy
- Request/response logging
- Rate limiting
- CORS handling
- SSL/TLS termination

### 3. Application Layer (FastAPI)
- REST API endpoints
- Request validation (Pydantic)
- Authentication middleware
- Authorization middleware (RBAC)
- Error handling and logging

### 4. Business Logic Layer (Services)
- Appointment scheduling
- Patient management
- Doctor management
- Department management
- Report generation
- Analytics computation
- Email notifications
- Payment processing

### 5. Data Access Layer (Repositories)
- Database queries
- Query optimization
- Caching strategies
- Connection pooling

### 6. Data Layer (PostgreSQL)
- Normalized schemas
- Indexes for performance
- Foreign key relationships
- Audit logging

## Security Architecture

### Authentication & Authorization
```
User Login
    ↓
FastAPI Authentication Endpoint
    ↓
Validate Credentials (bcrypt hash comparison)
    ↓
Generate JWT Token (with role claims)
    ↓
Send Token to Frontend (HTTP-only cookie or localStorage)
    ↓
Frontend includes token in Authorization header
    ↓
Backend validates JWT signature and expiration
    ↓
RBAC middleware checks user role for endpoint access
    ↓
Allow/Deny request
```

### Security Features
1. **JWT Authentication**: Stateless authentication with expiring tokens
2. **Role-Based Access Control**: Fine-grained permissions (Admin, Doctor, Patient, Reception)
3. **Password Security**: bcrypt hashing with salt
4. **HTTPS**: TLS encryption in transit
5. **CORS**: Controlled cross-origin requests
6. **Rate Limiting**: Prevent brute force and DDoS
7. **SQL Injection Prevention**: Parameterized queries (SQLAlchemy ORM)
8. **CSRF Protection**: CSRF token for state-changing operations
9. **Input Validation**: Pydantic schemas validate all inputs
10. **Audit Logging**: Track all sensitive operations

## API Design

### RESTful Principles
- Resource-oriented endpoints
- Standard HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Proper HTTP status codes
- JSON request/response format
- Pagination for list endpoints
- Filtering and sorting support

### API Versioning
- v1 endpoints at `/api/v1/`
- Backward compatibility maintained
- Smooth migration path to v2 when needed

### Error Handling
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

## Performance Optimization

### Frontend
1. **Code Splitting**: Automatic with Next.js
2. **Lazy Loading**: Components and images loaded on demand
3. **Image Optimization**: Next.js Image component
4. **CSS-in-JS**: Tailwind CSS for minimal bundle
5. **Caching**: Browser caching, service workers
6. **SSR/SSG**: Server-side rendering for SEO

### Backend
1. **Database Indexing**: Strategic indexes on frequently queried columns
2. **Query Optimization**: Efficient joins and aggregations
3. **Connection Pooling**: Reuse database connections
4. **Caching**: Redis cache for frequently accessed data (future)
5. **Pagination**: Limit result sets
6. **Async Operations**: Non-blocking I/O with asyncio
7. **Compression**: gzip compression for responses

## Deployment Architecture

### Development Environment
```
Developer Machine
├── Frontend (npm run dev)
├── Backend (uvicorn)
└── PostgreSQL (Docker)
```

### Production Environment
```
AWS/GCP/Azure Cloud
├── Docker Registry (Image storage)
├── Kubernetes Cluster
│   ├── Frontend Pod (Next.js)
│   ├── Backend Pod (FastAPI)
│   ├── PostgreSQL Pod
│   └── Nginx Pod
├── Load Balancer
├── SSL Certificate (Let's Encrypt)
└── CDN (CloudFront/Cloudflare)
```

## Data Flow

### Appointment Booking Flow
```
1. Patient selects department → Frontend API call
2. Backend fetches available doctors
3. Patient selects doctor → Frontend displays time slots
4. Backend fetches available slots (checks appointments table)
5. Patient selects slot and enters details
6. Frontend validates form
7. Backend creates appointment record
8. Backend sends confirmation email
9. Frontend shows success message
10. Appointment added to patient dashboard
```

### Lab Results Download Flow
```
1. Patient requests lab results → Authentication check
2. Backend queries lab_results table
3. Backend fetches patient details from patients table
4. Backend renders HTML template with lab data
5. WeasyPrint converts HTML to PDF
6. PDF returned to frontend
7. Frontend triggers download
```

## Scalability Considerations

1. **Horizontal Scaling**: Multiple FastAPI instances behind load balancer
2. **Database Scaling**: Read replicas for analytics queries
3. **Caching**: Redis/Memcached for frequently accessed data
4. **CDN**: CloudFlare/CloudFront for static assets
5. **Message Queue**: Celery for background tasks
6. **Monitoring**: ELK Stack or DataDog for logs and metrics

## Monitoring & Logging

- Application logs: Structured logging with timestamp, level, and context
- API request logs: Method, path, status code, response time
- Error tracking: Sentry for exception monitoring
- Performance metrics: CPU, memory, database connection pools
- User analytics: Page views, user sessions, feature usage

## Phase-wise Implementation

### Phase 1: Foundation (Current)
- Architecture and design system
- Database schema
- API design
- Folder structure

### Phase 2: Frontend Pages
- Homepage
- About page
- Departments page
- Find a doctor page
- Services page
- Contact page
- Blog pages
- FAQ page

### Phase 3: Backend APIs
- Authentication endpoints
- Doctor management
- Department management
- Basic appointment endpoints
- Patient endpoints

### Phase 4: Authentication & Authorization
- JWT implementation
- RBAC system
- Login/Register functionality
- Session management

### Phase 5: Patient Portal
- Dashboard
- Appointment booking
- Appointment management
- Medical history
- Lab results viewing
- Billing history

### Phase 6: Reporting & PDF
- Lab report generation
- Appointment slips
- Patient invoices
- Medical summaries
- PDF download

### Phase 7: Admin Dashboard
- Admin analytics
- Management interfaces
- Report generation
- User management

### Phase 8: Deployment
- Docker setup
- Kubernetes configuration
- CI/CD pipeline
- Monitoring setup
- Production checklist

## Technology Justification

1. **Next.js**: Industry standard for React applications, SSR, API routes, built-in optimization
2. **FastAPI**: Modern, fast, automatic API documentation, type validation
3. **PostgreSQL**: Robust RDBMS, ACID compliance, great for transactional data
4. **SQLAlchemy**: Industry standard ORM, type safe, database agnostic
5. **Tailwind CSS**: Utility-first CSS, responsive design, minimal CSS
6. **ShadCN UI**: Accessible, customizable, composable components
7. **Docker**: Easy deployment, environment consistency, scaling

## Conclusion

This architecture provides a solid foundation for building a scalable, secure, and maintainable hospital management system. The separation of concerns, modular design, and modern technology stack ensure that the system can grow with the hospital's needs while maintaining code quality and security standards.
