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
    <main className="background-login h-full flex-1">
      <div className="mx-auto flex max-w-[1400px] flex-1">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </main>
  );
}
