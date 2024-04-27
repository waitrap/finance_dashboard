from pydantic import BaseModel

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