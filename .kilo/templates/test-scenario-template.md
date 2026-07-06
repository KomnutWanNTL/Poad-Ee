# Test Scenarios — {Module/Feature Name}

> Version: 1.0
> Date: {date}
> Author: SA Agent
> Based on: SDS v{1.0}, FR-{XXX}, UC-{XXX}

---

## 1. Test Scope

### In Scope
- {feature/module ที่ต้องทดสอบ}
- {feature/module ที่ต้องทดสอบ}

### Out of Scope
- {สิ่งที่ไม่ต้องทดสอบในรอบนี้}

### Test Levels
- [x] Unit Test
- [x] Integration Test
- [ ] E2E Test
- [ ] Performance Test
- [ ] Security Test
- [ ] UAT

---

## 2. Test Environment

| Environment | URL | Database | Auth |
|-------------|-----|----------|------|
| DEV | {url} | {db} | Test accounts |
| STAGING | {url} | {db} | Test accounts |
| PROD | {url} | {db} | Real users |

### Test Data Setup
```
- สร้าง test user 3 roles: Admin, Manager, User
- สร้าง resource อย่างน้อย 25 รายการ
- สร้าง edge case data (duplicate, empty, special chars)
```

---

## 3. Unit Test Scenarios

### Module: {Service/Class Name}

#### UT-001: {MethodName} — Success Case

| Field | Detail |
|-------|--------|
| **Test ID** | UT-001 |
| **Method** | {Class.MethodName} |
| **Scenario** | {normal case} |
| **Input** | {input data} |
| **Expected Output** | {expected result} |
| **Mock** | {mock dependencies} |

```csharp
[Fact]
public void MethodName_ValidInput_ReturnsSuccess()
{
    // Arrange
    var input = {valid input};
    
    // Act
    var result = _service.MethodName(input);
    
    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Data.Should().NotBeNull();
}
```

#### UT-002: {MethodName} — Validation Failure

| Field | Detail |
|-------|--------|
| **Test ID** | UT-002 |
| **Method** | {Class.MethodName} |
| **Scenario** | {input invalid} |
| **Input** | null / empty / out of range |
| **Expected Output** | ValidationException |

#### UT-003: {MethodName} — Business Rule Failure
- **Condition:** {business rule violated}
- **Expected:** BusinessRuleException with code {XXX}

*(Add more UT-NNN as needed)*

### Unit Test Coverage Checklist
- [ ] Success path
- [ ] Validation errors (each field)
- [ ] Business rule violations (each rule)
- [ ] Boundary values (min, max, empty, null)
- [ ] Exception handling (DB failure, network error)
- [ ] State transitions (if applicable)

---

## 4. Integration Test Scenarios

### API: {Module}

#### IT-001: POST /api/v1/resources — Create Success

| Step | Action | Expected |
|------|--------|----------|
| 1 | Login as Admin | 200 + JWT token |
| 2 | POST /api/v1/resources with valid body | 201 + resource ID |
| 3 | GET /api/v1/resources/{id} | Resource matches created data |

#### IT-002: POST /api/v1/resources — Duplicate Name

| Step | Action | Expected |
|------|--------|----------|
| 1 | Login as Admin | Token |
| 2 | POST resource "Test" | 201 |
| 3 | POST resource "Test" again | 409 CONFLICT |

#### IT-003: GET /api/v1/resources — Pagination

| Step | Action | Expected |
|------|--------|----------|
| 1 | Create 25 resources | — |
| 2 | GET ?page=1&pageSize=10 | 10 items, hasNext=true |
| 3 | GET ?page=3&pageSize=10 | 5 items, hasNext=false |
| 4 | GET ?page=99 | 0 items |

#### IT-004: DELETE /api/v1/resources/{id} — Has Dependencies

| Step | Action | Expected |
|------|--------|----------|
| 1 | Create resource with child entities | — |
| 2 | DELETE resource | 409 CONFLICT |
| 3 | Error message mentions {count} dependencies |

---

## 5. E2E Test Scenarios

#### E2E-001: Full CRUD Flow (Admin)

