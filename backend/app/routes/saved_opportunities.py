from fastapi import APIRouter, HTTPException

from app.database.connection import supabase
from app.schemas.saved_opportunity import SavedOpportunityCreate

router = APIRouter(
    prefix="/saved-opportunities",
    tags=["Saved Opportunities"]
)


@router.post("")
def save_opportunity(saved: SavedOpportunityCreate):

    response = (
        supabase
        .table("saved_opportunities")
        .insert({
            "user_id": str(saved.user_id),
            "opportunity_id": str(saved.opportunity_id)
        })
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=400,
            detail="Failed to save opportunity"
        )

    return {
        "success": True,
        "data": response.data[0]
    }


@router.get("/user/{user_id}")
def get_saved_opportunities(user_id: str):

    response = (
        supabase
        .table("saved_opportunities")
        .select("*, opportunities(name, type, description, benefits, deadline, official_url)")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .execute()
    )

    return {
        "success": True,
        "data": response.data
    }


@router.delete("/{opportunity_id}")
def remove_saved_opportunity(
    opportunity_id: str,
    user_id: str
):

    response = (
        supabase
        .table("saved_opportunities")
        .delete()
        .eq("opportunity_id", opportunity_id)
        .eq("user_id", user_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=404,
            detail="Saved opportunity not found"
        )

    return {
        "success": True,
        "message": "Opportunity removed from saved list"
    }
