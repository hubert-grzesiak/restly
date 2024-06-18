"use client";

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

import { find } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import useConversation from "@/hooks/useConversation";
import { pusherClient, pusherEvents } from "@/lib/pusher";
import { FullConversationType } from "@/types";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  
}) => {
  const [items, setItems] = useState(initialItems);

  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        // skip if the conversation already exists
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });

      if (conversationId == conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.bind(pusherEvents.UPDATE_CONVERSATION, updateHandler);
    pusherClient.bind(pusherEvents.NEW_CONVERSATION, newHandler);
    pusherClient.bind(pusherEvents.DELETE_CONVERSATION, removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind(pusherEvents.UPDATE_CONVERSATION, updateHandler);
      pusherClient.unbind(pusherEvents.NEW_CONVERSATION, newHandler);
      pusherClient.unbind(pusherEvents.DELETE_CONVERSATION, removeHandler);
    };
  }, [conversationId, pusherKey, router]);

  return (
    <>
      <aside
        className={clsx(
          `
          inset-y-0 
          pb-20
          lg:pb-0
          lg:w-[400px] 
          lg:block
          overflow-y-auto 
          border-r 
          border-gr ay-200 
          dark:border-lightgray
          z-[5001]
        `,
          isOpen ? "hidden" : "block w-full left-0"
        )}>
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800 dark:text-gray-200">
              Messages
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
