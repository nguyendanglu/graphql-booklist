## Why

Currently, the book list is accessible without any authentication. This change allows users to securely log into the system before they can view or manage the book list, enabling user-specific data tracking and securing the main application data from unauthorized access.

## What Changes

- A new login page will be displayed as the default landing route if the user is not authenticated.
- After a successful login, the user will be redirected to the book list view.
- The React application (`client/`) will be updated to manage authentication state and protect routes.
- The GraphQL backend (`server/`) will be updated to handle authentication requests (e.g., verifying credentials and issuing tokens) and protect existing queries/mutations.

## Capabilities

### New Capabilities
- `user-auth`: Covers user login, token generation (JWT), and authentication state management.

### Modified Capabilities

## Impact

- **Client Code**: React routing, state management, and the Apollo Link will be updated to pass authentication tokens.
- **Server Code**: GraphQL resolvers, schema (new login mutation, user type), and express middleware will be added for user authentication.
- **Dependencies**: May require adding packages like `jsonwebtoken` and `bcryptjs` on the server, and potentially something like `react-router-dom` on the client if not already used.
