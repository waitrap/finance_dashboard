from fastapi import FastAPI,Request
from fastapi.responses import JSONResponse 
from fastapi.middleware.cors import CORSMiddleware
import jwt

from . import auth
from .routers import login

app = FastAPI()

skip_check = ["openapi.json", "login","register","docs","livereload"]
@app.middleware("http")
async def jwt_token_verify(request: Request,call_next):
    if any(skip_word in request.url.path for skip_word in skip_check):
        return await call_next(request)
    else:
        token = request.headers.get("x-access-token")
        if not token:
            return JSONResponse(status_code=401, content={"detail": "Missing access token"})
        try:
            payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
            username = payload.get("username")
            request.state.username = username
            # todo
            # 在数据库中验证用户
        
        except:
            return JSONResponse(status_code=401, content={"detail": "Invalid access token"})
        return await call_next(request)
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,  
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(login.router)