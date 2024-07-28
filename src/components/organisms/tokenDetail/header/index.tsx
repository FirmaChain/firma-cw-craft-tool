import { useNavigate } from 'react-router-dom';
import { HeaderBox, HeaderTitle, HeaderWrap } from './style';
import Icons from '@/components/atoms/icons';
import IconButton from '@/components/atoms/buttons/iconButton';
import useTokenDetailStore from '@/store/useTokenDetailStore';
import Skeleton from '@/components/atoms/skeleton';

const Header = () => {
    const tokenName = useTokenDetailStore((state) => state.tokenDetail?.tokenName);

    const navigate = useNavigate();

    const onClickPrev = () => {
        navigate(`/mytoken`);
    };

    return (
        <HeaderBox>
            <HeaderWrap>
                <IconButton style={{ padding: 0, height: '24px' }} onClick={onClickPrev}>
                    <Icons.LeftArrow width={'24'} height={'24'} strokeWidth={'2px'} stroke={'#FFFFFF'} />
                </IconButton>
                {tokenName ? <HeaderTitle>{tokenName}</HeaderTitle> : <Skeleton />}
            </HeaderWrap>
        </HeaderBox>
    );
};

export default Header;
