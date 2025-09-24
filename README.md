# QWC2 Playwright Test Suite

This repository contains automated smoke, system, and end-to-end checks for the [Kanton Solothurn QWC2 deployment](https://geo.so.ch/map/). The tests are implemented with [Playwright Test](https://playwright.dev) and cover the main map view, zoom controls, and the background layer switcher. More scenarios can be added on top of this foundation.

## Prerequisites

- Node.js 18 or newer (Playwright is tested with the latest LTS releases; the container uses Node 20).
- npm (ships with Node.js) or pnpm/yarn if you prefer different package managers.
- Internet access to reach https://geo.so.ch/ during test execution.
- Linux desktop dependencies for browser automation. On Ubuntu/Debian you can install them once via:
  ```bash
  npx playwright install-deps
  ```

## Installation

1. Clone this repository and install the JavaScript dependencies:
   ```bash
   npm install
   ```
2. Download the Playwright browser binaries (only needs to be done once per environment):
   ```bash
   npx playwright install
   ```

## Running the tests

The project exposes several npm scripts:

- Run the full suite headlessly:
  ```bash
  npm test
  ```
- Run headfully (headed mode) to observe the browser:
  ```bash
  npm run test:headed
  ```
- Debug individual tests with Playwright Inspector:
  ```bash
  npm run test:debug
  ```
- Launch the interactive Playwright UI test runner:
  ```bash
  npm run test:ui
  ```

All test commands automatically dismiss the news popup shown on first load and ignore the certificate warning presented by the production instance.

## Playwright MCP server

The repository also includes Microsoft Playwright's [Model Context Protocol](https://github.com/modelcontextprotocol) server. After installing dependencies you can expose the Playwright automation tools to MCP-compliant clients with:
```bash
npm run mcp
```
This starts the MCP server on the default port and allows tools such as Claude Code to drive the same Playwright workflows defined in this suite.

## Project structure

```
.
├── playwright.config.ts        # Global Playwright configuration
├── tests/                      # Test specs and helpers
│   ├── helpers.ts              # Shared navigation utilities (dismiss popups, open homepage)
│   ├── smoke.spec.ts           # Basic availability and UI assertions
│   └── map-controls.spec.ts    # Zoom control and background layer switcher coverage
└── README.md                   # This guide
```

## Next steps

- Extend the functional coverage (e.g., search, layer catalog, measurement tools).
- Integrate the suite with your CI system by exporting standard Playwright reports (`playwright-report/`).
- Add environment variables for testing against staging or development deployments if needed.
