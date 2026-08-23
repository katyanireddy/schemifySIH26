from pydantic import BaseModel
from typing import Optional


class UserProfile(BaseModel):
    age: int
    state: str
    category: str
    annual_income: float
    education_level: str
    course: str
    year_of_study: int

    # Additional eligibility information
    gender: Optional[str] = None
    institution_type: Optional[str] = None
    percentage: Optional[float] = None
    domicile_state: Optional[str] = None
    previous_qualification: Optional[str] = None
    disability: Optional[bool] = None