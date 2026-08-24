from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class SavedOpportunityCreate(BaseModel):
    user_id: UUID
    opportunity_id: UUID


class SavedOpportunityResponse(BaseModel):
    id: UUID
    user_id: UUID
    opportunity_id: UUID
    created_at: datetime
