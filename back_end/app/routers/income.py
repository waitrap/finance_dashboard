from fastapi import APIRouter, Depends,Header,Request
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

@router.get("/income/day",tags=["income"])
async def get_day_income(request:Request, year:int, month:int, day:int,x_access_token: str = Header(), db: SessionLocal = Depends(get_db)): # type: ignore
    """
    指定日の収入を取得する
    """
    return crud.get_day_income(db, year, month, day,request.state.username)
@router.get("/income/month_income_list",tags=["income"])
async def get_month_income_list(request:Request, year:int, db: SessionLocal = Depends(get_db)): # type: ignore  
    """
    一年間の毎月の収入リストを返す
    """
    month_income_list = []
    for month in range(1,13):
        data = crud.get_month_income(db, year, month, request.state.username)
        month_income_list.append(data)
    return month_income_list

@router.post("/input/income",tags=["income"])
async def input_outcome(request:Request,income_record:schemas.IncomeCreate,db: SessionLocal = Depends(get_db)):  # type: ignore
    
    return crud.create_income_record(db,income_record,request.state.username)


