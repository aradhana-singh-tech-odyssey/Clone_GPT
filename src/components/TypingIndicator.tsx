import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 p-4 animate-fade-in">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
        <Bot size={16} />
      </div>
      
      <div className="bg-chat-assistant text-chat-assistant-foreground border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center">
          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-typing" />
          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-typing" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-typing" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};