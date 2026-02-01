# GitHub Copilot Instructions — Courier

## Project context
Courier is an Angular application for tracking incoming and outgoing company mail:
- Incoming mail: Réception
- Outgoing mail: Envoi
- Each Envoi can generate a "Bordereau d’envoi"
- The app is currently a web platform but is designed for a future Electron + offline (SQLite) build

Future extensions to keep in mind:
- Electron desktop build with local SQLite storage
- Offline-first usage with optional platform sync
- Platform vs local API implementations
- Configurable settings for Bordereau generation (per company / device)

---

## Angular style & constraints
- Use modern Angular with **standalone components** and **router-based architecture**
- Avoid NgModules unless explicitly requested
- Prefer clarity to clever abstractions
- Do not invent libraries, patterns, or state managers not already present

---

## Folder structure (MUST follow)

src/app/
- core/        : application-wide singletons and infrastructure
- layouts/     : app shell and navigation
- shared/      : reusable UI components, directives, and pipes (no domain logic)
- features/    : domain features only (envoi, reception, bordereau, settings)

### core/
- core/api/        : domain API abstractions (HTTP, Electron, local, etc.)
- core/services/  : cross-cutting services (http wrapper, notifications, platform detection)

### layouts/

app shell and navigation

### features/<domain>/
Each feature MUST contain:
- pages/       : routed container components
- components/  : reusable UI components (tables, dialogs, filters)
- data/        : feature store/facade + domain coordination logic
- models/      : domain models and DTOs
- <domain>.routes.ts

---

## Routing & UI rules
- Routed components live in `pages/`
- Modal/dialog forms are **components**, not pages, unless explicitly requested
- Layout and navigation belong to `layouts`

---

## Data flow rules (STRICT)

- Components are UI-only and orchestration-only
- Components MUST NOT:
  - call HttpClient directly
  - mutate MatTableDataSource `.data` directly
  - contain platform (web/electron) checks

### Correct data flow:
Component
→ Feature Store (use-cases + state)
→ core/api abstraction
→ HTTP or Electron IPC

---

## MatTable & state
- MatTableDataSource is a UI adapter only
- It must be fed from feature state (signals or observables)
- Never treat datasource as application state
- No `.data.push()`, `.splice()`, or in-place mutation from components

---

## Feature stores (recommended pattern)
- Feature stores expose **use-cases**, not raw CRUD
- Example methods: `load()`, `create()`, `update()`, `remove()`
- Feature stores may:
  - call core/api clients
  - manage loading/error state
  - trigger notifications

---

## core/api rules
- core/api contains domain I/O abstractions only
- API implementations must implement a shared interface
- HTTP and Electron/local implementations must be swappable via Angular providers
- Platform decision logic MUST live in providers or factories, never in features

---

## Naming conventions
- Page components: `*.page.ts`
- Dialog/modal components: `*-dialog.component.ts`
- Feature store/facade: `<domain>.store.ts`
- Core API client: `<domain>.api.ts`
- HTTP implementation: `<domain>.api.http.ts`
- Local/Electron implementation: `<domain>.api.local.ts`
