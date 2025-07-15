import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatSidebar } from "@/components/ChatSidebar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messageCount: number;
  messages: Message[];
}

const Index = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with a default session
  useEffect(() => {
    const defaultSession: ChatSession = {
      id: "default",
      title: "New Chat",
      lastMessage: "Hello! I'm your AI assistant...",
      timestamp: new Date().toLocaleDateString(),
      messageCount: 1,
      messages: [{
        id: "1",
        content: "Hello! I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      }]
    };
    setSessions([defaultSession]);
    setActiveSessionId("default");
  }, []);

  const activeSession = sessions.find(s => s.id === activeSessionId);
  const messages = activeSession?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateTitle = (message: string) => {
    const words = message.split(" ");
    return words.slice(0, 4).join(" ") + (words.length > 4 ? "..." : "");
  };

  const handleSendMessage = async (content: string) => {
    if (!activeSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    // Update the active session with new message
    setSessions(prev => prev.map(session => {
      if (session.id === activeSessionId) {
        const newMessages = [...session.messages, userMessage];
        return {
          ...session,
          messages: newMessages,
          lastMessage: content,
          messageCount: newMessages.length,
          timestamp: new Date().toLocaleDateString(),
          title: session.title === "New Chat" ? generateTitle(content) : session.title
        };
      }
      return session;
    }));

    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's an interesting question! Let me think about that and provide you with a detailed response...",
        "I understand what you're asking. Here's my perspective on that topic and some insights that might help...",
        "Great question! From what I know about this subject, I can share several important points...",
        "I'd be happy to help you with that. Based on my understanding, here are the key aspects to consider...",
        "That's a thoughtful inquiry. Let me provide you with some comprehensive insights and analysis...",
        "I can definitely assist you with that. Here's what I think would be most helpful for your situation...",
        "Thanks for asking! This is actually quite a fascinating topic that I enjoy discussing...",
        "I'm glad you brought this up. From my analysis, there are several important factors to consider...",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };

      setSessions(prev => prev.map(session => {
        if (session.id === activeSessionId) {
          const newMessages = [...session.messages, aiMessage];
          return {
            ...session,
            messages: newMessages,
            lastMessage: randomResponse,
            messageCount: newMessages.length,
            timestamp: new Date().toLocaleDateString()
          };
        }
        return session;
      }));

      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      lastMessage: "Hello! I'm your AI assistant...",
      timestamp: new Date().toLocaleDateString(),
      messageCount: 1,
      messages: [{
        id: Date.now().toString(),
        content: "Hello! I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      }]
    };
    
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setSidebarOpen(false);
  };

  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
    setSidebarOpen(false);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => {
      const newSessions = prev.filter(s => s.id !== sessionId);
      if (sessionId === activeSessionId && newSessions.length > 0) {
        setActiveSessionId(newSessions[0].id);
      }
      return newSessions;
    });
  };

  const handleRenameSession = (sessionId: string, newTitle: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId ? { ...session, title: newTitle } : session
    ));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-background flex">
      <ChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        onRenameSession={handleRenameSession}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />
      
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        sidebarOpen ? "lg:ml-64" : "lg:ml-0"
      )}>
        <ChatHeader 
          title="AI Chat Assistant" 
          onToggleSidebar={toggleSidebar}
        />
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {messages.length === 1 && (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary-foreground" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-foreground">Welcome to AI Chat</h2>
                  <p className="text-muted-foreground mb-8">Start a conversation and I'll respond with helpful insights!</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {[
                      "Explain quantum computing in simple terms",
                      "Help me write a professional email",
                      "What are the latest trends in AI?",
                      "Plan a 3-day trip to Tokyo"
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion)}
                        className="p-3 text-sm bg-muted hover:bg-muted/80 rounded-xl text-left transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.content}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isTyping}
            placeholder="Ask me anything..."
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
