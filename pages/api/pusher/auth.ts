import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/auth";
import { pusherServer } from "@/lib/pusher";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    console.log("Request body:", request.body); // Add logging for debugging

    const session = await auth(request, response);

    if (!session?.user?.email) {
      console.error("Unauthorized: No user email found in session.");
      return response.status(401).send('Unauthorized');
    }

    const { socket_id: socketId, channel_name: channel } = request.body;

    if (!socketId || !channel) {
      console.error("Bad Request: Missing socket_id or channel_name.");
      return response.status(400).send('Bad Request');
    }

    const data = {
      user_id: session.user.email,
      user_info: {
        email: session.user.email,
      },
    };

    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

    return response.status(200).send(authResponse);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return response.status(500).send('Internal Server Error');
  }
}
