import { useNavigate } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-star p-6 md:p-10">
      <header>
      <Breadcrumb>
          <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink href="/login">Login</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink href="/register">Registre-se</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/messages">Entre no chat</BreadcrumbLink>
              </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="w-full max-w-sm md:max-w-4xl justify-center items-center mt-10">
        <h1 className="mb-4 text-3xl font-bold mt-6 ease-linear duration-150">Conheça o seu Novo Companheiro Virtual</h1>
      </div>

      <div className="mt-200">
        <Button onClick={() => navigate("/login")}>
          Conversar agora (login exigido)
        </Button>
      </div> 

    </div>
  );
};

export default Landing;