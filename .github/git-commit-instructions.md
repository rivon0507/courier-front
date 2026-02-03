# Git Commit Instructions

Follow these rules when generating commit messages.

---

## 1) Format (MUST)

Use this exact format:

```

<type>(<scope>): <subject>

```

Optional body:

```

<body>
```

DO NOT wrap the commit message in quotes or backticks.

---

## 2) Allowed types

Use **one** of the following types only:

* feat     : new user-facing feature
* fix      : bug fix
* refactor : code change that neither fixes a bug nor adds a feature
* chore    : maintenance, setup, tooling, or configuration
* docs     : documentation only
* ci       : CI/CD related changes
* test     : adding or updating tests
* style    : formatting only (no logic changes)

---

## 3) Scope

* Scope is **required**
* Use a short, lowercase noun
* Examples:

  * `architecture`
  * `routing`
  * `auth`
  * `envoi`
  * `settings`
  * `ci`
  * `deps`

---

## 4) Subject line

* Use **imperative present tense**
* Start with a **verb**
* Keep it concise
* Do **not** end with a period

Good:

```
refactor(architecture): reorganize routing and layout
docs(architecture): add frontend architecture document
```

Bad:

```
updated routing stuff
Refactoring architecture.
```

---

## 5) Body (optional)

Use the body only when:

* explaining *why* a change was made
* listing notable decisions
* clarifying non-obvious behavior

Keep it short and factual.
