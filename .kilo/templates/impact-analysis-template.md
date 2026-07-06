# Impact Analysis — {Feature/Change Name}

> Version: 1.0
> Date: {date}
> Author: SA Agent
> Source Requirement: {BRD / FR Ref}
> Codebase: {repo path}, Branch: {branch}

---

## 1. Change Summary

| Item | Detail |
|------|--------|
| **Change Description** | {สิ่งที่ต้องการเปลี่ยน} |
| **Reason** | {เหตุผล} |
| **Requestor** | {ชื่อผู้ขอ} |
| **Target Deployment** | {วันที่ต้องการ} |
| **Urgency** | Normal / High / Critical |

---

## 2. Code Analysis

### 2.1 Files to Create
| # | File Path | Purpose | Estimated LOC |
|---|-----------|---------|--------------|
| 1 | {path/file.cs} | {purpose} | {lines} |
| 2 | {path/file.cs} | {purpose} | {lines} |

### 2.2 Files to Modify
| # | File Path | Current Logic | Change Required | Risk |
|---|-----------|--------------|-----------------|------|
| 1 | {path/file.cs} | {what it does now} | {what to change} | H/M/L |
| 2 | {path/file.cs} | {what it does now} | {what to change} | H/M/L |

### 2.3 Files to Delete
| # | File Path | Reason | Deprecation Plan |
|---|-----------|--------|-----------------|
| 1 | {path/file.cs} | {reason} | {migration plan} |

---

## 3. Database Impact

### 3.1 Schema Changes

| Table | Change Type | Column | Old Type | New Type | Nullable |
|-------|------------|--------|----------|----------|----------|
| {table} | ADD | {column} | — | nvarchar(200) | Yes |
| {table} | MODIFY | {column} | nvarchar(100) | nvarchar(200) | No |
| {table} | DROP | {column} | nvarchar(50) | — | — |

### 3.2 Migration Script
```sql
-- Migration: {version_description}
-- Date: {date}

-- 1. Add new column
ALTER TABLE {table} ADD {column} nvarchar(200) NULL;

-- 2. Backfill data (if needed)
UPDATE {table} SET {column} = {default} WHERE {column} IS NULL;

-- 3. Add constraint
ALTER TABLE {table} ALTER COLUMN {column} nvarchar(200) NOT NULL;
```

### 3.3 Index Impact
| Index | Action | Reason |
|-------|--------|--------|
| IX_{table}_{column} | ADD | New query pattern |
| IX_{table}_{old} | DROP | Column removed |

### 3.4 Rollback Script
```sql
-- Rollback Migration
-- 1.
ALTER TABLE {table} DROP COLUMN {column};
```

---

## 4. API Impact

### 4.1 Breaking Changes

| Endpoint | Change | Impacted Client | Migration |
|----------|--------|---------------|-----------|
| GET /api/old | Deprecated → Removed | Mobile v1.0 | Use v2 endpoint |

### 4.2 New Endpoints
| Method | Path | Description |
|--------|------|-------------|
| POST | /api/v2/resources | Replace old API |

### 4.3 Schema Changes (Request/Response)
| Field | Old | New | Backward Compatible? |
|-------|-----|-----|---------------------|
| name | required | required | ✅ Yes |
| status | int | string | ❌ No — version bump needed |

---

## 5. Business Logic Impact

### 5.1 Logic Changes

| Class/Method | Current Behavior | New Behavior | Risk |
|-------------|-----------------|-------------|------|
| {Class.Method} | {current} | {new} | H/M/L |

### 5.2 Business Rules Affected
| Rule ID | Current | New |
|---------|---------|-----|
| BR-001 | {current} | {new} |

---

## 6. Configuration Impact

| Config Key | Current Value | New Value | Environment |
|-----------|---------------|-----------|-------------|
| {key} | {value} | {value} | Dev/Staging/Prod |
| {key} | {value} | {value} | Dev/Staging/Prod |

---

## 7. Dependency Impact

### 7.1 NuGet / Package Changes
| Package | Current Version | New Version | Reason |
|---------|----------------|-------------|--------|
| {package} | {version} | {version} | {reason} |

### 7.2 External Service Dependencies
| Service | Change | Risk |
|---------|--------|------|
| {service} | {change} | H/M/L |

---

## 8. Testing Impact

### 8.1 Test Scenarios to Update
| Test | Current | New | Owner |
|------|---------|-----|-------|
| {test name} | {current} | {new} | {owner} |

### 8.2 New Test Scenarios Needed
| # | Test Scenario | Type | Priority |
|---|--------------|------|----------|
| 1 | {scenario} | Unit/Integration/E2E | High |

---

## 9. Risk Assessment

| Risk | Likelihood | Impact | Level | Mitigation |
|------|-----------|--------|-------|------------|
| Data loss during migration | Low | High | Medium | Test on staging first |
| Breaking API contract | Medium | High | High | Version bump + communication |
| Performance regression | Low | Medium | Low | Load test before deploy |

---

## 10. Effort Estimation

| Task | Estimated Hours | Assigned To |
|------|----------------|-------------|
| Code changes | {h} | {dev} |
| Database migration | {h} | {dba} |
| Unit tests | {h} | {dev} |
| Integration tests | {h} | {qa} |
| Documentation | {h} | {sa} |
| **Total** | **{total h}** | — |

### Complexity Rating
- [ ] **S** (≤ 8 hours) — Trivial change
- [ ] **M** (8-40 hours) — Moderate change
- [ ] **L** (40-120 hours) — Large change
- [ ] **XL** (> 120 hours) — Major change

---

## 11. Deployment Plan

### 11.1 Deployment Sequence
1. 🟢 Database migration (backward compatible)
2. 🟢 Deploy new code (with feature flag OFF)
3. 🟢 Run data validation query
4. 🟢 Enable feature flag for internal users
5. 🟢 Monitor for 24h
6. 🟢 Enable for all users

### 11.2 Rollback Plan
| Step | Action | Estimated Time |
|------|--------|---------------|
| 1 | Disable feature flag | 5 min |
| 2 | Revert code deploy | 15 min |
| 3 | Run rollback script | 10 min |
| 4 | Verify rollback | 15 min |

---

## 12. Approval

| Role | Name | Approve / Reject | Date |
|------|------|-----------------|------|
| SA | {name} | ✅ | {date} |
| Tech Lead | {name} | ⬜ | {date} |
| Product Owner | {name} | ⬜ | {date} |
