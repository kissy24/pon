import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 4000 });

type UserSelection = {
    username: string;
    value: number;
};

let selections: UserSelection[] = [];
let activeUsers: Set<string> = new Set();

wss.on("connection", (ws) => {
    console.log("A client connected");

    ws.on("message", (message) => {
        const parsed = JSON.parse(message.toString());

        switch (parsed.type) {
            case "select-number":
                const { username, value } = parsed.data;
                selections = selections.filter((s) => s.username !== username);
                selections.push({ username, value });
                broadcast({ type: "update-selections", data: selections });
                break;

            case "clear-selections":
                selections = [];
                broadcast({ type: "update-selections", data: selections });
                break;

            case "login":
                const loginUsername = parsed.data.username;
                activeUsers.add(loginUsername);
                broadcast({ type: "active-users", data: Array.from(activeUsers) });
                break;

            case "logout":
                const logoutUsername = parsed.data.username;
                activeUsers.delete(logoutUsername);
                selections = selections.filter((s) => s.username !== logoutUsername);
                broadcast({ type: "update-selections", data: selections });
                broadcast({ type: "active-users", data: Array.from(activeUsers) });
                break;
        }
    });

    ws.on("close", () => {
        console.log("A client disconnected");
    });
});

const broadcast = (message: any) => {
    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(JSON.stringify(message));
        }
    });
};
