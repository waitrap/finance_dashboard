from sqlalchemy.orm import Session
import uuid

from ..models import models


# データベースからユーザーを
def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

# ユーザーを新規登録する
def create_user(db: Session, user:str, password:str):
    guid = str(uuid.uuid4())
    db_user = models.User(username=user, password=password, guid=guid)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_day_income(db: Session, year:int, month:int, day:int, username:str):
    day_list = db.query(models.Income).filter(models.Income.year == year, models.Income.month == month, models.Income.day == day, models.Income.user == username).all()
    amount_sum = 0
    for i in day_list:
        amount_sum += i.amount
    return amount_sum

def get_month_income(db: Session, year: int, month: int,user:str):
    month_list = db.query(models.Income).filter(models.Income.year == year, models.Income.month == month,models.Income.user == user).all()
    amount_sum = 0
    for i in month_list:
        amount_sum += i.amount
    return amount_sum

def get_day_outcome(db: Session, year: int, month: int, day: int,username:str):
    day_list = db.query(models.Outcome).filter(models.Outcome.year == year, models.Outcome.month == month, models.Outcome.day == day,models.Outcome.user == username).all()
    amount_sum = 0
    for i in day_list:
        amount_sum += i.amount
    return amount_sum

def get_month_outcome(db: Session, year: int, month: int,username:str):
    month_list = db.query(models.Outcome).filter(models.Outcome.year == year, models.Outcome.month == month,models.Outcome.user == username).all()
    amount_sum = 0
    for i in month_list:
        amount_sum += i.amount
    return amount_sum   

def get_day_balance(db: Session, year: int,month: int,day: int,username:str):
    # 前回の更新日のデータを取得
    data = db.query(models.Balance).filter(models.Balance.user == username,models.Balance.year == year, models.Balance.month == month, models.Balance.day <= day).order_by(models.Balance.year.desc(), models.Balance.month.desc(), models.Balance.day.desc()).first()
    if data == None:
        data = db.query(models.Balance).filter(models.Balance.user == username,models.Balance.year == year, models.Balance.month <= month).order_by(models.Balance.year.desc(), models.Balance.month.desc(), models.Balance.day.desc()).first()
        if data == None:
            data = db.query(models.Balance).filter(models.Balance.user == username,models.Balance.year <= year).order_by(models.Balance.year.desc(), models.Balance.month.desc(), models.Balance.day.desc()).first()
    if data != None:
        return data.amount
    else:
        return 0