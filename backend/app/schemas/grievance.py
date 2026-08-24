from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


class GrievanceCreate(BaseModel):
    user_id: UUID
    opportunity_id: Optional[UUID] = None
    category: str
    subject: str
    description: str


class GrievanceUpdate(BaseModel):
    status: Optional[str] = None
    admin_response: Optional[str] = None
    subject: Optional[str] = None
    description: Optional[str] = None
