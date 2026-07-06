# API Specification — {Module/Service Name}

> Version: 1.0
> Date: {date}
> Author: SA Agent
> Base URL: {base_url}
> OpenAPI: `{path}/openapi.yaml`

---

## Common Headers

| Header | Required | Type | Description |
|--------|----------|------|-------------|
| Authorization | Yes (auth endpoints) | Bearer {token} | JWT token |
| X-Request-Id | No | UUID | สำหรับ tracing |
| X-Api-Version | Yes | string | "1.0" |
| Accept-Language | No | string | "th", "en" |

## Common Error Response
```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message (TH/EN)",
    "details": [
      {
        "field": "fieldName",
        "message": "Validation error message"
      }
    ],
    "traceId": "uuid-for-debugging",
    "timestamp": "2026-07-03T10:00:00Z"
  }
}
```

| HTTP Code | Error Code | Description |
|-----------|-----------|-------------|
| 400 | VALIDATION_ERROR | Input validation failed |
| 401 | UNAUTHORIZED | Missing/invalid token |
| 403 | FORBIDDEN | Insufficient permission |
| 404 | NOT_FOUND | Resource not found |
| 409 | CONFLICT | Duplicate/state conflict |
| 422 | UNPROCESSABLE_ENTITY | Business rule violation |
| 429 | RATE_LIMITED | Too many requests |
| 500 | INTERNAL_ERROR | Server error |
| 503 | SERVICE_UNAVAILABLE | Maintenance/overload |

---

## Endpoint: GET /api/v1/{resource}s

### Description
{ดึงรายการ resource แบบ paginated + filter}

### Authentication
- [x] Required (JWT Bearer)
- [ ] Optional
- [ ] Public

### Permission
{role(s) ที่เข้าถึงได้}

### Request Parameters

| Parameter | Type | Location | Required | Default | Description |
|-----------|------|----------|----------|---------|-------------|
| page | int | Query | No | 1 | หน้า |
| pageSize | int | Query | No | 20 | รายการต่อหน้า (max 100) |
| search | string | Query | No | — | ค้นหาชื่อ |
| status | int | Query | No | — | 0=Active, 1=Inactive |
| sortBy | string | Query | No | createdAt | sort field |
| sortOrder | string | Query | No | desc | asc/desc |

### Request Example
```
GET /api/v1/resources?page=1&pageSize=20&status=0&sortBy=createdAt&sortOrder=desc
```

### Response: 200 OK
```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "status": 0,
        "createdAt": "2026-07-03T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 150,
      "totalPages": 8,
      "hasNext": true,
      "hasPrevious": false
    }
  }
}
```

### Response: 400 — Invalid Parameter
```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "pageSize ต้องไม่เกิน 100",
    "details": [
      {
        "field": "pageSize",
        "message": "ต้องอยู่ระหว่าง 1-100"
      }
    ],
    "traceId": "uuid"
  }
}
```

### Rate Limiting
- 100 requests per minute per user
- Header response: `X-RateLimit-Remaining: 50`
- Header response: `X-RateLimit-Reset: 1625299200`

---

## Endpoint: GET /api/v1/{resource}s/{id}

### Description
{ดึง resource ตาม ID}

### Authentication
- [x] Required (JWT Bearer)

### Request Parameters

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| id | guid | Path | Yes | Resource ID |

### Response: 200 OK
```json
{
  "status": "success",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "status": 0,
    "createdAt": "2026-07-03T10:00:00Z",
    "updatedAt": "2026-07-03T10:00:00Z",
    "createdBy": "string"
  }
}
```

### Response: 404 — Not Found
```json
{
  "status": "error",
  "error": {
    "code": "NOT_FOUND",
    "message": "ไม่พบ resource ที่ระบุ",
    "traceId": "uuid"
  }
}
```

---

## Endpoint: POST /api/v1/{resource}s

### Description
{สร้าง resource ใหม่}

### Authentication
- [x] Required (JWT Bearer)

