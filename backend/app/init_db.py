import os
from dotenv import load_dotenv
from sqlalchemy.engine.url import make_url
from sqlalchemy import create_engine, text
import pymysql

load_dotenv()


def create_mysql_database_if_not_exists():
    db_url = os.getenv("DATABASE_URL")
    if not db_url or not db_url.startswith("mysql"):
        return
    url_obj = make_url(db_url)
    db_name = url_obj.database
    user = url_obj.username
    password = url_obj.password
    host = url_obj.host
    port = url_obj.port or 3306
    # Conecta sem banco para criar o banco
    conn = pymysql.connect(host=host, user=user, password=password, port=port)
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                f"CREATE DATABASE IF NOT EXISTS `{db_name}` DEFAULT CHARACTER SET utf8mb4;"
            )
            print(f"Banco de dados '{db_name}' garantido.")
    finally:
        conn.close()


def main():
    create_mysql_database_if_not_exists()
    # Só importar get_engine/Base depois de garantir que o banco existe
    from app.database import get_engine, Base
    import app.models  # Garante que todos os modelos são registrados
    engine = get_engine()
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("All tables created.")


if __name__ == "__main__":
    main()
