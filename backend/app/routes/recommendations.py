from fastapi import APIRouter
from app.database.connection import supabase
from app.schemas.user import UserProfile
from app.services.eligibility import check_eligibility

router = APIRouter()


@router.post("/recommendations")
def get_recommendations(user: UserProfile):

    # Get all active opportunities from Supabase
    response = (
        supabase
        .table("opportunities")
        .select("*")
        .eq("is_active", True)
        .execute()
    )

    opportunities = response.data

    eligible = []
    near_eligible = []
    not_eligible = []

    # Convert Pydantic model into a normal dictionary
    user_data = user.model_dump()

    # Check every opportunity
    for opportunity in opportunities:

        result = check_eligibility(
            user_data,
            opportunity
        )

        opportunity_result = {
            "id": opportunity["id"],
            "name": opportunity["name"],
            "type": opportunity["type"],
            "description": opportunity["description"],
            "benefits": opportunity["benefits"],
            "deadline": opportunity["deadline"],
            "official_url": opportunity["official_url"],
            "match_score": result["match_score"],
            "status": result["status"],
            "matched_conditions": result["matched_conditions"],
            "missing_conditions": result["missing_conditions"]
        }

        # Put opportunity into the correct category
        if result["status"] == "eligible":
            eligible.append(opportunity_result)

        elif result["status"] == "near_eligible":
            near_eligible.append(opportunity_result)

        else:
            not_eligible.append(opportunity_result)

    # Highest match first
    eligible.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    near_eligible.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    not_eligible.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return {
        "eligible": eligible,
        "near_eligible": near_eligible,
        "not_eligible": not_eligible
    }