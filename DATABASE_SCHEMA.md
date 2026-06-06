# BestCare Hospital - Database Schema Design

## Database Overview

PostgreSQL 14+ normalized relational database design optimized for:
- HIPAA compliance (patient privacy)
- Transactional integrity (appointments, billing)
- Reporting and analytics
- Audit trails
- Scalability

## Database Diagram

```
                ┌─────────────────────────────────────────────────────┐
                │           AUTH & SECURITY                           │
                └─────────────────────────────────────────────────────┘
                        │
    ┌───────────────────┼───────────────────┐
    │                   │                   │
┌─────────┐      ┌──────────────┐     ┌──────────────┐
│  users  │      │ access_logs  │     │ audit_logs   │
└─────────┘      └──────────────┘     └──────────────┘
    │
    │ role_id
    ├──────────────────────────────────────────────┐
    │                                              │
┌────────┐  ┌─────────────────────────────────────┴─────────────────┐
│ roles  │  │         HOSPITAL STRUCTURE                            │
└────────┘  └──────────────────────────────────────────────────────┘
    │              │                │
    │        ┌─────────────┐   ┌──────────────┐
    │        │ departments │   │  facilities  │
    │        └─────────────┘   └──────────────┘
    │              │
    │        ┌─────────────────┐
    │        │   specialties   │
    │        └─────────────────┘
    │
┌───────────────────────────────────────────────────────────────────┐
│              USERS: DOCTORS, PATIENTS, STAFF                      │
└───────────────────────────────────────────────────────────────────┘
    │
    ├─────────────────┬────────────────┬──────────────────┐
    │                 │                │                  │
┌─────────┐  ┌──────────────┐  ┌────────────┐  ┌───────────────┐
│ doctors │  │   patients   │  │   staff    │  │  permissions  │
└─────────┘  └──────────────┘  └────────────┘  └───────────────┘
    │              │
    │              ├──────────────────────┐
    │              │                      │
    │         ┌─────────────┐      ┌──────────────┐
    │         │  insurance  │      │  guarantors  │
    │         └─────────────┘      └──────────────┘
    │              │
    ├──────────────┼──────────────────────────────────┐
    │              │                                  │
┌──────────────┐  │            ┌────────────────────┴──────────────┐
│ qualifications│  │            │    CLINICAL DATA                 │
└──────────────┘  │            └─────────────────────────────────┘
                  │                    │
            ┌──────────────┐           ├─────────────────┬────────────────┐
            │ appointments │           │                 │                │
            └──────────────┘      ┌──────────┐    ┌──────────────┐  ┌──────────────┐
                 │                │  visits  │    │ medical_recs │  │   lab_tests  │
            ┌────┴────┐           └──────────┘    └──────────────┘  └──────────────┘
            │          │                │              │
      ┌─────────────┐  ┌──────────────┐ │              │
      │ appointment │  │ appointment  │ ├──────────────┼──────────────┐
      │ statuses    │  │ reminders    │ │              │              │
      └─────────────┘  └──────────────┘ │              │              │
                                   ┌────────────┐ ┌──────────────┐
                                   │ prescripts │ │ lab_results  │
                                   └────────────┘ └──────────────┘
                                        │
                                   ┌───────────┐
                                   │ medicines │
                                   └───────────┘

```

## Core Tables

### 1. User Management

#### `users` Table
Core user table for authentication and authorization.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id UUID NOT NULL REFERENCES roles(id),
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    UNIQUE (email)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_is_active ON users(is_active);
```

#### `roles` Table
Role definitions for RBAC.

```sql
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data
INSERT INTO roles (name, description) VALUES
('ADMIN', 'Hospital administrator with full access'),
('DOCTOR', 'Medical doctor'),
('PATIENT', 'Hospital patient'),
('RECEPTION', 'Reception staff'),
('NURSE', 'Nursing staff'),
('PHARMACIST', 'Pharmacy staff'),
('LAB_TECHNICIAN', 'Laboratory technician'),
('RADIOLOGIST', 'Radiology specialist');
```

#### `permissions` Table
Fine-grained permissions system.

```sql
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID NOT NULL REFERENCES roles(id),
    resource VARCHAR(100) NOT NULL,
    action VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (role_id, resource, action)
);

CREATE INDEX idx_permissions_role_id ON permissions(role_id);
```

---

### 2. Hospital Structure

#### `departments` Table
Hospital departments.

```sql
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    description TEXT,
    head_id UUID REFERENCES users(id),
    phone VARCHAR(20),
    email VARCHAR(255),
    opening_time TIME DEFAULT '08:00:00',
    closing_time TIME DEFAULT '17:00:00',
    is_active BOOLEAN DEFAULT true,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_departments_is_active ON departments(is_active);
