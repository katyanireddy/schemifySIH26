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

            # Eligibility score
            "match_score": result["match_score"],

            # Personalized recommendation score
            "recommendation_score": result["recommendation_score"],

            "status": result["status"],
            "matched_conditions": result["matched_conditions"],
            "missing_conditions": result["missing_conditions"],
            "explanations": result["explanations"],
            "recommendation_reasons": result["recommendation_reasons"],
            "improvements": result["improvements"],
            
            "documents_required": opportunity.get("documents_required") or [],
            "application_steps": opportunity.get("application_steps") or []  
        }

        # Put opportunity into the correct category
        if result["status"] == "eligible":
            eligible.append(opportunity_result)

        elif result["status"] == "near_eligible":
            near_eligible.append(opportunity_result)

        else:
            not_eligible.append(opportunity_result)

            

    # Highest personalized recommendation first
    eligible.sort(
        key=lambda x: x["recommendation_score"],
        reverse=True
    )

    near_eligible.sort(
        key=lambda x: x["recommendation_score"],
        reverse=True
    )

    # For not eligible schemes, keep eligibility score
    not_eligible.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    # Top 5 personalized recommendations
    top_recommendations = eligible[:5]

    return {
        "top_recommendations": top_recommendations,
        "eligible": eligible,
        "near_eligible": near_eligible,
        "not_eligible": not_eligible
        
    }