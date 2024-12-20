import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";

// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: "reverb",
//     key: import.meta.env.VITE_REVERB_APP_KEY,
//     wsHost: import.meta.env.VITE_REVERB_HOST,
//     wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
//     wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
//     enabledTransports: ["ws", "wss"],
// });

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
