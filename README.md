multi-org-task-manager/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudStorage.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── authorization.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── organization.routes.js
│   │   ├── project.routes.js
│   │   ├── task.routes.js
│   │   └── file.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── organization.controller.js
│   │   ├── project.controller.js
│   │   ├── task.controller.js
│   │   └── file.controller.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── organization.service.js
│   │   ├── project.service.js
│   │   ├── task.service.js
│   │   ├── file.service.js
│   │   └── notification.service.js (bonus)
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── validators.js
│   │   └── constants.js
│   └── index.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
│   ├── auth.test.js
│   ├── project.test.js
│   └── task.test.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
we need to update the structure to be like this send the command please 