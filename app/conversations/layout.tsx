import getConversations from "@/lib/actions/conversation/getConversations";
import getUsers from "@/lib/actions/getUsers";
// import Sidebar from "@/components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <div className="h-full flex">
      <ConversationList initialItems={conversations} users={users} />
      {children}
    </div>
  );
}
