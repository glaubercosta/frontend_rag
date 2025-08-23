import os
from dotenv import load_dotenv
load_dotenv()

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

Base = declarative_base()

# Função para criar engine apenas quando chamado

def get_engine():
    DATABASE_URL = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        # fallback para SQLite local se não definido
        DATABASE_URL = "sqlite:///./app/test.db"
    # Ajuste para SQLite: caminho relativo deve ser relativo ao diretório do projeto
    if DATABASE_URL.startswith("sqlite") and not DATABASE_URL.startswith("sqlite:///./app/"):
        DATABASE_URL = "sqlite:///./app/test.db"
    return create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
    )

# SessionLocal pode ser criado sob demanda também

def get_session_local():
    engine = get_engine()
    return sessionmaker(autocommit=False, autoflush=False, bind=engine)
