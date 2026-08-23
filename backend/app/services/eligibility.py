def check_eligibility(user, opportunity):

    matched = []
    missing = []
    explanations = []

    # AGE
    min_age = opportunity.get("min_age")
    max_age = opportunity.get("max_age")

    if min_age is not None or max_age is not None:
        age_ok = True

        if min_age is not None and user["age"] < min_age:
            age_ok = False

        if max_age is not None and user["age"] > max_age:
            age_ok = False

        if age_ok:
            matched.append("age")
            explanations.append("You meet the age requirement.")
        else:
            missing.append("age")
            explanations.append("Your age does not meet the required age range.")

    # INCOME
    income_limit = opportunity.get("income_limit")

    if income_limit is not None:
        if user["annual_income"] <= income_limit:
            matched.append("income")
            explanations.append("Your family income is within the required limit.")
        else:
            missing.append("income")
            explanations.append("Your family income is above the required limit.")

    # CATEGORY
    categories = opportunity.get("categories") or []

    if categories:
        if user["category"] in categories:
            matched.append("category")
            explanations.append("Your category is eligible.")
        else:
            missing.append("category")
            explanations.append("Your category is not included in the eligibility criteria.")


    # -------------------------
# GENDER
# -------------------------
    required_gender = opportunity.get("required_gender")

    if required_gender and required_gender.lower() != "any":

        user_gender = (user.get("gender") or "").lower()

        if user_gender == required_gender.lower():
            matched.append("gender")
            explanations.append(
                "You meet the gender eligibility requirement."
            )
        else:
            missing.append("gender")
            explanations.append(
                f"This opportunity is only available to {required_gender} students."
            )
        # -------------------------
    # DISABILITY
    # -------------------------
    requires_disability = opportunity.get("requires_disability", False)

    if requires_disability:
        if user.get("disability", False):
            matched.append("disability")
            explanations.append(
                "You meet the disability eligibility requirement."
            )
        else:
            missing.append("disability")
            explanations.append(
                "This opportunity requires disability eligibility."
            )

    # STATE
    opportunity_state = opportunity.get("state")

    if opportunity_state:
        if (
            opportunity_state.lower() == "all india"
            or opportunity_state.lower() == user["state"].lower()
        ):
            matched.append("state")
            explanations.append("The opportunity is available in your state.")
        else:
            missing.append("state")
            explanations.append(
                f"This opportunity is not currently available in {user['state']}."
            )

    # EDUCATION
    education_levels = opportunity.get("education_levels") or []

    if education_levels:
        if user["education_level"] in education_levels:
            matched.append("education")
            explanations.append("Your education level is eligible.")
        else:
            missing.append("education")
            explanations.append("Your current education level is not eligible.")

    # COURSE
    courses = opportunity.get("courses") or []

    if courses:
        user_course = (
            user.get("course") or ""
        ).strip().lower()

        normalized_courses = [
            str(course).strip().lower()
            for course in courses
        ]

        course_match = user_course in normalized_courses

        # Generic / broad programmes
        generic_terms = {
            "all",
            "all courses",
            "any",
            "any course",
            "all disciplines",
            "all streams",
            "engineering",
            "technology",
            "technical",
        }

        if any(course in generic_terms for course in normalized_courses):
            course_match = True

        # B.Tech / B.E. are engineering degrees
        if user_course in {"b.tech", "b.e.", "be", "btech"}:
            if any(
                course in {"engineering", "technology", "technical",
                       "b.tech", "b.e.", "be", "btech"}
                for course in normalized_courses
            ):
                course_match = True

        if course_match:
            matched.append("course")
            explanations.append(
                "Your course is eligible."
            )
        else:
            missing.append("course")
            explanations.append(
                "Your course is not included in the eligible courses."
            )

    # YEAR
    eligible_years = opportunity.get("eligible_years") or []

    if eligible_years:
        if user["year_of_study"] in eligible_years:
            matched.append("year")
            explanations.append("Your current year of study is eligible.")
        else:
            missing.append("year")
            explanations.append(
                "Your current year of study is outside the eligible years."
            )

    # -------------------------
    # MINIMUM PERCENTAGE
    # -------------------------
    min_percentage = opportunity.get("min_percentage")

    if min_percentage is not None:
        user_percentage = user.get("percentage")

        if user_percentage is not None and user_percentage >= min_percentage:
            matched.append("percentage")
            explanations.append(
                "Your academic percentage meets the required minimum."
            )
        else:
            missing.append("percentage")
            explanations.append(
                f"You need at least {min_percentage}% academic marks for this opportunity."
            )


    # INSTITUTION TYPE
    required_institution_type = opportunity.get("institution_type")

    if required_institution_type:
        user_institution = (
            user.get("institution_type") or ""
        ).strip().lower()

        required_institution = (
            required_institution_type or ""
        ).strip().lower()

        institution_match = False

        # Flexible matching for common recognized-college requirements
        if (
            "recognized" in user_institution
            and "recognized" in required_institution
        ):
            institution_match = True

        elif user_institution == required_institution:
            institution_match = True

        if institution_match:
            matched.append("institution_type")
            explanations.append(
                "Your institution type meets the requirement."
            )
        else:
            missing.append("institution_type")
            explanations.append(
                "Your institution type does not meet the requirement."
            )

    # PREVIOUS QUALIFICATION
    required_qualification = opportunity.get(
        "requires_previous_qualification"
    )

    if required_qualification:
        user_qualification = (
            user.get("previous_qualification") or ""
        ).strip().lower()

        required_qualification_normalized = (
            str(required_qualification).strip().lower()
        )

        if user_qualification == required_qualification_normalized:
            matched.append("previous_qualification")
            explanations.append(
                "Your previous qualification meets the requirement."
            )
        else:
            missing.append("previous_qualification")
            explanations.append(
                "Your previous qualification does not meet the requirement."
            )


