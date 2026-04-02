import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../../services/gemini';
import ChatIcon from '../icons/ChatIcon';
import CloseIcon from '../icons/CloseIcon';
import SendIcon from '../icons/SendIcon';
import RobotIcon from '../icons/RobotIcon';

type Message = {
    sender: 'user' | 'bot';
    text: string;
};

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setMessages([
                { sender: 'bot', text: "Hello! I'm the Young Stars AI assistant. How can I help you today? You can ask me about our curriculum, admissions, fees, or anything else about the school." }
            ]);
        }
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Add a placeholder for the bot's response
        setMessages(prev => [...prev, { sender: 'bot', text: '' }]);

        try {
            const stream = await sendMessage(input);

            for await (const chunk of stream) {
                const chunkText = chunk.text;
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage && lastMessage.sender === 'bot') {
                        const updatedMessages = [...prev];
                        updatedMessages[prev.length - 1] = { ...lastMessage, text: lastMessage.text + chunkText };
                        return updatedMessages;
                    }
                    return prev;
                });
            }
        } catch (error) {
            console.error('Gemini API error:', error);
            setMessages(prev => {
                const updatedMessages = [...prev];
                updatedMessages[prev.length - 1] = { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' };
                return updatedMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-24 right-6 z-50 bg-gradient-to-br from-brand-green to-brand-green-light text-space-dark w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-brand-green/30 transform hover:scale-110 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-space-dark focus:ring-brand-green"
                aria-label="Open AI Chat"
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </button>

            <div
                className={`fixed bottom-44 right-6 z-40 w-[calc(100vw-3rem)] max-w-md h-[60vh] bg-space-light/80 backdrop-blur-xl border border-brand-green/30 rounded-2xl shadow-2xl shadow-black/50 flex flex-col transition-all duration-500 ease-in-out
                ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            >
                <header className="flex items-center justify-between p-4 border-b border-brand-green/20">
                    <h3 className="font-orbitron text-xl font-bold text-white">Ask Young Stars</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                        <CloseIcon />
                    </button>
                </header>

                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                             {msg.sender === 'bot' && (
                                <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0">
                                    <RobotIcon />
                                </div>
                            )}
                            <div className={`max-w-xs md:max-w-md lg:max-w-xs xl:max-w-sm rounded-2xl px-4 py-2 text-white ${msg.sender === 'user' ? 'bg-brand-green/80 rounded-br-none' : 'bg-space-dark/80 rounded-bl-none'}`}>
                                <p className="whitespace-pre-wrap">
                                    {msg.text}
                                    {isLoading && msg.sender === 'bot' && index === messages.length - 1 && <span className="inline-block w-1 h-4 bg-white ml-1 animate-pulse" />}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <footer className="p-4 border-t border-brand-green/20">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask a question..."
                            disabled={isLoading}
                            className="w-full bg-space-dark border border-brand-green/50 rounded-full py-3 pl-4 pr-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-green focus:border-transparent transition"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-green text-space-dark rounded-full p-2 disabled:bg-gray-600 hover:bg-brand-green-light transition-colors"
                        >
                            <SendIcon />
                        </button>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Chatbot;
