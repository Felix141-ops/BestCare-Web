# BestCare Hospital - Premium Healthcare Platform

A production-ready, enterprise-grade hospital management and patient engagement platform built with modern technologies.

## 🏥 About BestCare Hospital

BestCare Hospital is a comprehensive healthcare solution that bridges the gap between patients and medical professionals through an intuitive digital platform. The system improves patient experience, streamlines administrative operations, and provides powerful analytics for hospital management.

## ✨ Key Features

### 👥 For Patients
- **Online Appointment Booking**: Schedule consultations with doctors
- **Patient Portal**: Access medical records, lab results, and prescriptions
- **Lab Results**: Download and view test results in PDF format
- **Billing & Payments**: View invoices and make payments online
- **Medical History**: Complete electronic health records
- **Notifications**: Appointment reminders and health updates

### 👨‍⚕️ For Doctors
- **Appointment Management**: View and manage patient appointments
- **Patient Records**: Access complete patient medical history
- **Prescription Management**: Issue and track prescriptions
- **Lab Orders**: Request lab tests for patients
- **Queue Management**: Manage patient queue efficiently

### 🏢 For Administration
- **Dashboard Analytics**: Revenue, patient trends, performance metrics
- **Department Management**: Organize and manage departments
- **Staff Management**: Manage doctors, nurses, and staff
- **Billing Management**: Invoice tracking and payment processing
- **Reports**: Generate operational and financial reports
- **Audit Logs**: Track all system activities for compliance

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **UI**: React 18, TailwindCSS, ShadCN UI
- **Animation**: Framer Motion
- **State Management**: Zustand + React Context
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios with SWR

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL 14+
- **ORM**: SQLAlchemy 2.0
- **Authentication**: JWT with python-jose
- **Validation**: Pydantic v2
- **Migrations**: Alembic
- **PDF Generation**: WeasyPrint
- **Task Queue**: Celery (optional)

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Kubernetes ready (k8s manifests included)
- **API Gateway**: Nginx
- **Database**: PostgreSQL with pgAdmin
- **Caching**: Redis
- **CI/CD**: GitHub Actions ready

## 📁 Project Structure

```
bestcareweb/
├── frontend/                  # Next.js application
│   ├── app/                  # App router pages
│   ├── components/           # React components
│   ├── lib/                  # Utilities
│   ├── types/                # TypeScript types
│   ├── hooks/                # Custom hooks
│   └── styles/               # Global styles
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── api/             # API endpoints
│   │   ├── models/          # SQLAlchemy models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # Data access
│   │   └── core/            # Configuration
│   ├── alembic/             # Database migrations
│   ├── tests/               # Unit & integration tests
│   └── main.py              # FastAPI entry point
├── infrastructure/          # Infrastructure & deployment
│   ├── docker/             # Dockerfiles
│   └── k8s/                # Kubernetes manifests
├── docs/                   # Documentation
└── docker-compose.yml      # Local development setup
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### Option 1: Docker Compose (Recommended)

```bash
# Clone repository
git clone https://github.com/yourorg/bestcareweb.git
cd bestcareweb

# Start services
docker-compose up -d

# Services will be available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
# pgAdmin: http://localhost:5050
```

### Option 2: Local Development

#### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env

# Run migrations (when schema is ready)
# alembic upgrade head

# Start server
uvicorn main:app --reload
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development server
npm run dev
```

## 📚 Documentation

- [Architecture](./ARCHITECTURE.md) - System design and architecture decisions
- [Database Schema](./DATABASE_SCHEMA.md) - Database design and relationships
- [API Design](./API_DESIGN.md) - RESTful API endpoints and specifications
- [Design System](./DESIGN_SYSTEM.md) - UI/UX guidelines and component library
- [Deployment Guide](./docs/DEPLOYMENT.md) - Production deployment instructions
- [Development Guide](./docs/DEVELOPMENT.md) - Development workflow and best practices

## 🔐 Security Features

- **JWT Authentication**: Stateless authentication with refresh tokens
- **RBAC**: Role-based access control (Admin, Doctor, Patient, Staff)
- **Password Hashing**: bcrypt for secure password storage
- **CSRF Protection**: Token-based CSRF prevention
- **SQL Injection Prevention**: Parameterized queries via ORM
- **XSS Prevention**: React auto-escaping + CSP headers
- **Rate Limiting**: Prevent abuse and DDoS attacks
- **Audit Logging**: Track all system activities
- **HTTPS Ready**: TLS/SSL support
- **HIPAA Compliance Ready**: Patient data privacy and security

## 📊 Database Schema

The database includes comprehensive tables for:
- Users & Authentication
- Patients & Medical Records
- Doctors & Departments
- Appointments & Scheduling
- Lab Tests & Results
- Prescriptions & Medications
- Billing & Payments
- Notifications
- Audit Logs

[See detailed schema](./DATABASE_SCHEMA.md)

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest                    # Run all tests
pytest --cov            # Run with coverage
pytest -v               # Verbose output
```

### Frontend Tests

```bash
cd frontend
npm test                # Run tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

## 📈 Performance & Scaling

- **Lazy Loading**: Components and images loaded on demand
- **Code Splitting**: Automatic page-level code splitting
- **Caching**: Redis for session and data caching
- **Database Indexing**: Optimized queries and indexes
- **API Pagination**: Efficient data retrieval
- **Horizontal Scaling**: Stateless API servers
- **Load Balancing**: Nginx reverse proxy
- **CDN Ready**: Static assets on CDN

## 🌐 API Endpoints

All endpoints are documented in OpenAPI/Swagger format:

```
Swagger UI: http://localhost:8000/docs
ReDoc: http://localhost:8000/redoc
```

### Core Endpoints

- `POST /api/v1/auth/login` - User authentication
- `GET /api/v1/appointments` - List appointments
- `POST /api/v1/appointments` - Create appointment
- `GET /api/v1/doctors` - List doctors
- `GET /api/v1/lab-results` - Patient lab results
- `GET /api/v1/analytics/revenue` - Revenue analytics
- ...and many more

## 📧 Email Notifications

The system supports:
- Appointment confirmations
- Lab result notifications
- Prescription alerts
- Billing reminders
- Password reset emails

## 💳 Payment Integration

Ready for integration with:
- Stripe (Credit/Debit cards)
- M-Pesa (Mobile payments)
- Bank transfers

## 🚦 Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 500 | Server Error |

## 🔄 Development Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Create Pull Request on GitHub

## 📝 Development Guidelines

- Follow PEP 8 (Python) and ESLint (JavaScript)
- Write meaningful commit messages
- Include tests for new features
- Update documentation
- Keep components small and focused
- Use type hints/types everywhere
- Add error handling
- Document complex logic

## 🐛 Bug Reports & Features

Found a bug or have a feature request?
- [Create an issue](https://github.com/yourorg/bestcareweb/issues)
- Include detailed description
- Add reproduction steps
- Attach screenshots if applicable

## 📄 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) file for details.

## 👥 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📞 Support

- **Email**: support@bestcare.hospital
- **Phone**: +254-XXX-XXX-XXX
- **Website**: https://bestcare.hospital
- **Slack**: [Join our community](https://bestcare-slack.com)

## 🙏 Acknowledgments

Built with modern technologies and best practices by the BestCare development team.

---

**Made with ❤️ for better healthcare**

Last Updated: May 26, 2026 | Version: 1.0.0
