def check_eligibility(user, opportunity):

    matched = []
    missing = []

    # -------------------------
    # AGE
    # -------------------------
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
        else:
            missing.append("age")

    # -------------------------
    # INCOME
    # -------------------------
    income_limit = opportunity.get("income_limit")

    if income_limit is not None:

        if user["annual_income"] <= income_limit:
            matched.append("income")
        else:
            missing.append("income")

    # -------------------------
    # CATEGORY
    # -------------------------
    categories = opportunity.get("categories") or []

    if categories:

        if user["category"] in categories:
            matched.append("category")
        else:
            missing.append("category")

    # -------------------------
    # EDUCATION
    # -------------------------
    education_levels = opportunity.get("education_levels") or []

    if education_levels:

        if user["education_level"] in education_levels:
            matched.append("education")
        else:
            missing.append("education")

    # -------------------------
    # COURSE
    # -------------------------
    courses = opportunity.get("courses") or []

    if courses:

        if user["course"] in courses:
            matched.append("course")
        else:
            missing.append("course")

    # -------------------------
    # YEAR
    # -------------------------
    eligible_years = opportunity.get("eligible_years") or []

    if eligible_years:

        if user["year_of_study"] in eligible_years:
            matched.append("year")
        else:
            missing.append("year")

    # -------------------------
    # SCORE
    # -------------------------
    total_conditions = len(matched) + len(missing)

    if total_conditions == 0:
        score = 0
    else:
        score = round(
            len(matched) / total_conditions * 100
        )

    # -------------------------
    # STATUS
    # -------------------------
    if score == 100:
        status = "eligible"

    elif score >= 70:
        status = "near_eligible"

    else:
        status = "not_eligible"

    return {
        "match_score": score,
        "status": status,
        "matched_conditions": matched,
        "missing_conditions": missing
    }