from __future__ import annotations
from beartype.typing import *
if TYPE_CHECKING:
    pass

import http
from fastapi import FastAPI
from fastapi import APIRouter
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

from pydantic import BaseModel

from anathema.core.config import settings

BASEPATH = Path(__file__).resolve().parent


root_router = APIRouter()
app = FastAPI()


if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )


class ButtonResponse(BaseModel):
    status: int
    data: dict[str, Any] | None = None


@root_router.get("/", status_code=200)
async def root(req: Request):
    return


@root_router.get("/button", status_code=200)
@root_router.post("/button", status_code=200)
async def button(req: Request) -> ButtonResponse:
    if req.method == 'GET':
        res = ButtonResponse(
            status=200,
            data={
                'value': 100,
            }
        )
    elif req.method == 'POST':
        res = ButtonResponse(status=200)
    else:
        res = ButtonResponse(status=http.HTTPStatus.METHOD_NOT_ALLOWED)

    print(res)
    return res


app.include_router(root_router)


def start() -> None:
    import uvicorn
    uvicorn.run(
        "anathema.main:app",
        host="0.0.0.0",
        port=8001,
        log_level="debug",
        reload=True
    )
