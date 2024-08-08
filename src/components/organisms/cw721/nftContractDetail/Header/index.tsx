import { useNavigate } from 'react-router-dom';
import Icons from '@/components/atoms/icons';
import IconButton from '@/components/atoms/buttons/iconButton';
import Skeleton from '@/components/atoms/skeleton';
import { HeaderBox, HeaderTitle, HeaderWrap } from './styles';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';

const Header = () => {
    const detail = useNFTContractDetailStore((state) => state.contractDetail);

    const navigate = useNavigate();

    const onClickPrev = () => {
        navigate(`/cw721/mynft`);
    };

    return (
        <HeaderBox>
            <HeaderWrap>
                <IconButton
                    style={{ padding: 0, height: '24px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}
                    onClick={onClickPrev}
                >
                    <Icons.LeftArrow width={'24'} height={'24'} strokeWidth={'2px'} stroke={'#FFFFFF'} />
                    {detail ? <HeaderTitle>{detail.name}</HeaderTitle> : <Skeleton />}
                </IconButton>
            </HeaderWrap>
        </HeaderBox>
    );
};

export default Header;
