from sqlalchemy.orm import Session
from ..models import models
from ..models import schemas

# データベースからユーザーを
def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

# ユーザーを新規登録する
def create_user(db: Session, user: models.User):
    db.add(user)
    db.commit()
    db.refresh(user)
    return user