# CASE STUDY — CROWN FUTURES

---

## Slide 1 — What It Is

### On-Slide Copy
**Crown Futures** — Institutional-grade derivatives protocol for onchain futures and structured products.

- **Who it serves:** Institutional traders, funds, and market makers seeking onchain derivatives execution with cross-chain settlement.
- **One-liner:** Serious derivatives infrastructure for serious participants.

### Speaker Notes
- Set context immediately: this is not a retail perps platform. This is institutional derivatives.
- If the client/investor asks "what kind of derivatives?" — answer: futures, structured products, and custom payoff curves.

### Assets Needed
- [ ] Crown Futures logo
- [ ] Product screenshot or interface mock

---

## Slide 2 — The Hard Problem

### On-Slide Copy
**Constraints we navigated.**

- **Latency vs. decentralization** — Derivatives need fast execution. Onchain means block time constraints. Reconciling these without centralized shortcuts.
- **Cross-chain settlement** — Positions opened on one chain, settled on another. No reliable infrastructure existed.
- **Risk management at protocol level** — Liquidation engines, margin systems, and circuit breakers that work autonomously without manual intervention.
- **Regulatory ambiguity** — Derivatives carry heightened regulatory scrutiny. Architecture must be compliance-configurable, not compliance-claiming.

### Speaker Notes
- Each constraint is real and specific. Don't generalize.
- The latency/decentralization tradeoff is the core engineering challenge.
- Regulatory point: we designed for compliance configurability, not for any specific jurisdiction's rules.

### Assets Needed
- [ ] Constraint diagram (4 tensions visualized)

---

## Slide 3 — What We Built

### On-Slide Copy
**System architecture.**

- **Matching engine** — Onchain order matching with [INSERT latency/throughput metric].
- **Margin system** — Cross-collateralized margin with real-time mark-to-market.
- **Liquidation engine** — HELIOS-powered autonomous liquidation with configurable parameters.
- **Settlement layer** — Cross-chain settlement via native execution (not bridges).
- **Risk dashboard** — Real-time portfolio risk, P&L, and exposure monitoring.

### Speaker Notes
- Walk through components. Each is a deliverable we designed and built.
- HELIOS integration point: the liquidation engine runs on HELIOS agents.
- Cross-chain settlement is the technical differentiator — this is hard to build.

### Diagram Spec
- **Type:** System architecture diagram
- **Components:** Matching Engine → Margin System → Liquidation Engine (HELIOS) → Settlement Layer → Risk Dashboard
- **Style:** Layered or flow-based, with HELIOS highlighted

### Assets Needed
- [ ] System architecture diagram (see spec above)

---

## Slide 4 — Outcomes

### On-Slide Copy
**Results.**

| Metric | Value |
|--------|-------|
| TVL | [INSERT $] |
| Daily volume | [INSERT $] |
| Chains deployed | [INSERT #] |
| Uptime | [INSERT %] |
| Liquidation accuracy | [INSERT %] |

[INSERT additional KPIs or validation signals]

### Speaker Notes
- If numbers exist, lead with the biggest.
- If pre-launch, use: "In development. Testnet metrics: [INSERT]."
- Liquidation accuracy is a trust metric — institutions care about this.

### Assets Needed
- [ ] Metrics dashboard or chart

---

## Slide 5 — Lessons & Reusable Primitives (Optional)

### On-Slide Copy
**What we learned. What's reusable.**

- **Primitive 1:** Cross-chain settlement module — reusable across any protocol needing multi-chain finality.
- **Primitive 2:** HELIOS liquidation agent — configurable for any margin-based protocol.
- **Primitive 3:** Risk dashboard framework — real-time exposure monitoring, portable to other builds.

**Key lesson:** Derivatives protocols require the most rigorous engineering in DeFi. If you can build here, you can build anywhere.

### Speaker Notes
- This slide is for investors/partners who want to understand reusability.
- Each primitive is a component we can deploy in future projects — compounding value.
- The lesson positions Splice Labs as having earned the hardest credential.

### Assets Needed
- [ ] Reusable primitives diagram (3 blocks with "portable" indicators)