# -------------------------
    # DOMICILE
# -------------------------
    domicile_required = opportunity.get("domicile_required", False)

    if domicile_required:
        user_domicile = (user.get("domicile_state") or "").lower()
        opportunity_state = (opportunity.get("state") or "").lower()

        if (
            opportunity_state == "all india"
            or user_domicile == opportunity_state
        ):
            matched.append("domicile")
            explanations.append(
                "Your state meets the domicile requirement."
            )
        else:
            missing.append("domicile")
            explanations.append(
                "Your state does not meet the domicile requirement."
            )

    # SCORE
    total_conditions = len(matched) + len(missing)

    if total_conditions == 0:
        score = 0
    else:
        score = round(
            len(matched) / total_conditions * 100
        )
        # -------------------------
    # RECOMMENDATION SCORE
    # -------------------------
    condition_weights = {
        "category": 20,
        "income": 18,
        "course": 18,
        "education": 15,
        "state": 10,
        "domicile": 10,
        "gender": 8,
        "year": 6,
        "percentage": 5,
        "institution_type": 4,
        "previous_qualification": 4,
        "age": 3,
        "disability": 3
    }

    recommendation_score = 0

    for condition in matched:
        recommendation_score += condition_weights.get(
            condition, 2
        )

    # Normalize to 100
    total_weight = sum(condition_weights.values())

    recommendation_score = round(
        (recommendation_score / total_weight) * 100
    )

    # -------------------------
    # BENEFIT + DEADLINE BOOST
    # -------------------------

    benefit_boost = 0

    benefits = (opportunity.get("benefits") or "").lower()

    # Financial support gets higher priority
    if any(word in benefits for word in [
        "scholarship",
        "financial assistance",
        "financial support",
        "tuition",
        "stipend",
        "fee",
        "₹",
        "rs."
    ]):
        benefit_boost += 10

    # Training / certification opportunities
    elif any(word in benefits for word in [
        "training",
        "skill",
        "certification",
        "internship"
    ]):
        benefit_boost += 5


    # Deadline boost
    deadline_boost = 0

    deadline = opportunity.get("deadline")

    if deadline:
        from datetime import date

        try:
            deadline_date = date.fromisoformat(str(deadline))

            days_left = (deadline_date - date.today()).days

            if 0 <= days_left <= 30:
                deadline_boost = 8

            elif 31 <= days_left <= 60:
                deadline_boost = 5

            elif 61 <= days_left <= 90:
                deadline_boost = 3

        except (ValueError, TypeError):
            deadline_boost = 0


    recommendation_score = min(
        100,
        recommendation_score
        + benefit_boost
        + deadline_boost
    )

    # -------------------------
    # RECOMMENDATION REASONS
    # -------------------------

    recommendation_reasons = []

    priority_conditions = [
        "category",
        "income",
        "course",
        "education",
        "gender",
        "state",
        "domicile",
        "year",
        "percentage",
        "institution_type"
]

    for condition in priority_conditions:
        if condition in matched:
            for explanation in explanations:
                if condition.lower() in explanation.lower():
                    recommendation_reasons.append(explanation)
                    break

    # Fallback if no specific reason was found
    if not recommendation_reasons:
        recommendation_reasons = explanations[:3]

    # Keep it concise
    recommendation_reasons = recommendation_reasons[:4]

    # STATUS
    critical_conditions = {
        "age",
        "income",
        "category",
        "state",
        "gender",
        "disability",
        "domicile"
    }

    critical_missing = [
        condition
        for condition in missing
        if condition in critical_conditions
    ]

    if len(missing) == 0:
        status = "eligible"

    elif len(missing) == 1 and len(critical_missing) == 0:
        status = "near_eligible"

    else:
        status = "not_eligible"


        # Recommendation score should only influence
