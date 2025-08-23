import os
import pytest
from unittest import mock
import importlib

@pytest.fixture(autouse=True)
def set_env(monkeypatch):
    monkeypatch.setenv('DATABASE_URL', 'mysql+pymysql://user:pass@localhost:3306/testdb')


def test_load_dotenv(monkeypatch):
    # Mocka load_dotenv antes do import do módulo
    with mock.patch('dotenv.load_dotenv') as mock_load:
        import app.init_db
        importlib.reload(app.init_db)
        assert mock_load.called  # Aceita múltiplas chamadas


def test_create_mysql_database_if_not_exists(monkeypatch):
    # Mock para create_engine e conexão
    with mock.patch('app.init_db.create_engine') as mock_engine:
        mock_conn = mock.MagicMock()
        mock_engine.return_value.connect.return_value.__enter__.return_value = mock_conn
        from app.init_db import create_mysql_database_if_not_exists
        create_mysql_database_if_not_exists()
        assert mock_engine.called
        assert mock_conn.execute.called


def test_main_runs(monkeypatch):
    # Mocka o import de app.database para garantir que main executa sem erro
    with mock.patch('app.init_db.create_mysql_database_if_not_exists') as mock_create_db, \
         mock.patch('app.init_db.create_engine'), \
         mock.patch('app.init_db.make_url'), \
         mock.patch.dict('sys.modules', {'app.database': mock.MagicMock()}):
        from app.init_db import main
        main()
        assert mock_create_db.called
