import { useEffect } from "react";
import { PuffLoader } from "react-spinners"

const LoadingModal = ({ delay, callback }: { delay: number; callback: () => void }) => {
    
    useEffect(() => {
        const timer = setTimeout(() => {
            callback();
        }, delay);

        return () => clearTimeout(timer);
    }, [delay, callback]);
    
    return (
        <PuffLoader loading={true} color={'#FFFFFF'} />
    )
}

export default LoadingModal;