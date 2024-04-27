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