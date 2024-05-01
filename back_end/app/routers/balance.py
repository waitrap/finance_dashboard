from fastapi import APIRouter, Depends,Request
from ..database.db import SessionLocal
from ..database import crud

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/balance/day",tags=["balance"])
async def get_day_balance(request:Request, year:int, month:int, day:int, db: SessionLocal = Depends(get_db)): # type: ignore
    """
    指定日の収支を取得する
    """
    return crud.get_day_balance(db, year, month, day,request.state.username)