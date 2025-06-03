# Security Considerations for Fractal Network

## Introduction
This document outlines the security considerations for the Fractal Network, focusing on the two-layer architecture comprising Agents and Custodians. Security is paramount in ensuring the integrity, availability, and confidentiality of data within the network. **The introduction of the F2P-inspired economic model, with different Agent operational modes (Explorer, Operator, Guardian, Hybrid) and new incentive structures, brings additional security dimensions that must be addressed.**

## Cryptographic Security
- **Hashing**: All data integrity checks must utilize the `blake3` hashing algorithm to ensure fast and secure hashing. This is a network-wide standard.
- **Signatures**: 
    - **General Signatures**: Use Ed25519 for most digital signatures (e.g., Custodian messages, attestations) to guarantee authenticity and non-repudiation.
    - **Agent Intents (Taproot)**: Agents use Schnorr signatures (BIP340) as part of the Taproot scheme (BIP341, BIP342) for signing intents. This provides benefits like script privacy and efficiency. The `Cryptography` module, via an FFI to a C library, handles Taproot commitment creation and Schnorr signing.
- **Key Exchange**: Implement X25519 for secure key exchanges, ensuring that all communications remain confidential.
- **Symmetric Encryption**: AES-GCM (preferably AES-256-GCM) should be used for encrypting sensitive data at rest, such as Agent micro-ledger backups. Secure nonce management is critical.
- **Key Derivation**: Use HKDF for deriving keys from shared secrets and strong password-based KDFs like Argon2id or scrypt for user password protection.
- **FFI Security (Taproot)**: The Foreign Function Interface (FFI) used for Taproot operations (Go calling C) introduces a potential security boundary. 
    - **Input Validation**: Rigorous validation of all inputs passed to the C library is essential to prevent vulnerabilities like buffer overflows or injection attacks.
    - **Memory Management**: Careful management of memory allocated by the C library is crucial. Go code must ensure timely deallocation of C-allocated resources using the provided free functions (e.g., `cryptography_free_taproot_commitment`) to prevent memory leaks or use-after-free errors.
    - **Error Handling**: Robust error propagation from C to Go must be ensured, and errors should be handled appropriately without leaking sensitive information.
    - **C Library Audits**: The underlying C library for Taproot should be well-vetted and ideally audited for security vulnerabilities.

## Data Availability
- **Pinning Mechanisms**: Custodians must implement robust pinning mechanisms to ensure that backups of micro-ledgers are always available. This includes using IPFS and challenge-response protocols to verify data availability. **If Guardians participate in data pinning or availability tasks, their contributions must be verifiable and their failure to perform these duties must have clear consequences (e.g., reputation loss, slashing).**
- **Erasure Coding**: Utilize erasure coding techniques to enhance data resilience, allowing for recovery even in the event of partial data loss.

## Zero-Knowledge Proofs
- **ZKP Implementation**: Ensure that all zero-knowledge proofs are generated and verified correctly to maintain privacy and security of transactions. This includes using Halo 2 for advanced proof generation.
- **Proof Aggregation**: Custodians should aggregate ZK proofs to minimize on-chain data and enhance efficiency while maintaining security guarantees.

## Network Security
- **P2P Communication**: Implement secure peer-to-peer communication protocols to prevent eavesdropping and man-in-the-middle attacks. Use encryption for all data transmitted between Agents and Custodians.
- **DoS Protection**: 
    - Limit resource usage in WASM modules to prevent denial-of-service attacks. Implement rate limiting and resource quotas for each module.
    - **Agent Mode Based DoS Mitigation**: The different Agent operational modes introduce new DoS vectors and mitigation strategies:
        - **Explorers**: Strict limits on intent submission rates and complexity are crucial to prevent spam from free-tier users.
        - **Guardians**: While contributing work, their tasks (e.g., light validation, availability checks) must be designed to prevent them from inadvertently or maliciously overwhelming network resources. The economic cost of $FRAC staking acts as a deterrent.
        - **Operators/Hybrids**: $SOLV fees for intents act as a primary DoS mitigation for these modes.
    - **Reputation System**: The reputation system for Guardians should factor into DoS resilience, potentially deprioritizing or temporarily limiting agents with poor reputation or suspicious activity.

## Governance and Economic Security
- **Staking and Slashing**: 
    - Ensure that the staking mechanism for Custodians is robust, with clear penalties for misbehavior (slashing) to incentivize honest participation in the network.
    - **Guardian Staking and Slashing**: The $FRAC staking requirement for Guardians acts as a security deposit. Slashing mechanisms must be clearly defined and consistently applied for Guardians who fail critical duties (e.g., fraudulent validation, prolonged unavailability, malicious behavior). The process must be fair and transparent to avoid discouraging legitimate participation.
- **Reputation System Security**:
    - **Manipulation Resistance**: The reputation system for Guardians must be designed to be resistant to gaming, collusion, or Sybil attacks. Metrics should be objective and verifiable.
    - **Fairness and Transparency**: The rules for gaining and losing reputation should be clear and auditable.
    - **Impact of Reputation**: Securely link reputation scores to privileges, rewards, and slashing probability to ensure incentives are aligned with honest and effective contributions.
- **Productive Gamification Security**:
    - **Exploit Prevention**: Gamification mechanics (missions, rewards) should be carefully designed to prevent exploits that could lead to unfair reward distribution or disrupt network balance (e.g., farming $SOLV without providing real value).
    - **Alignment with Network Goals**: Ensure that gamified incentives genuinely drive behaviors beneficial to the network's security and performance, rather than just superficial engagement.
- **Economic AI (AEA) Security**:
    - **Integrity and Influence**: If an AEA suggests economic parameters, its own operational security and the integrity of its data inputs are critical. Its recommendations should be advisory, with final approval by the DAO.
    - **Unintended Consequences**: The AEA's algorithms should be vetted for potential to cause unintended economic instability or create security loopholes if its suggestions are adopted without scrutiny.
- **$SOLV Issuance Integrity**:
    - **Verification of Guardian Work**: If $SOLV is issued based on Guardian computational work, the verification mechanism for this work must be robust and fraud-proof to prevent unbacked $SOLV issuance and inflation.
- **Auditability**: Maintain a transparent audit trail of all operations performed by Custodians **and Guardians (especially concerning their rewarded tasks and any slashing events)**, enabling external verification of compliance with security protocols.

## Conclusion
The security of the Fractal Network relies on a multi-faceted approach that encompasses cryptographic measures, data availability strategies, and robust governance mechanisms. **The F2P-inspired economic model adds layers of complexity that require diligent design of reputation systems, Guardian task verification, and incentive mechanisms to ensure they enhance, rather than detract from, overall network security.** Continuous assessment and improvement of these security measures are essential to protect the network against evolving threats.