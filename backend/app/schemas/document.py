from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID


class DocumentCreate(BaseModel):
    user_id: UUID
    document_type: str
    file_name: str
    file_url: str


class DocumentResponse(BaseModel):
    id: UUID
    user_id: UUID
    document_type: str
    file_name: str
    file_url: str
    status: str
    uploaded_at: datetime
    created_at: datetime