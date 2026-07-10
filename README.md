# AI-Augmented QA Automation Framework

This repository demonstrates the implementation of a test automation ecosystem using **Playwright + TypeScript**, orchestrated through autonomous AI agents (**GitHub Copilot**) and Microsoft's **MCP (Model Context Protocol)** servers, under a strict **Human Governance (Human-in-the-Loop)** model.

## System Architecture

- **The Brain (AI):** GitHub Copilot guided by custom prompt engineering rules (`.github/copilot-instructions.md`).
- **The Arms (MCP):** The `@microsoft/playwright-mcp` server for real-time dynamic DOM inspection.
- **The Automation Layer:** Playwright, TypeScript, and Page Object Model (POM) using stable semantic locators.

## Sequential Workflow with Approval Gates

The agent operates under a strict four-phase sequential contract. It cannot move to the next phase without my explicit authorization ("Approved"):

1. **Phase 1: Strategic Design** -> AI generates the Test Plan (`docs/test-plan.md`) -> Gatekeeping
2. **Phase 2: Functional Design** -> AI explores the UI with MCP and generates Test Cases (`docs/test-cases/`) -> Gatekeeping
3. **Phase 3: Code Implementation** -> AI generates POM classes and TypeScript specs -> Human Code Review -> Gatekeeping
4. **Phase 4: Execution & Self-Healing** -> AI runs `npx playwright test`. If it detects failures caused by UI changes, it analyzes the logs and proposes structured refactors.

## Control Showcase: Feedback Sub-Flow

This repository was built by simulating real code audits. You can verify in the commit history how the agent responds to orchestrator feedback, applying surgical changes under the following format:

- `What was wrong`
- `What I changed`
- `Code/Text Diff`
