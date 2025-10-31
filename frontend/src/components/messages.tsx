import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react"; // Ícone para o alerta
import type { MessageCard, MessageListProps } from "@/types/componentInterfaces";

export const MessageList = ({ messages, isLoading, error }: MessageListProps) => {
  // Pega a última mensagem para verificar quem a enviou
  const lastMessage = messages[messages.length - 1];

  return (
    <>
      {messages.map((msg: MessageCard, index: number) => (
        <Card
          key={index}
          className={`max-w-[75%]
            ${msg.role === 'USER'
              ? 'bg-primary text-primary-foreground self-end'
              : 'bg-muted text-muted-foreground self-start'
            }`}
        >
          <CardContent className="p-3">
            <strong className="text-xs font-bold mb-1 opacity-80">
              {msg.role === 'USER' ? 'Você' : 'Morpheus'}
            </strong>
            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
          </CardContent>
        </Card>
      ))}


      {isLoading && lastMessage?.role === 'USER' && (
         <Card className="max-w-[75%] bg-muted text-muted-foreground self-start">
           <CardContent className="p-3">
             <strong className="text-xs font-bold mb-1 opacity-80">
               Morpheus
             </strong>
             <div className="flex space-x-1 p-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-0"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
             </div>
           </CardContent>
         </Card>
      )}

      {/* Indicador de erro */}
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};