```gherkin
Feature: Resource Management
  As an Admin user
  I want to manage resources
  So that I can maintain the system

  Scenario: Admin creates, reads, updates, and deletes a resource
    Given I am logged in as Admin
    When I navigate to Resource Management
    And I click "Create New"
    And I fill in:
      | Field | Value |
      | Name  | Test Resource |
      | Status | Active |
    And I click "Save"
    Then I should see "Resource created successfully"
    And the resource appears in the list

    When I click on the resource
    And I click "Edit"
    And I change Name to "Updated Resource"
    And I click "Save"
    Then I should see "Resource updated successfully"

    When I click "Delete"
    And I confirm deletion
    Then I should see "Resource deleted successfully"
    And the resource no longer appears in the list
```

#### E2E-002: Permission Denied (User role)

```gherkin
  Scenario: Regular user cannot create resources
    Given I am logged in as regular User
    When I navigate to Resource Management
    Then I should NOT see "Create New" button
    
    When I directly POST /api/v1/resources via API
    Then I should receive 403 FORBIDDEN
```

---

## 6. Performance Test Scenarios

#### PT-001: Endpoint Load Test

| Endpoint | Target TPS | Duration | Acceptable P95 |
|----------|-----------|----------|---------------|
| GET /api/v1/resources | 100/s | 15 min | < 500ms |
| POST /api/v1/resources | 50/s | 15 min | < 1000ms |
| GET /api/v1/resources/{id} | 200/s | 15 min | < 300ms |

#### PT-002: Concurrent User Test

| Scenario | Users | Ramp-up | Behavior |
|----------|-------|---------|----------|
| Read-heavy (80:20) | 1,000 | 5 min | Browse + search |
| Write-heavy (50:50) | 500 | 5 min | Create + update |

---

## 7. Security Test Scenarios

| ID | Test | Expected |
|----|------|----------|
| SEC-001 | Access API without token | 401 |
| SEC-002 | Access API with expired token | 401 |
| SEC-003 | User role accesses Admin endpoint | 403 |
| SEC-004 | SQL Injection in search field | Rejected |
| SEC-005 | XSS in name field | Sanitized |
| SEC-006 | Rate limit exceeded | 429 |
| SEC-007 | IDOR — User A accesses User B's data | 403 |

---

## 8. Edge Cases & Negative Tests

| ID | Scenario | Input | Expected |
|----|----------|-------|----------|
| EC-001 | Empty string in name | "" | Validation error |
| EC-002 | Whitespace only name | "   " | Validation error |
| EC-003 | Special characters in name | "<script>alert(1)</script>" | Sanitized or rejected |
| EC-004 | Very long name (1000 chars) | "A" * 1000 | Truncated or rejected |
| EC-005 | Unicode characters | "ไทย/日本語/中文" | Accepted |
| EC-006 | Emoji in name | "🎉 Test" | Accepted or rejected? |
| EC-007 | Negative page number | ?page=-1 | Return page 1 |
| EC-008 | Max int page size | ?pageSize=999999 | Cap at 100 |
| EC-009 | Concurrent create same name | 2 requests simultaneously | First 201, Second 409 |
| EC-010 | Delete already deleted | DELETE after DELETE | 404 or 409 |

---

## 9. Test Execution Summary

| Phase | Test Type | Count | Pass | Fail | Blocked |
|-------|-----------|-------|------|------|---------|
| Unit | Validation | 10 | — | — | — |
| Unit | Business Logic | 8 | — | — | — |
| Integration | API | 15 | — | — | — |
| Integration | Database | 5 | — | — | — |
| E2E | Flow | 3 | — | — | — |
| Performance | Load | 2 | — | — | — |
| Security | Auth | 7 | — | — | — |
| **Total** | | **50** | — | — | — |

---

## 10. Automation Recommendation

### Priority for Automation
1. **P0:** API Integration Tests (ทั้งหมด) — สร้างด้วย xUnit + HttpClient
2. **P1:** Unit Tests (Business Logic + Validation)
3. **P1:** E2E Critical Flow (Create → Update → Delete)
4. **P2:** Performance Tests — k6 / NBomber
5. **P3:** Security Tests — OWASP ZAP

### Suggested Tools
| Test Type | Tool | Reason |
|-----------|------|--------|
| Unit | xUnit + Moq | Standard .NET |
| Integration | xUnit + TestContainers | Real DB in container |
| E2E | Playwright | Cross-browser |
| Performance | k6 | Scriptable, CI-friendly |
| Security | OWASP ZAP | Automated DAST |
