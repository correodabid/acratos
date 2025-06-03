# Economic Model of Fractal Network (F2P-Inspired)

Fractal Network implements a comprehensive economic model designed to facilitate governance, incentivize participation, and ensure the stability of the network. This model is crucial for maintaining the integrity and functionality of the ecosystem. **This version reflects a redefined model inspired by the Free-to-Play (F2P) paradigm, where access is free but conditional on active participation, crypto-economic commitment, and direct contribution to the network's operation.**

## Ecosystem Assets

### Dual Token System

#### $FRAC Token
- **Purpose**: The $FRAC token serves as the governance and **reputation** token within the Fractal Network. It is used for voting in the DAO governance system and for staking by **Guardians and** Custodians.
- **Supply**: The total supply of $FRAC is fixed, ensuring scarcity and value retention.
- **Usage**:
  - Voting rights in governance decisions.
  - Staking collateral for **Guardians and** Custodians, ensuring their commitment to network responsibilities.
  - Reputation collateral within the economic system.
  - Monetary backing for the ecosystem, **including backing for $SOLV issuance via the official swap.**

#### $SOLV Token
- **Purpose**: The $SOLV token is the operational **and ephemeral** token with a dynamic issuance model. It is used for transactions and rewards within the network.
- **Issuance**: The supply of $SOLV is adjusted based on network activity, $FRAC absorption metrics, **and the verified computational work of Guardians. It is exclusively issued and burned by the Algorithmic Central Bank (ACB).**
- **Usage**:
  - Payments for executing intents and other network operations.
  - Rewards for participants contributing to the network's operations (e.g., Custodians, Guardians).
  - Daily operational transactions within the Fractal Network.
  - Internal value flows.
  - **$SOLV has no external listings or external liquidity.**

### Additional Economic Assets

#### sUSD (Synthetic USD)
- A synthetic stablecoin collateralized by $FRAC and $SOLV tokens.
- Functions as an internal stable unit of account.
- Maintains collateralization ratio above 100% at all times.
- Subject to automatic liquidation if collateral value drops below threshold.

#### Fractal Credits
- Abstract units of value that encapsulate dynamic combinations of tokens.
- Serve as a unified interface for users, abstracting the underlying token mechanics.
- Composition dynamically defined by the Algorithmic Central Bank.
- Can be comprised of combinations of $SOLV, sUSD, and $FRAC.

#### Synthetic Credits
- Non-redeemable version of Fractal Credits.
- Used for incentivizing network usage without economic risk.
- Promotional tool that doesn't affect system reserves.

## Economic Entities and Roles

### Algorithmic Central Bank (ACB)
- Controls the issuance **and burning** of $SOLV and sUSD.
- Defines the composition of Fractal Credits.
- Manages official token swap mechanisms.
- Implements monetary policy based on network parameters.
- **Can issue $SOLV if there is backing in $FRAC (via swap) or verified computational work of Guardians.**
- **Adjusts $SOLV supply based on economic activity and inflationary pressures.**

### DAO Governance
- Approves economic parameters and policies.
- Multi-layered voting system based on token holdings and reputation.
- Can modify key economic parameters, including emission rates, collateral ratios, swap mechanisms, **access limits without $SOLV, and incentive/slashing parameters.**
- **Has final control over proposals from the ACB and the Economic AI (AEA).**

### **Agents (Users)**
- **End-users operating from devices (mobile, PC, IoT).**
- **Generate intents and maintain a local micro-ledger.**
- **Operate in one of several operational modes based on their resources and contributions:**

  | **Mode**     | **Condition**                                     | **Access**                                          |
  | ------------ | ------------------------------------------------- | --------------------------------------------------- |
  | Explorer     | No $SOLV, no $FRAC, no tasks                      | Limited reading, basic intents per day             |
  | Operator     | With $SOLV                                        | Full access without guardian tasks                  |
  | Guardian     | No $SOLV, with $FRAC staking + active tasks       | Full access with mandatory contribution             |
  | Hybrid       | With $SOLV and as Guardian                        | Expanded access, operational priority               |

- **Dynamic Agent Evolution**: Agents can transition between modes based on behavior and resources (e.g., $FRAC staking, verified guardian tasks, $SOLV acquisition, reputation changes, task abandonment, penalties).

