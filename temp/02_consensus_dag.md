# DAG Consensus Mechanism in Fractal Network

## Overview

The Fractal Network employs a Directed Acyclic Graph (DAG) structure for its consensus mechanism, which allows for high throughput and low latency in transaction processing. This document outlines the consensus algorithms implemented within the DAG structure, primarily focusing on Narwhal and Tusk for the Custodian layer. **The introduction of the Guardian role for Agents, as detailed in `08_economic_model.md`, may involve them in a form of "light consensus" or pre-validation, which is distinct from the full consensus achieved by Custodians.**

## Consensus Algorithms

### Narwhal (Custodian Layer)

Narwhal is designed to provide a robust and efficient consensus mechanism for the Fractal Network, **operated by the Custodians**. It operates by allowing **Custodian** nodes to propose transactions (or blocks of intents) and then reach consensus through a series of rounds. Key features include:

- **Asynchronous Communication**: **Custodian** nodes can communicate without waiting for a global clock, enhancing responsiveness.
- **Scalability**: The algorithm can handle a growing number of **Custodian** nodes without significant performance degradation.
- **Fault Tolerance**: Narwhal can tolerate a certain number of faulty **Custodian** nodes while still reaching consensus.

### Tusk (Custodian Layer)

Tusk builds upon the foundation laid by Narwhal, introducing additional optimizations for transaction finality **within the Custodian layer**. It focuses on:

- **Finality Guarantees**: Tusk ensures that once a transaction is confirmed **by Custodians**, it cannot be reversed, providing strong guarantees for users.
- **Efficient State Management**: The algorithm minimizes the overhead associated with state changes, allowing for faster processing times **by Custodians**.
- **Dynamic Participation**: **Custodian** nodes can join and leave the network without disrupting the consensus process.

### Light Consensus / Pre-Validation (Guardian Agents)

**With the introduction of the Guardian role, Agents staking $FRAC may participate in lighter forms of consensus or pre-validation tasks. This is NOT full DAG consensus but could involve:**

- **Intent Validation**: Guardians might perform initial validation of intents based on specific rules, offloading some work from Custodians.
- **Availability Checks**: Guardians could participate in verifying data availability, which is a precursor to consensus.
- **Threshold Signatures**: For certain operations, Guardians might contribute to threshold signature schemes, providing a layer of distributed verification.

**The exact nature and extent of Guardian participation in consensus-related tasks are defined in the `AgentCore` and `Economics` module specifications. Their role is to support and enhance the main consensus performed by Custodians, not to replace it.**

## Implementation Details

The primary implementation of Narwhal and Tusk is located in the `src` directory of the `DAGConsensus` module, **executed by Custodians**. Key components include:

- **Transaction/Block Proposals**: Mechanisms for **Custodian** nodes to propose new transactions or blocks of intents.
- **Voting Protocols**: Systems for **Custodian** nodes to vote on proposed blocks and reach consensus.
- **State Management**: Efficient handling of the global state to ensure consistency across the network, managed by Custodians.

**Mechanisms for Guardian participation in light consensus or pre-validation tasks would be implemented within the `AgentCore` module, with results potentially feeding into the `IntentProcessing` or `DAGConsensus` modules.**

## Conclusion

The DAG consensus mechanism, through Narwhal and Tusk **executed by Custodians**, provides a scalable and efficient solution for the Fractal Network. **The potential involvement of Guardian Agents in "light consensus" or pre-validation tasks aims to further decentralize certain checks and improve overall network efficiency, while Custodians remain responsible for the finality and security of the core DAG consensus.** By leveraging the unique properties of DAG structures, the network can achieve high throughput and low latency, making it suitable for a wide range of applications. 

For further details on the Custodian-level implementation, refer to the source code in the `DAGConsensus` module. **For Guardian-related contributions, see `AgentCore` and `Economics` documentation.**