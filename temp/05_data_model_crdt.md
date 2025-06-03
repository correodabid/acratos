# 05_data_model_crdt.md

# Data Model and CRDT Usage in Fractal Network

## Introduction

This document provides an overview of the data model utilized in the Fractal Network, focusing on the use of Conflict-free Replicated Data Types (CRDTs) to manage the micro-ledgers of Agents. The design ensures that the system remains operational in an offline-first manner while maintaining consistency across distributed nodes.

## Data Model Overview

The data model in Fractal Network is structured to support the decentralized nature of the platform. Each Agent maintains a local micro-ledger that records intents and state changes. The micro-ledger is designed to be:

- **Sovereign**: Each Agent has full control over its data.
- **Consistent**: Changes are synchronized across the network using CRDTs, ensuring eventual consistency.
- **Secure**: Data is encrypted and backed up, with cryptographic proofs ensuring integrity.

## CRDT Implementation

CRDTs are employed to handle state synchronization between Agents and Custodians. The key features of the CRDT implementation include:

- **Commutativity**: Operations can be applied in any order, allowing for concurrent updates without conflicts.
- **Idempotence**: Reapplying the same operation does not change the result, which simplifies the reconciliation process.
- **Convergence**: All replicas will converge to the same state, ensuring consistency across the network.

### Types of CRDTs Used

1. **G-Counter**: A grow-only counter that allows Agents to increment their local state.
2. **PN-Counter**: A counter that supports both increments and decrements, enabling more complex state management.
3. **LWW-Element Set**: A set that allows for adding and removing elements based on the last-write-wins principle, useful for managing intents.

## Synchronization Process

The synchronization process involves the following steps:

1. **Local Changes**: Agents make changes to their micro-ledger locally.
2. **CRDT Operations**: These changes are represented as CRDT operations.
3. **Broadcast**: Agents broadcast their operations to Custodians and other Agents.
4. **Merge**: Upon receiving operations, each node merges the incoming changes into its local state using the CRDT rules.
5. **Consistency Check**: Periodic consistency checks ensure that all nodes converge to the same state.

## Conclusion

The integration of CRDTs into the Fractal Network's data model allows for robust, decentralized data management that supports offline operations and ensures consistency across the network. This design choice is crucial for maintaining the integrity and reliability of the micro-ledgers managed by Agents.