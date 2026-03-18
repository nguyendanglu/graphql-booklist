## 1. Database and Server Schema Setup

- [x] 1.1 Create `User` Mongoose model (`server/models/user.js`) with username and hashed password
- [x] 1.2 Update GraphQL schema (`server/schema/schema.js`) with `UserType` and `AuthPayload` types
- [x] 1.3 Add `Mutation` for `login` resolving to `AuthPayload` containing JWT token
- [x] 1.4 Add `Mutation` for `register` (optional helper to create first user)

## 2. Server Authentication Logic

- [x] 2.1 Install `bcryptjs` and `jsonwebtoken` in `server/package.json`
- [x] 2.2 Implement JWT token generation and verification logic
- [x] 2.3 Add Express middleware to decode JWT and attach user to GraphQL context

## 3. Client Routing Setup

- [x] 3.1 Install `react-router-dom` in `client/package.json` if not present
- [x] 3.2 Refactor `App.js` to use React Router with paths `/login` and `/books`
- [x] 3.3 Create `AuthContext` to provide current user state across the app

## 4. Client Features & Integration

- [x] 4.1 Create `Login` React component with username/password form
- [x] 4.2 Add GraphQL `LOGIN_MUTATION` in the frontend
- [x] 4.3 Configure Apollo Client (`ApolloLink`) to include JWT token in headers
- [x] 4.4 Protect the primary route to redirect unauthenticated users to `/login`
