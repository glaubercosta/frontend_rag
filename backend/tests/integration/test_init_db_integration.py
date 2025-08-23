import os
import subprocess
import pymysql
from dotenv import load_dotenv
from sqlalchemy.engine.url import make_url
import pytest

def test_init_db_integration():
    """Testa o fluxo real de criação de banco e tabelas via init_db.py"""
    load_dotenv()
    db_url = os.getenv('DATABASE_URL')
    url = make_url(db_url)
    user = url.username
    password = url.password
    host = url.host
    port = url.port or 3306
    db_name = url.database

    # Garante que o banco não existe antes do teste
    conn = pymysql.connect(host=host, user=user, password=password, port=port)
    try:
        with conn.cursor() as cursor:
            cursor.execute(f"DROP DATABASE IF EXISTS `{db_name}`;")
    finally:
        conn.close()

    # Executa o script init_db.py
    result = subprocess.run(['python', 'app/init_db.py'], capture_output=True, text=True)
    print(result.stdout)
    assert result.returncode == 0, f"init_db.py falhou: {result.stderr}"

    # Verifica se o banco foi criado
    conn = pymysql.connect(host=host, user=user, password=password, port=port)
    try:
        with conn.cursor() as cursor:
            cursor.execute('SHOW DATABASES;')
            dbs = [row[0] for row in cursor.fetchall()]
            assert db_name in dbs, f"Banco {db_name} não foi criado"
    finally:
        conn.close()
