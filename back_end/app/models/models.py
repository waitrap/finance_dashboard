from sqlalchemy import Column, String

from ..database.db import Base

class User(Base):
    __tablename__ = "users"

    guid = Column(String, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)