import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";

let data = new Date().getFullYear();

function Footer() {

    const { usuario, } = useContext(AuthContext);

    let component: ReactNode

    if (usuario.token !== '') {

        // Jogar na variável todo o conteúdo do footer
        component = (
            <div className="bg-indigo-900 flex justify-center items-center text-white">
                <div className="container flex flex-col items-center justify-center py-4 gap-2">
                    <p className="font-bold text-xl">
                        Blog Pessoal Generation | Copyright {data}</p>
                    <p className="text-lg">Acesse minhas redes sociais</p>
                    <div className=" flex gap-3">
                        <a href="https://www.linkedin.com/in/bianca-maria-da-silva-891a5b203/" target="_blank">
                            <LinkedinLogoIcon size={41} weight="regular" />
                        </a>
                        <a href="https://www.instagram.com/_.bey__/" target="_blank">
                            <InstagramLogoIcon size={41} weight="regular" />
                        </a>
                        <a href="https://github.com/bianca-msilva" target="_blank">
                            <GithubLogoIcon size={41} weight="regular" />
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {component}
        </>
    )
}

export default Footer
