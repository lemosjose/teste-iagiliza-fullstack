import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useState } from "react"

import { registerUser } from "@/axios/post"
import { Alert, AlertTitle, AlertDescription } from "./ui/alert"

//this is signup-01 from ui.shadcn, imported and changed to match informations from the api
export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  //also following the name from schema.prisma
  const [name, setName ] = useState<string>("")

  const [email, setEmail ] = useState("")

  const [password, setPassword ] = useState<string>("")

  //for some pretty feedback
  const [error, setError] = useState<string>("")

  const [success, setSuccess ] = useState<string>("")

  const handleSubmit = async(e: React.FormEvent) => { 

    e.preventDefault();

    e.preventDefault();

    setError("")
    setSuccess("")

    try{

      const payload = {name, email, password }

      await registerUser(payload)


      setSuccess("Conta Criada!")

      //clears everything
      setName("");
      setEmail("");
      setPassword("");

      // there is more error handling through axios already
    } catch (err: any) { 
      console.log("=== ERRO CAPTURADO ===");
      console.log("Tipo:", typeof err);
      console.log("Erro completo:", err);
      console.log("err.message:", (err as any)?.message);
      console.log("É instância de Error?", err instanceof Error);
      console.log("===================");
       setError(err?.message || "Ocorreu um erro ao criar sua conta");
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Crie um Usuário</CardTitle>
        <CardDescription>
          Crie um usuário em nossa plataforma para começar a utilizar o chat
        </CardDescription>
      </CardHeader>
      <CardContent>
      {success && (
        <Alert variant="default" className="mb-4 bg-green-100 dark:bg-green-900">
            <AlertTitle>Sucesso!</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
        </Alert> 
      )}
      {error && (
        <Alert variant="destructive" className="mb-4"> {/* <-- Remova o bg-red-100 por enquanto */}
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
        <form onSubmit={handleSubmit} method="post">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Usuário</FieldLabel>
              <Input 
              id="name" //from the API!
              type="text" 
              placeholder="foobar" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="exemplo: tabosa@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FieldDescription>
                Lembre-se do seu email, ele será sua forma principal para fazer login
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input 
              id="password" 
              type="password" 
              placeholder="(Mínimo de 8 Caracteres)" 
              required 

              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Criar Usuário</Button>
                <FieldDescription className="px-6 text-center">
                  Já possui conta em nosso sistema? <a href="/login">Faça Seu Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
