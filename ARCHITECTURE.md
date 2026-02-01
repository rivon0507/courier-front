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
    * [Structure and rules](#structure-and-rules)
    * [Example](#example)
  * [7) Dependency direction](#7-dependency-direction)
  * [8) Naming conventions](#8-naming-conventions)
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
├── data         # feature store/facade + use-cases + coordination logic
├── models       # domain models owned by the feature (NOT API DTOs)
└── <domain>.routes.ts

```

### Responsibilities

* **pages**: routing targets; container components that wire UI to feature state
* **components**: presentational UI + orchestration only (no domain I/O)
* **data**: feature state + use-cases (load/create/update/remove, etc.)
* **models**: **domain models** owned by the feature (UI-facing, stable)
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
* map API DTOs to feature domain models (and vice versa)

---

## 5) MatTable & UI state

`MatTableDataSource` is a **UI adapter only**.

Rules:
* It must be fed from feature state (signals or observables)
* It is not an application state

---

## 6) Core API abstractions

`core/api` contains **domain I/O abstractions only**.

### Structure and rules

* API interfaces live in `core/api` (e.g. `<domain>.api.ts`)
* **API DTOs live in `core/api`**, alongside the interface (in the same module or in `<domain>.dtos.ts`)
* Implementations must implement the shared interface:
  * HTTP: `<domain>.api.http.ts`
  * Local/Electron: `<domain>.api.local.ts` (or equivalent)
* Implementations must be swappable via Angular providers
* Platform decision logic **must** live in providers/factories, never inside features

Cross-cutting infrastructure services live in:

```

core/services

```

### Example

```
core/api/auth
├── auth.api.ts           # interface (AuthApi)
├── auth.dtos.ts          # transport contracts (LoginRequestDto, ...)
├── auth.api.http.ts      # HTTP implementation
└── auth.api.local.ts     # optional local/electron implementation
```

---

Here’s a corrected version that keeps the dependency rule, but allows DTOs to be **co-located in `<domain>.api.ts`** (and makes `<domain>.dtos.ts` optional).

---

Good catch — that sentence is ambiguous, and your reading is **totally reasonable**. Let’s fix the wording so it says *exactly* what you intend, without accidental “don’t import” vibes.

What you want is:

* **Ownership** ≠ **visibility**
* Features **may import DTOs from core/api**
* Core **must not** import anything from features

So here is a **clean, unambiguous rewrite** of those sections.

---

## 7) Dependency direction

To keep boundaries clean and avoid circular dependencies, the dependency direction is:

* `features/**` may import from `core/**` and `shared/**`
* `core/**` must NOT import from `features/**`

Implications:

* **Feature domain models live in `features/<domain>/models`**
* **API transport types (DTOs) are defined and owned by `core/api`**
  * Features **may import API DTOs from `core/api`**
  * `core/api` **must not** import domain models from features
  * For small domains, DTOs may be **co-located with the API contract** in`core/api/<domain>/<domain>.api.ts`
  * For larger domains, DTOs may be split into`core/api/<domain>/<domain>.dtos.ts`
* Mapping between DTOs and feature domain models happens in:
  * `features/<domain>/data` (store/facade/use-cases), or
  * a dedicated mapper inside the feature (still under `features/<domain>`)

---

## 8) Naming conventions

* Page components: `*.page.ts`
* Dialog/modal components: `*-dialog.component.ts`
* Feature store/facade: `<domain>.store.ts`
* Core API interface: `<domain>.api.ts`
* Core API DTOs: `<domain>.dtos.ts` *(optional; may be co-located in `<domain>.api.ts`)*
* HTTP implementation: `<domain>.api.http.ts`
* Local/Electron implementation: `<domain>.api.local.ts`

---
