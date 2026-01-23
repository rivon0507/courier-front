# Architecture — Courier Frontend

This document describes the **code organization and architectural conventions**
of the Courier Angular frontend.

For product overview and features, see [README.md](README.md).

---

## Table of contents

<!-- TOC -->
* [Architecture — Courier Frontend](#architecture--courier-frontend)
  * [Table of contents](#table-of-contents)
  * [1) High-level structure](#1-high-level-structure)
  * [2) Feature folder structure](#2-feature-folder-structure)
    * [Responsibilities](#responsibilities)
  * [3) Routing & layout conventions](#3-routing--layout-conventions)
  * [4) Data flow rules](#4-data-flow-rules)
  * [5) MatTable & UI state](#5-mattable--ui-state)
  * [6) Core API abstractions](#6-core-api-abstractions)
  * [7) Naming conventions](#7-naming-conventions)
<!-- TOC -->

---

## 1) High-level structure

The codebase uses a **feature-first** structure under `src/app/`.

```

src/app
├── core
│   ├── api
│   ├── layout
│   └── services
├── shared
└── features
├── envoi
├── reception
├── bordereau
└── settings

```

---

## 2) Feature folder structure

Each feature (`envoi`, `reception`, `settings`, `auth`) follows the same internal layout:

```

features/<domain>
├── pages        # routed container components
├── components   # reusable UI components (tables, dialogs, filters)
├── data         # feature store/facade + domain coordination logic
├── models       # domain models and DTOs
└── <domain>.routes.ts

```

### Responsibilities

* **pages**: routing targets; container components that wire UI to feature state
* **components**: presentational UI + orchestration only (no domain I/O)
* **data**: feature state + use-cases (load/create/update/remove, etc.)
* **models**: DTOs and domain models owned by the feature
* **<domain>.routes.ts**: feature route definitions (lazy/standalone as applicable)

---

## 3) Routing & layout conventions

Routing and navigation are centralized in the app shell.

* Routed components **must** live in `features/<domain>/pages/`
* Modal/dialog forms are **components**, not pages
* Layout and navigation belong to:

```

core/layout

```

Feature routes are defined in:

```

features/<domain>/<domain>.routes.ts

```

The root routing configuration should compose:
* the app shell/layout routes from `core/layout`
* the domain routes from `features/*/*.routes.ts`

---

## 4) Data flow rules

UI components are **UI-only** and **orchestration-only**.

Components **MUST NOT**:
* call `HttpClient` directly
* contain platform checks (web/electron/local)
* treat UI adapters as application state

Correct flow:

```

Component / Page
→ Feature Store (use-cases + state)
→ core/api abstraction
→ HTTP or Electron/Local implementation

```

Feature stores are encouraged to expose **use-cases**, not raw CRUD.
Example methods: `load()`, `create()`, `update()`, `remove()`.

Feature stores may:
* call core/api clients
* manage loading/error state
* trigger notifications (through core services)

---

## 5) MatTable & UI state

`MatTableDataSource` is a **UI adapter only**.

Rules:
* It must be fed from feature state (signals or observables)
* It is not an application state

---

## 6) Core API abstractions

`core/api` contains **domain I/O abstractions only**.

Structure and rules:
* API interfaces live in `core/api` (e.g. `<domain>.api.ts`)
* Implementations must implement the shared interface:
  * HTTP: `<domain>.api.http.ts`
  * Local/Electron: `<domain>.api.local.ts` (or equivalent)
* Implementations must be swappable via Angular providers
* Platform decision logic **must** live in providers/factories, never inside features

Cross-cutting infrastructure services live in:

```

core/services

```

---

## 7) Naming conventions

* Page components: `*.page.ts`
* Dialog/modal components: `*-dialog.component.ts`
* Feature store/facade: `<domain>.store.ts`
* Core API interface: `<domain>.api.ts`
* HTTP implementation: `<domain>.api.http.ts`
* Local/Electron implementation: `<domain>.api.local.ts`

---
