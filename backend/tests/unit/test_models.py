import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models import User, Workspace, WorkspaceMember, LLM, DatabaseConnection
from datetime import datetime

@pytest.fixture(scope="module")
def sqlite_engine():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    yield engine
    engine.dispose()

@pytest.fixture(scope="function")
def db_session(sqlite_engine):
    Session = sessionmaker(bind=sqlite_engine)
    session = Session()
    yield session
    session.close()


def test_user_model_insertion(db_session):
    user = User(email="test@example.com", password_hash="hash", name="Test User")
    db_session.add(user)
    db_session.commit()
    retrieved = db_session.query(User).filter_by(email="test@example.com").first()
    assert retrieved is not None
    assert retrieved.email == "test@example.com"
    assert retrieved.name == "Test User"

def test_user_model_unique_email(db_session):
    user1 = User(email="unique@example.com", password_hash="hash1")
    user2 = User(email="unique@example.com", password_hash="hash2")
    db_session.add(user1)
    db_session.commit()
    db_session.add(user2)
    with pytest.raises(Exception):
        db_session.commit()

def test_workspace_insertion_and_relationship(db_session):
    user = User(email="wowner@example.com", password_hash="hash")
    db_session.add(user)
    db_session.commit()
    ws = Workspace(name="Workspace 1", owner_id=user.id)
    db_session.add(ws)
    db_session.commit()
    retrieved = db_session.query(Workspace).filter_by(name="Workspace 1").first()
    assert retrieved is not None
    assert retrieved.owner_id == user.id
    assert retrieved.owner.email == "wowner@example.com"

def test_workspace_member_insertion_and_relationship(db_session):
    user = User(email="member@example.com", password_hash="hash")
    owner = User(email="owner2@example.com", password_hash="hash")
    db_session.add_all([user, owner])
    db_session.commit()
    ws = Workspace(name="Workspace 2", owner_id=owner.id)
    db_session.add(ws)
    db_session.commit()
    member = WorkspaceMember(workspace_id=ws.id, user_id=user.id, role="editor")
    db_session.add(member)
    db_session.commit()
    retrieved = db_session.query(WorkspaceMember).filter_by(user_id=user.id, workspace_id=ws.id).first()
    assert retrieved is not None
    assert retrieved.role == "editor"
    assert retrieved.user.email == "member@example.com"
    assert retrieved.workspace.name == "Workspace 2"

def test_llm_insertion_and_relationship(db_session):
    owner = User(email="llmowner@example.com", password_hash="hash")
    db_session.add(owner)
    db_session.commit()
    ws = Workspace(name="Workspace LLM", owner_id=owner.id)
    db_session.add(ws)
    db_session.commit()
    llm = LLM(workspace_id=ws.id, name="GPT-4", provider="OpenAI", api_key="secret")
    db_session.add(llm)
    db_session.commit()
    retrieved = db_session.query(LLM).filter_by(name="GPT-4").first()
    assert retrieved is not None
    assert retrieved.workspace_id == ws.id
    assert retrieved.workspace.name == "Workspace LLM"

def test_database_connection_insertion_and_relationship(db_session):
    owner = User(email="dbowner@example.com", password_hash="hash")
    db_session.add(owner)
    db_session.commit()
    ws = Workspace(name="Workspace DB", owner_id=owner.id)
    db_session.add(ws)
    db_session.commit()
    dbconn = DatabaseConnection(
        workspace_id=ws.id,
        type="mysql",
        host="localhost",
        port=3306,
        user="root",
        password="pw",
        db_name="testdb"
    )
    db_session.add(dbconn)
    db_session.commit()
    retrieved = db_session.query(DatabaseConnection).filter_by(db_name="testdb").first()
    assert retrieved is not None
    assert retrieved.workspace_id == ws.id
    assert retrieved.workspace.name == "Workspace DB"
