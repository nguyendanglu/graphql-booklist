## Context

The GraphQL Booklist project currently has no authentication barrier, meaning anyone can view and manage books. To secure the app and prepare for user-specific features, we need a login mechanism. Both the React client and the Express/GraphQL server need updates to support this.

## Goals / Non-Goals

**Goals:**
- Implement a simple JWT-based authentication system.
- Secure the client-side routes (redirect to login if not authenticated).
- Protect server-side GraphQL operations.

**Non-Goals:**
- Implementing OAuth or third-party login (e.g., Google/Facebook).
- Implementing password recovery or email verification for this initial change.

## Decisions

- **JWT for Session**: We will use JSON Web Tokens (JWT) stored in `localStorage` for the client. This is simple and fits standard React/GraphQL applications.
- **Bcrypt for Passwords**: We will use `bcryptjs` on the server for hashing user passwords securely.
- **React Router & AuthContext**: We will implement client-side routing and an `AuthContext` to manage the currently logged-in user state across the React app.

## Risks / Trade-offs

- [Token Storage Security] → Storing JWT in `localStorage` is vulnerable to XSS. *Mitigation*: We will keep the token simple for now, as it's a lightweight app, but acknowledge this limitation compared to HttpOnly cookies.
- [Database Schema Changes] → The database needs a `User` model. *Mitigation*: A new Mongoose schema for `User` will be added, and an initial "register" or seed script might be necessary to create the first user to log in.