### Permission
{Admin / Manager} role required

### Request Body
```json
{
  "name": "string (required, max 200 chars)",
  "description": "string (optional, max 500 chars)",
  "status": 0
}
```

### Validation Rules
| Field | Required | Type | Constraints |
|-------|----------|------|-------------|
| name | Yes | string | 1-200 chars, unique |
| description | No | string | max 500 chars |
| status | Yes | int | 0 or 1 |

### Response: 201 Created
```json
{
  "status": "success",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "status": 0,
    "createdAt": "2026-07-03T10:00:00Z"
  }
}
```

### Response: 409 — Duplicate
```json
{
  "status": "error",
  "error": {
    "code": "CONFLICT",
    "message": "ชื่อ resource นี้มีอยู่ในระบบแล้ว",
    "traceId": "uuid"
  }
}
```

---

## Endpoint: PUT /api/v1/{resource}s/{id}

### Description
{อัปเดต resource}

### Authentication
- [x] Required (JWT Bearer) + Admin role

### Request Parameters

| Parameter | Type | Location | Required |
|-----------|------|----------|----------|
| id | guid | Path | Yes |

### Request Body
```json
{
  "name": "string (required)",
  "description": "string (optional)",
  "status": 0
}
```

### Side Effects
- Invalidates cache key `resource:{id}`
- Triggers audit log event
- Sends notification if status changed

### Response: 200 OK
*(รูปแบบเดียวกับ GET /id)*

### Response: 409 — State Conflict
```json
{
  "status": "error",
  "error": {
    "code": "CONFLICT",
    "message": "ไม่สามารถแก้ไขได้เนื่องจาก resource อยู่ในสถานะ {X}",
    "traceId": "uuid"
  }
}
```

---

## Endpoint: DELETE /api/v1/{resource}s/{id}

### Description
{Soft delete resource — set status = 2 (Deleted)}

### Authentication
- [x] Required (JWT Bearer) + Admin role

### Business Rules
- ต้องไม่เป็น resource ที่กำลังถูกใช้งาน
- ถ้ามี child entities → block deletion หรือ cascade

### Response: 204 No Content

### Response: 409 — Has Dependencies
```json
{
  "status": "error",
  "error": {
    "code": "CONFLICT",
    "message": "ไม่สามารถลบได้ เนื่องจากมีข้อมูลอ้างอิง {count} รายการ",
    "traceId": "uuid"
  }
}
```

---

## Endpoint: POST /api/v1/{resource}s/bulk

### Description
{Bulk create resources}

### Rate Limiting
- 10 requests per minute (heavy operation)

### Request Body
```json
{
  "items": [
    { "name": "item1", "status": 0 },
    { "name": "item2", "status": 0 }
  ]
}
```

### Validation
- Max 100 items per request
- Duplicate names within batch → reject all

### Response: 207 Multi-Status
```json
{
  "status": "partial_success",
  "data": {
    "successCount": 2,
    "failCount": 0,
    "results": [
      { "index": 0, "status": "created", "id": "uuid" },
      { "index": 1, "status": "created", "id": "uuid" }
    ],
    "errors": []
  }
}
```

---

## cURL Examples

```bash
# List
curl -X GET "https://api.example.com/api/v1/resources?page=1&pageSize=20" \
  -H "Authorization: Bearer {token}" \
  -H "X-Api-Version: 1.0"

# Create
curl -X POST "https://api.example.com/api/v1/resources" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -H "X-Api-Version: 1.0" \
  -d '{"name": "New Resource", "status": 0}'

# Update
curl -X PUT "https://api.example.com/api/v1/resources/{id}" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'

# Delete
curl -X DELETE "https://api.example.com/api/v1/resources/{id}" \
  -H "Authorization: Bearer {token}"
```

---

## OpenAPI 3.0 (YAML) Reference

Full OpenAPI spec อยู่ในไฟล์ `openapi.yaml` ใน directory เดียวกัน
