# Leave Management System

A full-stack Leave Management System built with HTML/CSS/JS, Node.js, Express, and MySQL.

## Tech Stack
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Auth:** JWT (JSON Web Tokens)

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Edit `config/.env` with your MySQL credentials and JWT secret.

### 3. Setup database
```sql
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### 4. Run the server
```bash
npm run dev
```

Visit `http://localhost:5000`

## Default Login Credentials
| Role | Email | Password |
|---|---|---|
| Admin | admin@company.com | admin123 |
| Manager | manager@company.com | manager123 |
| Employee | employee@company.com | employee123 |

> Run `database/seed.sql` and use bcrypt to hash these passwords before inserting.

## Features
- Employee: apply, view, cancel leaves; check balance
- Manager: approve/reject leave requests; view team calendar
- Admin: manage users, leave types, reports

## Project Structure
```
leave-management-system/
├── server.js
├── package.json
├── config/          db.js, .env
├── models/          4 files
├── routes/          4 files
├── controllers/     4 files
├── middleware/      2 files
├── utils/           2 files
├── database/        schema.sql, seed.sql
└── frontend/        pages/, css/, js/, assets/
```
