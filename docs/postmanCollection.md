# Default module

Base URLs: http://localhost:5000/api

# Authentication

- HTTP Authentication, scheme: bearer

# Authentication

## POST Register

POST /auth/register

> Body Parameters

```json
{
  "name": "Nada Ahmed",
  "email": "nada@example.com",
  "password": "123456"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|
|Content-Type|header|string| no |none|
|body|body|object| no |none|

> Response Examples

> 201 Response

```json
{
  "message": "string",
  "token": "string",
  "user": {
    "id": 0,
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "organizationId": null,
    "createdAt": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### Responses Data Schema

HTTP Status Code **201**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» token|string|true|none||none|
|» user|object|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» email|string|true|none||none|
|»» password|string|true|none||none|
|»» role|string|true|none||none|
|»» organizationId|null|true|none||none|
|»» createdAt|string|true|none||none|

## POST Login

POST /auth/login

> Body Parameters

```json
{
  "email": "salma@example.com",
  "password": "123456"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|
|Content-Type|header|string| no |none|
|body|body|object| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PUT Role Change Endpoint (Admin ↔ Employee)

PUT /users/role

> Body Parameters

```json
{
  "userId": 3,
  "newRole": "admin"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> 403 Response

```json
{
  "message": "string"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|none|Inline|

### Responses Data Schema

HTTP Status Code **403**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|

# Organization

## POST Create Organization (Admin only)

POST /organizations

> Body Parameters

```json
{
  "name": "Tech Technologies"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> 201 Response

```json
{
  "message": "string",
  "organization": {
    "id": 0,
    "name": "string",
    "createdAt": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### Responses Data Schema

HTTP Status Code **201**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» organization|object|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» createdAt|string|true|none||none|

## GET Fetch All Organizations

GET /organizations

> Response Examples

> 200 Response

```json
[
  {
    "id": 0,
    "name": "string",
    "createdAt": "string",
    "users": [
      {
        "id": 0,
        "name": "string",
        "email": "string",
        "password": "string",
        "role": "string",
        "organizationId": 0,
        "createdAt": "string"
      }
    ]
  }
]
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» id|integer|true|none||none|
|» name|string|true|none||none|
|» createdAt|string|true|none||none|
|» users|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» email|string|true|none||none|
|»» password|string|true|none||none|
|»» role|string|true|none||none|
|»» organizationId|integer|true|none||none|
|»» createdAt|string|true|none||none|

## GET Get Organization by ID

GET /organizations/2

> Response Examples

> 403 Response

```json
{
  "message": "string"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|none|Inline|

### Responses Data Schema

HTTP Status Code **403**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|

## POST Add Emplooyee

POST /organizations/add-employee

> Body Parameters

```json
{
  "organizationId": 1,
  "employeeName": "Layla",
  "employeeEmail": "layla@example.com",
  "password": "123456"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> 500 Response

```json
{
  "message": "string",
  "error": "string"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **500**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» error|string|true|none||none|

## GET Get organization statistics

GET /organizations/stats

> Response Examples

> 400 Response

```json
{
  "message": "string"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **400**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|

# Project Management

## POST Create Project (Admin only)

POST /projects

> Body Parameters

```json
{
  "name": "Eco Recycling Management System",
  "description": "Develop backend and frontend for Ghazala recycling platform"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> 201 Response

```json
{
  "message": "string",
  "project": {
    "id": 0,
    "name": "string",
    "description": "string",
    "organizationId": 0,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### Responses Data Schema

HTTP Status Code **201**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» project|object|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» description|string|true|none||none|
|»» organizationId|integer|true|none||none|
|»» createdAt|string|true|none||none|
|»» updatedAt|string|true|none||none|

## GET Get All Projects (Org members)

GET /projects

> Response Examples

> 200 Response

```json
[
  {
    "id": 0,
    "name": "string",
    "description": "string",
    "organizationId": 0,
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» id|integer|false|none||none|
|» name|string|false|none||none|
|» description|string|false|none||none|
|» organizationId|integer|false|none||none|
|» createdAt|string|false|none||none|
|» updatedAt|string|false|none||none|

## GET Get Single Project

GET /projects/1

> Response Examples

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "organizationId": 0,
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» id|integer|true|none||none|
|» name|string|true|none||none|
|» description|string|true|none||none|
|» organizationId|integer|true|none||none|
|» createdAt|string|true|none||none|
|» updatedAt|string|true|none||none|

## PUT Update Project (Admin only)

PUT /projects/1

> Body Parameters

```json
{
  "name": "Updated Project Name",
  "description": "Updated project details"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> 200 Response

```json
{
  "message": "string",
  "updated": {
    "id": 0,
    "name": "string",
    "description": "string",
    "organizationId": 0,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» updated|object|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» description|string|true|none||none|
|»» organizationId|integer|true|none||none|
|»» createdAt|string|true|none||none|
|»» updatedAt|string|true|none||none|

## DELETE Delete Project (Admin only)

DELETE /projects/1

> Response Examples

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "organizationId": 0,
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» id|integer|true|none||none|
|» name|string|true|none||none|
|» description|string|true|none||none|
|» organizationId|integer|true|none||none|
|» createdAt|string|true|none||none|
|» updatedAt|string|true|none||none|

# Task Management

## POST Create Task (Admin only)

POST /tasks

> Body Parameters

```json
{
  "title": "Data Normalization",
  "description": "We are hiring for the new roles ",
  "projectId": 2,
  "assigneeId": 2
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> 201 Response

```json
{
  "message": "string",
  "task": {
    "id": 0,
    "title": "string",
    "description": "string",
    "status": "string",
    "projectId": 0,
    "assigneeId": 0,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### Responses Data Schema

HTTP Status Code **201**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» task|object|true|none||none|
|»» id|integer|true|none||none|
|»» title|string|true|none||none|
|»» description|string|true|none||none|
|»» status|string|true|none||none|
|»» projectId|integer|true|none||none|
|»» assigneeId|integer|true|none||none|
|»» createdAt|string|true|none||none|
|»» updatedAt|string|true|none||none|

## GET Task Pagination and Search

GET /tasks

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|page|query|string| no |none|
|limit|query|string| no |none|
|title|query|string| no |none|
|status|query|string| no |none|

> Response Examples

> 200 Response

```json
[
  {
    "id": 0,
    "title": "string",
    "description": "string",
    "status": "string",
    "projectId": 0,
    "assigneeId": 0,
    "createdAt": "string",
    "updatedAt": "string",
    "project": {
      "id": 0,
      "name": "string",
      "description": "string",
      "organizationId": 0,
      "createdAt": "string",
      "updatedAt": "string"
    },
    "assignee": {
      "id": 0,
      "name": "string",
      "email": "string",
      "password": "string",
      "role": "string",
      "organizationId": null,
      "createdAt": "string"
    }
  }
]
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» id|integer|false|none||none|
|» title|string|false|none||none|
|» description|string|false|none||none|
|» status|string|false|none||none|
|» projectId|integer|false|none||none|
|» assigneeId|integer|false|none||none|
|» createdAt|string|false|none||none|
|» updatedAt|string|false|none||none|
|» project|object|false|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» description|string|true|none||none|
|»» organizationId|integer|true|none||none|
|»» createdAt|string|true|none||none|
|»» updatedAt|string|true|none||none|
|» assignee|object|false|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» email|string|true|none||none|
|»» password|string|true|none||none|
|»» role|string|true|none||none|
|»» organizationId|null|true|none||none|
|»» createdAt|string|true|none||none|

## PUT Update Task

PUT /tasks/1

> Body Parameters

```json
{
  "status": "in-progress"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> 200 Response

```json
{
  "message": "string",
  "updatedTask": {
    "id": 0,
    "title": "string",
    "description": "string",
    "status": "string",
    "projectId": 0,
    "assigneeId": 0,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» updatedTask|object|true|none||none|
|»» id|integer|true|none||none|
|»» title|string|true|none||none|
|»» description|string|true|none||none|
|»» status|string|true|none||none|
|»» projectId|integer|true|none||none|
|»» assigneeId|integer|true|none||none|
|»» createdAt|string|true|none||none|
|»» updatedAt|string|true|none||none|

## DELETE Delete Task (Admin only)

DELETE /tasks/2

> Response Examples

> 200 Response

```json
{
  "message": "string"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|

# File-Upload System

## POST Upload File

POST /files/upload

> Body Parameters

```yaml
file: file://C:\Users\20120\Pictures\سلمى.png
projectId: "2"
taskId: "1"

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» file|body|string(binary)| no |none|
|» projectId|body|string| no |none|
|» taskId|body|string| no |none|

> Response Examples

> 201 Response

```json
{
  "message": "string",
  "file": {
    "id": 0,
    "url": "string",
    "publicId": "string",
    "fileType": "string",
    "uploadedById": 0,
    "projectId": 0,
    "taskId": 0,
    "createdAt": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### Responses Data Schema

HTTP Status Code **201**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» file|object|true|none||none|
|»» id|integer|true|none||none|
|»» url|string|true|none||none|
|»» publicId|string|true|none||none|
|»» fileType|string|true|none||none|
|»» uploadedById|integer|true|none||none|
|»» projectId|integer|true|none||none|
|»» taskId|integer|true|none||none|
|»» createdAt|string|true|none||none|

## GET Fetch All Files

GET /files

> Response Examples

> 200 Response

```json
[
  {
    "id": 0,
    "url": "string",
    "publicId": "string",
    "fileType": "string",
    "uploadedById": 0,
    "projectId": 0,
    "taskId": 0,
    "createdAt": "string",
    "uploadedBy": {
      "id": 0,
      "name": "string",
      "email": "string",
      "password": "string",
      "role": "string",
      "organizationId": 0,
      "createdAt": "string"
    },
    "project": {
      "id": 0,
      "name": "string",
      "description": "string",
      "organizationId": 0,
      "createdAt": "string",
      "updatedAt": "string"
    },
    "task": {
      "id": 0,
      "title": "string",
      "description": "string",
      "status": "string",
      "projectId": 0,
      "assigneeId": 0,
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
]
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» id|integer|false|none||none|
|» url|string|false|none||none|
|» publicId|string|false|none||none|
|» fileType|string|false|none||none|
|» uploadedById|integer|false|none||none|
|» projectId|integer|false|none||none|
|» taskId|integer|false|none||none|
|» createdAt|string|false|none||none|
|» uploadedBy|object|false|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» email|string|true|none||none|
|»» password|string|true|none||none|
|»» role|string|true|none||none|
|»» organizationId|integer|true|none||none|
|»» createdAt|string|true|none||none|
|» project|object|false|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» description|string|true|none||none|
|»» organizationId|integer|true|none||none|
|»» createdAt|string|true|none||none|
|»» updatedAt|string|true|none||none|
|» task|object|false|none||none|
|»» id|integer|true|none||none|
|»» title|string|true|none||none|
|»» description|string|true|none||none|
|»» status|string|true|none||none|
|»» projectId|integer|true|none||none|
|»» assigneeId|integer|true|none||none|
|»» createdAt|string|true|none||none|
|»» updatedAt|string|true|none||none|
