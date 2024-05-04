from fastapi import APIRouter, Depends, Request
from ..database.db import SessionLocal
from ..database import crud

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/outcome/day",tags=["outcome"])
async def get_day_outcome(request:Request, year:int, month:int, day:int, db: SessionLocal = Depends(get_db)): # type: ignore
    """
    指定日の支出を取得する
    """
    return crud.get_day_outcome(db, year, month, day,request.state.username)

@router.get("/outcome/month_outcome_list",tags=["outcome"])
async def get_month_outcome_list(request:Request, year:int, db: SessionLocal = Depends(get_db)): # type: ignore
    """
    一年間の毎月の支出リストを返す
    """
    month_outcome_list = []
    for month in range(1,13):
        data = crud.get_month_outcome(db, year, month, request.state.username)
        month_outcome_list.append(data)
    return month_outcome_list