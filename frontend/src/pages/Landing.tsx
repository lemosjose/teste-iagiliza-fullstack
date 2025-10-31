import { useNavigate } from "react-router";
import BreadcrumbMenu from "@/components/breadcrumb-custom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-muted flex min-h-svh flex-col">
      
 
      <header className="flex w-full justify-center p-6 md:p-10 ">
        <BreadcrumbMenu />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-6 text-center md:p-10">
        

        <div className="w-full max-w-4xl space-y-6">
          <h1 className="text-3xl font-bold">
            Conheça o seu Novo Companheiro Virtual
          </h1>

          <p className="leading-7">
            Converse agora com uma IA de última geração, com respostas precisas e
            direto ao ponto.
          </p>

          <p className="leading-7">
            Na palma da sua mão, na tela do computador, nosssa interface de ponta
            se adapta em todas as telas, te permitindo ter respostas rápidas
            onde você quiser, quando quiser
          </p>

          <blockquote className="mt-6 border-l-2 pl-6 italic">
            "A Inteligência Artifical é uma tecnologia tão revolucionária quanto a
            Eletricdade" 
            <footer className="text-right mt-2">
              — <span className="font-bold">Andrew NG, Co-Fundador da <a href="https://www.coursera.org/">Coursera</a> e fundador da <a href="https://www.deeplearning.ai/">DeepLearning.ai</a> </span>
            </footer>
          </blockquote>
        </div>

        <div>
          
        </div>

        <div className="mt-12">
          <Button onClick={() => navigate("/login")}>
            Conversar agora (login exigido)
          </Button>
        </div>
        
      </main>
    </div>
  );
};

export default Landing;