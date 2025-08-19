# Changelog

## [v0.2.0] - 2025-08-17
### Added
- Simulated authentication flow (login, signup, password reset) with AuthForm and AuthService
- Automated tests for AuthForm (login, signup, error handling)
- Visual feedback for authentication success/error
- Documentation and TDD incremental plan updated to reflect authentication milestone

### Changed
- Refactored input components for reuse in authentication forms

### Notes
- Only the user `user@exemplo.com` with password `correta` is accepted in the simulated login
- Signup does not persist new users (simulation only)
- Session persistence and real backend integration are not implemented in this version
