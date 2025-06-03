# 14. Guardian System Design

## 1. Introduction

This document details the design of the **Guardian System** within Fractal Network. Guardians are a special type of Agent that play a crucial role in the maintenance and operability of the network, actively participating in the new F2P (Free-to-Play) economic model. This system is designed to incentivize user participation, improve task decentralization, and contribute to the overall robustness of the network.

This document covers the architecture of the Guardian System, the types of tasks they can perform, the staking and reward system, reputation management, productive gamification mechanics, and their interaction with other key modules such as `AgentCore` and `Economics`.

## 2. Objectives of the Guardian System

*   **Incentivize Active Participation**: Encourage users to contribute resources and work to the network.
*   **Improve Decentralization**: Distribute critical network tasks among a larger number of participants.
*   **Increase Network Robustness**: Provide redundancy and additional capacity for essential functions.
*   **Enable the F2P Model**: Allow users to earn $SOLV by performing tasks, facilitating access to network services.
*   **Foster a Healthy Ecosystem**: Through gamification and reputation, create a participatory and competitive environment.

## 3. Main Components

The Guardian System is a cross-functional capability that relies on and interacts with various key modules and concepts within Fractal Network. Its main components are:

*   **Extended `AgentCore` Module**: It is the heart of the Guardian experience on the user's device. `AgentCore` is responsible for:
    *   Managing the transition and operational state of the Agent between different modes (e.g., from Explorer to Guardian).
    *   Interacting with the `Economics` module for staking and unstaking $FRAC.
    *   Implementing the logic for discovering available tasks in the "Task Brokering System".
    *   Coordinating the local execution of accepted tasks.
    *   Formatting and sending the task results, along with the necessary proofs, to the corresponding system for verification.
    *   Receiving and processing reward notifications ($SOLV) and reputation updates.

*   **`Economics` Module**: Provides the economic framework and incentives for the Guardian System. Its responsibilities include:
    *   Defining the levels of $FRAC staking required to operate as a Guardian and to access different types or priorities of tasks.
    *   Calculating and assigning rewards in $SOLV for the successful and verified completion of tasks. These rewards can be dynamic.
    *   Establishing and enforcing slashing conditions and penalties for Guardians in cases of malicious behavior or serious non-compliance with their duties.
    *   Managing the parameters of Productive Gamification that have direct economic implications (e.g., $SOLV bonus).

*   **Network Task System (Task Brokering System)**: Acts as the marketplace or bulletin board for tasks available to Guardians. This system must:
    *   Allow "Task Provider Modules" to publish new tasks with their requirements and associated rewards.
    *   Present available tasks to Guardians in a way that they can filter and select (e.g., by type, reward, difficulty, reputation/staking requirements).
    *   Manage the assignment or claiming of tasks to prevent multiple Guardians from unnecessarily working on the same instance of a non-parallel task.
    *   Receive the results of tasks from Guardians and direct them to the appropriate verification mechanisms.
    *   *Note: The exact design (centralized, decentralized, managed by Custodians) of this system will be detailed in its own specification, but its existence is fundamental for the Guardians.*

*   **Reputation System**: Crucial for building trust and incentivizing long-term good behavior. This system must:
    *   Collect data on Guardian performance (e.g., success rate, work quality, uptime, penalties).
    *   Calculate a reputation score or level for each Guardian.
    *   Make this reputation queryable by other systems (e.g., to prioritize task assignment or to modulate rewards).
    *   Be resistant to manipulation.
    *   *Note: It could be managed by `CustodianServices` with on-chain anchors for greater transparency and security.*

*   **Productive Gamification System**: Designed to increase engagement and guide Guardian activity in a playful manner. Its functions are:
    *   Define and manage challenges, missions, and achievements.
    *   Grant non-monetary rewards (e.g., badges, experience points) and, in coordination with `Economics`, possible $SOLV bonuses.
    *   Encourage healthy competition and collaboration through leaderboards or team events.

*   **Task Provider Modules**: These are the modules within Fractal Network that generate the "work" that Guardians will perform. Examples include:
    *   `DataAvailability`: Could generate tasks for Guardians to store additional data or participate in availability challenges.
    *   `ZKProofs`: Could outsource certain sub-processes of proof verification to Guardians with sufficient capacity.
    *   `P2P`: Could request help from Guardians for network relaying or probing tasks.
    *   Even the DAO governance itself could generate tasks related to community participation.

These components must interact seamlessly to create an effective Guardian System that benefits the network and its participants.

## 4. Agent Operational Modes and Guardian Role

As described in `docs/01_vision_architecture.md` and `docs/08_economic_model.md`, Agents in Fractal Network can operate in several modes, each with different levels of participation and capabilities within the network. The **Guardian** mode is fundamental to the F2P economic model and the decentralization of operational tasks.

An Agent can operate exclusively as a Guardian or in a **Hybrid** mode, combining Guardian functionalities with other Agent capabilities (for example, an Agent that is primarily an "Operator" but also dedicates resources to Guardian tasks).

### 4.1. Transition to Guardian Mode

For an Agent to activate and operate in Guardian mode, it must fulfill the following steps and prerequisites:

1.  **Compliance with Minimum Requirements**:
    *   **Hardware/Software**: Although the goal is for Guardian tasks to be accessible, some specific tasks may have minimum requirements for processing, storage, or bandwidth. These requirements will be defined by the "Task Provider Module" and communicated through the "Network Task System". `AgentCore` must be able to evaluate whether the device meets these requirements before accepting a task.
    *   **Agent Software**: The Agent must be running a version of `AgentCore` compatible with Guardian functionalities.

2.  **$FRAC Staking**:
    *   The Agent must stake a specific amount of $FRAC tokens. This amount is determined by the `Economics` module and may vary depending on:
        *   The desired level of participation as a Guardian (e.g., access to higher value or volume tasks).
        *   The security requirements of the network.
    *   The staking process is managed through `AgentCore`, which interacts with the functions exposed by the `Economics` module. The staked funds act as collateral and are subject to slashing.

3.  **Registration on the Network**:
    *   Once the staking requirements (and others that may be defined) are met, the Agent must explicitly register on the network as an active Guardian.
    *   This registration implies that the Agent becomes visible to the "Network Task System" and can start discovering and accepting tasks.
    *   The registration may include declaring the capabilities or types of tasks that the Guardian is willing to perform.

### 4.2. Implications of Operating as a Guardian

Activating Guardian mode entails several responsibilities and opportunities:

*   **Responsibilities**:
    *   **Task Execution**: Commitment to diligently and honestly execute the accepted tasks, following the defined protocols.
    *   **Availability**: Maintain an adequate level of connectivity and availability to receive and process tasks, especially if accepting tasks that require timely responses.
    *   **Reputation Maintenance**: Performance as a Guardian directly impacts reputation, which can affect future opportunities.
    *   **Security**: Secure the private key associated with the $FRAC stake and protect the Agent's execution environment.

*   **Opportunities**:
    *   **Earning $SOLV**: The main reward for successfully completing tasks is in $SOLV tokens, allowing users to participate in the network's economy.
    *   **Participation in Productive Gamification**: Access to additional challenges, missions, and rewards from the gamification system.
    *   **Contribution to the Network**: Play an active role in the security, decentralization, and operability of Fractal Network.
    *   **Reputation Improvement**: Good performance can lead to higher reputation, unlocking better tasks or rewards.

