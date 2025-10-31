import { LoginForm } from "@/components/login-form";

import { useSearchParams } from "react-router";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Login = () => {
  const [searchParams] = useSearchParams();

  //not importing breadcrumb here since it's the "first impression" after the landing page and it 
  // should be clean
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">

      {/* Prettify the redirect from somewhere when user isn't logged in*/}
      {searchParams.get('unauthorized') === 'true' && (
        <Alert variant="destructive" className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Acesso Negado</AlertTitle>
          <AlertDescription>
            Você precisa logar primeiro.
          </AlertDescription>
        </Alert>
      )}

      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}; 

export default Login;