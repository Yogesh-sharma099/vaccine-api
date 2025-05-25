# Vaccine Registration API

## Overview
This project is a Vaccine Registration API built with Node.js and TypeScript. It provides functionalities for user registration, authentication, and slot management for vaccination appointments. The API also includes admin functionalities for managing users and monitoring vaccination statistics.

## Endpoints

### Auth
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login a user
- `POST /api/auth/admin/login` – Login an admin

### Slots
- `GET /api/slots?date=YYYY-MM-DD` – Retrieve available slots for a specific date
- `POST /api/slots/register` – Register for a vaccination slot
- `PUT /api/slots/update` – Update a registered slot (must be more than 24 hours before the appointment)

### Admin
- `GET /api/admin/users` – Filter users by age, pincode, or vaccination status
- `GET /api/admin/slots?date=YYYY-MM-DD` – Retrieve statistics for vaccination slots on a specific date

## Jobs
- A cron job runs every hour to automatically update users' vaccination statuses based on their registered slots.

## Database Seeding
To seed the database with dummy user data, run:
```
ts-node src/seed/userSeeder.ts
```
This will insert 1 million dummy users into the database for testing purposes.

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

## Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your MongoDB connection string in the `.env` file.
4. Start the application:
   ```
   npm start
   ```

## Testing
The project includes a `tests` directory for unit and integration tests. Ensure to write tests for your controllers and routes to maintain code quality.

## License
This project is licensed under the MIT License.