### Fractal Custodians
- **Specialized nodes with high $FRAC staking.**
- Validated network participants who execute intents and maintain the network.
- Receive $SOLV tokens as rewards for their services.
- Stake $FRAC as collateral for their responsibilities.
- Ensure data availability, execute DAG consensus, and maintain the sovereign Layer 0 functionality.
- **Subject to slashing for critical duty failures.**

### Guardian Nodes (Evolving Agents)
- **Agents who choose to operate without using $SOLV by staking a minimum amount of $FRAC and actively contributing to the network.**
- **Perform tasks such as validation, pinning, ensuring data availability, and participating in light consensus.**
- Receive $SOLV rewards (or other incentives) for their contributions to network security and efficiency.
- **Accumulate reputation based on performance, accuracy, punctuality, and utility of their contributions.**
- **Subject to slashing for critical duty failures or malicious activity.**
- Lightweight alternative to full Custodians, allowing for broader participation.
- May have varying levels of reputation and privileges based on performance history.

### **Economic AI (AEA - Autonomous Economic Agent)**
- **Autonomous agent that monitors network metrics (reputation, activity, inflation, liquidity).**
- **Suggests adjustments to the ACB and DAO regarding parameters for $SOLV issuance, slashing, and rewards.**

### Users
- Generate intents that consume $SOLV (if in Operator or Hybrid mode, or if exceeding free tier in Explorer mode).
- Receive credits and rewards for participation (especially through gamification).
- Primary beneficiaries of the network's services.

### Custodial Applications
- Act as intermediaries between users and the network.
- Can manage economic abstraction on behalf of users.
- May implement custom economic interfaces while adhering to network rules.

## Economic Dynamics

### Emission and Control Mechanisms

#### $SOLV Dynamic Issuance
- Emission is conditioned by the absorption of $FRAC in each epoch **and/or the verified computational work performed by Guardians.**
- Governed by the formula (example, subject to ACB/DAO refinement):
  ```
  E_epoch = α × RealActivity × min(FRA_absorbed / FRA_target, 1) + γ × GuardianWorkValue
  ```
- This model ensures that $SOLV issuance is tied to actual network activity, $FRAC absorption, **and valuable contributions from Guardians,** creating a balanced economic cycle.

#### Official Swap Mechanism
- Governed swap mechanism between $FRAC and $SOLV, defined by the formula:
  ```
  P = k * (R_out / R_in)^β
  ```
- Features dynamic curves, slippage controls, and intervention rules.
- Helps maintain liquidity and stability in the token economy.

#### sUSD Issuance
- Issued with collateral above 100% in $FRAC or $SOLV.
- Subject to automatic liquidation if collateral value falls below threshold.
- Provides a stable unit of account within the ecosystem.

### Economic Flows and Rewards

#### Intent Execution
- Intents consume $SOLV (for Operator/Hybrid modes, or beyond free limits), which may be burned or redistributed.
- Custodians are rewarded with $SOLV for validating intents and ensuring data availability.
- Guardian Nodes receive $SOLV rewards (or other gamified incentives) for **their contributions (validation, pinning, availability, light consensus).**
- System can burn tokens or use funds for redistribution according to governance decisions.

#### Incentive Mechanisms
- The DAO can incentivize specific behaviors through credits or temporary subsidies.
- Targeted rewards for activities that benefit the network.
- Economic levers to drive adoption and usage.
- Tiered reward structure for different levels of contribution (Custodians vs Guardian Nodes).

### Stability Mechanisms

#### Emission Control
- Emission rate controlled by $FRAC absorption.
- Adaptive issuance based on network activity.

#### Managed Token Swaps
- $FRAC/$SOLV swap with price control and dynamic fees.
- Circuit breakers for extreme market conditions.

#### Collateralized sUSD
- Automatic liquidation if collateral ratio falls below threshold.
- Maintains stable value within the ecosystem.

#### Anti-leakage Filters
- Mechanisms in credits to protect system reserves.
- Prevents economic attacks and value extraction.

### Adaptive Monetary Policies

#### Governance Parameters
- The DAO can modify key parameters, including:
  - α (emission multiplier), **γ (Guardian work multiplier)**
  - Collateral ratios
  - Slippage thresholds
  - Swap mechanics
  - Credit composition
  - **$FRAC staking requirements for Guardian mode**
  - **Parameters for reputation calculation and slashing**
  - **Rules and rewards for Productive Gamification**

