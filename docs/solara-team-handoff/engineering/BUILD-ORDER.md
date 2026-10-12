# Implementation backlog and team workflow

Assign an owner and reviewer to each issue. Work in small feature branches; merge working slices. Everyone learns the shared UI and data contracts, even when they specialize.

## Issue 01 — Shared foundation

Owner: UI lead. Build fonts/tokens, header/footer, five routes, a component gallery, and default error/loading states.

Accept when: direct routes work; navigation is keyboard accessible; 390/1440 px layouts have no unintended overflow; controls match the same visual system. Preserve v1/v2 reference files.

## Issue 02 — Equipment journey, first with fixtures

Owner: frontend + data developer. Build category/search state, product cards, detail dialog/page, compatible-category comparison, and inquiry form. Keep filters in the URL where useful.

Accept when: zero results can be recovered; compare controls explain limits; the chosen product reaches the inquiry; validation is accessible; cancel preserves expected context.

## Issue 03 — First real end-to-end feature

Owner: data developer. Model product/inquiry/lead records with migrations. Add server validation, controlled inquiry creation, protected staff access, and lead status updates. Apply business permissions and row-level policies. Use a development database and fictional records.

Accept when: an inquiry is saved once, survives refresh, appears to authorized staff, and cannot be read by another customer. Test failed submission and retry. Record important staff changes. Avoid relying on localStorage for records.

## Issue 04 — Home and editorial content

Owner: UI/content developer. Build the hero without blocking on 3D, mini-estimator, services, component explainer, project story, FAQs, and CTAs.

Accept when: mini-estimator values reach Calculator; each CTA has a destination; illustrative content is labeled; real evidence replaces concept claims only when provided.

## Issue 05 — Calculator engine and scenarios

Owner: frontend + calculation owner. Extract pure, typed calculation functions and explicit units. Keep initial simplified math labeled as demo. Add validated inputs, unknown/invalid states, area constraints, result explanation, two scenarios, and quote context.

Accept when: unit tests cover boundaries and rounding; invalid input cannot produce stale results presented as current; server recomputes any authoritative quote inputs; saved assumptions and calculation version accompany estimates. A domain expert approves production methodology.

## Issue 06 — Hardware visualization

Owner: 3D developer. Follow 3D-HANDOFF.md. Integrate only after a single-panel scene and input contract work.

Accept when: panel count agrees with the estimate; camera fits extreme configurations; inputs stay usable while rendering; reduced motion and static fallback work; Home/Calculator retain state. Review real device rendering separately from logic tests.

## Issue 07 — Service workflow

Owner: frontend + data developer. Reporting, attachment validation/storage, ticket creation, ownership-verified tracking, event history, and reopen path if business rules allow.

Accept when: a reference alone does not expose private data; failed attachment does not discard form text; current status/owner/next action are clear; customer updates and internal notes are separate.

## Issue 08 — Remaining dashboard modules

Owner: dashboard + data developer. Quotations, versions/line items, installations/milestones, product editing, ticket ownership, and actionable overview.

Accept when: permissions apply on the server; destructive or externally consequential actions have appropriate review; concurrent updates cannot silently overwrite critical data; sorting/filtering works; empty/error states explain recovery.

## Issue 09 — Release review

Owner: team reviewer. Browser journeys, responsive screenshots, keyboard/contrast review, GPU/performance checks, metadata, real content, staging deployment, logs, and backup restoration test.

Accept when: inquiry → lead, estimate → quote request, service request → tracking, and staff record updates work end-to-end; credentials are not committed; production data is isolated from development; remaining limitations are explicitly accepted.

## Contracts to agree before splitting work

- Product: id, category, name, approved specs, images, availability, currency, price visibility.
- Solar configuration: monthly kWh, area m², location/climate assumptions, storage choice, panel count, kWp, annual kWh range, calculation version.
- Inquiry: selected products/configuration, contact fields, consent where required, idempotency/retry behavior.
- Ticket: owner/customer, subject, status, next action, assigned staff, customer-visible updates, internal notes, attachment metadata.
- Quote: immutable issued version, line items, currency, tax rules, totals, status, linked lead.

## Definition of done for every pull request

- One coherent change with screenshots for visual changes.
- Loading, empty, error, and success behavior where applicable.
- Correct keyboard focus, readable labels, and responsive layout.
- Relevant calculation/permission/browser tests pass.
- No credentials, real customer data, or unlicensed assets added.
- Data/schema changes include migrations and instructions.
- Reviewer confirms behavior against v2 and records intentional deviations.

First week target is a milestone, not a deadline promise: finish Issues 01–02 and begin the first end-to-end inquiry flow. Do not split the five pages among developers before shared components and contracts exist.
