from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import date, datetime


class ApplicationCreate(BaseModel):
    user_id: UUID
    opportunity_id: UUID
    status: str = "saved"
    application_date: Optional[date] = None
    application_reference: Optional[str] = None
    notes: Optional[str] = None


class ApplicationUpdate(BaseModel):
    status: Optional[str] = None
    application_date: Optional[date] = None
    application_reference: Optional[str] = None
    notes: Optional[str] = None


class ApplicationResponse(BaseModel):
    id: UUID
    user_id: UUID
    opportunity_id: UUID
    status: str
    application_date: Optional[date] = None
    application_reference: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
