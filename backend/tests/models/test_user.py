import pytest
from app.models import User

def test_create_user():
    user = User(email="test@example.com", password_hash="hash", name="Test")
    assert user.email == "test@example.com"
    assert user.password_hash == "hash"
    assert user.name == "Test"
