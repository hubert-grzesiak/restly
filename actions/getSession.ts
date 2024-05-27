import getServerSession from "next-auth";
import AuthConfig from "@/auth.config";

export default async function getSession() {
    return await getServerSession(AuthConfig);
}
