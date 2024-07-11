import { useEffect, useState } from 'react';

import ColorButton from '../../../../atoms/buttons/colorButton';
import { SubmitWrapper } from './style';
import { useSelector } from 'react-redux';
import { rootState } from '../../../../../redux/reducers';

interface IProps {
    onClickInstantiate: () => void;
}

const Submit = ({ onClickInstantiate }: IProps) => {
    const { isInit } = useSelector((state: rootState) => state.wallet);

    const [buttonText, setButtonText] = useState<string>(isInit ? 'Instantiate Token' : 'Connect Wallet');

    useEffect(() => {
        const text = isInit ? 'Instantiate Token' : 'Connect Wallet';
        setButtonText(text);
    }, [isInit]);

    return (
        <SubmitWrapper>
            <ColorButton
                width={'180px'}
                height={'54px'}
                color={'#02E191'}
                text={buttonText}
                onClick={onClickInstantiate}
                sx={{
                    color: '#121212',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontStyle: 'normal'
                }}
            />
        </SubmitWrapper>
    );
};

export default Submit;
