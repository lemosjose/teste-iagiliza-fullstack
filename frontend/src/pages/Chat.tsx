import BreadcrumbMenu from "@/components/breadcrumb-custom";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- CORREÇÃO DE IMPORTAÇÃO ---
// Você precisa importar o 'postMessage' também
import { getMessages } from "@/axios/fetch";

import { postMessage } from "@/axios/post";

import { Input } from "@/components/ui/input";
import { MessageList } from "@/components/messages";

import type { MessageCard } from "@/types/componentInterfaces";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const Chat = () => {
  const [messages, setMessages] = useState<MessageCard[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      // Mostra a mensagem de erro real da API
      if (err instanceof Error) {
        setError(err.message || 'Erro ao buscar mensagens');
      } else {
        setError('Erro ao buscar mensagens');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { 
    fetchMessages();
  }, []);


  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTo(0, scrollElement.scrollHeight);
      }
    }
  }, [messages, isLoading]); 

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessageContent = newMessage;
    setNewMessage('');

    setIsLoading(true);
    setError(null);


    setMessages(prev => [...prev, { content: userMessageContent, role: 'USER' }]);

    try {

      await postMessage({ content: userMessageContent });

      await fetchMessages();

    } catch (err) {
        let errorMessage = 'Erro ao enviar mensagem';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        setError(errorMessage);

        setMessages(prev => prev.filter(msg => msg.content !== userMessageContent && msg.role === 'USER'));
    } finally {

        setIsLoading(false);
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col p-6 md:p-10">
      <header className="flex justify-center">
        <BreadcrumbMenu />
      </header>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-4">
        Página de Chat
      </h1> 


      <ScrollArea className="flex-1 border rounded-md p-4 mb-4" ref={scrollAreaRef}>

        <div className="flex flex-col space-y-4">
          <MessageList 
            messages={messages}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </ScrollArea>


      <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input 
            type="text" 
            placeholder="Digite sua mensagem" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar'}
          </Button>
      </form>
    </div>
  );
};

export default Chat;