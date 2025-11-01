# Multi-Org Task Manager – Technical Documentation

## Overview
A RESTful API system for managing tasks, projects, and users across multiple organizations with role-based access, file uploads, and real-time notifications.

## Tech Stack
| Layer | Technology |
|-------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT (JSON Web Token) |
| File Storage | Cloudinary |
| Deployment | Vercel |
| Version Control | GitHub |

## Core Modules
1. **Authentication** — Register & Login endpoints with JWT auth  
2. **Organization Management** — CRUD and employee invitation system  
3. **Project Management** — Scoped project operations per organization  
4. **Task Management** — Role-based task creation and assignment  
5. **File Upload System** — File upload & storage using Cloudinary  
6. **Notifications System** — Alerts for new task assignments  
7. **Bonus Features** — Search, pagination, role changes, analytics  

## Roles
- **Admin:** Can manage organization, users, projects, tasks, and view stats  
- **Employee:** Can view & update assigned tasks, upload files, view notifications  

## Setup Instructions
```bash
git clone https://github.com/your-username/multi-org-task-manager.git
cd multi-org-task-manager
npm install
npx prisma db push
npm run dev
```

## Production Deployment
Base API URL (Production):
``` https://multi-organization-task-manager-58f.vercel.app/api ```