```

#### `specialties` Table
Medical specialties.

```sql
CREATE TABLE specialties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    department_id UUID NOT NULL REFERENCES departments(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_specialties_department_id ON specialties(department_id);
```

#### `facilities` Table
Hospital facilities and equipment.

```sql
CREATE TABLE facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    description TEXT,
    department_id UUID REFERENCES departments(id),
    is_available BOOLEAN DEFAULT true,
    capacity INT,
    location VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_facilities_department_id ON facilities(department_id);
CREATE INDEX idx_facilities_is_available ON facilities(is_available);
```

---

### 3. Doctors & Staff

#### `doctors` Table
Doctor profile extended from users.

```sql
CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    specialty_id UUID NOT NULL REFERENCES specialties(id),
    license_number VARCHAR(50) UNIQUE NOT NULL,
    license_expiry DATE,
    bio TEXT,
    consultation_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
    availability_status VARCHAR(50) DEFAULT 'AVAILABLE',
    profile_image_url VARCHAR(500),
    years_experience INT,
    registration_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_doctors_user_id ON doctors(user_id);
CREATE INDEX idx_doctors_specialty_id ON doctors(specialty_id);
CREATE INDEX idx_doctors_license_number ON doctors(license_number);
```

#### `qualifications` Table
Doctor qualifications and certifications.

```sql
CREATE TABLE qualifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    qualification_type VARCHAR(100) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    year_obtained INT,
    certificate_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_qualifications_doctor_id ON qualifications(doctor_id);
```

#### `staff` Table
Hospital staff (nurses, technicians, etc.).

```sql
CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    department_id UUID REFERENCES departments(id),
    position VARCHAR(100),
    shift_timing VARCHAR(50),
    is_on_duty BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_staff_user_id ON staff(user_id);
CREATE INDEX idx_staff_department_id ON staff(department_id);
```

---

### 4. Patient Management

#### `patients` Table
Patient profiles.

```sql
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20),
    blood_group VARCHAR(5),
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    allergies TEXT,
    chronic_diseases TEXT,
    emergency_contact_name VARCHAR(150),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relationship VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    patient_registration_number VARCHAR(50) UNIQUE,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_patients_user_id ON patients(user_id);
CREATE INDEX idx_patients_date_of_birth ON patients(date_of_birth);
CREATE INDEX idx_patients_patient_registration_number ON patients(patient_registration_number);
```

#### `insurance` Table
Patient insurance information.

```sql
CREATE TABLE insurance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    provider VARCHAR(150) NOT NULL,
    policy_number VARCHAR(100) UNIQUE NOT NULL,
    policy_type VARCHAR(50),
    coverage_amount DECIMAL(12,2),
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_insurance_patient_id ON insurance(patient_id);
CREATE INDEX idx_insurance_is_active ON insurance(is_active);
```

#### `guarantors` Table
Patient guarantors/responsible parties.

```sql
CREATE TABLE guarantors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    relationship VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    id_type VARCHAR(50),
    id_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_guarantors_patient_id ON guarantors(patient_id);
```

---

### 5. Appointments

#### `appointments` Table
Appointment scheduling and tracking.

```sql
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES doctors(id),
    department_id UUID NOT NULL REFERENCES departments(id),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INT DEFAULT 30,
    reason_for_visit TEXT,
    notes TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'SCHEDULED',
    priority VARCHAR(20) DEFAULT 'NORMAL',
    reminder_sent BOOLEAN DEFAULT false,
    visited_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP,
    cancellation_reason TEXT,
    UNIQUE (doctor_id, appointment_date, appointment_time)
);

CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX idx_appointments_appointment_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
```

#### `appointment_statuses` Table
Appointment status tracking history.

```sql
CREATE TABLE appointment_statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    changed_by UUID NOT NULL REFERENCES users(id),
    reason TEXT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_appointment_statuses_appointment_id ON appointment_statuses(appointment_id);
```

#### `appointment_reminders` Table
Appointment reminder tracking.

```sql
CREATE TABLE appointment_reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    reminder_time TIMESTAMP NOT NULL,
    reminder_method VARCHAR(50),
    sent_at TIMESTAMP,
    is_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_appointment_reminders_appointment_id ON appointment_reminders(appointment_id);
```

---

### 6. Clinical Records

#### `visits` Table
Patient visit records.

```sql
CREATE TABLE visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID NOT NULL REFERENCES appointments(id),
    patient_id UUID NOT NULL REFERENCES patients(id),
    doctor_id UUID NOT NULL REFERENCES doctors(id),
    visit_date TIMESTAMP NOT NULL,
    chief_complaint TEXT,
    vitals_blood_pressure VARCHAR(20),
    vitals_heart_rate INT,
    vitals_temperature DECIMAL(5,2),
    vitals_respiratory_rate INT,
    diagnosis TEXT,
    treatment_plan TEXT,
    follow_up_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_visits_patient_id ON visits(patient_id);
