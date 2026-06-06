"""
API v1 router aggregating all endpoints.
"""

from fastapi import APIRouter

# Import endpoint routers
# from app.api.v1.endpoints import auth, users, appointments, doctors, patients

router = APIRouter()

# Include endpoint routers
# router.include_router(auth.router, tags=["Authentication"])
# router.include_router(users.router, tags=["Users"])
# router.include_router(appointments.router, tags=["Appointments"])
# router.include_router(doctors.router, tags=["Doctors"])
# router.include_router(patients.router, tags=["Patients"])
