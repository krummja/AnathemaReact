from __future__ import annotations
from beartype.typing import *
if TYPE_CHECKING:
    pass

from pathlib import Path
from pydantic import AnyHttpUrl
from pydantic import BaseSettings
from pydantic import validator


ROOT = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):

    # List CORS origins so that we can bridge frontend and backend
    BACKEND_CORS_ORIGINS: list[AnyHttpUrl] = cast(list[AnyHttpUrl], [
        'http://localhost:3000',  # frontend
        'http://localhost:8001',  # backend
    ])

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: str | list[str]) -> list[str] | str:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    class Config:
        case_sensitive = True


settings = Settings()
