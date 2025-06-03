# WebAssembly (WASM) Integration in Fractal Network

**Last Updated: May 30, 2025**

## Overview

This document outlines the integration of WebAssembly (WASM) within the Fractal Network architecture. WASM serves as a crucial component for executing smart contracts and cryptographic operations in a secure and efficient manner across both the Agents and Custodians layers.

## Purpose of WASM in Fractal Network

WASM provides a portable and efficient execution environment that allows for:

- **Cross-Platform Compatibility**: Code compiled to WASM can run in any environment that supports it, ensuring that both Agents and Custodians can execute the same logic regardless of the underlying hardware or operating system. This is particularly relevant for the `IntentProcessing` module on Custodian nodes, which executes intent logic packaged as WASM.
- **Performance**: WASM is designed to be fast, enabling near-native execution speeds which are essential for high-throughput applications like Fractal Network.
- **Security**: The WASM execution environment is isolated, reducing the risk of security vulnerabilities that could arise from executing untrusted code. This is a key feature leveraged by the `IntentProcessing` module.

## Key Components

### 1. WASM Modules

WASM modules will be used for:

- **Intent Logic Execution**: The primary use case within the `IntentProcessing` module. Business logic or smart contracts associated with intents are compiled into WASM modules for execution by Custodians. The `IntentProcessing` module's `WASMExecutionService` manages the loading and execution of these modules, currently utilizing a Wazero-based executor.
- **Zero-Knowledge Proofs**: The `ZKProofs` module will leverage WASM for generating and verifying proofs efficiently. These WASM modules can be invoked by both Agents and Custodians.

### 2. Memory Management

WASM provides a linear memory model that allows for:

- **Isolation**: Each WASM module runs in its own memory space, preventing interference between modules.
- **Controlled Resource Usage**: Limits can be set on memory and computational resources to mitigate denial-of-service (DoS) attacks.

### 3. Deterministic Execution

WASM ensures that the execution of code is deterministic, which is critical for consensus mechanisms in the Fractal Network. This means that given the same input, the output will always be the same, facilitating trust among nodes and ensuring consistent state transitions when the `IntentProcessing` module executes intents.

## Integration Steps

1.  **Compilation**: Source code for intent logic (e.g., smart contracts, specific operations) and cryptographic operations (like ZKPs) will be compiled to WASM using appropriate toolchains (e.g., Rust's built-in support, TinyGo for Go, or Emscripten for C/C++).
2.  **Deployment/Availability**: WASM modules representing executable intent logic are managed and made available to the `WASMExecutionService` within the `IntentProcessing` module on Custodian nodes. For ZKProofs, WASM modules would be embedded or distributed as needed.
3.  **Execution**: Custodians, specifically the `IntentProcessing` module via its `WASMExecutionService`, will invoke the WASM modules based on validated and auctioned intents, passing necessary parameters (intent data, current state context) and handling the results (state changes, execution receipts) as part of the intent processing workflow.

## WASM in Intent Processing

The `IntentProcessing` module is a primary consumer of WASM technology within the Custodian layer. Its `WASMExecutionService` is responsible for:
- Loading WASM modules that contain the executable logic for intents.
- Providing a sandboxed execution environment (currently using Wazero).
- Exposing a controlled set of host functions that WASM modules can call to interact with the Custodian's state or services (e.g., reading from the Agent's micro-ledger state, accessing fee parameters).
- Capturing execution results, including any state changes, logs, and errors.

Intents themselves carry data and a reference (e.g., hash or identifier) to the specific WASM module and function that should be executed. The `IntentProcessing` module uses a mock executor for unit and integration testing and the Wazero executor for running actual WASM bytecode.

Future enhancements include expanding the capabilities of host functions and optimizing the WASM execution lifecycle (e.g., caching compiled modules).

## Security Considerations

- **Sandboxing**: Ensure that WASM modules are executed in a sandboxed environment to prevent unauthorized access to the host system. This is a core feature of runtimes like Wazero, used by `IntentProcessing`.
- **Input Validation**: All inputs to WASM modules (passed from the `IntentProcessing` service) must be validated to prevent injection attacks or unexpected behavior.
- **Resource Limiting**: The WASM runtime (e.g., Wazero) must enforce strict limits on CPU, memory, and execution time for each WASM instance. This is critical for the `IntentProcessing` module to prevent DoS attacks from malicious or poorly written intent code.
- **Interface Security**: The interface between the host (`IntentProcessing` module) and the WASM guest (intent code) must be carefully designed. This includes secure data passing mechanisms and a minimal, well-audited set of host functions.
- **Regular Audits**: Conduct regular security audits of the WASM modules (especially standard libraries or frequently used intent logic) and the `WASMExecutionService` itself to identify and mitigate vulnerabilities.

## Conclusion

The integration of WASM into the Fractal Network enhances the platform's capabilities by providing a secure, efficient, and portable execution environment for smart contracts and cryptographic operations. This will play a vital role in achieving the network's goals of decentralization and high performance.