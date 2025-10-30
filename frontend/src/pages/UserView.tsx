import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"

import { Input,  } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const UserView = () => {
    return ( 
        <div className="bg-muted flex min-h-svh flex-col items-center justify-start p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <Tabs defaultValue="user" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="user">Mudar Usuario</TabsTrigger>
                        <TabsTrigger value="email">Mudar Email</TabsTrigger>
                    </TabsList>
                    <TabsContent value="user">
                        <Card>
                            <CardHeader>
                            <CardTitle>Conta</CardTitle>
                            <CardDescription>
                                Detalhes atuais da sua conta:         
                            </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Usuario Atual: </Label>
                                <p className="blue">Teste</p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-username">Username Novo</Label>
                                <Input defaultValue="" />
                            </div>
                            </CardContent>
                            <CardFooter>
                            <Button>Atualizar</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="email">
                        <Card>
                            <CardHeader>
                            <CardTitle>Conta</CardTitle>
                            <CardDescription>
                                Detalhes atuais da sua conta:         
                            </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Email Atual</Label>
                                <p>Teste</p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-username">Email Novo</Label>
                                <Input defaultValue="exemplo: Repente@gmail.com" />
                            </div>
                            </CardContent>
                            <CardFooter>
                            <Button>Atualizar</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>  
    );
}; 

export default UserView;
