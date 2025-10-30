import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


//this would need to be more modular in production code so it's not showing every page link on ALL pages, 
// but since this is a job challenge  i am making it easy to navigate 
// between the pages required
const BreadcrumbMenu = () => { 
    return (
        <div> 
            <Breadcrumb>
                <BreadcrumbList>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/me">Meu usuário</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/register">Registre-se</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />
                        
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/messages">Entre no chat</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/login">Login</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}

export default BreadcrumbMenu;