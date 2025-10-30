import { SignupForm } from "@/components/signup-form";

import BreadcrumbMenu from "@/components/breadcrumb-custom";

export function Register() {
  return (
    <div className="flex min-h-svh w-full flex-col p-6 md:p-10">
      <header className=" flex justify-center align-center w-full mb-8">
        <div className="w-full max-w-sm text-center">
          <BreadcrumbMenu />
        </div>
      </header>

      <div className="flex flex-1 w-full items-center justify-center">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>
    </div>
  ); 
}
export default Register;
