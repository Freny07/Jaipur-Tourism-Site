# Jaipur Tourism Java Backend

This is a simple Spring Boot backend for the Jaipur Tourism website.

## Requirements
- Java 17 or higher
- Maven
- MySQL Server

## Database Setup
1. Open your MySQL terminal or Workbench.
2. Create the database: `CREATE DATABASE jaipur_tourism;`
3. Update `src/main/resources/application.properties` with your MySQL `username` and `password` if different from the default (root/no password).

## How to Run
1. Navigate to this directory: `cd backend-java`
2. Run the application: `mvn spring-boot:run`

The server will start on `http://localhost:8080`.

## API Endpoints
- `POST /api/signup`: Registers a new user.
- `POST /api/login`: Authenticates a user.
- `GET /api/users`: Lists all registered users (for testing).

## Integration
The frontend in `src/pages/Profile.jsx` is already configured to talk to this backend.
