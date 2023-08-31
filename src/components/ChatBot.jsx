import React, { useState, useEffect } from "react";
import Message from "./Message";
import { Button, Textarea } from "@nextui-org/react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesRef = React.useRef(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    // user prompt
    const newMessage = {
      role: "user",
      content: inputMessage,
    };
    // response from chatbot
    const botResponse = {
      role: "bot",
      content: "You asked me to say: " + inputMessage + ", is this good?",
    };

    setMessages([...messages, newMessage, botResponse]);

    setInputMessage("");
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot w-full space-y-4">
      <div
        className="chatbot-messages overflow-y-scroll max-h-[420px] transition-all duration-500 ease-in-out"
        ref={messagesRef}
      >
        {messages.map((message, index) => (
          <Message
            key={index}
            role={message.role}
            content={message.content}
            className={`${
              index === messages.length - 1 ? "animate-fade-in" : ""
            }`}
          />
        ))}
      </div>
      <div className="flex justify-around items-center">
        <input
          className="bg-slate-200 rounded-lg w-2/3 p-2 focus:outline-none shadow-md"
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Button
          onClick={handleSendMessage}
          color="default"
          className="ml-2 py-2"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chatbot;
