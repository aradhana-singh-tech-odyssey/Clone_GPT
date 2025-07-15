import { MessageSquare, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  title?: string;
  onToggleSidebar?: () => void;
}

export const ChatHeader = ({ title = "ChatGPT Clone", onToggleSidebar }: ChatHeaderProps) => {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm px-4 py-3 relative z-30">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden rounded-lg"
          >
            <Menu size={16} />
          </Button>
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <MessageSquare size={16} className="text-primary-foreground" />
          </div>
          <h1 className="font-semibold text-foreground">{title}</h1>
        </div>
        
        <Button variant="ghost" size="sm" className="rounded-lg">
          <Settings size={16} />
        </Button>
      </div>
    </header>
  );
};