import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';

import { HeaderTitle, HeaderWrapper } from './style';
import Icons from '../../../atoms/icons';

interface IProps {
    tokenName: string;
}

const Header = ({ tokenName }: IProps) => {
    const navigate = useNavigate();

    const onClickPrev = () => {
        navigate(`/mytoken`);
    };

    return (
        <HeaderWrapper>
            <IconButton sx={{ padding: 0 }} onClick={onClickPrev}>
                <Icons.LeftArrow width={'24'} height={'24'} />
            </IconButton>
            <HeaderTitle>{tokenName}</HeaderTitle>
        </HeaderWrapper>
    );
};

export default Header;
