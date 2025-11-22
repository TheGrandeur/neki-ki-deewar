import React, { useState, useRef, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";

// Simple Chat Window Component
const ChatWindow = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: "bot", text: "Hey! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Mock bot reply after 500ms
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "bot", text: "Got it! Let me assist you." },
      ]);
    }, 500);
  };

  return (
    <>
      {/* Floating Icon */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all"
        style={{ bottom: "20px", right: "20px" }}
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-5 right-5 w-80 h-96 bg-white shadow-2xl rounded-xl flex flex-col border"
          style={{ bottom: "20px", right: "20px" }}
        >
          {/* Header */}
          <div className="p-4 bg-primary text-white flex justify-between items-center rounded-t-xl">
            <h2 className="font-semibold text-lg">AI Support</h2>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2 bg-white">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-md px-3 py-2 text-sm outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow;