import getConversationById from "@/lib/actions/conversation/getConversationById";
import getMessages from "@/lib/actions/conversation/getMessages";
import EmptyState from "@/components/EmptyState";
import Body from "./components/Body";
import Form from "./components/Form";
import Header from "./components/Header";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="min-h-full">
        <div className="flex h-full flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="flex h-full flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
