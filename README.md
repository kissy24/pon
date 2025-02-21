# Pon !

![](https://img.shields.io/github/license/kissy24/pon)

![Image](https://github.com/user-attachments/assets/7a6afa92-1a24-49ef-831f-3cdd2bc473da)

## Overview

Pon ! is a web-based Planning Poker tool for agile estimation.Users can select Fibonacci numbers to estimate tasks, and the system calculates the average when at least two users participate.The application supports real-time interactions with WebSocket and displays active users.

## Setup

```sh
# server
bun server.ts
```

```sh
# web
bun run dev
```

## Usage

1. Open the application and enter your username.
2. Select a Fibonacci number to estimate the task.
3. The selected values and active users are displayed in real-time.
4. When at least two users have selected values, the average is calculated and shown.
5. Click the "Clear" button to reset the selections.

## Technologies Used

- Frontend: React, TypeScript, Tailwind CSS
- Backend: WebSocket Server (Node.js with Bun)
- Build Tool: Vite

## Author

kissy24
