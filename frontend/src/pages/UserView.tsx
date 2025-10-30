import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useEffect, useState } from "react";

import UserUpdateCard from "@/components/userCard";

import { getUserData } from "@/axios/fetch"

import BreadcrumbMenu from "@/components/breadcrumb-custom";
import { patchUserName, patchUserEmail } from "@/axios/update";

const UserView = () => {

    const [name, setName] = useState<string>("")
    const [ email, setEmail ] = useState<string>("")

    const [currentName, setCurrentName] = useState<string>("")
    const [currentEmail, setCurrentEmail] = useState<string>("")

    const handleSubmitName = async() => {
        try{ 
            await patchUserName({name})
            setCurrentName(name)
            setName("")
        } catch (error){
            console.error("Erro ao atualizar seu usuário: ", error)
        }
    }

    const handleSubmitEmail = async() => {
        try {
            await patchUserEmail({ email })
            setCurrentEmail(email)
            setEmail("")
        } catch (err) {
            console.error('Error updating email:', err)
        }
    }

    useEffect(() => {
        const fetchUserData = async () => { 
            try{
                const data = await getUserData()
                setCurrentEmail(data.email)
                setCurrentName(data.name)
            } catch(error) {
                console.error("Erro ao adquirir informações do seu usuário", error)
            }
        }

        fetchUserData()
        
    }, [])
    return ( 
        <div className="bg-muted flex min-h-svh flex-col items-center justify-start p-6 md:p-10">
            <header className=" flex justify-center align-center w-full mb-8">
                <div className="w-full max-w-sm text-center">
                    <BreadcrumbMenu />
                </div>
            </header>
            <div className="w-full max-w-sm md:max-w-4xl">
                <Tabs defaultValue="user" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="user">Mudar Usuario</TabsTrigger>
                        <TabsTrigger value="email">Mudar Email</TabsTrigger>
                    </TabsList>
                    <TabsContent value="user">
                        <UserUpdateCard
                            title="Conta"
                            description="Detalhes atuais da sua conta:"
                            currentLabel="Usuario Atual:"
                            currentValue={currentName}
                            newLabel="Username Novo"
                            newValue={name}
                            onNewValueChange={setName}
                            onSubmit={handleSubmitName}
                            placeholder="exemplo: Coxinha"
                        />
                    </TabsContent>
                    <TabsContent value="email">
                        <UserUpdateCard
                            title="Conta"
                            description="Detalhes atuais da sua conta:"
                            currentLabel="Email Atual"
                            currentValue={currentEmail}
                            newLabel="Email Novo"
                            newValue={email}
                            onNewValueChange={setEmail}
                            onSubmit={handleSubmitEmail}
                            placeholder="exemplo: Repente@gmail.com"
                            inputType="email"
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>  
    );
}; 

export default UserView;
