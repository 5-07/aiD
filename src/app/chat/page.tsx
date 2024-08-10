"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [expandedMessageIndex, setExpandedMessageIndex] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return; // Don't send empty messages
    setIsLoading(true);
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          setIsLoading(false);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }
  };

  const toggleExpandMessage = (index: number) => {
    setExpandedMessageIndex(expandedMessageIndex === index ? null : index);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      <Header />
      <div className="w-screen h-screen py-24 flex flex-col justify-center items-center">
        <div className="w-1/2 lg:w-1/3 h-[700px] border border-black p-4 flex flex-col space-y-4 bg-white">
          <div className="flex-grow overflow-auto flex flex-col space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`p-3 rounded-lg text-white max-w-[70%] shadow-md ${
                    message.role === "assistant"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  } ${
                    expandedMessageIndex === index || index >= messages.length - 2
                      ? ""
                      : "lg:truncate lg:overflow-hidden lg:max-h-16"
                  }`}
                  onClick={() => toggleExpandMessage(index)}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <input
              type="text"
              className="w-[90%] p-2 border border-gray-300 rounded text-black"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              disabled={isLoading}
            />
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded w-full sm:w-auto"
              onClick={sendMessage}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
