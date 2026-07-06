# BRD Analysis — {Project/Feature Name}

> Version: 1.0
> Date: {date}
> Author: SA Agent
> Status: Draft / Review / Approved

---

## 1. Business Overview

### 1.1 Business Objectives
| # | Objective | Success Metric | Target Value |
|---|-----------|---------------|--------------|
| 1 | {objective} | {metric} | {target} |
| 2 | {objective} | {metric} | {target} |

### 1.2 Problem Statement
{อธิบายปัญหาที่ธุรกิจกำลังเจอ และทำไมต้องแก้}

### 1.3 Expected Business Value
- Revenue Impact: {estimate}
- Cost Saving: {estimate}
- Efficiency Gain: {estimate}
- Customer Satisfaction: {estimate}

---

## 2. Stakeholder Analysis

| Stakeholder | Role | Expectation | Priority |
|-------------|------|-------------|----------|
| {name} | {role} | {expectation} | High/Med/Low |
| {name} | {role} | {expectation} | High/Med/Low |

---

## 3. Requirements Analysis

### 3.1 Functional Requirements

| Ref | Requirement | Category | MoSCoW | Complexity | Dependencies |
|-----|-------------|----------|--------|------------|--------------|
| FR-001 | {requirement} | {module} | Must/Should/Could/Won't | S/M/L/XL | {ref} |
| FR-002 | {requirement} | {module} | Must/Should/Could/Won't | S/M/L/XL | {ref} |

### 3.2 Non-Functional Requirements

| Ref | Requirement | Type | Target | MoSCoW |
|-----|-------------|------|--------|--------|
| NFR-001 | Response Time | Performance | < 500ms | Must |
| NFR-002 | Uptime | Availability | 99.9% | Must |
| NFR-003 | Max Users | Scalability | 10,000 concurrent | Should |

#### NFR Detail: NFR-001 — Response Time
- **Measurement:** 95th percentile over 5-min window
- **Scope:** All API endpoints under /api/v1/
- **Exclusions:** Report generation (>5s acceptable)

#### NFR Detail: NFR-002 — Security
```
Authentication:  JWT Bearer Token (RS256)
Authorization:   Role-based (Admin, User, Viewer)
Encryption:      AES-256 at rest, TLS 1.3 in transit
Audit Logging:   All CUD operations on sensitive data
Compliance:      {PDPA/GDPR/HIPAA}
```

### 3.3 Business Rules Matrix

| Rule ID | Condition | Action | Priority |
|---------|-----------|--------|----------|
| BR-001 | IF {condition} | THEN {action} | High |
| BR-002 | IF {condition} and {condition} | THEN {action} | Medium |

### 3.4 Decision Table (สำหรับ Rules ซับซ้อน)

| Condition 1 | Condition 2 | Condition 3 | Action |
|-------------|-------------|-------------|--------|
| Y | Y | — | Action A |
| Y | N | Y | Action B |
| Y | N | N | Action C |
| N | — | — | Action D |

---

## 4. Scope Definition

### 4.1 In Scope
- {feature 1}
- {feature 2}

### 4.2 Out of Scope
- {feature X} → เลื่อนไป Phase 2
- {feature Y} → ไม่เกี่ยวข้อง

### 4.3 Assumptions
| # | Assumption | Impact if Wrong | Owner |
|---|------------|-----------------|-------|
| 1 | {assumption} | {impact} | {owner} |

### 4.4 Constraints
| # | Constraint | Source | Mitigation |
|---|-----------|--------|------------|
| 1 | {constraint} | Technical/Budget/Time | {plan} |

---

## 5. Clarifying Questions (คลุมเครือ → ถามกลับ)

| # | Requirement ที่คลุมเครือ | คำถาม | Suggested Answer |
|---|------------------------|-------|-----------------|
| 1 | "ระบบต้องเร็ว" | เร็วหมายถึงกี่ ms? | < 500ms |
| 2 | "รองรับผู้ใช้จำนวนมาก" | มากคือเท่าไหร่? | 10,000 concurrent |

---

## 6. Gap Analysis

| # | Gap (สิ่งที่ BRD ไม่ได้พูดถึงแต่ควรมี) | Rationale | Recommendation |
|---|--------------------------------------|-----------|---------------|
| 1 | {gap} | {เหตุผล} | {แนะนำ} |
| 2 | {gap} | {เหตุผล} | {แนะนำ} |

---

## 7. Risk Assessment

| Risk ID | Description | Likelihood | Impact | Level | Mitigation | Contingency |
|---------|-------------|-----------|--------|-------|------------|-------------|
| R-001 | {risk} | H/M/L | H/M/L | Critical/High/Med/Low | {plan} | {plan} |
| R-002 | {risk} | H/M/L | H/M/L | Critical/High/Med/Low | {plan} | {plan} |

---

## 8. Dependencies & Integration

| Dependency | Type | Critical? | Description |
|-----------|------|-----------|-------------|
| {system A} | Internal/External | Yes/No | {description} |
| {API B} | External | Yes | {description} |

---

## 9. Recommendation & Next Steps

### Recommended Approach
{สรุปแนวทางที่แนะนำ — ทำทีละ Phase, MVP ก่อน, หรือทำ Full Scope}

### Phase Plan
| Phase | Features | Timeline | Resource |
|-------|----------|----------|----------|
| MVP | {features} | {date} | {team} |
| Phase 2 | {features} | {date} | {team} |

### Immediate Next Steps
1. 🟢 Approve BRD Analysis
2. 🟡 Proceed to PRD/SDS Creation
3. 🔴 Clarify questions with stakeholders
