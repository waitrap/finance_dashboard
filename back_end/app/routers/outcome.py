from fastapi import APIRouter, Depends, Request
from ..database.db import SessionLocal
from ..database import crud
from ..models import schemas

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

@router.get("/outcome/transationrecord",tags=["outcome"])
async def get_transation_record(request:Request,limit:int,db: SessionLocal = Depends(get_db)): # type: ignore
    """
    最新のlimit件のレコードを取得する
    """
    return crud.get_transation(db,limit,request.state.username)

@router.post("/input/outcome",tags=["outcome"])
async def input_outcome(request:Request,outcome_record:schemas.OutcomeCreate,db: SessionLocal = Depends(get_db)):  # type: ignore
    
    return crud.create_outcome_record(db,outcome_record,request.state.username)
