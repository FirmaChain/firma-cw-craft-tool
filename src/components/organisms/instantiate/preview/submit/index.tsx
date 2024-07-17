import { useMemo } from 'react';

import { InstantiateButton, SubmitWrapper } from './style';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';

interface IProps {
    onClickInstantiate: () => void;
    disableButton: boolean;
}

const Submit = ({ onClickInstantiate, disableButton }: IProps) => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);

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
