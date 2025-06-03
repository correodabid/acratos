# 01_vision_architecture.md

# Fractal Network Architecture Overview

Fractal Network is a next-generation blockchain platform based on an interdependent two-layer architecture: the Agents Layer and the Custodians Layer. This structure is designed to optimize intent execution and ensure data availability while maintaining user sovereignty and decentralization.

## Agents Layer (User Logic Layer)

The Agents Layer consists of light clients operating on end-user devices, such as mobile phones, PCs, and IoT devices. This layer is responsible for:

- **Local State Maintenance**: Each agent sovereignly maintains a micro-ledger reflecting its local state.
- **Intent Generation**: Agents generate signed intents expressing desired actions, potentially using Zero-Knowledge Proofs (ZKPs) to ensure privacy and security.
- **Offline-First Synchronization**: Changes to the micro-ledger are synchronized using Conflict-free Replicated Data Types (CRDTs), allowing agents to operate effectively even when offline.
- **ZK Proof Verification**: Agents can verify ZK proofs of transactions concerning them, ensuring operational integrity.
- **Operational Modes**: Agents operate in one of several **operational modes** based on their resources and contributions to the network. These modes (e.g., Explorer, Operator, Guardian, Hybrid) determine their level of access and responsibilities. 
    - **Explorers** may have limited access for basic interactions.
    - **Operators** typically use $SOLV tokens for full access to network services.
    - **Guardians** are agents who stake $FRAC tokens and actively contribute to network tasks (like light validation, data pinning, or availability checks) to gain full access and potentially earn rewards. This represents an evolution of the Agent's role, allowing for contribution-based participation.
    - **Hybrid** agents might combine $SOLV usage with Guardian contributions.

## Custodians Layer (Sovereign Network Layer)

The Custodians Layer is formed by a decentralized network of Fractal Custodians, which are specialized, high-stake nodes performing multiple unified roles. This layer is responsible for:

- **DAG Consensus and Execution**: Custodians execute DAG consensus algorithms (e.g., Narwhal/Tusk) to order and finalize intents within clusters.
- **Data Persistence and Availability (Sovereign Layer 0 Functionality)**: They act as Fractal's sovereign Layer 0, eliminating dependence on external chains. This includes pinning encrypted backups of Agent micro-ledgers and anchoring aggregated ZK proofs of global state.
- **Traceability and Auditability**: Custodians participate in the `TraceLink` system, maintaining a `TraceMerkleTrie` for the auditability of operations between clusters and micro-ledgers.
- **Economic Security and Governance**: Custodians participate in a staking and slashing system, where their $FRAC collateral backs the fulfillment of their critical duties (e.g., validation, data pinning, availability, participation in ZK consensus).

## Conclusion

Fractal Network's two-layer architecture, with its distinct Agent and Custodian Layers, enables efficient and secure intent execution while ensuring user sovereignty and data availability. The introduction of Agent operational modes, including the active contributor role of Guardians, further enhances network participation and resilience. This modular and decentralized structure is fundamental to the network's operation and its ability to scale in the future.