### 4.3. Deactivating Guardian Mode

A Guardian may choose to deactivate their operating mode. This would involve:

1.  **Unstaking Request**: Initiating the unstaking process of $FRAC through `AgentCore`, subject to the unbonding periods defined by the `Economics` module.
2.  **Completion of Active Tasks**: Generally, the Guardian will be expected to complete the tasks they have already accepted, or they may face penalties if they abandon them.
3.  **Deregistration**: Once the stake is released and obligations fulfilled, the Agent deregisters as an active Guardian.

The transition between modes should be a smooth experience managed by `AgentCore`, providing the user with clear information about the requirements, responsibilities, and the status of their participation as a Guardian.

## 5. Types of Tasks for Guardians

Guardians will be able to perform a variety of tasks. The nature and availability of these tasks will evolve with the network. Initial examples may include:

### 5.1. Data Availability Tasks
These tasks are crucial for reinforcing the resilience and accessibility of data within Fractal Network, complementing the primary responsibilities of Custodians and increasing the overall robustness of distributed storage.

    *   **Secondary Pinning**:
        *   *Description*: Store additional copies of data already held by Custodians (e.g., encrypted backups of other Agents' micro-ledgers, critical network data fragments).
        *   *Impact*: Significantly increases data redundancy, improves resistance to censorship, and speeds up recovery in case of failures or localized attacks.
        *   *Potential Requirements*: Reliable and persistent storage space, good internet connectivity (bandwidth and low latency), commitment to maintaining high uptime.
        *   *Verification*: Success in responding to periodic challenge-response protocols initiated by the data owner, by Custodians, or automatically by the system. Verification may include proofs of possession and recoverability.

    *   **Participation in Challenge-Response Protocols**:
        *   *Description*: Actively respond to cryptographic challenges designed to test the ownership and accessibility of specific data that the Guardian has committed to store.
        *   *Impact*: Provides active and continuous proof that the committed data is actually stored, correct, and accessible, maintaining the integrity of the distributed storage system.
        *   *Potential Requirements*: Processing capacity to generate the cryptographic proofs required in response to the challenges within a time limit, updated Agent software.
        *   *Verification*: Cryptographic validation of the responses to the challenges by the system or by the challenge requester. Repeated failures may lead to penalties.

    *   **Availability Monitoring**:
        *   *Description*: Perform periodic polling and reporting on the availability and accessibility of specific data or services within the network.
        *   *Impact*: Provides valuable real-time data on the overall health of the network and the accessibility of distributed data. Helps quickly identify problematic nodes, network congestion, or areas with low availability.
        *   *Potential Requirements*: Constant and reliable internet connectivity, ability to perform lightweight and non-intrusive network polling, software to report metrics in a standardized way.
        *   *Verification*: Corroboration of reports among multiple monitoring Guardians to ensure accuracy and avoid false positives. The reputation of the reporting Guardian may influence the weight of their report.

### 5.2. Light Verification Tasks
These tasks help offload some of the verification work from Custodians, which can improve scalability, reduce latency in confirming certain operations, and increase the overall efficiency of the network.

    *   **ZKP Verification (Components)**:
        *   *Description*: Verify specific portions, individual components, or particular types of zero-knowledge proofs (ZKPs) that do not require full computing capacity or global state accessible to a Custodian.
        *   *Impact*: Allows massive parallelization of ZKP verification, which can significantly accelerate the finality of certain operations or the validation of intermediate states in complex processes.
        *   *Potential Requirements*: Sufficient computing capacity to efficiently execute ZKP verifications in WASM, Agent software updated with the latest modules and parameters from `ZKProofs`.
        *   *Verification*: The verification results can be compared with a subset of verifications performed in parallel by Custodians, or through a consensus among multiple Guardians performing the same verification task. Sampling techniques can be used to validate the honesty of the Guardians.

    *   **Pre-validation of Transactions**:
        *   *Description*: Perform preliminary and standardized checks on the intents (transactions) submitted by Agents before they reach Custodians for inclusion in blocks and execution.
        *   *Impact*: Filters out malformed, unauthorized, or clearly invalid intents before they consume Custodian resources or enter intent auctions. This improves the efficiency of intent processing and reduces spam on the network.
        *   *Potential Requirements*: Knowledge of the basic intent validation rules (format, signature, basic resource limits), access to relevant metadata if needed for pre-validation (e.g., minimum balance, nonce).
        *   *Verification*: Final validation is performed by Custodians. The system can monitor the hit rate of Guardians in pre-validation, penalizing those who consistently approve invalid intents or reject valid ones, affecting their reputation.

### 5.3. P2P Network Tasks
These tasks directly contribute to the health, efficiency, robustness, and resilience of the P2P communication layer of Fractal Network, ensuring reliable information flow between all participants.

    *   **Data Relaying**:
        *   *Description*: Assist in the efficient and timely propagation of certain types of messages, transactions, or consensus data across the P2P network.
        *   *Impact*: Improves the overall connectivity of the network, reduces latency in the dissemination of critical information, and helps messages reach less connected nodes or those in more isolated network regions.
        *   *Potential Requirements*: Sufficient upload and download bandwidth, stable connectivity, network configuration that allows acting as a good P2P peer.
        *   *Verification*: May be indirect, through monitoring the overall improvement of connectivity and propagation times in the network. Custodians could perform probing or send tracer messages to verify the effectiveness of the relaying.

    *   **Peer Discovery and Route Advertising**:
        *   *Description*: Actively contribute to maintaining up-to-date lists of active and reliable peers in the network, and potentially advertise efficient routes.
        *   *Impact*: Facilitates new or reconnected nodes to quickly find and connect to other network participants, improving decentralization and the resilience of the network topology.
        *   *Potential Requirements*: Ability to perform network polling, maintain a local database of peers and their characteristics (e.g., uptime, services offered), participate in peer discovery protocols.
        *   *Verification*: Cross-referencing of peer lists provided by multiple Guardians and Custodians. The quality of the discovered or advertised peers can be measured.

### 5.4. Community and Governance Tasks
These tasks seek to encourage the active participation of Guardians in the evolution, oversight, and continuous improvement of Fractal Network, extending their contribution beyond purely technical operations.

    *   **Participation in Signaling Polls**:
        *   *Description*: Vote in non-binding polls on improvement proposals, parameter changes, or the future direction of the project.
        *   *Impact*: Provides the DAO and development teams with valuable insight into the sentiment and preferences of the Guardian (and general user) community on important issues, helping to make more informed decisions.
        *   *Potential Requirements*: Genuine interest in project governance, basic understanding of the proposals being polled.
        *   *Verification*: Participation in the poll is recorded. The reward is usually for active participation rather than the specific content of the vote, to encourage honesty.

    *   **Reporting of Light Malicious Behavior or Suspicious Activity**:
        *   *Description*: Identify and report, through a designated channel, low-level suspicious activities, spam, or potentially disruptive behavior that may not be detected or prioritized immediately by automated systems or Custodians.
        *   *Impact*: Helps maintain the "hygiene" of the network, identify new vectors of attack or abuse at early stages, and complement the main security mechanisms.
        *   *Potential Requirements*: Good observation, understanding of normal network patterns and what constitutes anomalous or malicious behavior. Integrity not to abuse the system.
        *   *Verification*: This is a delicate system that requires a robust mechanism to avoid false positives, revenge, or abuse. Reports must be corroborated (possibly by other high-reputation Guardians or Custodians) before any action is taken. The reputation of the reporting Guardian is crucial.

### 5.5. Productive Gamification Tasks
These tasks are specifically designed within the framework of the productive gamification system. Although they may have a playful component, their main objective is to guide and motivate Guardians towards activities that, directly or indirectly, benefit the health, growth, adoption, or understanding of Fractal Network.

    *   *Description*: Complete a variety of challenges, missions, or activities that may not fit directly into the previous categories but have strategic value for the ecosystem.
    *   *Specific Examples*:
        *   **Onboarding Missions**: Complete a series of introductory tasks designed to familiarize new Guardians with different aspects of the system and types of work.
        *   **Community Bug Hunts**: Participate in organized events to find and report minor vulnerabilities or usability issues in the Agent software or documentation.
        *   **Content Creation and Curation**: Produce or translate guides, tutorials, FAQs, or explanations about Fractal Network, the role of Guardian, or underlying technologies, and be rewarded for the quality and usefulness of this content.
        *   **Participation in Organized Stress Tests**: Voluntarily help in stress testing the network or new features, following specific protocols.
        *   **Achievement of Aggregate Performance Milestones**: Be rewarded for reaching certain levels of success, work volume, or consistency across multiple types of tasks over a period.
    *   *Impact*: Increases community engagement, facilitates the education and onboarding of new users/Guardians, can discover talent or valuable contributions in unexpected ways, and allows directing collective effort towards specific network objectives in a more engaging manner.
    *   *Potential Requirements*: Vary greatly depending on the specific task; can range from simply using the network to writing, programming, or analysis skills.
    *   *Verification*: Intrinsically depends on the task. It can be automatic (e.g., the system detects the completion of a series of predefined actions), peer-reviewed (e.g., for created content), or evaluated by a committee designated for specific events.

## 6. Lifecycle of a Guardian Task

The lifecycle of a Guardian task describes the complete process from when a task becomes available until it is completed, verified, and rewarded. This lifecycle is fundamental to the operation of the Guardian System and involves the interaction of multiple components.

1.  **Task Publication (by Task Provider Modules)**:
    *   A "Task Provider Module" (e.g., `DataAvailability`, `ZKProofs`, DAO Governance) identifies a need or work that can be performed by Guardians.
    *   Defines the task, including: description, success criteria, requirements (hardware, software, staking, reputation), reward offered in $SOLV, and the verification mechanism.
    *   Publishes the task in the "Network Task System" (Task Brokering System).

2.  **Task Discovery (by the Guardian)**:
    *   The `AgentCore` on the Guardian's device periodically queries the "Network Task System" to find available tasks.
    *   The Guardian (or their automated logic configured by the user) can filter and prioritize tasks based on:
        *   Device and Agent software capabilities.
        *   Guardian's current staking and reputation level.
        *   Offered reward and estimated difficulty.
        *   Type of task and user preferences.

3.  **Selection and Acceptance/Reservation of Tasks**:
    *   The Guardian selects a task they wish to perform.
    *   `AgentCore` sends a request to accept or reserve the task to the "Network Task System".
    *   The task system confirms the assignment, possibly implementing mechanisms to prevent multiple Guardians from working unnecessarily on the same instance of a non-parallel task (e.g., exclusive assignment, lottery system if there are many interested, or a "first come, first served" model for tasks that can be performed by many).
    *   There may be a time limit to start executing the task once accepted.

4.  **Task Execution**:
    *   `AgentCore` coordinates the execution of the necessary logic to complete the task.
    *   This may involve:
        *   Downloading necessary data.
        *   Computational calculations (e.g., ZKP verification, proof generation).
        *   Interaction with other Agent modules (e.g., `Cryptography` to sign results, `P2P` to communicate with other nodes).
        *   Data storage (for pinning tasks).
    *   The Agent must monitor progress and handle possible errors during execution.

5.  **Reporting Results and Proofs**:
    *   Once the task is completed, `AgentCore` prepares the result.
    *   This includes the data produced by the task and, crucially, any proof of work, proof of completion, or cryptographic proof required for verification (e.g., a signature on the result, a proof of data possession, an activity log).
    *   The Guardian sends this results and proofs package to the "Network Task System" or directly to the "Task Provider Module" according to the specific task design.

6.  **Results Verification**:
    *   The task result is subjected to a verification process to ensure it was completed correctly and according to the established criteria.
    *   The verification mechanism varies depending on the type of task:
        *   **Cryptographic Proofs**: Automatic verification of signatures, hashes, or ZK proofs.
        *   **Custodian Consensus**: For critical or complex tasks, a quorum of Custodians may validate the result.
        *   **Other Guardians Consensus (Decentralized Oracle Mechanism)**: For certain tasks, a group of high-reputation Guardians may be selected to verify the work of other Guardians.
        *   **Verification by the Task Provider Module**: The module that originated the task may have its own logic to validate the result.
        *   **Challenge-Response**: For data availability tasks, verification is continuous through challenges.
    *   The verification result (success or failure, and possibly a quality score) is recorded.

7.  **Compensation and Reputation Update**:
    *   **If verification is successful**:
        *   The `Economics` module is notified to process the reward in $SOLV.
        *   The reward is transferred to the Guardian Agent's account.
        *   The "Reputation System" positively updates the Guardian's score (e.g., increasing their reputation, recording a successfully completed task).
        *   The "Productive Gamification System" may grant points, badges, or mission progress.
    *   **If verification fails**:
        *   No reward is granted.
        *   The "Reputation System" may negatively update the Guardian's score, especially in cases of repeated failures or evidence of negligence/malice.
        *   In severe or repeated cases of malicious behavior (e.g., deliberately sending false results), the slashing mechanisms defined in the `Economics` module may be activated, resulting in the loss of a portion of the staked $FRAC.

This lifecycle seeks to be transparent and robust, incentivizing the honest and efficient participation of Guardians.

## 7. $FRAC Staking for Guardians

The staking of $FRAC is a fundamental pillar of the Guardian System, serving as a mechanism of security, commitment, and alignment of incentives. It ensures that Guardians have "skin in the game," deterring malicious behavior and fostering diligent participation.

*   **Purpose of $FRAC Staking for Guardians**:
    *   **Economic Security**: Acts as collateral that can be penalized (slashed) in case of harmful behavior or non-compliance with duties.
    *   **Sybil Attack Prevention**: Makes it costly for a single actor to create multiple false or low-quality Guardian identities.
    *   **Incentive Alignment**: Links the economic well-being of the Guardian with the proper functioning and security of the network.
    *   **Access to Tasks and Priority**: May be a requirement to access certain types of tasks or to gain higher priority in their assignment.

*   **Tiered Staking Levels**:
    *   The `Economics` module will define whether multiple levels (tiers) of $FRAC staking are implemented.
    *   These levels could enable:
        *   Access to different categories of tasks (e.g., higher value tasks, more critical or requiring more trust).
        *   Greater capacity to accept task volume.
        *   Potential multipliers on $SOLV rewards (see Section 8).
        *   Greater weight in certain consensus mechanisms among Guardians (if applicable).
    *   The definition of these levels must balance accessibility for new Guardians with the need to ensure that the most sensitive tasks are handled by Guardians with greater commitment (stake).

*   **Staking and Unstaking Process**:
    *   **Staking**: Managed by `AgentCore` in interaction with the `Economics` module. The $FRAC is transferred to a designated custody contract or mechanism where it is locked.
    *   **Funds Lock-up (Lock-up Period)**: The $FRAC staked will be locked and non-transferable for a defined period. This lock-up period helps maintain the stability of the active Guardian pool.
    *   **Unbonding Period**: When a Guardian decides to withdraw their stake (unstake), the funds are not released immediately. Instead, they enter a "unbonding" period. During this time, the funds may still be subject to slashing for late-detected malicious actions that occurred while the Guardian was active. This period also prevents massive and immediate exits of staking capital, contributing to economic stability.
    *   The duration of the lock-up and unbonding periods will be defined by the `Economics` module and may be adjusted by DAO governance.

*   **Slashing**:
    *   The $FRAC in staking (including that in the unbonding period) is subject to slashing.
    *   **Conditions for Slashing**:
        *   **Proven Malicious Behavior**: Deliberate sending of false results, participation in coordinated attacks, double signing (if applicable to any task context), etc.
        *   **Severe or Repeated Failure in Task Execution**: Not completing accepted tasks repeatedly without justified cause, or consistently failing to meet the minimum quality standards in task verification.
        *   **Non-compliance with Availability Requirements (Uptime)**: If tasks have been accepted that require a certain level of uptime and this is not maintained for a prolonged period without justification.
        *   **Violation of Specific Task Protocols**: Each type of task may have specific conditions that, if violated, could lead to slashing.
    *   **Slashing Process**: The conditions and magnitude of the slashing are defined and executed by the `Economics` module, often in coordination with `CustodianServices` (which may provide evidence or validation of the offense) and the "Network Task System" (which may report the non-compliance).
    *   **Destination of Slashed Funds**: The $FRAC obtained from slashing could be burned (reducing the total supply), sent to the Economic Treasury, or redistributed as additional rewards to honest Guardians, as defined by the economic policy and governance.
    *   **Transparency and Disputes**: There must be a clear and transparent process for slashing, with the possibility of review or dispute in certain cases, although finality and automation will be key to efficiency.

*   **Additional Considerations**:
    *   **Stake Delegation (Potential Future)**: A system could be considered where $FRAC holders can delegate their stake to trusted Guardians, sharing risks and rewards. This is mentioned in "Future Improvements" (Section 14) and is not part of the initial design.
    *   **Stake Yield**: The staking of $FRAC itself (excluding $SOLV rewards for tasks) could or could not generate a base yield in $FRAC, depending on the design decisions of the `Economics` module and the monetary policy of $FRAC. The primary reward focus for Guardians is the $SOLV earned for work.

## 8. $SOLV Reward System

The reward system in $SOLV is the main economic incentive for Guardians to actively participate and contribute useful work to the network. This system is intrinsically linked to the `Economics` module and the F2P (Free-to-Play) model of Fractal Network.

*   **Purpose of $SOLV Rewards**:
    *   **Incentivize Useful Work**: Compensate Guardians for the time, resources (computational, storage, bandwidth), and effort invested in completing tasks that benefit the network.
    *   **Facilitate the F2P Model**: Allow users to earn $SOLV, which they can then use to pay for the execution of their own intents or other operations on the network, creating a sustainable economic cycle.
    *   **Dynamize the Internal Economy**: $SOLV acts as the operational token, and its flow through rewards to Guardians is vital for liquidity and economic activity within Fractal Network.

*   **Determination of Reward per Task**:
    *   The base reward in $SOLV for each task will be determined by the **Task Provider Module** in consultation with the guidelines and mechanisms established by the `Economics` module and the **Algorithmic Central Bank (ACB)**.
    *   Factors influencing the base reward include:
        *   **Complexity and Required Resources**: Tasks that demand more computing, storage, or are harder to execute correctly, will generally offer higher rewards.
        *   **Critical Importance to the Network**: Tasks that are vital for the security, availability, or essential functionality of the network may have prioritized rewards.
        *   **Supply and Demand for Tasks**: The ACB may implement mechanisms to dynamically adjust rewards based on the availability of Guardians and the demand for certain types of tasks. If there is a shortage of Guardians for a critical task, the rewards may temporarily increase to attract more participants.
        *   **Estimated Value to the Network**: The value that the completion of the task brings to the Fractal ecosystem.
    *   Rewards may be fixed per task type or vary within a range.

*   **Reward Modifiers**:
    *   To incentivize quality and long-term commitment, modifiers may be applied to the base reward:
        *   **Guardian's Reputation**: Guardians with higher reputation (see Section 9) may receive a positive multiplier on their rewards. This rewards reliability and historical good performance.
        *   **$FRAC Staking Level**: Guardians with a higher level of $FRAC staked (see Section 7) may be eligible for reward multipliers or access to tasks with higher base rewards. This further aligns economic incentives.
        *   **Performance on the Specific Task**: For some tasks, if it is possible to measure the quality of the result (e.g., speed, accuracy above the minimum), additional bonuses may be granted.
        *   **Productive Gamification Bonuses**: Completing certain missions or challenges within the gamification system (see Section 10) may unlock temporary $SOLV bonuses on subsequent tasks.
    *   These modifiers are managed by the `Economics` module.

*   **Reward Distribution Process**:
    *   Once a task is completed by a Guardian and the result is **successfully verified** (see Section 6, point 7), the "Network Task System" or the "Task Provider Module" notifies the `Economics` module.
    *   The `Economics` module calculates the final reward, applying any relevant modifiers.
    *   The calculated amount of $SOLV is then transferred from a designated account (e.g., a rewards treasury account managed by the ACB) to the Guardian Agent's address.
    *   This process must be as efficient and automated as possible to ensure that Guardians receive their rewards in a timely manner.
    *   `AgentCore` must reflect the updated $SOLV balance and maintain a history of earned rewards.

*   **Role of the Algorithmic Central Bank (ACB)**:
    *   The ACB, under the supervision of the DAO governance, plays a role in managing the reward policy.
    *   It can adjust the parameters that influence the issuance of $SOLV for rewards, seeking a balance between incentivizing participation and maintaining the economic stability of $SOLV.
    *   Monitors the task economy and may propose changes to the reward structures.

*   **Transparency**:
    *   The base reward for each task must be clearly visible to the Guardian before they accept the task.
    *   The applied modifiers and the final reward calculation must be transparent or, at least, auditable for the Guardian.

The $SOLV reward system is, therefore, a dynamic and essential component, designed to ensure that Guardians are fairly compensated for their contributions, thus driving participation and the overall health of Fractal Network.

## 9. Guardian Reputation System

The Guardian Reputation System is a crucial mechanism designed to foster trust, incentivize honest and competent behavior, and differentiate Guardians based on their contribution history and reliability within Fractal Network. A robust and transparent reputation is essential for the health and security of the Guardian ecosystem.

*   **Main Objectives of the Reputation System**:
    *   **Measure Reliability and Performance**: Objectively and continuously quantify the quality and consistency of the work performed by Guardians.
    *   **Incentivize Positive Behavior**: Reward Guardians who demonstrate reliability, competence, and long-term commitment to the network.
    *   **Deter Negative Behavior**: Penalize or marginalize Guardians who act maliciously, negligently, or inconsistently.
    *   **Facilitate Guardian Selection**: Allow the "Network Task System" and "Task Provider Modules" to prioritize or select Guardians based on their demonstrated reliability.
    *   **Build Trust**: Provide a basis for trust among network participants, including Agents who may indirectly depend on the work of Guardians.

*   **Key Metrics for Reputation Calculation**:
    A Guardian's reputation will be calculated as a composite score, influenced by multiple factors. The exact weight of each metric can be adjusted by DAO governance.

    *   **Success Rate in Completed Tasks**:
        *   *Description*: Percentage of accepted tasks that are successfully completed and pass verification.
        *   *Calculation*: (Number of successfully verified tasks) / (Total number of accepted and completed tasks).
        *   *Considerations*: Could be weighted by the difficulty or criticality of the tasks. Failures due to externally verifiable factors may have less impact.

    *   **Work Quality (when measurable)**:
        *   *Description*: For tasks where quality is a factor (e.g., accuracy of reported data, efficiency in ZKP verification), performance will be evaluated beyond simple completion.
        *   *Measurement*: May be based on comparison with reference results, validation by multiple parties, or task-specific metrics.
        *   *Impact*: Consistently high performance may significantly increase reputation.

    *   **Uptime and Availability**:
        *   *Description*: Relevant for tasks that require the Guardian to be online and responsive (e.g., data pinning, response to challenges, P2P relaying).
        *   *Measurement*: Through periodic polling by the system or the ability to respond to task requests within defined timeframes.
        *   *Impact*: High uptime and quick response are crucial for perceived reliability.

    *   **$FRAC Stake Age and Volume**:
        *   *Description*: The amount of $FRAC staked and the time it has been locked.
        *   *Impact*: A higher stake and longer stake age may be interpreted as a greater commitment to the network, positively influencing reputation. Reflects long-term "skin in the game".

    *   **History of Penalties (Slashing)**:
        *   *Description*: Any instance of slashing due to malicious behavior or severe negligence.
        *   *Impact*: Has a significant and direct negative impact on the reputation score. Multiple slashing events can lead to an irrecoverable reputation or exclusion from the Guardian system.

    *   **Participation and Achievements in Productive Gamification**:
        *   *Description*: Positive contributions through the gamification system, such as completing important missions, earning merit badges, or contributing to the ecosystem in valued ways.
        *   *Impact*: Can provide a positive boost to reputation, especially if gamification activities are aligned with network objectives.

    *   **Consistency and Predictability**:
        *   *Description*: A history of stable performance over time, rather than sporadic peaks of activity or quality.
        *   *Impact*: Long-term reliability is a valuable component of reputation.

*   **Impact and Utility of Reputation**:
    A high reputation score unlocks various advantages and opportunities for Guardians:

    *   **Priority Access to Tasks**: The "Network Task System" may offer tasks first to Guardians with higher reputation, or allow them to select from a broader or more valuable pool of tasks.
    *   **$SOLV Reward Modifier**: As detailed in Section 8, a high reputation may act as a positive multiplier for earned $SOLV rewards.
    *   **Requirement for High-Trust Tasks**: Certain critical, sensitive tasks, or those handling valuable information may be reserved exclusively for Guardians who exceed a specific reputation threshold.
    *   **Reduced Collateral Requirement (Potential)**: In the future, Guardians with exceptionally high and sustained reputation may see reduced staking requirements for certain participation levels, although this requires careful risk analysis.
    *   **Influence in Governance (Potential)**: Reputation could be used as a factor (in addition to $FRAC stake) to weigh votes in certain signaling polls or for eligibility in specific community roles within the DAO.
    *   **Less Scrutiny (with caution)**: Tasks completed by very high-reputation Guardians may require a less intensive verification threshold in some cases, although safeguards will always be maintained.

*   **Decay and Recovery of Reputation**:
    *   **Inactivity Decay**: Prolonged periods without participating as a Guardian may lead to a gradual decrease in reputation to ensure that scores reflect current commitment.
    *   **Consistent Poor Performance Decay**: A consistently high failure rate or low-quality task performance will negatively impact reputation over time.
    *   **Minor Penalty Impact**: Small failures or non-compliance may have a temporary or minor negative impact, from which recovery is possible.
    *   **Recovery**: Guardians can improve their reputation through a sustained history of good performance, successful task participation, and positive engagement with the network. The system must allow for redemption, although severe offenses (leading to slashing) will have a lasting impact.

*   **Implementation and Technical Considerations**:
    *   **Reputation Data Storage**: The reputation score and the metrics that compose it must be stored securely and be resistant to manipulation.
        *   **Option 1: Managed by `CustodianServices` with On-chain Anchors**: `CustodianServices` could calculate and maintain reputation scores, with hashes or periodic summaries anchored to the consensus layer of Fractal Network for transparency and auditability. This allows for more complex off-chain calculations.
        *   **Option 2: Completely On-chain System**: A smart contract could directly manage the metrics and calculate the reputation. This offers maximum transparency but may be more costly and limited in complexity.
    *   **Reputation Update**: Scores must be updated regularly in response to task completions, slashing events, or changes in stake.
    *   **Resistance to Manipulation (Gaming the System)**:
        *   The design of the metrics must be robust to prevent Guardians from artificially inflating their reputation (e.g., by only completing trivial tasks, colluding).
        *   The weighting of the metrics and monitoring by the DAO are important.
    *   **Privacy**: While the reputation score is public, the detailed performance data may have privacy considerations.

*   **Interaction with Other Systems**:
    *   **Task System**: Uses reputation for assignment and prioritization.
    *   **`Economics` Module**: Uses reputation to modify rewards and as a factor in slashing decisions.
    *   **Gamification System**: May contribute to reputation and also use it as a requirement for certain challenges.

A well-designed reputation system is vital to create a fair, efficient, and secure Guardian ecosystem, where good behavior is consistently recognized and rewarded.

## 10. Productive Gamification

Productive Gamification in Fractal Network, as introduced in `docs/08_economic_model.md`, is a system designed to go beyond simple task rewards. Its aim is to foster deeper engagement, guide Guardian behavior towards strategically valuable activities for the network, and make participation more attractive and multifaceted. This system closely integrates with the Task System, Reputation System, and `Economics` module.

*   **Key Objectives of Productive Gamification**:
    *   **Increase Engagement**: Keep Guardians motivated and actively participating in the network through game mechanics.
    *   **Direct Collective Effort**: Incentivize Guardians to perform tasks or activities that, while not directly transactional, are beneficial for the growth, security, adoption, or understanding of Fractal Network.
    *   **Facilitate Onboarding and Education**: Use game mechanics to guide new Guardians through the functionalities of the network and best practices.
    *   **Foster Community and Collaboration**: Create opportunities for positive social interaction and healthy competition among Guardians.
    *   **Discover Talent and Diverse Contributions**: Allow Guardians to contribute in varied ways, recognizing different types of skills and efforts.

*   **Main Gamification Mechanics**:

    *   **Challenges and Quests**:
        *   *Description*: Specific tasks or series of tasks structured with clear objectives and optional narratives. They can be individual or team-based.
        *   *Types*:
            *   **Onboarding Missions**: Guide new Guardians through initial setup, performing their first tasks of different types, and understanding staking and reputation systems.
            *   **Skill Challenges**: Require the use of specific skills (e.g., finding a subtle bug, optimizing a small script for a task, proposing an improvement to documentation).
            *   **Ecosystem Contribution Missions**: Encourage activities like creating educational content (tutorials, guides), translating documentation, actively participating in discussion forums helping others, or organizing small community events.
            *   **Exploration Challenges**: Incentivize Guardians to try new network functionalities or participate in test networks.
        *   *Rewards*: May include $SOLV bonuses, experience points (XP) for the gamification system, special reputation badges, collectible cosmetic NFTs, or early access to new features.

    *   **Leaderboards**:
        *   *Description*: Public rankings of Guardians based on various metrics.
        *   *Types*: Can be global or specific to certain events or task types. Metrics may include completed tasks, gamification points, reputation, activity streaks, etc.
        *   *Impact*: Encourage healthy competition and recognition. Top positions may receive additional rewards or prestige.
        *   *Considerations*: Must be designed to avoid demotivating new participants and excessive focus on easily "grindable" metrics.

    *   **Badges and Achievements**:
        *   *Description*: Visual recognitions (potentially non-transferable NFTs or linked to the Guardian's identity) awarded for reaching specific milestones or demonstrating excellence.
        *   *Examples*: "Pioneer Guardian" (for early joining), "Availability Master" (for impeccable uptime), "Veteran Bug Hunter", "Outstanding Community Contributor", "100 Successful Tasks Streak".
        *   *Impact*: Serve as proof of skill and commitment, contribute to the Guardian's profile, and may be requirements for certain advanced missions or community roles.

    *   **Special Events and Seasons**:
        *   *Description*: Limited-time periods with unique sets of tasks, missions, leaderboards, and increased rewards. They may be themed around network milestones, updates, or growth campaigns.
        *   *Impact*: Create spikes of activity and excitement, and allow focusing the collective effort of Guardians on specific objectives for a set time.

    *   **XP and Gamification Levels**:
        *   *Description*: A progression system where Guardians earn XP for completing tasks and participating in gamification activities. Accumulating XP allows leveling up.
        *   *Impact*: Levels may unlock new missions, greater potential rewards, access to special community areas, or simply serve as a measure of the Guardian's experience and dedication.

*   **Integration with Other Systems**:
    *   **Task System**: Many missions and challenges will be based on the completion of regular Guardian system tasks.
    *   **Reputation System**: Achievements and participation in gamification may positively influence the Guardian's overall reputation (Section 9). In turn, good reputation could be a prerequisite for accessing certain high-level challenges.
    *   **`Economics` Module**: Manages the distribution of any monetary reward ($SOLV bonuses) associated with gamification. The ACB may oversee the budget allocated for these rewards.
    *   **`AgentCore`**: Must be able to show the Guardian their progress in missions, achievements, XP, badges, and relevant notifications from the gamification system.

*   **Gamification Design and Governance**:
    *   **Balance**: It is crucial to find a balance so that gamification is attractive but does not distract from the main purpose of Guardian tasks (to contribute usefully to the network). Rewards must be aligned with the real value provided.
    *   **Exploitation Prevention**: Mechanics must be carefully designed to prevent Guardians from "gaming the system" to obtain rewards without genuine contribution.
    *   **Continuous Evolution**: The gamification system should not be static. New challenges, missions, and events should be regularly introduced to maintain interest and adapt to the changing needs of the network.
    *   **Community Participation**: The DAO and the Guardian community can propose and vote on new ideas for missions, challenges, and events, making the system more participatory.

Productive Gamification seeks to transform participation in Fractal Network from a simple transaction of work for reward to a richer, more motivating experience aligned with the long-term goals of the ecosystem.

## 11. Interaction with Other Modules

The Guardian System does not operate in isolation; it is a functional layer that is deeply intertwined with multiple core modules of Fractal Network. This section details the key interactions, highlighting how the Guardian System depends on and contributes to the overall functionality of the network.

*   **`AgentCore` (Main Agent Module)**:
    *   **Guardian Mode Management**: `AgentCore` is responsible for transitioning the Agent to Guardian mode (and vice versa), including verifying requirements and registering on the network.
    *   **Staking Interface**: Directly interacts with the `Economics` module so that the user can perform the necessary staking and unstaking of $FRAC to operate as a Guardian.
    *   **Task Discovery and Management**: `AgentCore` queries the "Network Task System" for available tasks, allows the user (or their configured automated logic) to select and accept tasks, and manages their local execution.
    *   **Results Reporting**: Formats and sends the results of completed tasks, along with the necessary proofs, to the corresponding verification system.
    *   **Receiving Rewards and Updates**: Receives notifications of rewards in $SOLV (from the `Economics` module) and updates on reputation and gamification, storing and presenting them to the user.
    *   **Local Storage of Guardian Data**: Maintains locally the state of the Guardian, including active tasks, task history, reputation, $SOLV earned, and gamification badges.

*   **`Economics` (Network Economic Module)**:
    *   **Definition of Economic Parameters for Guardians**: Establishes the $FRAC staking requirements, the rules for staking levels (if any), the structure of $SOLV rewards for tasks, and the conditions and severity of slashing.
    *   **Staking and Slashing Processing**: Executes the logic to lock $FRAC in stake, process unstaking requests (including unbonding periods), and apply slashing penalties to Guardians who violate the rules.
    *   **$SOLV Reward Distribution**: Receives notifications of verified tasks and transfers the corresponding $SOLV rewards to the accounts of the Guardians. This may involve interaction with the Algorithmic Central Bank (ACB) for $SOLV supply management.
    *   **Economic Treasury Management**: Funds from slashing or certain task-related fees may go to the Treasury, managed by `Economics` under DAO supervision.
    *   **Gamification Interface**: Provides the $SOLV for reward bonuses that may arise from the productive gamification system.

*   **`CustodianServices` (Custodians Services - Sovereign Layer L0)**:
    *   **Verification of Critical Tasks**: Custodians may be responsible for the final verification of certain types of tasks performed by Guardians, especially those that are more complex, sensitive, or have a direct impact on the state of the network.
    *   **Management of the Reputation System (Potential)**: As discussed in Section 9, `CustodianServices` could host the logic of the Reputation System, calculate scores, and anchor proofs of these scores in the consensus layer for transparency and security.
    *   **Coordination of Slashing**: In case of detected malicious behavior, `CustodianServices` can provide the necessary evidence or validation to the `Economics` module to initiate a slashing process against a Guardian.
    *   **Source of Some Tasks**: Custodians themselves could generate tasks for Guardians, for example, related to delegating monitoring or data collection subtasks that assist Custodians in their primary functions.

*   **Task Provider Modules (e.g., `DataAvailability`, `ZKProofs`, `P2P`, DAO Governance)**:
    *   **Task Generation**: These modules are the main source of work for Guardians. They define the task specifications, their requirements, and the success criteria.
        *   `DataAvailability`: May generate tasks for secondary pinning, participation in challenge-response, or availability monitoring.
        *   `ZKProofs`: Could outsource the verification of ZKP components.
        *   `P2P`: Could request help for data relaying or peer discovery.
        *   Governance DAO: Could generate tasks related to signaling polls or community participation.
    *   **Task Verification (Partial or Total)**: Depending on the task, the provider module may have its own logic to verify the results submitted by Guardians or to provide the necessary data to other verification systems (like `CustodianServices`).
    *   **Consumption of Results**: Use the results and data provided by Guardians to fulfill their own functions within the network.

*   **Network Task System (Task Brokering System - Logical Entity)**:
    *   **Publication and Discovery**: Acts as the marketplace where Task Provider Modules publish tasks and Guardians' `AgentCore` discover them.
    *   **Assignment and Reservation**: Manages the logic for assigning tasks to Guardians, avoiding conflicts, and ensuring efficient distribution of work.
    *   **Results Routing**: Directs the results of tasks reported by Guardians to the appropriate verification mechanisms.
    *   **Notifications**: Informs `AgentCore` and `Economics` about the status of tasks (e.g., completed, verified, failed).
    *   *Note: This system is more of a logical entity whose functionalities could be distributed or implemented by a combination of `CustodianServices` and smart contracts.*

*   **DAO Governance (Decentralized Autonomous Organization)**:
    *   **Overall Oversight**: The DAO has the ultimate authority over the policies governing the Guardian System, including the key economic parameters (defined in `Economics`), the rules of the reputation system, and the guidelines for gamification.
    *   **Updates and Evolution**: Proposals for significant changes to the Guardian System (e.g., new types of tasks, changes in slashing mechanisms) would be submitted to the DAO vote.

The correct and efficient interaction between these modules is fundamental for the Guardian System to function as an integral and valuable component of Fractal Network, contributing to its decentralization, security, and economic vitality.

## 12. Security Considerations

The security of the Guardian System is paramount to protect both the Guardians themselves and the Fractal Network as a whole. Multiple potential attack vectors and vulnerabilities must be addressed.

*   **Guardian Agent (`AgentCore`) Security**:
    *   **Private Key Protection**: The Agent's private key, which controls the $FRAC stake and receives rewards in $SOLV, must be robustly protected. `AgentCore` must implement best practices for key management (e.g., secure storage, option to use hardware wallets if possible).
    *   **Secure Execution Environment**: Tasks are executed on the Guardian's device. `AgentCore` must ensure that the task execution environment is as isolated as possible to prevent malicious tasks (if any manage to pass the filters) from compromising the user's device, or malware on the user's device from corrupting task results.
    *   **Task Software Validation**: If tasks involve downloading and executing code (e.g., specific WASM modules for a task), this code must be verified (e.g., signed by the task provider, analyzed in a sandbox) before execution.

*   **Network Task System Security**:
    *   **Authentication and Authorization of Task Providers**: Only authorized entities (verified Task Provider Modules) should be able to publish tasks in the system. This prevents the injection of malicious or spam tasks.
    *   **Task Definition Validation**: The system must validate that published tasks have coherent definitions, reasonable rewards, and clear verification mechanisms to avoid exploitation or resource blocking of the Guardians.
    *   **Resistance to DoS/DDoS**: The discovery and acceptance system for tasks must be resistant to attacks that seek to overload it or prevent legitimate Guardians from accessing tasks.

*   **Prevention of Malicious Behavior by Guardians**:
    *   **False or Corrupted Results**: The task verification mechanism is the main defense. The slashing of $FRAC acts as an economic deterrent.
    *   **Guardian Collusion**: Groups of Guardians could try to collude to incorrectly validate each other's work or to manipulate Guardian-based voting systems (if any exist). Verification mechanisms must be robust against this (e.g., requiring a high consensus threshold, randomly selecting verifiers, using Custodians as final arbiters).
    *   **Sybil Attacks**: The $FRAC staking is the main defense against Sybil attacks, where an attacker creates many false Guardian identities. The cost of the stake must be significant enough.
    *   **Grinding/Farming Trivial Tasks**: If there are very easy tasks with rewards, Guardians might focus only on them. The design of tasks and rewards must balance this, and the reputation system could give less weight to the mere quantity of trivial tasks completed.

*   **Reputation System Security**:
    *   **Reputation Manipulation**: Prevent Guardians from artificially inflating their reputation or sabotaging others'. The metrics must be objective and hard to "game".
    *   **Reputation Washing Attacks**: Prevent a Guardian with bad reputation from simply creating a new identity (with new stake) to escape their negative history. This can be mitigated by linking reputation to a more persistent stake or through behavior analysis.

*   **$SOLV Reward System Security**:
    *   **Double Spending of Rewards**: Ensure that a completed task is only rewarded once.
    *   **Exploitation of Reward Logic**: The calculation of rewards and modifiers must be carefully audited to avoid vulnerabilities that allow Guardians to claim more $SOLV than due.
    *   **Protection of Rewards Treasury**: The $SOLV funds allocated for rewards must be secure.

*   **Productive Gamification Security**:
    *   **Exploitation of Game Mechanics**: Similar to the exploitation of rewards, prevent Guardians from abusing gamification mechanics to gain unfair advantages or rewards.
    *   **Negative Impact on the Network**: Ensure that gamification activities do not incentivize behaviors that, while seemingly playful, could be harmful to the network (e.g., overloading certain services for a poorly designed challenge).

*   **General Security Considerations**:
    *   **Secure Software Updates**: `AgentCore` and any component related to the Guardian System must have a secure update mechanism to deploy patches and new features without introducing vulnerabilities.
    *   **Regular Security Audits**: The code of the involved modules (`AgentCore`, `Economics`, `CustodianServices` regarding Guardians, and the task system itself) must be regularly audited by security experts.
    *   **Incident Response Plan**: Have a plan in case a vulnerability or ongoing attack is discovered, including how to communicate the issue, how to mitigate it, and how to compensate affected parties if necessary.
    *   **Transparency and Responsible Disclosure**: Encourage responsible disclosure of vulnerabilities by the community.

Security is an ongoing process and requires constant vigilance, adaptation to new threats, and a commitment to best practices at all levels of the Guardian System.

## 13. Main Data Flows

This section describes the most important data flows within and through the Guardian System, illustrating how information moves between the different components and modules.

*   **Flow 1: Task Publication and Discovery**
    1.  **Task Provider Module** -> **Network Task System**: The provider defines (Description, Requirements, Reward, Verification) and publishes a new task.
    2.  **`AgentCore` (Guardian)** -> **Network Task System**: The Agent queries the available tasks, applying filters (Capacity, Reputation, Interest).
    3.  **Network Task System** -> **`AgentCore` (Guardian)**: The system returns a list of eligible tasks.

*   **Flow 2: Task Acceptance and Execution**
    1.  **`AgentCore` (Guardian)** -> **Network Task System**: The Agent selects and sends a request to accept/reserve a specific task.
    2.  **Network Task System** -> **`AgentCore` (Guardian)**: The system confirms the assignment (or rejects if not available/eligible).
    3.  **`AgentCore` (Guardian)**: Executes the task locally. This may involve:
        *   -> **External Network/IPFS/Other Nodes**: If the task requires obtaining data (e.g., for pinning or verification).
        *   -> **Internal `AgentCore` Modules (`Cryptography`, `ZKProofs` WASM)**: For processing, signing, proof generation.

*   **Flow 3: Results Reporting and Verification**
    1.  **`AgentCore` (Guardian)** -> **Network Task System / Task Provider Module**: The Agent sends the task result along with completeness/honesty proofs.
    2.  **Network Task System / Task Provider Module** -> **Verification Mechanism**: The result is sent to the component responsible for verification (e.g., `CustodianServices`, other Guardians, provider logic).
    3.  **Verification Mechanism** -> **Network Task System / Task Provider Module**: The verification result (Success/Failure, Quality) is returned.

*   **Flow 4: Compensation and State Update (After Successful Verification)**
    1.  **Network Task System / Task Provider Module** -> **`Economics`**: Notification of successfully verified task, including Guardian ID and task details.
    2.  **`Economics`** -> **Guardian Account**: Calculates and transfers the reward in $SOLV (considering reputation/stake modifiers).
    3.  **`Economics`** -> **Reputation System**: Sends data to positively update the Guardian's reputation.
    4.  **`Economics` (or Task System)** -> **Gamification System**: Sends data to grant XP, badges, or mission progress.
    5.  **`Economics` / Reputation System / Gamification System** -> **`AgentCore` (Guardian)**: The Agent receives the reward notification and status updates.

*   **Flow 5: Penalty (After Failed Verification or Malicious Behavior Detection)**
    1.  **Network Task System / Task Provider Module** -> **`Economics`**: Notification of verification failure or malice detection, with Guardian ID and evidence.
    2.  **`Economics`** -> **Reputation System**: Sends data to negatively update the Guardian's reputation.
    3.  **`Economics` (if Slashing applies)**:
        *   -> **Staking Contract**: Executes the slashing logic on the Guardian's $FRAC.
        *   -> **Economic Treasury / Token Burning**: The slashed funds are directed according to policy.
    4.  **`Economics` / Reputation System** -> **`AgentCore` (Guardian)**: The Agent receives the penalty notification.

*   **Flow 6: $FRAC Staking**
    1.  **`AgentCore` (Guardian)** -> **`Economics`**: Staking request of $FRAC, specifying the amount.
    2.  **`Economics`** -> **Staking Contract / Guardian Account**: Transfers $FRAC from the Guardian's account to the staking contract and updates the Guardian's stake status.
    3.  **`Economics`** -> **`AgentCore` (Guardian)**: Confirmation of successful staking.
    *   *(The Unstaking flow is similar, but includes the unbonding period logic)*.

*   **Flow 7: Reputation/Gamification Update (Non-task-specific events)**
    1.  **External Events** (e.g., decay due to inactivity, gamification achievements not directly tied to tasks) -> **Reputation System / Gamification System**: Update scores/states.
    2.  **Reputation System / Gamification System** -> **`AgentCore` (Guardian)**: Notification of changes.

These data flows illustrate the interconnected nature of the Guardian System and the importance of clear interfaces and robust communication protocols between the modules.

## 14. Future Improvements

The Guardian System is designed to be evolutionary. As Fractal Network matures and new needs and opportunities arise, the following improvements and expansions can be incorporated:

*   **More Sophisticated Task Marketplace**:
    *   **Reverse Auctions for Tasks**: Guardians could bid to perform tasks, potentially reducing the cost for task providers in scenarios with a high supply of Guardians.
    *   **Task Bundling**: Allow Guardians to accept packages of related tasks for greater efficiency.
    *   **Task Discovery Based on Geographic or Network Proximity**: For tasks where latency or location are critical.

*   **Advanced Staking Mechanisms**:
    *   **$FRAC Stake Delegation**: Allow $FRAC holders to delegate their stake to trusted Guardian operators, sharing risks and rewards. This could increase participation and total staked capital.
    *   **Slashing Insurance**: Development of third-party mechanisms or products that allow Guardians to insure a portion of their stake against certain types of slashing events (excluding proven malice).

*   **Improved Reputation System**:
    *   **Transferable Reputation (Partially or under conditions)**: Explore whether certain aspects of reputation could be transferable or inheritable, or if sub-reputations can be created by task type.
    *   **Negative Reputation as Debt**: Instead of just losing reputation, certain failures could generate a "reputation debt" that must be "paid off" with successful work.
    *   **Integration with Decentralized Identity (DID)**: Link Guardian reputation to a DID for greater portability and sovereignty.

*   **Expanded Task Types**:
    *   **Generalized Off-Chain Computation**: Allow Guardians to execute more complex and generic computation tasks requested by intents or smart contracts, acting as a decentralized off-chain execution layer.
    *   **Decentralized Oracles**: Utilize Guardians to collect, verify, and report real-world data to the network.
    *   **Deeper Governance Participation**: More active roles in governance processes, such as proposal review or participation in specialized committees, based on reputation and expertise.

*   **Advanced and Collaborative Gamification**:
    *   **Team Missions and Guardian Guilds**: Encourage collaboration among Guardians to tackle larger challenges or tasks requiring multiple roles.
    *   **NFTs with Utility**: NFT badges or achievements that unlock real capabilities in the system or access to exclusive events/tasks.
    *   **Creator Economy for Gamification**: Allow the community to design and propose new missions and challenges, with rewards for creators if adopted.

*   **Guardian Tools and Support**:
    *   **Advanced Dashboards**: More detailed interfaces for Guardians to analyze their performance, optimize task selection, and manage their stake and rewards.
    *   **SDKs and APIs for Task Developers**: Facilitate the integration of new modules or third-party applications to offer tasks to Guardians.

*   **AI Models for System Optimization**:
    *   **AEA for Tasks and Rewards**: The Autonomous Economic Agent (AEA) could analyze task market dynamics and propose real-time adjustments to reward parameters or task prioritization to optimize network efficiency and Guardian participation.
    *   **Enhanced Anomaly Detection**: Use AI to more proactively identify patterns of malicious behavior or collusion among Guardians.

*   **Interoperability and Bridges**:
    *   **Guardians as Bridge Operators**: Guardians could participate in operating secure bridges to other blockchains, performing validation or cross-chain transaction relay tasks.

The implementation of these improvements will depend on DAO priorities, technological advancements, and the needs of the Fractal Network ecosystem. The goal is to maintain a dynamic, adaptable, and increasingly valuable Guardian System for the network.

## 15. Appendix

*   **Glossary of Guardian System Specific Terms** (to be supplemented as needed)
*   **Detailed Flowcharts** (to be added in future iterations)
*   **Task Definition Examples** (to be added in future iterations)
