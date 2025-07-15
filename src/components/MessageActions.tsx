import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MessageActionsProps {
  message: string;
  isUser: boolean;
  onRegenerate?: () => void;
}

export const MessageActions = ({ message, isUser, onRegenerate }: MessageActionsProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Message copied successfully",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy message to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate();
    }
  };

  return (
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="h-7 w-7 p-0 hover:bg-muted"
      >
        {copied ? (
          <Check size={14} className="text-green-600" />
        ) : (
          <Copy size={14} />
        )}
      </Button>
      
      {!isUser && onRegenerate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRegenerate}
          className="h-7 w-7 p-0 hover:bg-muted"
        >
          <RotateCcw size={14} />
        </Button>
      )}
      
      {!isUser && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-muted"
          >
            <ThumbsUp size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-muted"
          >
            <ThumbsDown size={14} />
          </Button>
        </>
      )}
    </div>
  );
};