from typing import Union
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
import jwt

from twilio.rest import Client
from random import randint

account_sid = "<your account_sid>"
auth_token  = "<your auth_token>"

client = Client(account_sid, auth_token)
OTP=randint(1000,9999)
message = client.messages.create(
    to="<your number>",
    from_="+15403524621",
    body=OTP)

SECRET_KEY ="cairocoders123456789"
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 800

dummy_user={
    "username":"cairocoders",
    "password":OTP,
}
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    allow_origins=["http://localhost:3000"]
)
class Loginclass(BaseModel):
    username:str
    password:int
@app.get("/")
def read_root():
    return {"hello":"world"}

@app.post("/login")
async def login_user(login_item:Loginclass):
    data=jsonable_encoder(login_item)
    if dummy_user['username']==data['username'] and dummy_user['password']==data['password']:
        encoded_jwt=jwt.encode(data,SECRET_KEY, algorithm=ALGORITHM)
        return {"token":encoded_jwt}
    else:
        return {'message':'Login failed'}