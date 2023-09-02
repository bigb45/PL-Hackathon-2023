import React, { useState, useEffect } from "react";
import Message from "./Message";
import { Button } from "@nextui-org/react";
import axios from "axios";
const Chatbot = ({ id }) => {
  console.log(id);
  const greeting = {
    role: "bot",
    content: "How can I assist you with real estate pricing today?",
  };
  const [messages, setMessages] = useState([greeting]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesRef = React.useRef(null);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;
    // user prompt

    const newMessage = {
      role: "user",
      content: inputMessage,
    };

    console.table({ message: inputMessage });
    let startChat = await axios.post(
      "http://127.0.0.1:5000/continue_conversation",
      { message: inputMessage, id: id },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    // .get("https://catfact.ninja/fact");

    if (startChat.data.message != "") {
      const botResponse = {
        role: "bot",
        content: startChat.data.fact,
      };

      setMessages([...messages, botResponse]);
    }

    // const botResponse = {
    //   role: "bot",
    //   content: startChat.data.fact,
    // };

    setMessages([...messages, newMessage, botResponse]);
    // response from chatbot

    setInputMessage("");
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full space-y-4 chatbot">
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
      <div className="flex items-center justify-around">
        <input
          className="w-2/3 p-2 rounded-lg shadow-md bg-slate-200 focus:outline-none"
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Button
          onClick={handleSendMessage}
          color="default"
          className="py-2 ml-2"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chatbot;
