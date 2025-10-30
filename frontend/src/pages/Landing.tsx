import { useNavigate } from "react-router";
import BreadcrumbMenu from "@/components/breadcrumb-custom";

import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-star p-6 md:p-10">
      <header className="justify-center">
        <BreadcrumbMenu />
      </header>
      <div className="w-full max-w-sm md:max-w-4xl justify-center items-center mt-10">
        <h1 className="mb-4 text-3xl font-bold mt-6 ease-linear duration-150">Conheça o seu Novo Companheiro Virtual</h1>
      </div>

      <p className="leading-7 [&:not(:first-child)]:mt-6">

        Converse agora com uma IA de última geração, com respostas precisas e direto ao ponto. De forma gratuita e com qualidade.
      </p>

      <blockquote className="mt-6 border-l-2 pl-6 italic">
        &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
        it&apos;s only fair that they should pay for the privilege.&quot;
      </blockquote>

      <div className="mt-200">
        <Button onClick={() => navigate("/login")}>
          Conversar agora (login exigido)
        </Button>
      </div> 

    </div>
  );
};

export default Landing;