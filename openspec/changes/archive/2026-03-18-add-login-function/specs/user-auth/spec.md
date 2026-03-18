## ADDED Requirements

### Requirement: User Authentication System
The system MUST provide a secure way for users to log in before accessing the core application features.

#### Scenario: Successful Login
- **WHEN** user provides valid credentials (username/password) to the login form
- **THEN** the system issues a valid JWT token and redirects the user to the book list page

#### Scenario: Failed Login
- **WHEN** user provides invalid credentials
- **THEN** the system displays an error message on the login form and prevents access to the book list

### Requirement: Protected Routes
The client application MUST protect internal routes from unauthorized access.

#### Scenario: Unauthenticated Access Attempt
- **WHEN** an unauthenticated user attempts to directly access the book list route
- **THEN** the system redirects the user to the login page
