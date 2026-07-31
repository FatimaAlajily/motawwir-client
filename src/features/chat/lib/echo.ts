import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axiosClient from "../../../shared/api/ClientApi";

window.Pusher = Pusher;

console.log("Reverb Key:", import.meta.env.VITE_REVERB_APP_KEY);

const echo = new Echo({
  broadcaster: "reverb",
  key: "local-key",
  wsHost: "127.0.0.1",
  wsPort: 8080,
  wssPort: 8080,
  forceTLS: false,
  enabledTransports: ["ws", "wss"],

  authorizer: (channel: { name: string }) => {
    return {
      authorize: (
        socketId: string,
        callback: (error: Error | null, data: unknown) => void
      ) => {
        axiosClient
          .post("/broadcasting/auth", {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => callback(null, response.data))
          .catch((error) => callback(error, null));
      },
    };
  },
});

export default echo;
