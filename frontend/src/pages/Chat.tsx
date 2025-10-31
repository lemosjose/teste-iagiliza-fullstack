import BreadcrumbMenu from "@/components/breadcrumb-custom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { MessageList } from "@/components/messages";
import { Button } from "@/components/ui/button";

import { getMessages, getChats } from "@/axios/fetch";
import { postMessage, createChat } from "@/axios/post";
import type { ChatInfo } from "@/types/dataInterfaces";

import type { MessageCard } from "@/types/componentInterfaces";
import { useEffect, useState, useRef } from "react";

// yeah, that one fetches a lot of data, so useEffect( ) and handles are huge.
// sorry.

const Chat = () => {

///state management
  const [chats, setChats] = useState<ChatInfo[]>([]); 
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeChatTitle, setActiveChatTitle] = useState<string>("Carregando...");

  const [messages, setMessages] = useState<MessageCard[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  const [isLoadingMessages, setIsLoadingMessages] = useState(true); 
  const [isChatListLoading, setIsChatListLoading] = useState(true); 
  const [isSendingMessage, setIsSendingMessage] = useState(false); 
  
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoadingMessages(true);
      setIsChatListLoading(true);
      setError(null);
      
      try {

        const initialData = await getMessages(null);
        setMessages(initialData.messages);
        setActiveChatId(initialData.chat.id);
        setActiveChatTitle(initialData.chat.title || "Novo Chat");

   
        const chatList = await getChats();
        setChats(chatList);
        
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Erro ao carregar dados');
        } else {
          setError('Erro desconhecido');
        }
      } finally {
        setIsLoadingMessages(false);
        setIsChatListLoading(false);
      }
    };
    
    fetchInitialData();
  }, []); 

  const handleSwitchChat = async (chatId: string) => {

    if (chatId === activeChatId || isLoadingMessages) return;

    setIsLoadingMessages(true);
    setError(null);
    setMessages([]); 
    setActiveChatId(chatId); 

    try {
      const data = await getMessages(chatId);
      setMessages(data.messages);
      setActiveChatTitle(data.chat.title || "Chat");
    } catch (err) {
      setError("Erro ao carregar este chat.");
    } finally {
      setIsLoadingMessages(false);
    }
  };


  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTo(0, viewport.scrollHeight);
      }
    }
  }, [messages, isSendingMessage]); 


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSendingMessage || isLoadingMessages) return;

    const userMessageContent = newMessage;
    setNewMessage('');
    setIsSendingMessage(true);
    setError(null);

   
    setMessages(prev => [...prev, { content: userMessageContent, role: 'USER' }]);

    try {

      const response = await postMessage({ 
        content: userMessageContent,
        chatId: activeChatId || null 
      });

      setMessages(prev => [...prev, { content: response.aiContent, role: 'AI' }]);
      

      if (activeChatId === null) {
        setActiveChatId(response.chatId);
      }
      


    } catch (err) {
      setError('Erro ao enviar mensagem');

      setMessages(prev => prev.filter(msg => msg.content !== userMessageContent));
    } finally {
      setIsSendingMessage(false);
    }
  };


  const handleNewChat = async () => {

    if (isSendingMessage || isLoadingMessages) return;

    setIsLoadingMessages(true);
    setMessages([]); 
    setError(null);
    
    try {

      const newChat = await createChat({}); 

      const newChatInfo: ChatInfo = {
        ...newChat, 
        _count: { messages: 0}
      }
      
      setChats(prevChats => [newChatInfo, ...prevChats]); 
      setActiveChatId(newChat.id);
      setActiveChatTitle(newChat.title || "Novo Chat");
    } catch (err) {
      setError("Erro ao criar novo chat.");
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // mimic chatGpt Interface
  return (

    <div className="grid h-svh w-full grid-cols-[260px_1fr] bg-black">
      

      <aside className="flex flex-col border-r bg-black p-4">
        <header className="flex justify-center mb-4">
          <BreadcrumbMenu />
        </header>

        <Button onClick={handleNewChat} className="mb-4">
          + Novo Chat
        </Button>

        <ScrollArea className="flex-1">
          <nav className="flex flex-col space-y-2">
            {isChatListLoading && <p className="text-sm text-muted-foreground">Carregando chats...</p>}
            {chats.map((chat) => (
              <Button
                key={chat.id}
                variant={chat.id === activeChatId ? "secondary" : "ghost"}
                className="justify-start truncate"
                onClick={() => handleSwitchChat(chat.id)}
                disabled={isLoadingMessages} 
              >
                {chat.title || "Chat sem título"}
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </aside>


      <main className="flex min-h-svh flex-col p-6 md:p-10">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-4">
          {activeChatTitle}
        </h1>

        <ScrollArea className="flex-1 border rounded-md p-4 mb-4" ref={scrollAreaRef}>
          <div className="flex flex-col space-y-4">
            <MessageList 
              messages={messages}
              isLoading={isLoadingMessages}
              error={error}
            />

            {isSendingMessage && (
              <div className="text-sm text-muted-foreground italic pl-2">
                IA está digitando...
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input 
            type="text" 
            placeholder="Digite sua mensagem" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isSendingMessage || isLoadingMessages}
          />
          <Button type="submit" disabled={isSendingMessage || isLoadingMessages}>
            {isSendingMessage ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Chat;