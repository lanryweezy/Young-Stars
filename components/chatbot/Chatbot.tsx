// components/chatbot/Chatbot.tsx

import React from 'react';
import { runChat } from '../../services/gemini';
import { schoolName } from '../../data/schoolData';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([
        { sender: 'bot', text: "Hello! I'm the lanrystars AI assistant. How can I help you today? You can ask me about our curriculum, admissions, fees, or anything else about the school." }
    ]);
    const [userInput, setUserInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async () => {
        if (userInput.trim() === '') return;

        const newMessages = [...messages, { sender: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        try {
            const botResponse = await runChat(userInput);
            setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
        } catch (error) {
            setMessages([...newMessages, { sender: 'bot', text: 'Sorry, I am having trouble connecting. Please try again later.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Chatbot Toggle Button */}
            <button
                onClick={toggleChatbot}
                className="fixed bottom-5 right-5 bg-brand-green text-white p-4 rounded-full shadow-lg hover:bg-brand-green-dark transition-transform duration-300 transform hover:scale-110"
                aria-label="Toggle Chatbot"
            >
                {/* You can use an icon here */}
                Chat
            </button>

            {/* Chatbot Window */}
            {isOpen && (
                <div className="fixed bottom-20 right-5 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
                    {/* Header */}
                    <div className="bg-brand-blue p-3 rounded-t-lg text-white">
                        <h3 className="font-orbitron text-xl font-bold text-white">Ask lanrystars</h3>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                <div className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-brand-green text-white' : 'bg-gray-200'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && <div className="text-center">...</div>}
                    </div>

                    {/* Input */}
                    <div className="p-2 border-t">
                        <div className="flex">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                className="flex-1 p-2 border rounded-l-lg"
                                placeholder="Type your message..."
                            />
                            <button onClick={handleSendMessage} className="bg-brand-green text-white p-2 rounded-r-lg">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
