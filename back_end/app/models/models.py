from sqlalchemy import Column, String, Integer, DECIMAL, ForeignKey

from ..database.db import Base

class User(Base):
    __tablename__ = "users"

    guid = Column(String, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)

class Outcome(Base):
    __tablename__ = "outcome"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(Integer)
    month = Column(Integer)
    day = Column(Integer)
    amount = Column(DECIMAL(10, 2))
    category = Column(String)
    description = Column(String)

    user= Column(String, ForeignKey("users.username"))

class Income(Base):
    __tablename__ = "income"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(Integer)
    month = Column(Integer)
    day = Column(Integer)
    amount = Column(DECIMAL(10, 2))
    description = Column(String)

    user= Column(String, ForeignKey("users.username"))

class Balance(Base):
    __tablename__ = "balance"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(Integer)
    month = Column(Integer)
    day = Column(Integer)
    amount = Column(DECIMAL(10, 2))

    user= Column(String, ForeignKey("users.username"))