# opportunities the user can realistically pursue.

    if status == "not_eligible":
        recommendation_score = 0

    elif status == "near_eligible":
        recommendation_score = round(recommendation_score * 0.5)

        # -------------------------
    # IMPROVEMENT SUGGESTIONS
    # -------------------------
    improvements = []

    if "age" in missing:
        improvements.append(
            "Your age does not currently meet the required range. Check again in a future eligibility cycle."
        )

    if "income" in missing:
        improvements.append(
            "Your family income is above the current limit. Check whether you qualify under a different income-based opportunity."
        )

    if "category" in missing:
        improvements.append(
            "Your category is not included in this opportunity. Explore schemes available for your category."
        )
        

    if "state" in missing:
        improvements.append(
            "This opportunity is not available in your state. Explore state-specific or All India opportunities."
        )

    if "education" in missing:
        improvements.append(
            "Your current education level does not match. Check opportunities available for your education level."
        )

    if "course" in missing:
        improvements.append(
            "Your course is not currently listed as eligible. Explore opportunities for your course or field."
        )

    if "year" in missing:
        improvements.append(
            "Your current year of study is outside the eligible range. Check again when you enter an eligible year."
        )

    if "gender" in missing:
        improvements.append(
            "This opportunity is restricted to a specific gender. "
            "Explore opportunities available to your gender."
        )

    if "disability" in missing:
        improvements.append(
            "This opportunity requires disability eligibility. "
            "Explore other opportunities that match your profile."
        )
    if "percentage" in missing:
        improvements.append(
            "Your academic percentage does not currently meet the minimum requirement."
        )

    if "institution_type" in missing:
        improvements.append(
            "Your institution type does not match the requirement for this opportunity."
        )

    if "previous_qualification" in missing:
        improvements.append(
            "Your previous qualification does not meet the requirement."
        )

    if "domicile" in missing:
        improvements.append(
            "Your state does not meet the domicile requirement for this opportunity."
        )

    return {
    "match_score": score,
    "recommendation_score": recommendation_score,
    "status": status,
    "matched_conditions": matched,
    "missing_conditions": missing,
    "explanations": explanations,
    "recommendation_reasons": recommendation_reasons,
    "improvements": improvements
}