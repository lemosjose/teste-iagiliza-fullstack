import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router"
import { useState } from "react"
import { loginUser } from "@/axios/axios"

import { Alert, 
  AlertTitle,
  AlertDescription
 } from "./ui/alert"


 //i prefer to use <div> directly on the function, but this component comes directly from ui.shadcn so i decided to keep it as it is
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const [ email, setEmail ] = useState<string>(""); 

  const [ password, setPassword ] = useState<string>("");

  //pretty erroring

  const [ error, setError] = useState<string>("")

  const handleSubmit = async(e: React.FormEvent) => { 
      e.preventDefault();
  
      setError("")
      setEmail("")
      setPassword("")
  
      try{
        const data = await loginUser({ email, password})

        console.log("Login bem sucedido", data.token)

        navigate("/messages")
  
        //clears everything
        setEmail("");
        setPassword("");
      } catch (err: any) { 
        setError(err?.message ?? "Ocorreu um erro ao criar sua conta")
      }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Pretty erroring */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bem vindo</h1>
                <p className="text-muted-foreground text-balance">
                  Entre com seu usuário para Continuar
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email/Usuário</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  placeholder="Mínimo de 8 Caracteres" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                  
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
              <FieldSeparator />
              <Field>
                <FieldLabel>Não possui uma conta?</FieldLabel>
                <Button type="button" onClick={() => navigate("/register")}>Registre-se</Button> 
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Ao clicar para continuar, você concorda com nossas políticas de privacidade
      </FieldDescription>
    </div>
  )
}
