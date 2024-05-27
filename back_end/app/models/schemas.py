from pydantic import BaseModel
import decimal

class User(BaseModel):
    guid: str
    username: str
    password: str

class LoginBody(BaseModel):
    username: str
    password: str

class RegisterBody(BaseModel):
    username: str
    password: str

class OutcomeCreate(BaseModel):
    user: str = None
    year:int
    month: int
    day: int
    amount: decimal.Decimal
    category: str
    description: str = None
    
class IncomeCreate(BaseModel):
    user: str = None
    year: int
    month: int
    day: int
    amount: decimal.Decimal
    description: str = None

class BalanceCreate(BaseModel):
    year: int
    month: int
    day: int
    amount: decimal.Decimal
    user: str 