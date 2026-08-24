from fastapi import APIRouter, HTTPException

from app.database.connection import supabase
from app.schemas.document import DocumentCreate

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.post("")
def create_document(document: DocumentCreate):

    response = (
        supabase
        .table("documents")
        .insert({
            "user_id": str(document.user_id),
            "document_type": document.document_type,
            "file_name": document.file_name,
            "file_url": document.file_url
        })
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=400,
            detail="Failed to create document"
        )

    return {
        "success": True,
        "data": response.data[0]
    }


@router.get("/{user_id}")
def get_user_documents(user_id: str):

    response = (
        supabase
        .table("documents")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .execute()
    )

    return {
        "success": True,
        "data": response.data
    }


@router.delete("/{document_id}")
def delete_document(document_id: str):

    response = (
        supabase
        .table("documents")
        .delete()
        .eq("id", document_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    return {
        "success": True,
        "message": "Document deleted successfully"
    }