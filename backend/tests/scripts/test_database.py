import os
import pytest
from unittest import mock


def test_get_engine_mysql(monkeypatch):
    monkeypatch.setenv('DATABASE_URL', 'mysql+pymysql://user:pass@localhost:3306/testdb')
    from app.database import get_engine
    engine = get_engine()
    assert 'mysql' in str(engine.url)


def test_get_session_local(monkeypatch):
    monkeypatch.setenv('DATABASE_URL', 'sqlite:///./app/test.db')
    from app.database import get_session_local
    SessionLocal = get_session_local()
    session = SessionLocal()
    assert session is not None
    session.close()


def test_base_is_declarative():
    from app.database import Base
    assert hasattr(Base, 'metadata')
