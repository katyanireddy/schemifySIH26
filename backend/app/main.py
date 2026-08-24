from fastapi import FastAPI
from app.database.connection import supabase
from app.routes.recommendations import router as recommendations_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.documents import router as documents_router
from app.routes.applications import router as applications_router
from app.routes.saved_opportunities import router as saved_opportunities_router
from app.routes.reminders import router as reminders_router
from app.routes.grievances import router as grievances_router

app = FastAPI(title="Schemify X API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommendations_router)
app.include_router(documents_router)
app.include_router(applications_router)
app.include_router(saved_opportunities_router)
app.include_router(reminders_router)
app.include_router(grievances_router)


@app.get("/")
def home():
    return {
        "message": "Schemify X Backend is running"
    }


@app.get("/test-db")
def test_database():
    response = (
        supabase
        .table("opportunities")
        .select("id, name, type")
        .limit(5)
        .execute()
    )

    print("SUPABASE RESPONSE:", response)

    return {
        "success": True,
        "data": response.data
    }