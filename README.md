# Pon !

<h3 align="center">
  <img src="public/pon.ico" width="200">
<h3>

![](https://img.shields.io/github/license/kissy24/pon)


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

## Gallery

### Login Page

![Image](https://github.com/user-attachments/assets/7266895f-cf64-4cdf-9805-fde46aa8c7a8)

### PlaningPoker Page

![Image](https://github.com/user-attachments/assets/28a96132-c4b2-4e1e-a0c7-524bf36e5d3f)

## Author

kissy24
