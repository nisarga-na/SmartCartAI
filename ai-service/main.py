from fastapi import FastAPI
from pydantic import BaseModel

from app.matcher import find_matches

app = FastAPI()


class MatchRequest(BaseModel):
    blinkit_products: list[dict]
    zepto_products: list[dict]


@app.get("/")
def home():
    return {
        "message": "SmartCart AI Service Running"
    }


@app.post("/match")
def match_products(request: MatchRequest):

    print(
        "AI RECEIVED BLINKIT:",
        len(request.blinkit_products)
    )

    print(
        "AI RECEIVED ZEPTO:",
        len(request.zepto_products)
    )

    matches = find_matches(
        request.blinkit_products,
        request.zepto_products
    )

    print(
        "AI FOUND MATCHES:",
        len(matches)
    )

    return matches