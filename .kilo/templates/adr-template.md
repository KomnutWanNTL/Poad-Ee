# Architecture Decision Records (ADR)

> Template Version: 1.0
> ใช้บันทึกการตัดสินใจทางสถาปัตยกรรมทุกรายการ เพื่อให้ทีมเข้าใจว่าทำไมถึงเลือกทางนี้

---

## ADR-{XXX}: {Title of Decision}

| Field | Value |
|-------|-------|
| **ADR ID** | ADR-{XXX} |
| **Title** | {title} |
| **Date** | {date} |
| **Author** | {name} |
| **Status** | Proposed / Accepted / Deprecated / Superseded |
| **Supersedes** | ADR-{YYY} (ถ้ามี) |
| **Superseded By** | ADR-{ZZZ} (ถ้าถูกแทนที่) |

---

### Context
{อธิบายสถานการณ์ / ปัญหาที่ทำให้ต้องตัดสินใจนี้}

**Background:**
{ความเป็นมา / แรงกดดัน}

**Requirements:**
- {requirement ที่เกี่ยวข้อง}
- {requirement ที่เกี่ยวข้อง}

**Constraints:**
- {ข้อจำกัด เช่น งบประมาณ, เวลา, ทีม}
- {ข้อจำกัด}

---

### Decision
{ตัดสินใจเลือกอะไร}

> **Decision:** เราเลือก {option X} เพราะ ...

**Key Points:**
- {จุดเด่นของ decision นี้}
- {จุดเด่น}

---

### Options Considered

| Option | Description | Pros | Cons |
|--------|------------|------|------|
| **A: {option}** | {description} | ✅ {pro} | ❌ {con} |
| **B: {option}** | {description} | ✅ {pro} | ❌ {con} |
| **C: {option}** | {description} | ✅ {pro} | ❌ {con} |

**Evaluation Matrix:**

| Criteria | Weight | Option A | Option B | Option C |
|----------|--------|----------|----------|----------|
| Performance | 30% | 8 (2.4) | 9 (2.7) | 6 (1.8) |
| Maintainability | 25% | 7 (1.75) | 8 (2.0) | 9 (2.25) |
| Scalability | 20% | 9 (1.8) | 7 (1.4) | 8 (1.6) |
| Team Skill | 15% | 8 (1.2) | 6 (0.9) | 7 (1.05) |
| Cost | 10% | 6 (0.6) | 8 (0.8) | 5 (0.5) |
| **Total** | **100%** | **7.75** | **7.8** | **7.2** |

---

### Consequences

**Positive:**
- ✅ {ผลดีที่จะเกิดขึ้น}
- ✅ {ผลดี}

**Negative:**
- ❌ {ผลเสีย / trade-off}
- ❌ {ผลเสีย}

**Mitigation for Negative:**
- {แผนจัดการ}
- {แผนจัดการ}

---

### Implementation Guidance

สำหรับทีมพัฒนาในการ implement ตาม decision นี้:

1. {guideline 1}
2. {guideline 2}
3. {guideline 3}

**Code Example (Conceptual):**
```csharp
// ตัวอย่างการ implement ตาม ADR นี้
```

**Related Files / Locations:**
- `{path/to/file}`
- `{path/to/file}`

---

### References
- {link to document / article}
- {link to spec / standard}
- [C4 Model](https://c4model.com/)
- [Microsoft Architecture Guidance](https://learn.microsoft.com/en-us/dotnet/architecture/)

---

### Change History

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0 | {date} | {name} | Initial |
| 1.1 | {date} | {name} | Updated after review |

---

> *"Decisions without documentation are just guesses."*
