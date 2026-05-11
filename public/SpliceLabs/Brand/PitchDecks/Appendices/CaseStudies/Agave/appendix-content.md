# CASE STUDY — AGAVE

---

## Slide 1 — What It Is

### On-Slide Copy
**Agave** — Institutional lending and yield infrastructure for onchain capital markets.

- **Who it serves:** Institutional lenders, yield funds, and protocols needing composable lending primitives.
- **One-liner:** Lending infrastructure built for composability and institutional trust.

### Speaker Notes
- Agave is not Aave-fork territory. Position as purpose-built lending infrastructure.
- Composability is the key differentiator — Agave primitives plug into other protocols.

### Assets Needed
- [ ] Agave logo
- [ ] Product interface mock

---

## Slide 2 — The Hard Problem

### On-Slide Copy
**Constraints we navigated.**

- **Composability vs. security** — Lending primitives must be composable (pluggable into other protocols) without introducing attack surface.
- **Yield optimization** — Institutional-grade yield requires active management, not passive pools. Manual management doesn't scale.
- **Cross-collateral risk** — Multi-asset collateral pools create correlated risk. Modeling and managing this is non-trivial.
- **Regulatory posture** — Lending carries specific regulatory considerations. Architecture must separate protocol logic from jurisdictional compliance.

### Speaker Notes
- Composability/security tradeoff is the core engineering challenge.
- HELIOS solves the yield optimization problem — agents actively manage pools.
- Cross-collateral risk is where most lending protocols fail silently.

### Assets Needed
- [ ] Constraint tension diagram

---

## Slide 3 — What We Built

### On-Slide Copy
**System architecture.**

- **Lending pools** — Isolated and cross-collateralized modes. Configurable per pool.
- **Rate engine** — Dynamic interest rate curves with HELIOS-managed optimization.
- **Agent-managed yield** — HELIOS agents actively rebalance, hedge, and optimize yield across pools and chains.
- **Risk framework** — Per-pool and portfolio-level risk monitoring with automated deleveraging.
- **Composable API** — Lending primitives exposed via standardized interfaces for third-party integration.

### Diagram Spec
- **Type:** System architecture
- **Components:** Lending Pools → Rate Engine → HELIOS Yield Agents → Risk Framework → Composable API
- **Style:** Layered, HELIOS agents highlighted

### Assets Needed
- [ ] System architecture diagram

---

## Slide 4 — Outcomes

### On-Slide Copy
| Metric | Value |
|--------|-------|
| TVL | [INSERT $] |
| Yield delivered | [INSERT APY range] |
| Pools deployed | [INSERT #] |
| Chains | [INSERT #] |
| Third-party integrations | [INSERT #] |

### Speaker Notes
- Yield delivered is the headline metric for lending.
- Third-party integrations validate composability thesis.

### Assets Needed
- [ ] Metrics block or chart

---

## Slide 5 — Lessons & Reusable Primitives (Optional)

### On-Slide Copy
- **Primitive 1:** Composable lending pool module — pluggable into any protocol needing onchain lending.
- **Primitive 2:** HELIOS yield optimization agent — configurable for any yield-bearing protocol.
- **Primitive 3:** Risk framework — per-pool + portfolio risk, portable to other builds.

**Key lesson:** Composability and security are not opposing forces — they require protocol-level design, not bolt-on integration.

### Assets Needed
- [ ] Reusable primitives diagram
