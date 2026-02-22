Got it — here’s the **corrected sections** of your `ARCHITECTURE.md` reflecting that **`core/api` no longer exists** and that **all domain APIs live inside `domains/`**. I fixed structure, rules, examples, and dependency graph so everything is consistent.

You can safely replace the affected parts with this version.

---

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
  * [2) Domain structure](#2-domain-structure)
  * [3) Feature folder structure](#3-feature-folder-structure)
    * [Responsibilities](#responsibilities)
  * [4) Routing & layout conventions](#4-routing--layout-conventions)
  * [5) Data flow rules](#5-data-flow-rules)
  * [6) MatTable & UI state](#6-mattable--ui-state)
  * [7) Core layer](#7-core-layer)
  * [8) Dependency direction](#8-dependency-direction)
  * [9) Naming conventions](#9-naming-conventions)
<!-- TOC -->

---

## 1) High-level structure

The codebase uses a **domain + feature layered structure** under `src/app/`.

```
src/app
├── core
│   ├── session
│   ├── i18n
│   └── services
├── domains
│   ├── envoi
│   ├── reception
│   └── bordereau
├── layouts
├── shared
└── features
    ├── envoi
    ├── reception
    ├── bordereau
    └── settings
```

Conceptually:

* **domains/** = business logic + state + models + APIs
* **features/** = UI screens + orchestration
* **core/** = infrastructure + platform services
* **shared/** = reusable UI primitives
* **layouts/** = application shell

---

## 2) Domain structure

All **models, APIs, and stores** live inside:

```
src/app/domains/<domainName>
```

Example:

```
domains/envoi
├── envoi.store.ts
├── envoi.api.ts
└── envoi.models.ts
```

Rules:

Domains own:

* state
* business logic
* domain models
* API access
* DTO ↔ model mapping

Domains must be:

* UI-agnostic
* reusable

Domains may depend on:

* `core/services`
* other domains (only if logically justified)

---

## 3) Feature folder structure

Features represent **UI flows**, not business logic.

```
features/<domain>
├── pages
├── components
└── <domain>.routes.ts
```

### Responsibilities

**pages**

* routing targets
* connect UI to domain stores

**components**

* presentation logic only
* reusable UI widgets
* no business logic

**routes**

* feature routing configuration

Features must:

* import stores from domains
* never declare their own domain state

---

## 4) Routing & layout conventions

Routing and navigation are centralized in the app shell.

* Routed components must live in `features/<domain>/pages/`
* Dialogs are components, not pages
* Layout belongs to:

```
layouts
```

Feature routes:

```
features/<domain>/<domain>.routes.ts
```

Root router composes:

* layout routes
* feature routes

---

## 5) Data flow rules

UI is orchestration only.

Components must never:

* call HttpClient
* implement business logic
* hold persistent state

Correct flow:

```
Component/Page
→ Domain Store
→ Domain API
→ HTTP / Local implementation
```

Domains handle:

* business state
* use-cases
* coordination
* mapping

Features handle:

* rendering
* interaction
* layout

---

## 6) MatTable & UI state

`MatTableDataSource` is a **UI adapter only**.

Rules:

* fed from domain state
* never stored in domain
* never treated as application state

---

## 7) Core layer

`core/` contains **infrastructure-only services**.

Examples:

```
core/services
├── notification.service.ts
├── logger.service.ts
└── platform.service.ts
```

Core must not contain:

* domain logic
* stores
* domain APIs

---

## 8) Dependency direction

Strict dependency direction:

```
features → domains → core
```

Rules:

* features may import domains, shared, core
* domains may import core + shared
* core must not import anything from domains or features

Implications:

* features never own business state
* domains never depend on UI

---

## 9) Naming conventions

* Page component → `*.page.ts`
* Dialog component → `*-dialog.component.ts`
* Domain store → `<domain>.store.ts`
* Domain API → `<domain>.api.ts`
* Domain models → `<domain>.models.ts`
* HTTP implementation → `<domain>.api.http.ts`
* Local implementation → `<domain>.api.local.ts`