CREATE INDEX idx_visits_doctor_id ON visits(doctor_id);
CREATE INDEX idx_visits_visit_date ON visits(visit_date);
```

#### `medical_records` Table
Comprehensive medical history.

```sql
CREATE TABLE medical_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    record_type VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    recorded_by UUID REFERENCES users(id),
    record_date DATE NOT NULL,
    is_confidential BOOLEAN DEFAULT false,
    file_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_medical_records_patient_id ON medical_records(patient_id);
CREATE INDEX idx_medical_records_record_date ON medical_records(record_date);
```

#### `prescriptions` Table
Patient prescriptions.

```sql
CREATE TABLE prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visit_id UUID NOT NULL REFERENCES visits(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES doctors(id),
    patient_id UUID NOT NULL REFERENCES patients(id),
    medicine_id UUID NOT NULL REFERENCES medicines(id),
    dosage VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    quantity INT,
    instructions TEXT,
    prescribed_date TIMESTAMP NOT NULL,
    is_filled BOOLEAN DEFAULT false,
    filled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_prescriptions_patient_id ON prescriptions(patient_id);
CREATE INDEX idx_prescriptions_is_filled ON prescriptions(is_filled);
```

#### `medicines` Table
Medicines/Drugs database.

```sql
CREATE TABLE medicines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    generic_name VARCHAR(200),
    strength VARCHAR(100),
    form VARCHAR(50),
    manufacturer VARCHAR(200),
    batch_number VARCHAR(100),
    expiry_date DATE,
    price DECIMAL(10,2),
    stock_quantity INT DEFAULT 0,
    reorder_level INT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_medicines_name ON medicines(name);
CREATE INDEX idx_medicines_is_active ON medicines(is_active);
```

---

### 7. Laboratory

#### `lab_tests` Table
Laboratory tests available.

```sql
CREATE TABLE lab_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price DECIMAL(10,2),
    turnaround_time_hours INT,
    sample_type VARCHAR(100),
    fasting_required BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lab_tests_code ON lab_tests(code);
CREATE INDEX idx_lab_tests_category ON lab_tests(category);
```

#### `lab_requests` Table
Lab test requests from doctors.

```sql
CREATE TABLE lab_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES doctors(id),
    visit_id UUID REFERENCES visits(id),
    lab_test_id UUID NOT NULL REFERENCES lab_tests(id),
    request_date TIMESTAMP NOT NULL,
    collection_date TIMESTAMP,
    collection_time TIME,
    priority VARCHAR(20) DEFAULT 'NORMAL',
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lab_requests_patient_id ON lab_requests(patient_id);
CREATE INDEX idx_lab_requests_status ON lab_requests(status);
```

#### `lab_results` Table
Laboratory test results.

```sql
CREATE TABLE lab_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_request_id UUID NOT NULL REFERENCES lab_requests(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id),
    test_id UUID NOT NULL REFERENCES lab_tests(id),
    result_value VARCHAR(255),
    unit VARCHAR(50),
    reference_range VARCHAR(100),
    is_abnormal BOOLEAN DEFAULT false,
    notes TEXT,
    result_date TIMESTAMP,
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMP,
    is_final BOOLEAN DEFAULT false,
    pdf_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lab_results_patient_id ON lab_results(patient_id);
CREATE INDEX idx_lab_results_lab_request_id ON lab_results(lab_request_id);
```

---

### 8. Radiology

#### `radiology_requests` Table
Imaging requests.

```sql
CREATE TABLE radiology_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES doctors(id),
    test_type VARCHAR(100) NOT NULL,
    body_part VARCHAR(150),
    clinical_indication TEXT,
    request_date TIMESTAMP NOT NULL,
    scheduled_date DATE,
    priority VARCHAR(20) DEFAULT 'NORMAL',
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_radiology_requests_patient_id ON radiology_requests(patient_id);
CREATE INDEX idx_radiology_requests_status ON radiology_requests(status);
```

#### `radiology_reports` Table
Imaging reports.

```sql
CREATE TABLE radiology_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    radiology_request_id UUID NOT NULL REFERENCES radiology_requests(id),
    radiologist_id UUID REFERENCES doctors(id),
    findings TEXT NOT NULL,
    impression TEXT,
    recommendations TEXT,
    images_count INT,
    report_date TIMESTAMP,
    pdf_url VARCHAR(500),
    is_final BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_radiology_reports_radiology_request_id ON radiology_reports(radiology_request_id);
```

---

### 9. Billing & Payments

#### `invoices` Table
Patient invoices.

```sql
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    appointment_id UUID REFERENCES appointments(id),
    visit_id UUID REFERENCES visits(id),
    subtotal DECIMAL(12,2) NOT NULL,
    discount DECIMAL(12,2) DEFAULT 0,
    tax DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    paid_amount DECIMAL(12,2) DEFAULT 0,
    balance_amount DECIMAL(12,2),
    payment_status VARCHAR(50) DEFAULT 'UNPAID',
    invoice_date DATE NOT NULL,
    due_date DATE,
    issued_by UUID REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_invoices_patient_id ON invoices(patient_id);
CREATE INDEX idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX idx_invoices_payment_status ON invoices(payment_status);
```

#### `invoice_items` Table
Detailed invoice line items.

```sql
CREATE TABLE invoice_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    item_type VARCHAR(50),
    item_id UUID,
    description VARCHAR(300),
    quantity INT DEFAULT 1,
    unit_price DECIMAL(10,2),
    total_price DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_invoice_items_invoice_id ON invoice_items(invoice_id);
```

#### `payments` Table
Payment transactions.

```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id),
    amount DECIMAL(12,2) NOT NULL,
    payment_method VARCHAR(50),
    payment_gateway VARCHAR(100),
    transaction_id VARCHAR(100) UNIQUE,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status VARCHAR(50) DEFAULT 'PENDING',
    receipt_url VARCHAR(500),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX idx_payments_patient_id ON payments(patient_id);
