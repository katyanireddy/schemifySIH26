from pydantic import BaseModel


class UserProfile(BaseModel):
    age: int
    state: str
    category: str
    annual_income: float
    education_level: str
    course: str
    year_of_study: int