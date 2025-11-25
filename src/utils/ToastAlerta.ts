// Constroi os alertas, script dos alertas, chamando-a apenas nos lugares desejados
import { toast } from 'react-toastify';

export function ToastAlerta(mensagem: string, tipo: string) {
    switch (tipo) {
        case 'sucesso':
            toast.success(mensagem, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });
            break;

        case 'erro':
            toast.error(mensagem, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });
            break;

        case 'info':
        default:
            toast.info(mensagem, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });
            break;
    }
}