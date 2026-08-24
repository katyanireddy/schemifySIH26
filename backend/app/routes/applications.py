from fastapi import APIRouter, HTTPException

from app.database.connection import supabase
from app.schemas.application import (
    ApplicationCreate,
    ApplicationUpdate
)

router = APIRouter(
    prefix="/applications",
    tags=["Applications"]
)


@router.post("")
def create_application(application: ApplicationCreate):

    response = (
        supabase
        .table("applications")
        .insert({
            "user_id": str(application.user_id),
            "opportunity_id": str(application.opportunity_id),
            "status": application.status,
            "application_date": (
                application.application_date.isoformat()
                if application.application_date
                else None
            ),
            "application_reference": application.application_reference,
            "notes": application.notes
        })
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=400,
            detail="Failed to create application"
        )

    return {
        "success": True,
        "data": response.data[0]
    }


@router.get("/user/{user_id}")
def get_user_applications(user_id: str):

    response = (
        supabase
        .table("applications")
        .select("*, opportunities(name, type, deadline, official_url)")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .execute()
    )

    return {
        "success": True,
        "data": response.data
    }


@router.get("/{application_id}")
def get_application(application_id: str):

    response = (
        supabase
        .table("applications")
        .select("*, opportunities(name, type, deadline, official_url)")
        .eq("id", application_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )

    return {
        "success": True,
        "data": response.data[0]
    }


@router.patch("/{application_id}")
def update_application(
    application_id: str,
    application: ApplicationUpdate
):

    update_data = {}

    if application.status is not None:
        update_data["status"] = application.status

    if application.application_date is not None:
        update_data["application_date"] = (
            application.application_date.isoformat()
        )

    if application.application_reference is not None:
        update_data["application_reference"] = (
            application.application_reference
        )

    if application.notes is not None:
        update_data["notes"] = application.notes

    if not update_data:
        raise HTTPException(
            status_code=400,
            detail="No fields provided for update"
        )

    response = (
        supabase
        .table("applications")
        .update(update_data)
        .eq("id", application_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )

    return {
        "success": True,
        "data": response.data[0]
    }
