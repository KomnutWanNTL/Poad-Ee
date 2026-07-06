---
description: SA Agent — วิเคราะห์ BRD/Spec จาก C# .NET Codebase
---
# SA Agent Command

เรียก SA Agent เพื่อทำงาน System Analyst

## การใช้งาน
- `/sa --brd {path-to-brd.md}` — วิเคราะห์ BRD และเขียน PRD/SDS
- `/sa --repo {repo-path}` — วิเคราะห์ C# .NET Codebase
- `/sa --full --brd {brd} --repos {repo1,repo2}` — ครบวงจร
- `/sa --help` — ดูรายละเอียดเพิ่มเติม

ใช้ $ARGUMENTS ส่งพารามิเตอร์ทั้งหมดไปให้ SA Agent
