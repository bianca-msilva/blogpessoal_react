import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

let data = new Date().getFullYear();

function Footer() {
    return (
        <>
            <div className="bg-indigo-900 flex justify-center items-center text-white">
                <div className="container flex flex-col items-center justify-center py-4 gap-2">
                    <p className="font-bold text-xl">
                        Blog Pessoal Generation | Copyright {data}</p>
                    <p className="text-lg">Acesse minhas redes sociais</p>
                    <div className=" flex gap-3">
                        <a href="www.linkedin.com/in/bianca-maria-da-silva" target="_blank">
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
        </>
    )
}

export default Footer
