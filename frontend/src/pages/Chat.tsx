import BreadcrumbMenu from "@/components/breadcrumb-custom";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Input } from "@/components/ui/input";

const Chat = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-star p-6 md:p-10">
      <header className="justify-center">
        <BreadcrumbMenu />
      </header>
      <h1 className="scroll-m-20 text-center flex-1 text-4xl font-extrabold tracking-tight text-balance">
        Página de Chat
      </h1> 

      <div> 
      </div>

      <ScrollArea className="flex-1 border rounded-md p-4 mb-4">

      </ScrollArea>

      <div>
        <Input type="text" placeholder="Digite sua mensagem"/>
      </div>
    </div>
  );
};

export default Chat;