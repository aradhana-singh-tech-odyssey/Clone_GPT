import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Plus, 
  MoreHorizontal, 
  Edit3, 
  Trash2,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messageCount: number;
}

interface ChatSidebarProps {
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
  onDeleteSession: (sessionId: string) => void;
  onRenameSession: (sessionId: string, newTitle: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatSidebar = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onRenameSession,
  isOpen,
  onToggle
}: ChatSidebarProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleRename = (session: ChatSession) => {
    setEditingId(session.id);
    setEditTitle(session.title);
  };

  const saveRename = (sessionId: string) => {
    if (editTitle.trim()) {
      onRenameSession(sessionId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle("");
  };

  const cancelRename = () => {
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full bg-background border-r z-50 transition-transform duration-300 ease-in-out",
        "w-64 lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-semibold text-foreground">Chats</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onNewChat}
                className="rounded-lg"
              >
                <Plus size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="lg:hidden rounded-lg"
              >
                <X size={16} />
              </Button>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="p-4 border-b">
            <Button
              onClick={onNewChat}
              className="w-full justify-start gap-2 bg-gradient-primary hover:opacity-90"
            >
              <Plus size={16} />
              New Chat
            </Button>
          </div>

          {/* Chat Sessions */}
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-1">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={cn(
                    "group relative rounded-lg p-3 cursor-pointer transition-colors",
                    "hover:bg-muted/50",
                    activeSessionId === session.id && "bg-muted"
                  )}
                  onClick={() => onSelectSession(session.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      {editingId === session.id ? (
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onBlur={() => saveRename(session.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveRename(session.id);
                            if (e.key === "Escape") cancelRename();
                          }}
                          className="w-full bg-transparent text-sm font-medium outline-none"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <h3 className="text-sm font-medium truncate">{session.title}</h3>
                      )}
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {session.lastMessage}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <MessageSquare size={12} />
                        <span>{session.messageCount}</span>
                        <span>•</span>
                        <span>{session.timestamp}</span>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRename(session)}>
                          <Edit3 size={14} className="mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDeleteSession(session.id)}
                          className="text-destructive"
                        >
                          <Trash2 size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {sessions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare size={24} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No chats yet</p>
                  <p className="text-xs">Start a new conversation!</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};