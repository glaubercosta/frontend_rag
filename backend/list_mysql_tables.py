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
db_name = url.database

conn = pymysql.connect(host=host, user=user, password=password, port=port, database=db_name)
try:
    with conn.cursor() as cursor:
        cursor.execute('SHOW TABLES;')
        tables = cursor.fetchall()
        print(f'Tabelas no banco {db_name}:')
        for table in tables:
            print('-', table[0])
finally:
    conn.close()
