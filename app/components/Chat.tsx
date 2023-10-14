import { useEffect, useState } from "react";
import { useChat } from "ai/react";
import ChatBox from "react-chat-plugin";

type ChatMessage = {
  author: {
    username: string;
    id: number;
    avatarUrl: string;
  };
  text: string;
  type: string;
  timestamp: number;
};

const userAuthor = {
  username: "User",
  id: 1,
  avatarUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
};

const aiAuthor = {
  username: "AI",
  id: 2,
  avatarUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxG04HIgwI_xov-4yMXrMZjR9Iw3k3VdYDww&usqp=CAU",
};

const Chat = () => {
  const initialMessage = {
    author: aiAuthor,
    text: "Hey, how can I help you?",
    type: "text",
    timestamp: +new Date(),
  };
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    initialMessage,
  ]);
  const { append, messages } = useChat({
    api: "/api/openai",
  });

  useEffect(() => {
    if (messages.length < 1) return;
    const authors = {
      user: userAuthor,
      system: aiAuthor,
      function: aiAuthor,
      assistant: aiAuthor,
    };
    const chatMessagesArr = messages?.map((message) => {
      return {
        author: authors[message.role],
        text: message?.content,
        type: "text",
        timestamp: +new Date(),
      };
    });
    setChatMessages([initialMessage, ...chatMessagesArr]);
  }, [messages]);

  const handleOnSendMessage = (message: string) => {
    append({
      content: message,
      role: "user",
    });
  };

  return (
    <>
      <ChatBox
        style={{
          margin: "auto",
          whiteSpace: "pre-wrap",
        }}
        messages={chatMessages}
        userId={1}
        onSendMessage={handleOnSendMessage}
        width={"550px"}
        height={"500px"}
      />
    </>
  );
};

export default Chat;
