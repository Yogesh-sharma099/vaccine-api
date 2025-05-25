# Vaccine Registration API

## Endpoints

### Auth
- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login user
- `POST /api/auth/admin/login` – Login admin

### Slots
- `GET /api/slots?date=YYYY-MM-DD` – Available slots
- `POST /api/slots/register` – Register for a slot
- `PUT /api/slots/update` – Update slot (>24hr before)

### Admin
- `GET /api/admin/users` – Filter by age/pincode/status
- `GET /api/admin/slots?date=YYYY-MM-DD` – Slot statistics

## Jobs
- Cron runs every hour: updates users' vaccinationStatus

## Seed
Run `ts-node src/seed/userSeeder.ts` to insert 1M dummy users.

## Env
Use `.env` to store:
