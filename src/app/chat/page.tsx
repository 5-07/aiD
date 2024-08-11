"use client";

import { useState, useRef } from "react";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the aiD support assistant. How can I help you today?",
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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header />
      <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(140,69,255,.5)_15%,rgb(14,0,36,.5)_78%,transparent)]"></div>
      {/*start planet*/}
      <div className="absolute h-64 w-64 md:h-96 md:w-96 bg-purple-500 rounded-full border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(184,148,255)_37.7%,rgb(24,0,66))] shadow-[-20px_-20px_50px_rgb(255,255,255,.5),-20px_-20px_80px_rgb(255,255,255,.1),0_0_50px_rgb(140,69,255)]"></div>
      {/*end planet*/}
      {/*start ring 1*/}
      <div className="absolute h-[344px] w-[344px] md:h-[580px] md:w-[580px] border opacity-20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute h-2 w-2  left-1/2 bg-white rounded-full top-0 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-2 w-2  left-0 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-5 w-5  left-full border border-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center">
          <div className="h-2 w-2 bg-white rounded-full"></div>
        </div>
      </div>
      {/*end ring 1*/}
      <div className="absolute h-[444px] w-[444px] md:h-[780px] md:w-[780px] rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"></div>

      <div className="absolute h-[544px] w-[544px] md:h-[980px] md:w-[980px] rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute h-5 w-5  left-full border opacity-20 rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center"></div>
        <div className="h-2 w-2 bg-white/20 rounded-full"></div>
      </div>

      {/*end rings*/}

      {/*chat container*/}
      <div className="flex justify-center items-center my-12">
        <div className="relative w-1/2 lg:w-1/3 h-[700px] border border-black p-4 flex flex-col space-y-4 bg-white rounded-xl z-50">
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
                    expandedMessageIndex === index ||
                    index >= messages.length - 2
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
