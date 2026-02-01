# Courier

Courier is a modern Angular application for tracking incoming and outgoing company mail.

It is designed as:
- A **web platform** for centralized usage
- With a **future Electron desktop build** in mind
- Supporting **offline-first workflows** and optional synchronization

---

## Table of contents

<!-- TOC -->
* [Courier](#courier)
  * [Table of contents](#table-of-contents)
  * [Domain overview](#domain-overview)
    * [Réception](#réception)
    * [Envoi](#envoi)
    * [Bordereau d’envoi](#bordereau-denvoi)
  * [Architecture goals](#architecture-goals)
  * [Project structure](#project-structure)
  * [Key architectural rules](#key-architectural-rules)
  * [Technology stack](#technology-stack)
  * [Status](#status)
  * [License](#license)
<!-- TOC -->

---

## Domain overview

### Réception
Tracks incoming mail and documents received by the company.

### Envoi
Tracks outgoing mail and documents sent by the company.
Each Envoi can generate a **Bordereau d’envoi** (dispatch slip).

### Bordereau d’envoi
A generated document summarizing outgoing mail, configurable via settings
(e.g. numbering format, company information, headers).

---

## Architecture goals

- Domain-driven feature structure
- Clear separation between UI, domain logic, and infrastructure
- No coupling between Angular components and persistence mechanisms
- Prepared for:
  - Web (HTTP backend)
  - Desktop (Electron + SQLite)
  - Offline usage
  - Future synchronization strategies

---

## Project structure

```

src/app/
├── core/
│   ├── api/        # domain I/O abstractions (HTTP, Electron, local)
│   └── services/  # cross-cutting concerns (http wrapper, notifications, platform)
│
├── layouts/    # app shell and navigation
│
├── shared/
│   └── components, pipes, directives (UI-only, no domain logic)
│
├── features/
│   ├── envoi/
│   ├── reception/
│   ├── bordereau/
│   └── settings/
│
├── app.routes.ts
└── app.config.ts

```

---

## Key architectural rules

- Components are UI-focused and orchestration-only
- Domain logic lives in feature-level stores/facades
- HTTP, Electron IPC, and persistence are abstracted in `core/api`
- Angular Material datasources are UI adapters, not state containers
- Modal forms are components, not routed pages

---

## Technology stack

- Angular (standalone components, modern router)
- Angular Material
- RxJS and/or Angular Signals (used consistently per feature)
- Future:
  - Electron
  - SQLite
  - Offline-first support

---

## Status

This project is actively evolving and used as:
- A learning playground for clean Angular architecture
- A showcase of real-world, forward-thinking frontend design

---

## License

Portfolio project
