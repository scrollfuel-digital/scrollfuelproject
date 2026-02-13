import React, { useState, useRef, useEffect } from "react";
import {
    X,
    Send,
    Bot,
    MessageCircle,
    Loader2,
    Zap,
} from "lucide-react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";


const WHATSAPP_NUMBER = "7822830497";

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "System initialized. I am the ScrollFuel Brand Strategist. How can we fuel your brand's digital architecture in Nagpur or globally today?",
        },
    ]);

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const openWhatsApp = () => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
    };

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");

        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({
                apiKey: import.meta.env.VITE_GEMINI_API_KEY,
            });

            const conversation = [
                {
                    role: "user",
                    parts: [{ text: "System instruction: ..." }],
                },
                ...messages.map((m) => ({
                    role: m.role === "assistant" ? "model" : "user",
                    parts: [{ text: m.content }],
                })),
                { role: "user", parts: [{ text: userMessage }] },
            ];

            const result = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: conversation,
            });

            const aiText =
                result.text || "Connection timing out. Please re-initiate sync.";

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: aiText },
            ]);
        } catch (error) {
            console.error("AI Sync Error:", error);

            const isQuota =
                error?.message?.includes("quota") ||
                error?.status === 429;

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: isQuota
                        ? "AI capacity reached. Please continue via WhatsApp while we scale compute."
                        : "Protocol error. Please sync directly via WhatsApp or email scrollfuel@gmail.com.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="fixed bottom-8 right-8 z-100 font-sans">
            {/* WhatsApp Quick Access */}
            <button
                onClick={openWhatsApp}
                className="absolute bottom-20 right-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
                title="Chat on WhatsApp"
            >
                <MessageCircle size={20} fill="currentColor" />
            </button>

            {/* Main AI FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden ${isOpen
                    ? "bg-dark text-white rotate-90"
                    : "bg-white text-dark hover-bg-primary hover-text-white"
                    } shadow-[0_0_30px_rgba(139,197,63,0.25)]`}
            >
                {isOpen ? <X size={24} /> : <Zap size={24} className="animate-pulse" />}
            </button>

            {/* Chat Window */}
            <div
                className={`absolute bottom-20 right-0 w-95 max-w-[calc(100vw-2rem)] h-137.5 max-h-[calc(100vh-10rem)]
        rounded-4xl flex flex-col transition-all duration-500 origin-bottom-right overflow-hidden
        bg-white border border-black/10 shadow-2xl ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-10"
                    }`}
            >
                {/* Header */}
                <div className="p-6 border-b border-black/10 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shadow-[0_0_15px_rgba(255,201,59,0.6)]">
                            <Bot size={16} className="text-dark" />
                        </div>

                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-dark">
                                Nagpur Hub Strategist
                            </h3>

                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                <span className="text-[9px] text-muted font-bold tracking-widest uppercase">
                                    System Online
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={openWhatsApp}
                        className="text-primary hover-text-secondary transition-colors"
                        title="WhatsApp"
                    >
                        <MessageCircle size={18} />
                    </button>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed border ${m.role === "user"
                                    ? "bg-primary text-white rounded-tr-none border-primary"
                                    : "bg-white text-dark rounded-tl-none border-black/10"
                                    }`}
                            >
                                {m.content}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-black/10 p-4 rounded-2xl rounded-tl-none">
                                <Loader2 size={16} className="animate-spin text-primary" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="px-6 py-2 flex gap-2 overflow-x-auto">
                    <button
                        onClick={() => setInput("Where is your Nagpur studio?")}
                        className="whitespace-nowrap px-3 py-1.5 bg-white border border-black/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-muted hover-border-primary hover-text-primary transition-all"
                    >
                        Location
                    </button>

                    <button
                        onClick={() => setInput("How to start a project?")}
                        className="whitespace-nowrap px-3 py-1.5 bg-white border border-black/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-muted hover-border-primary hover-text-primary transition-all"
                    >
                        Workflow
                    </button>
                </div>

                {/* Footer Input */}
                <div className="p-6 pt-2">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                            placeholder="Query brand logic..."
                            className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 text-xs focus:outline-none focus:border-primary pr-12 transition-all"
                        />

                        <button
                            onClick={handleSendMessage}
                            disabled={isLoading || !input.trim()}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-primary hover-text-secondary transition-colors disabled:opacity-30"
                        >
                            <Send size={16} />
                        </button>
                    </div>

                    <p className="mt-3 text-[8px] text-center text-muted uppercase font-black tracking-[0.2em]">
                        scrollfuel.in | nagpur, mh
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
