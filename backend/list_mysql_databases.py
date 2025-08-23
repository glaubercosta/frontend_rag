import os
from dotenv import load_dotenv
import pymysql
from sqlalchemy.engine.url import make_url

load_dotenv()

db_url = os.getenv('DATABASE_URL')
url = make_url(db_url)
user = url.username
password = url.password
host = url.host
port = url.port or 3306

conn = pymysql.connect(host=host, user=user, password=password, port=port)
try:
    with conn.cursor() as cursor:
        # Criar banco db_test se não existir
        cursor.execute("CREATE DATABASE IF NOT EXISTS db_test DEFAULT CHARACTER SET utf8mb4;")
        print("Banco 'db_test' garantido.")
        # Listar bancos
        cursor.execute('SHOW DATABASES;')
        dbs = cursor.fetchall()
        print('Bancos disponíveis:')
        for db in dbs:
            print('-', db[0])
finally:
    conn.close()
