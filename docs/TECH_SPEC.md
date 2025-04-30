# Technical Specification for ContactsApp

## Overview

ContactsApp is a full-stack application that allows users to register, authenticate, and manage their personal and professional contacts.

---

## Backend (.NET 8, ASP.NET Core)

### Key Classes

#### `Contact`

- Represents a contact.
- Key fields: `FirstName`, `LastName`, `Email`, `Password`, `PhoneNumber`, `BirthDate`, `Category`, `SubCategory`, `CustomSubCategory`.
- `SubCategory` is only used when the chosen `Category`'s name is "Work".
- `CustomSubCategory` is only used when the chosen `Category`'s name is "Other".

#### `Category` and `SubCategory`

- Lookup tables for organizing contact types.
- Categories can have related `SubCategories`.

#### `Seeder`

- Adds initial data into the database.

#### `GlobalExceptionHandlerMiddleware`

- Handles exceptions to prevent crashes

#### `ContactService`

- Contact management logic.
- Implements CRUD operations and data validation.

#### `UserService`

- Manages user registration and authentication.

### API Endpoints

#### User

- `POST /api/user/register` - Adds a new User in the database after validating the data (checking if the username is not already taken).

  Body:

  ```JSON
  {
    "username": "string",
    "password": "string"
  }
  ```

- `POST /api/user/login` - Creates a JWT token for the user after validating the username and password.

  Body:

  ```JSON
  {
    "username": "string",
    "password": "string"
  }
  ```

#### Contacts

- `POST /api/contacts` - Creates a new contact.

  Requires authentication.

  Body:

  ```JSON
  {
    "firstName": "string",
    "lastName": "string",
    "email": "user@example.com",
    "password": "password123",
    "category": "string",
    "subCategory": "string",
    "customSubCategory": "string",
    "phoneNumber": "string",
    "birthDate": "yyyy-MM-dd"
  }
  ```

- `GET /api/contacts` - Retrieves all contacts' summaries.

  Response:

  ```JSON
  [
    {
      "id": 1,
      "firstName": "string",
      "lastName": "string",
      "category": "string"
    },
    {
      "id": 2,
      "firstName": "string",
      "lastName": "string",
      "category": "string"
    },
    ...
  ]
  ```

- `GET /api/contacts/{id}` - Retrieves a contact's data.

  Response:

  ```JSON
  {
    "id": 1,
    "firstName": "string",
    "lastName": "string",
    "email": "user@example.com",
    "password": "password123",
    "category": "string",
    "subCategory": "string",
    "customSubCategory": "string",
    "phoneNumber": "string",
    "birthDate": "yyyy-MM-dd"
  }
  ```

- `PUT /api/contacts/{id}` - Updates a contact's data.

  Requires authentication.

  Body:

  ```JSON
  {
    "firstName": "string",
    "lastName": "string",
    "email": "user@example.com",
    "password": "password123",
    "category": "string",
    "subCategory": "string",
    "customSubCategory": "string",
    "phoneNumber": "string",
    "birthDate": "yyyy-MM-dd"
  }
  ```

- `DELETE /api/contacts/{id}` - Deletes a contact.

  Requires authentication.

---

## Frontend (React + TypeScript + Vite)

### Token Management

- JWT is stored in `sessionStorage` upon login.
- Used for authenticated requests.

### Key Components

#### `UserService.ts`

- Handles HTTP requests to the backend API related to user registration and authentication.

#### `LoginForm.tsx`, `RegisterForm.tsx`

- Basic authentication forms.

#### `ContactService.ts`

- Handles HTTP requests to the backend API related to retrieving and managing contacts.

#### `AddContactForm.tsx`

- Form for adding a contact.
- Conditionally shows subcategory fields based on selected category.

#### `UpdateContactForm.tsx`

- Form for updating an existing contact.
- The input fields are pre-filled with current values.
- Conditionally shows subcategory fields based on selected category.

#### `ContactDetailsDisplay.tsx`

- Shows all fields of a specific contact.

#### `ContactDetails.tsx`

- Shows `UpdateContactForm.tsx` for logged in users and `ContactDetailsDisplay.tsx` for others.

#### `ContactEntry.tsx`

- Displays a single contact's summary.
- Used in `ContactList.tsx` to form a list of all contacts.
- Has a "Details" button redirecting to `ContactDetails.tsx` for the selected contact.
- Shows a "Delete" button for logged in users.

---

## Used Libraries

### Backend

- ASP.NET Core
- Entity Framework Core
- Microsoft.AspNetCore.Authentication.JwtBearer
- Microsoft.IdentityModel.Tokens
- Swagger UI

### Frontend

- React
- TypeScript
- Vite
- react-hook-form
- yup
- react-router-dom
- axios

---

## Compilation & Running

### Backend

```bash
# From the root backend directory (ContactsApp/backend/ContactsApp)
$ dotnet build
$ dotnet run --launch-profile https
```

The backend runs on `https://localhost:7065`

### Frontend

```bash
# From the root frontend directory (ContactsApp/frontend/contacts-app)
$ npm install
$ npm run dev
```

The frontend runs on `http://localhost:5173`

---

## Notes

- Database is automatically created and seeded on app startup.
- To reseed the database, delete contacts.db, contacts.db-shm, contacts.db-wal from the backend's root directory (ContactsApp/backend/ContactsApp) and start the backend.
