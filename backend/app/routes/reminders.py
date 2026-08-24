from fastapi import APIRouter, HTTPException

from app.database.connection import supabase
from app.schemas.reminder import ReminderCreate, ReminderUpdate

router = APIRouter(
    prefix="/reminders",
    tags=["Reminders"]
)


@router.post("")
def create_reminder(reminder: ReminderCreate):

    response = (
        supabase
        .table("reminders")
        .insert({
            "user_id": str(reminder.user_id),
            "opportunity_id": (
                str(reminder.opportunity_id)
                if reminder.opportunity_id
                else None
            ),
            "reminder_type": reminder.reminder_type,
            "reminder_at": reminder.reminder_at.isoformat(),
            "message": reminder.message
        })
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=400,
            detail="Failed to create reminder"
        )

    return {
        "success": True,
        "data": response.data[0]
    }


@router.get("/user/{user_id}")
def get_user_reminders(user_id: str):

    response = (
        supabase
        .table("reminders")
        .select(
            "*, opportunities(name, type, deadline, official_url)"
        )
        .eq("user_id", user_id)
        .order("reminder_at")
        .execute()
    )

    return {
        "success": True,
        "data": response.data
    }


@router.patch("/{reminder_id}")
def update_reminder(
    reminder_id: str,
    reminder: ReminderUpdate
):

    update_data = {}

    if reminder.reminder_type is not None:
        update_data["reminder_type"] = reminder.reminder_type

    if reminder.reminder_at is not None:
        update_data["reminder_at"] = (
            reminder.reminder_at.isoformat()
        )

    if reminder.message is not None:
        update_data["message"] = reminder.message

    if reminder.status is not None:
        update_data["status"] = reminder.status

    if not update_data:
        raise HTTPException(
            status_code=400,
            detail="No fields provided for update"
        )

    response = (
        supabase
        .table("reminders")
        .update(update_data)
        .eq("id", reminder_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=404,
            detail="Reminder not found"
        )

    return {
        "success": True,
        "data": response.data[0]
    }


@router.delete("/{reminder_id}")
def delete_reminder(reminder_id: str):

    response = (
        supabase
        .table("reminders")
        .delete()
        .eq("id", reminder_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=404,
            detail="Reminder not found"
        )

    return {
        "success": True,
        "message": "Reminder deleted successfully"
    }
