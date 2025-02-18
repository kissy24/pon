import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 4000 });

type UserSelection = {
    username: string;
    value: number;
};

let selections: UserSelection[] = [];
let activeUsers: Set<string> = new Set();

// 選択の処理
const handleSelectNumber = (username: string, value: number) => {
    selections = selections.filter((s) => s.username !== username);
    selections.push({ username, value });
    broadcast({ type: "update-selections", data: selections });
};

// クリアの処理
const handleClearSelections = () => {
    selections = [];
    broadcast({ type: "update-selections", data: selections });
};

// ログインの処理
const handleLogin = (username: string) => {
    activeUsers.add(username);
    broadcast({ type: "active-users", data: Array.from(activeUsers) });
};

// ログアウトの処理
const handleLogout = (username: string) => {
    activeUsers.delete(username);
    selections = selections.filter((s) => s.username !== username);
    broadcast({ type: "update-selections", data: selections });
    broadcast({ type: "active-users", data: Array.from(activeUsers) });
};

wss.on("connection", (ws) => {
    console.log("A client connected");

    ws.on("message", (message) => {
        const parsed = JSON.parse(message.toString());

        switch (parsed.type) {
            case "select-number":
                handleSelectNumber(parsed.data.username, parsed.data.value);
                break;
            case "clear-selections":
                handleClearSelections();
                break;
            case "login":
                handleLogin(parsed.data.username);
                break;
            case "logout":
                handleLogout(parsed.data.username);
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