CREATE INDEX idx_payments_payment_status ON payments(payment_status);
```

---

### 10. Notifications & Communications

#### `notifications` Table
System notifications.

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200),
    message TEXT NOT NULL,
    notification_type VARCHAR(50),
    related_entity_id UUID,
    related_entity_type VARCHAR(50),
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
```

---

### 11. Audit & Security

#### `audit_logs` Table
Audit trail for compliance.

```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100),
    entity_type VARCHAR(100),
    entity_id UUID,
    changes JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity_type ON audit_logs(entity_type);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

#### `access_logs` Table
Access logging for security monitoring.

```sql
CREATE TABLE access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    resource VARCHAR(255),
    action VARCHAR(50),
    ip_address VARCHAR(45),
    user_agent TEXT,
    status_code INT,
    response_time_ms INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_access_logs_user_id ON access_logs(user_id);
CREATE INDEX idx_access_logs_created_at ON access_logs(created_at);
```

---

## Relationships Summary

```
users (1) ──────── (N) appointments
  │
  ├──── (1) doctors
  │      │
  │      ├──── (N) qualifications
  │      ├──── (1) specialty
  │      └──── (N) visits
  │
  ├──── (1) patients
  │      │
  │      ├──── (N) appointments
  │      ├──── (1) patient_registration
  │      ├──── (N) visits
  │      ├──── (N) medical_records
  │      ├──── (N) prescriptions
  │      ├──── (1) insurance
  │      ├──── (1) guarantor
  │      └──── (N) invoices
  │
  ├──── (1) staff
  │
  └──── (1) role

appointments ──── (1) doctors
       │
       ├──── (1) patients
       ├──── (1) department
       └──── (N) appointment_statuses
```

## Indexes Strategy

### Performance-Critical Indexes
1. `users(email)` - Login queries
2. `appointments(doctor_id, appointment_date)` - Slot availability
3. `appointments(patient_id, status)` - Patient dashboard
4. `lab_results(patient_id)` - Lab results download
5. `invoices(patient_id, payment_status)` - Billing queries
6. `medical_records(patient_id, record_date)` - Medical history
7. `lab_requests(status)` - Lab queue management

## Backup & Recovery Strategy

1. **Daily backups**: Automated PostgreSQL WAL backups
2. **Weekly full backups**: Full database dump
3. **Point-in-time recovery**: WAL archiving
4. **Replication**: Read replicas for disaster recovery

## HIPAA Compliance Features

1. **Audit trails**: All patient data access logged
2. **Encryption**: Passwords hashed, PII encrypted at rest
3. **Access control**: RBAC for patient data
4. **Data retention**: Soft deletes with retention policies
5. **Encryption in transit**: HTTPS/TLS for all communications

## Migration Strategy (Alembic)

Each schema change is managed through Alembic migrations:
- Incremental versioning
- Reversible migrations
- Automatic migration on deployment

## Performance Optimization

1. **Denormalization**: Limited use for read-heavy queries
2. **Materialized views**: For analytics dashboards
3. **Partitioning**: Audit logs by date range
4. **Connection pooling**: PgBouncer for concurrent connections

This design provides a solid foundation for a scalable, secure, and maintainable hospital management system.
