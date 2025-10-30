import { LoginForm } from "@/components/login-form";

const Login = () => {
  //not importing breadcrumb here since it's the "first impression" after the landing page and it 
  // should be clean
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}; 

export default Login;