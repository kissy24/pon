import { useEffect, useState } from "react";

const socket = new WebSocket("ws://localhost:4000");

type UserSelection = {
    username: string;
    value: number;
};

export const useWebSocket = (username: string) => {
    const [selections, setSelections] = useState<UserSelection[]>([]);
    const [activeUsers, setActiveUsers] = useState<string[]>([]);

    useEffect(() => {

        socket.send(JSON.stringify({ type: "login", data: { username } }));


        const handleMessage = (event: MessageEvent) => {
            const parsed = JSON.parse(event.data);

            if (parsed.type === "update-selections") {
                setSelections(parsed.data);
            } else if (parsed.type === "active-users") {
                setActiveUsers(parsed.data);
            }
        };

        socket.addEventListener("message", handleMessage);

        return () => {
            socket.send(JSON.stringify({ type: "logout", data: { username } }));
            socket.removeEventListener("message", handleMessage);
        };
    }, [username]);

    const sendMessage = (message: any) => {
        const socket = new WebSocket("ws://localhost:4000");
        socket.addEventListener("open", () => {
            socket.send(JSON.stringify(message));
            socket.close();
        });
    };

    return { selections, activeUsers, sendMessage };
};
