import os

from dotenv import load_dotenv

load_dotenv()


class EnvService:
    JWT_SECRET = os.getenv("JWT_SECRET", default="jwtsecret")
    API_SECRET = os.getenv("API_SECRET", default="internalapiprotection")
    PUBLIC_ENDPOINTS_PATH = os.getenv("PUBLIC_ENDPOINTS_PATH", default="storage")
    INTERNAL_ENDPOINTS_PATH = os.getenv("INTERNAL_ENDPOINTS_PATH", default="internal")
    DATABASE_NAME = os.getenv("DATABASE_NAME", default="cb")
    DATABASE_USER = os.getenv("DATABASE_USER", default="postgres")
    DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD", default="admin")


envService = EnvService()
