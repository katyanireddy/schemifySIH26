from fastapi import APIRouter, HTTPException

from app.database.connection import supabase
from app.schemas.grievance import GrievanceCreate, GrievanceUpdate

router = APIRouter(
    prefix="/grievances",
    tags=["Grievances"]
)


@router.post("")
def create_grievance(grievance: GrievanceCreate):

    response = (
        supabase
        .table("grievances")
        .insert({
            "user_id": str(grievance.user_id),
            "opportunity_id": (
                str(grievance.opportunity_id)
                if grievance.opportunity_id
                else None
            ),
            "category": grievance.category,
            "subject": grievance.subject,
            "description": grievance.description
        })
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=400,
            detail="Failed to create grievance"
        )

    return {
        "success": True,
        "data": response.data[0]
    }


@router.get("/user/{user_id}")
def get_user_grievances(user_id: str):

    response = (
        supabase
        .table("grievances")
        .select(
            "*, opportunities(name, type, deadline, official_url)"
        )
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .execute()
    )

    return {
        "success": True,
        "data": response.data
    }


@router.get("/{grievance_id}")
def get_grievance(grievance_id: str):

    response = (
        supabase
        .table("grievances")
        .select(
            "*, opportunities(name, type, deadline, official_url)"
        )
        .eq("id", grievance_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=404,
            detail="Grievance not found"
        )

    return {
        "success": True,
        "data": response.data[0]
    }


@router.patch("/{grievance_id}")
def update_grievance(
    grievance_id: str,
    grievance: GrievanceUpdate
):

    update_data = {}

    if grievance.status is not None:
        update_data["status"] = grievance.status

    if grievance.admin_response is not None:
        update_data["admin_response"] = grievance.admin_response

    if grievance.subject is not None:
        update_data["subject"] = grievance.subject

    if grievance.description is not None:
        update_data["description"] = grievance.description

    if not update_data:
        raise HTTPException(
            status_code=400,
            detail="No fields provided for update"
        )

    response = (
        supabase
        .table("grievances")
        .update(update_data)
        .eq("id", grievance_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=404,
            detail="Grievance not found"
        )

    return {
        "success": True,
        "data": response.data[0]
    }
