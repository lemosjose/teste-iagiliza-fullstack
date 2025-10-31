import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useNavigate } from "react-router";
import { Button } from "./ui/button";



//this would need to be more modular in production code so it's not showing every page link on ALL pages, 
// but since this is a job challenge  i am making it easy to navigate 
// between the pages required


const BreadcrumbMenu = () => { 

    const navigate = useNavigate();

    //let's see if i will have time to make this more secure by making the token invalid on the backend 

    const handleLogout = () => {
        localStorage.removeItem("authToken");

        navigate("/login");
    };
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
                    <BreadcrumbSeparator />
                    <BreadcrumbItem> 
                        <Button onClick={handleLogout}> Log-out</Button>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}

export default BreadcrumbMenu;