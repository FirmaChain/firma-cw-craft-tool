import { useNavigate } from 'react-router-dom';
import { HeaderBox, HeaderTitle, HeaderWrap } from './style';
import Icons from '@/components/atoms/icons';
import IconButton from '@/components/atoms/buttons/iconButton';
// import useTokenDetailStore from '@/store/useTokenDetailStore';
import Skeleton from '@/components/atoms/skeleton';
import { useCW20Detail } from '@/context/cw20DetailStore';

const Header = () => {
    const { tokenDetail } = useCW20Detail();
    const tokenName = tokenDetail?.tokenName;

    const navigate = useNavigate();

    const onClickPrev = () => {
        navigate(`/mytoken`);
    };

    return (
        <HeaderBox>
            <HeaderWrap>
                <IconButton
                    style={{ padding: 0, height: '24px', display: 'flex', flexDirection: 'row', alignItems: 'content', gap: '4px' }}
                    onClick={onClickPrev}
                >
                    <Icons.LeftArrow width={'24'} height={'24'} strokeWidth={'2px'} stroke={'#FFFFFF'} />
                    {tokenName ? <HeaderTitle>{tokenName}</HeaderTitle> : <Skeleton />}
                </IconButton>
            </HeaderWrap>
        </HeaderBox>
    );
};

export default Header;
