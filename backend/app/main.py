from fastapi import FastAPI
from app.database.connection import supabase
from app.routes.recommendations import router as recommendations_router

app = FastAPI(title="Schemify X API")

app.include_router(recommendations_router)


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