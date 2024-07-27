import { useMemo } from 'react';

import { SubmitWrapper } from './style';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import GreenButton from '@/components/atoms/buttons/greenButton';

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
            <GreenButton disabled={disableButton} onClick={onClickInstantiate}>
                <span className="button-text">{buttonText}</span>
            </GreenButton>
        </SubmitWrapper>
    );
};

export default Submit;
