import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function notifyerror(message: string) {
    return toast.error(message);
}

export function notifysuccess(message: string) {
    return toast.success(message);
}
