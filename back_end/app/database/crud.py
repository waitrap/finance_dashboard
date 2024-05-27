from sqlalchemy.orm import Session
from typing import Union
import uuid

from ..models import models,schemas


# データベースからユーザーを取得する
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

###########################################

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

def get_transation(db: Session,limit:int,username:str):
    transation_list = db.query(models.Outcome).filter(models.Outcome.user == username).order_by(models.Outcome.id.desc()).limit(limit).all()
    return transation_list

###############################################

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
    # もし今のデータがなかったら、前回の更新日のデータを取得
    data = db.query(models.Balance).filter(models.Balance.user == username,models.Balance.year == year, models.Balance.month == month, models.Balance.day <= day).order_by(models.Balance.year.desc(), models.Balance.month.desc(), models.Balance.day.desc()).first()
    if data == None:
        data = db.query(models.Balance).filter(models.Balance.user == username,models.Balance.year == year, models.Balance.month <= month).order_by(models.Balance.year.desc(), models.Balance.month.desc(), models.Balance.day.desc()).first()
        if data == None:
            data = db.query(models.Balance).filter(models.Balance.user == username,models.Balance.year <= year).order_by(models.Balance.year.desc(), models.Balance.month.desc(), models.Balance.day.desc()).first()
    if data != None:
        return data.amount
    else:
        return 0
 
def calculate_new_balance(db: Session,amount_info:Union[schemas.OutcomeCreate, schemas.IncomeCreate],in_out:int):
    
    exit_balance = db.query(models.Balance).filter(models.Balance.user == amount_info.user,models.Balance.year==amount_info.year,
                                                   models.Balance.month == amount_info.month,
                                                   models.Balance.day==amount_info.day).first()
    if exit_balance:
        old_balance = exit_balance.amount
        exit_balance.amount = old_balance + (in_out*amount_info.amount)
        db.commit()
        db.refresh(exit_balance)
        return exit_balance
    else:
        balance = db.query(models.Balance).filter(models.Balance.user == amount_info.user).order_by(models.Balance.id.desc()).first()
        balance_record = schemas.BalanceCreate(amount = balance.amount+(in_out*amount_info.amount),year = amount_info.year,month = amount_info.month,day = amount_info.day,user = amount_info.user)
        db_balance = models.Balance(**balance_record.model_dump())
        db.add(db_balance)
        db.commit()
        db.refresh(db_balance)
        return balance_record
    
 # outcome情報を追加する   
def create_outcome_record(db: Session, outcome: schemas.OutcomeCreate,user:str):
    db_outcome = models.Outcome(**outcome.model_dump())
    db_outcome.user = user
    db.add(db_outcome)

    db.commit()
    db.refresh(db_outcome)
    # balanceを直す
    calculate_new_balance(db,db_outcome,-1)

# income情報を追加する
def create_income_record(db: Session, income: schemas.IncomeCreate,user:str):
    db_income = models.Income(**income.model_dump())
    db_income.user = user
    db.add(db_income)

    db.commit()
    db.refresh(db_income)
    # balanceを直す
    calculate_new_balance(db,db_income,1)



    
