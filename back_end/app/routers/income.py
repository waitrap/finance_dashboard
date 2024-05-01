from fastapi import APIRouter, Depends,Header,Request
from ..database.db import SessionLocal
from ..database import crud

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