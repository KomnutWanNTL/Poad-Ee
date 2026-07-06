# Data Dictionary — {Project/Module Name}

> Version: 1.0
> Date: {date}
> Author: SA Agent

---

## 1. Business Glossary

| Business Term | Definition | Synonym | Used In |
|--------------|-----------|---------|---------|
| {term} | {definition} | {synonym} | {module/screen} |
| {term} | {definition} | {synonym} | {module/screen} |

---

## 2. Data Entity Definitions

### Entity: {EntityName}

| Field Name | Type | Length | Required | PK/FK | Index | Default | Constraint | Description |
|-----------|------|--------|----------|-------|-------|---------|------------|-------------|
| Id | uniqueidentifier | — | Yes | PK | Clustered | NEWID() | — | Primary key |
| Name | nvarchar | 200 | Yes | — | IX_Name | — | Unique | ชื่อ entity |
| Code | nvarchar | 50 | Yes | — | IX_Code | — | Unique, UPPERCASE | รหัสอ้างอิง |
| Status | tinyint | — | Yes | — | — | 0 | 0=Active, 1=Inactive, 2=Deleted | สถานะ |
| CreatedAt | datetime2 | 7 | Yes | — | — | GETUTCDATE() | — | วันที่สร้าง |
| CreatedBy | nvarchar | 100 | Yes | — | — | — | — | ผู้สร้าง |
| UpdatedAt | datetime2 | 7 | No | — | — | — | — | วันที่แก้ไขล่าสุด |
| UpdatedBy | nvarchar | 100 | No | — | — | — | — | ผู้แก้ไขล่าสุด |

---

### Entity: {EntityName2}

*(รูปแบบเดียวกับ EntityName)*

---

## 3. Domain Value / Enum Definitions

### Enum: RecordStatus

| Value | Name | Description |
|-------|------|-------------|
| 0 | Active | ใช้งานได้ปกติ |
| 1 | Inactive | ระงับการใช้งานชั่วคราว |
| 2 | Deleted | ลบแล้ว (soft delete) |

### Enum: UserRole

| Value | Name | Description | Permissions |
|-------|------|-------------|-------------|
| 0 | Admin | ผู้ดูแลระบบ | Full access |
| 1 | Manager | ผู้จัดการ | CRUD own department |
| 2 | User | ผู้ใช้งานทั่วไป | Read only |

---

## 4. Relationship Matrix

| Parent Entity | Child Entity | Relationship | Foreign Key | Cascade |
|--------------|-------------|--------------|-------------|---------|
| Department | Employee | 1 : N | DepartmentId | RESTRICT |
| Employee | Timesheet | 1 : N | EmployeeId | CASCADE |
| Project | Employee | N : M | ProjectEmployee | — |

---

## 5. Data Validation Rules

### Common Rules

| Field Pattern | Rule | Message (TH) | Message (EN) |
|--------------|------|-------------|-------------|
| Email | Regex: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | "รูปแบบอีเมลไม่ถูกต้อง" | "Invalid email format" |
| Phone (TH) | Regex: `^0[0-9]{9}$` | "รูปแบบเบอร์โทรไม่ถูกต้อง" | "Invalid phone number" |
| Citizen ID (TH) | Regex: `^[0-9]{13}$` + check digit | "รูปแบบเลขบัตรไม่ถูกต้อง" | "Invalid citizen ID" |

---

## 6. Code Lists / Reference Data

### Table: {ReferenceTable}

| Code | Name (TH) | Name (EN) | Sort Order | Active |
|------|-----------|-----------|-----------|--------|
| 001 | {value} | {value} | 1 | Yes |
| 002 | {value} | {value} | 2 | Yes |

---

## 7. Data Governance

### Classification

| Level | Definition | Examples | Handling |
|-------|-----------|----------|----------|
| Public | เปิดเผยต่อสาธารณะ | Product name, Price | No restriction |
| Internal | ภายในองค์กร | Report, Analytics | Encrypt in transit |
| Confidential | ข้อมูลสำคัญ | Customer data, Salary | Encrypt at rest + transit, Access log |
| Restricted | ข้อมูลอ่อนไหวสูง | Medical record, Bank account | Full audit trail, Minimal access |

### Retention Policy

| Data Type | Retention Period | Archival | Deletion |
|-----------|-----------------|----------|----------|
| Transaction log | 90 days | Compress after 30d | Delete after 90d |
| Audit log | 7 years | Export to cold storage | Delete after 7y |
| User data | Until account deletion | — | Anonymize after 5y inactive |

---

## 8. Naming Conventions

### Database

| Item | Convention | Example |
|------|-----------|---------|
| Table | PascalCase, plural | `Users`, `OrderItems` |
| Column | PascalCase | `FirstName`, `CreatedAt` |
| Primary Key | `Id` | `Id` |
| Foreign Key | `{ReferencedTable}Id` | `UserId`, `OrderId` |
| Index | `IX_{Table}_{Column}` | `IX_Users_Email` |
| Unique Constraint | `UQ_{Table}_{Column}` | `UQ_Users_Email` |
| Default Constraint | `DF_{Table}_{Column}` | `DF_Users_Status` |

### C# Code

| Item | Convention | Example |
|------|-----------|---------|
| Class | PascalCase | `UserService` |
| Interface | I + PascalCase | `IUserService` |
| Property | PascalCase | `FirstName` |
| Method | PascalCase | `GetUserById()` |
| Variable | camelCase | `userName` |
| Private Field | _camelCase | `_userRepository` |

---

## 9. Data Flow Matrix

| Data Element | Source System | Destination | Transformation | Frequency | SLA |
|-------------|--------------|-------------|---------------|-----------|-----|
| {element} | {source} | {dest} | {transform} | Realtime/Daily | < 1s |
| {element} | {source} | {dest} | {transform} | Daily 02:00 | < 30min |

---

## 10. Change History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | {date} | SA Agent | Initial data dictionary |
