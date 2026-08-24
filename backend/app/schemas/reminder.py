from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


class ReminderCreate(BaseModel):
    user_id: UUID
    opportunity_id: Optional[UUID] = None
    reminder_type: str = "deadline"
    reminder_at: datetime
    message: Optional[str] = None


class ReminderUpdate(BaseModel):
    reminder_type: Optional[str] = None
    reminder_at: Optional[datetime] = None
    message: Optional[str] = None
    status: Optional[str] = None
