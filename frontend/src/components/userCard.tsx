import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import type { UserUpdateCardProps } from "@/types/componentInterfaces"


export default function UserUpdateCard(props: UserUpdateCardProps){
    return (
        <Card>
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-3">
                <Label>{props.currentLabel}</Label>
                <p className="text-sm text-muted-foreground">{props.currentValue || "N/A"}</p>
                </div>
                <div className="grid gap-3">
                <Label>{props.newLabel}</Label>
                <Input 
                    type={props.inputType || "text"}
                    placeholder={props.placeholder}
                    value={props.newValue}
                    onChange={(e) => props.onNewValueChange(e.target.value)}
                />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={props.onSubmit} disabled={!props.newValue}>
                Atualizar
                </Button>
            </CardFooter>
        </Card>
  )
}