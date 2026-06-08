# OGEFREM Representation — WELL
Shipment Management System

A production-ready Next.js 14 application for managing shipment workflows, financial calculations, Google Drive document storage, and DOCX monthly report generation.

## Features
- **Strict Workflow Enforcement**: 5-step wizard (New → Feri Added → Paid → AD Generated → Completed)
- **Financial Calculations**: Deterministic server-side math with EUR → USD conversion and revenue splitting
- **Google Drive Integration**: Auto-creates folder hierarchy (`Year/Month/Client_Feri`) and handles versioned AD uploads
- **Server-Side File Gen**: Exports dynamic DOCX reports using `docx` library
- **Clean Architecture**: Next.js App Router, Prisma ORM, strict Zod validation

---

## 🚀 Setup Instructions

### 1. Requirements
- Node.js 18+
- PostgreSQL database (e.g., Neon serverless Postgres)
- Google Cloud Project with a Service Account

### 2. Google Cloud Setup (Drive API)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one.
3. Enable **Google Drive API**.
4. Create a **Service Account**:
   - Go to IAM & Admin > Service Accounts > Create Service Account.
   - Generate a JSON key for this account.
5. Create a **Root Folder** in your Google Drive:
   - Name it `OGEFREM-WELL`
   - **Share this folder** with the Service Account email (give it *Editor* access).
   - Copy the Folder ID from the URL (e.g., `1aBcDeFGhI...`).

### 3. Environment Variables
Copy the template and fill in your values:
```bash
cp .env.example .env.local
```
Fill in the `DATABASE_URL` and all the `GOOGLE_` variables using the JSON key downloaded in Step 2.

### 4. Database Setup
Run Prisma migrations to create the tables in your PostgreSQL database:
```bash
npx prisma migrate dev --name init
```

### 5. Running the App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Architecture

- `/app`: Next.js App Router (pages and API routes)
- `/components`: Shared React components (UI)
- `/lib`: Utilities, Error Handling, Prisma Client, Zod Schemas
- `/server/services`: Core business logic (Drive API, Financial Math, Workflow rules)
- `/prisma`: Database schema and migrations