## ⚖️ Access Mechanism

### Access without $SOLV (Guardian Mode)
*   Requires:
    *   $FRAC staking (amount determined by DAO, potentially tiered).
    *   Active contribution through verified Guardian tasks (e.g., validation, pinning, availability, light consensus).
    *   Maintaining a positive reputation, actively supervised.

### Access with $SOLV (Operator/Hybrid Mode)
*   Acquisition of $SOLV via the official swap: $FRAC → $SOLV.
*   The swap is governed by a price curve controlled by the DAO.
*   Requires $FRAC in a wallet or sourced from an exchange.

### Limited Access (Explorer Mode)
*   No $SOLV or $FRAC staking required.
*   Access is limited (e.g., to reading data, a small number of basic intents per day).

## 📊 Reputation and Penalty System

*   **Guardian and Custodian Reputation**:
    *   Guardians (and potentially Custodians) accumulate reputation scores based on:
        *   Tasks performed (pinning, validation, consensus participation, data availability).
        *   Performance metrics: accuracy, punctuality, utility, uptime.
    *   Reputation can influence:
        *   Eligibility for Guardian mode and specific tasks.
        *   Reward levels or multipliers in the gamification system.
        *   Priority in certain network operations.
        *   Weight in certain DAO governance aspects (if implemented).
*   **Penalties**:
    *   Failures, abandonment of tasks without justification, or erroneous validations can lead to reputation loss or other penalties.
*   **Slashing**:
    *   Applies to Guardians and Custodians who incumplish critical duties.
    *   Involves a proportional reduction of their staked $FRAC.
    *   Triggered by:
        *   Fraudulent validations.
        *   Prolonged lack of availability or failure to perform pinned data duties.
        *   Dishonest behavior or collusion.
    *   The specific percentage, conditions, and process for slashing are defined by the DAO and can be adjusted based on recommendations from the Economic AI (AEA).

## 🎮 Productive Gamification

*   To incentivize active and beneficial participation, especially from Guardians, Fractal Network integrates mechanisms inspired by F2P video games.
*   **Objectives**:
    *   Reinforce tasks that are useful and critical for network health and security.
    *   Motivate long-term user retention and commitment.
    *   Gamify contributions without undermining the sovereign and technical purpose of the system.
*   **Types of Challenges/Activities (Examples)**:
    | Type                 | Example                                                              |
    | -------------------- | -------------------------------------------------------------------- |
    | Daily Mission        | Validate X intents, perform Y pinning operations today.                |
    | Weekly Mission       | Maintain Z% uptime for availability tasks for 7 consecutive days.    |
    | Season Pass          | Achieve a set of diverse contribution goals over a 30-day period.      |
    | Permanent Achievements | Successfully validate 1000 intents, maintain Guardian status for 90 days. |
    | Rankings             | Top performing Guardians based on weekly/monthly reputation scores.    |
*   **Possible Rewards**:
    *   Bonus $SOLV.
    *   Temporary increase in intent execution priority.
    *   Cosmetic rewards (emblems, badges) for network identity/visibility.
    *   Increased weight in certain DAO proposals or community votes.
    *   Access to higher-tier Guardian tasks or responsibilities.

## Economic Scenarios and Responses

### Simulated Scenarios
- High inflation events
- $FRAC price decline
- External arbitrage
- Over-issuance
- Mass exodus of value

### Planned Responses
- Dynamic emission adjustments
- Token burning
- DAO intervention
- Temporary swap freezing
- Reserve rebalancing

## Conclusion

The **redefined F2P-inspired** economic model of Fractal Network integrates a sophisticated financial system with a user-friendly and participatory interface. The separation between operational tokens ($SOLV), governance/staking tokens ($FRAC), and user-facing credits (if retained), combined with **flexible Agent operational modes and the Guardian contribution layer**, allows for effective governance, clear incentives, and resilience against volatility. By implementing advanced economic strategies, **a robust reputation system, productive gamification,** and adaptive policies, Fractal Network aims to create a sustainable, **inclusive, meritocratic,** and balanced economic environment for all participants, **where access is free but value (capital or work) is required for deeper engagement.**