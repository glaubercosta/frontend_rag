# Git Commit Documentation

## Commit message (English)

feat(auth): implement simulated authentication flow and update docs for v0.2.0

- Add AuthForm and AuthService with simulated login, signup, and password reset
- Add automated tests for AuthForm (login, signup, error handling)
- Add visual feedback for authentication success/error
- Refactor input components for reuse
- Update documentation and TDD incremental plan to reflect authentication milestone
- Only user `user@exemplo.com` with password `correta` is accepted (simulation)
- Signup does not persist new users
- Session persistence and real backend integration not included in this version

See CHANGELOG.md for details.
