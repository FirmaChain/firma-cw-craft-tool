import FirmaLoading from '@/components/atoms/globalLoader/firmaLoad';
import { useEffect } from 'react';

const LoadingModal = ({ delay, callback }: { delay: number; callback: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            callback();
        }, delay);

        return () => clearTimeout(timer);
    }, [delay, callback]);

    return <FirmaLoading />;
};

export default LoadingModal;
