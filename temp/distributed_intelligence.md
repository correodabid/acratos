# Acratos: Decentralized Intelligence Among Sovereign Agents

**Acratos** is a sovereign cognitive network where each node (called an **Agent**) represents an individual, application, or community. These Agents not only store and synchronize information in a decentralized manner but also **think, propose, and collaborate** through distributed artificial intelligence.

Acratos transcends the traditional blockchain model. Instead of focusing on transactions or blocks, it operates around **Desires**: signed, interoperable, auditable, and executable expressions of intent.

---

## ✨ Acratos Overview

### 💡 Core Principles:

* **User Sovereignty**: Each Agent controls its state, keys, and Desires.
* **True Decentralization**: No central servers or control points.
* **Federated Computing**: AI capabilities distributed among Keepers.
* **Cryptographic Verifiability**: All results are provable without blind trust.

### 🪜 Key Components:

* **Agent**: Personal node that manages identity, state, Desires, and execution.
* **Keeper**: Node that provides computational resources (CPU, GPU, RAM).
* **Desire**: Signed document expressing an action to be executed.
* **WASM Runtime**: Self-contained module that executes logic in a secure environment.
* **ACM (Acratos Compute Market)**: P2P marketplace for on-demand AI model execution.

---

## 🤖 Sovereign AI in Acratos

Each Agent can include one or more language models (LLMs), trained locally or downloaded in modular WASM format. If a model exceeds the device's capacity, it can launch a **distributed execution Desire**, which:

1. Defines the model to use (`llama-13b`, `mistral`, etc.).
2. Splits the model into layers, blocks, or tensors.
3. Assigns execution parts to Keepers.
4. Collects signed and assembled results with ZK proofs.

### 📲 Desire Example:

```json
{
  "type": "desire.coexecute_model",
  "model": "llama-13b",
  "input": "DAO proposal summary",
  "custodians": [
    {"id": "custA", "layers": [1, 10]},
    {"id": "custB", "layers": [11, 20]}
  ],
  "requirements": {
    "zkproof": true,
    "max_latency": 2000
  }
}
```

---

## 📊 Acratos Compute Market (ACM)

Decentralized computation exchange system:

* **Supply**: Keepers advertise available capacity, supported models, pricing, reputation.
* **Demand**: Agents post execution Desires.
* **Matching**: Valid Keepers are selected based on reputation and cost.
* **Execution**: Each Keeper executes its fragment and returns output + ZKP.
* **Payment**: The Agent signs the result and releases \$SOLV proportionally.

---

## 🌌 Distributed Model Execution

The goal is to enable heavy models (like LLaMA 13B or Mistral 7B) to be executed by a network of Keepers that:

* Split the model by layer (pipeline), tensor, or batch.
* Synchronize using CRDT + gossipsub protocol.
* Generate partial execution proofs.
* Assemble results securely and verifiably.

Each execution fragment in a Keeper runs within a secure, audited, and resource-limited WASM environment.

---

## 🚀 AI Desire Lifecycle

1. The Agent detects it needs computational assistance.
2. Generates and signs a `desire.coexecute_model`.
3. The desire propagates through the network.
4. Keepers respond by accepting to execute layers.
5. They execute the model in parts.
6. Return:
   * Partial output.
   * ZKP or integrity proof.
7. The Agent assembles and verifies.
8. If valid, payment is made and the result is stored.

---

## ⚡ Impact of This Architecture on Acratos

### 🔓 Cognitive Freedom

* AI without surrendering data to Big Tech.
* Natural language processing directly on the Agent.

### 🌍 Federated Digital Economy

* Keepers earn \$SOLV directly.
* Users access AI at low cost with high privacy.

### 🤝 Agent Collaboration

* Co-creation of documents, DAO decisions, content.
* Every result is verifiable and traceable.

### 📊 Horizontal Scalability

* More Keepers = more available computing power.
* Agents without GPUs can access large models through the network.

---

**Acratos is not just a decentralized network. It's a network that thinks, decides, and expands with every Desire.**
