from fastapi import APIRouter, Depends,Response
import jwt
from ..database.db import SessionLocal
from ..database import crud
from ..models import schemas
from .. import auth

import datetime

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def generate_token(guid,username):
    payload = {
        "guid": guid,
        "username": username,
        "exp": datetime.datetime.now() + datetime.timedelta(weeks=4)
    }
    jwt_token = jwt.encode(payload, auth.SECRET_KEY, algorithm=auth.ALGORITHM)
    return jwt_token

# ログイン
@router.post("/login",tags=["login/register"])
async def login(login_body: schemas.LoginBody, response: Response, db: SessionLocal = Depends(get_db)):

    username = login_body.username
    password = login_body.password

    user = crud.get_user(db, username)
    if user is None:
        response.status_code = 401
        return {"x-access-token": "null","message": "ユーザーが存在しません"}
    if user.password != password:
        response.status_code = 401
        return {"x-access-token": "null","message": "パスワードが異なります"}
    
    jwt_token = generate_token(user.guid,user.username)
    return {"x-access-token": jwt_token, "message": "成功しました"} 
   
#ログイン済みを判断する
@router.post("/logined",tags=["login/register"])
async def logined():
    return {"message": "ログイン済み"}
