import { useMemo } from 'react';

import { SubmitWrapper } from './style';

import GreenButton from '@/components/atoms/buttons/greenButton';
import InstantiateButton from '@/components/atoms/buttons/instantiateButton';
import useWalletStore from '@/store/walletStore';

interface IProps {
    onClickInstantiate: () => void;
    disableButton: boolean;
}

const Submit = ({ onClickInstantiate, disableButton }: IProps) => {
    const { isInit } = useWalletStore();
    // const isInit = useSelector((state: rootState) => state.wallet.isInit);

    const buttonText = useMemo(() => {
        return isInit ? 'Instantiate' : 'Connect Wallet';
    }, [isInit]);

    return (
        <SubmitWrapper>
            <InstantiateButton disabled={disableButton} onClick={onClickInstantiate}>
                <span className="button-text">{buttonText}</span>
            </InstantiateButton>
        </SubmitWrapper>
    );
};

export default Submit;
