# CASE STUDY — POOLHOUSE

---

## Slide 1 — What It Is

### On-Slide Copy
**Poolhouse** — Cross-protocol liquidity orchestration and automated rebalancing infrastructure.

- **Who it serves:** Protocols, DAOs, and funds managing liquidity across multiple venues and chains.
- **One-liner:** Liquidity management that never sleeps.

### Speaker Notes
- Poolhouse solves the "liquidity is everywhere but managed nowhere" problem.
- Position as infrastructure, not a product — it's the plumbing that protocols need.

### Assets Needed
- [ ] Poolhouse logo
- [ ] Liquidity flow visualization

---

## Slide 2 — The Hard Problem

### On-Slide Copy
**Constraints we navigated.**

- **Fragmented liquidity** — Liquidity scattered across chains, DEXs, and pools. No unified management layer exists.
- **Rebalancing latency** — Cross-chain rebalancing is slow and expensive. Every minute of imbalance is lost efficiency.
- **Impermanent loss** — Active liquidity management must account for IL across positions. Naive rebalancing can amplify losses.
- **Multi-venue complexity** — Each DEX, each chain has different mechanics. Orchestration must abstract this without losing precision.

### Speaker Notes
- Fragmentation is the root problem. Everything else follows from it.
- IL management is where most automated solutions fail.

### Assets Needed
- [ ] Fragmentation visualization (liquidity scattered across venues/chains)

---

## Slide 3 — What We Built

### On-Slide Copy
**System architecture.**

- **Liquidity aggregation layer** — Unified view of all positions across chains and venues.
- **HELIOS rebalancing agents** — Autonomous agents that monitor, analyze, and rebalance liquidity based on configurable strategies.
- **IL mitigation engine** — Active impermanent loss management with hedging and timing optimization.
- **Cross-chain routing** — Optimal route calculation for cross-chain liquidity movement. Cost and speed optimized.
- **Dashboard & reporting** — Real-time liquidity state, P&L, and agent activity.

### Diagram Spec
- **Type:** Hub-and-spoke or network diagram
- **Center:** Poolhouse orchestration layer (with HELIOS)
- **Spokes:** Multiple DEXs/chains (Uniswap, Curve, Solana DEXs, etc.)
- **Flows:** Bi-directional liquidity arrows

### Assets Needed
- [ ] Orchestration architecture diagram

---

## Slide 4 — Outcomes

### On-Slide Copy
| Metric | Value |
|--------|-------|
| Liquidity managed | [INSERT $] |
| Venues connected | [INSERT #] |
| Chains supported | [INSERT #] |
| Rebalancing efficiency | [INSERT % improvement vs. manual] |
| IL reduction | [INSERT % or bps] |

### Speaker Notes
- IL reduction is the hero metric. If we can quantify it, lead with it.
- Rebalancing efficiency = cost savings vs. manual management.

### Assets Needed
- [ ] Metrics block or performance chart

---

## Slide 5 — Lessons & Reusable Primitives (Optional)

### On-Slide Copy
- **Primitive 1:** Liquidity aggregation module — unified cross-chain position tracking for any protocol.
- **Primitive 2:** HELIOS rebalancing agent — configurable automated liquidity management.
- **Primitive 3:** IL mitigation engine — portable to any LP-based protocol.

**Key lesson:** Liquidity management is the unsexy problem that determines whether DeFi protocols survive. Automating it is not optional at institutional scale.

### Assets Needed
- [ ] Reusable primitives diagram
