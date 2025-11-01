The diagram shows:
Entities:

Organization - The top-level entity that contains users and projects
User - Can be admin or employee, belongs to an organization
Project - Belongs to an organization, contains tasks
Task - Assigned to a user, belongs to a project
File - Can be attached to projects or tasks, uploaded by users
Notification - Sent to users for task assignments

Key Relationships:

One Organization has many Users and Projects
One User can have many Tasks, Files, and Notifications
One Project contains many Tasks and Files
One Task can have many Files attached
Files can be attached to either Projects or Tasks (optional relationships)

Notable Features:

Users belong to Organizations (with cascade delete)
Projects have unique constraint on (name, organizationId)
Files support attachments to both Projects and Tasks
Notifications track read/unread status

The diagram uses standard ERD notation where:

||--o{ means "one to many"
}o--|| means "many to one"
}o--o| means "many to zero or one" (optional)


erDiagram
    Organization ||--o{ User : "has"
    Organization ||--o{ Project : "contains"
    
    User ||--o{ Task : "assigned"
    User ||--o{ File : "uploads"
    User ||--o{ Notification : "receives"
    User }o--|| Organization : "belongs to"
    
    Project ||--o{ Task : "contains"
    Project ||--o{ File : "has"
    Project }o--|| Organization : "belongs to"
    
    Task ||--o{ File : "has"
    Task }o--|| Project : "part of"
    Task }o--|| User : "assigned to"
    
    File }o--o| User : "uploaded by"
    File }o--o| Project : "attached to"
    File }o--o| Task : "attached to"
    
    Notification }o--|| User : "sent to"
    
    Organization {
        int id PK
        string name
        datetime createdAt
    }
    
    User {
        int id PK
        string name
        string email UK
        string password
        string role "default: employee"
        int organizationId FK "nullable"
        datetime createdAt
    }
    
    Project {
        int id PK
        string name
        string description "nullable"
        int organizationId FK
        datetime createdAt
        datetime updatedAt
    }
    
    Task {
        int id PK
        string title
        string description "nullable"
        string status "default: pending"
        int projectId FK
        int assigneeId FK
        datetime createdAt
        datetime updatedAt
    }
    
    File {
        int id PK
        string url
        string publicId
        string fileType
        int uploadedById FK
        int projectId FK "nullable"
        int taskId FK "nullable"
        datetime createdAt
    }
    
    Notification {
        int id PK
        string message
        int userId FK
        boolean isRead "default: false"
        datetime createdAt
    }