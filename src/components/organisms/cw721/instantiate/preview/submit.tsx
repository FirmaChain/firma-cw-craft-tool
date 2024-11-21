import { useMemo } from 'react';

import styled from 'styled-components';
import GreenButton from '@/components/atoms/buttons/greenButton';
import InstantiateButton from '@/components/atoms/buttons/instantiateButton';
import useWalletStore from '@/store/walletStore';

export const SubmitWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 28px;
`;

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
