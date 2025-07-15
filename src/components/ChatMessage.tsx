import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import { MessageActions } from "./MessageActions";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  onRegenerate?: () => void;
}

export const ChatMessage = ({ message, isUser, timestamp, onRegenerate }: ChatMessageProps) => {
  return (
    <div className={cn(
      "group flex gap-3 p-4 animate-fade-in hover:bg-muted/30 transition-colors",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isUser 
          ? "bg-gradient-primary text-primary-foreground"
          : "bg-muted text-muted-foreground"
      )}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
          isUser 
            ? "bg-chat-user text-chat-user-foreground rounded-br-md ml-auto"
            : "bg-chat-assistant text-chat-assistant-foreground border rounded-bl-md"
        )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
          {timestamp && (
            <p className="text-xs opacity-60 mt-1">{timestamp}</p>
          )}
        </div>
        
        <div className={cn(
          "flex",
          isUser ? "justify-end" : "justify-start"
        )}>
          <MessageActions 
            message={message}
            isUser={isUser}
            onRegenerate={onRegenerate}
          />
        </div>
      </div>
    </div>
  );
};