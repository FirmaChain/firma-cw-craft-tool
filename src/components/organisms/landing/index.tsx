import Icons from '@/components/atoms/icons';
import { IC_CW20, IC_CW721, IMG_LANDING_EXECUTE, IMG_LANDING_INSTANTIATE, IMG_LANDING_QUERY } from '@/components/atoms/icons/pngIcons';
import { useNavigate } from 'react-router-dom';
import {
    BgColoredTitle,
    ButtonBox,
    CardBox,
    CardTitle,
    CardTitleBox,
    CardWarp,
    ContentBorderBox,
    ContentInnerBox,
    ContentScreen,
    ContractBtnBase,
    GradientTooltipIcon,
    HeaderBox,
    MobileCardBox,
    ScreenWarpper,
    SubTitle,
    Title,
    TitleBox,
    WalletConnectionIndicator
} from './styles';
import useModalStore from '@/store/modalStore';
import LoadingModal from '../modal/loadingModal';
// import { GlobalActions } from '@/redux/actions';
import CarouselSection from './mobile/carouselSection';
import DesktopFooter from './footer';

import useGlobalStore from '@/store/globalStore';
import useWalletStore from '@/store/walletStore';

const CW20Btn = () => {
    const modal = useModalStore();
    const closeModal = useModalStore().closeModal;
    const navigate = useNavigate();

    const { address } = useWalletStore();
    // const address = useSelector((v: rootState) => v.wallet.address);

    const { handleCw } = useGlobalStore();

    const onClickExecute = () => {
        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <LoadingModal
                    delay={1000}
                    callback={() => {
                        closeModal(id);
                        handleCw('CW20');
                        navigate(address ? 'mytoken' : '/instantiate');
                    }}
                />
            )
        });
    };

    return (
        <ContractBtnBase onClick={onClickExecute} $isConnected={Boolean(address)}>
            <img src={IC_CW20} alt="cw20" style={{ width: '2.8rem', height: '2.8rem' }} />
            {/* <Icons.CW20 /> */}
            <div className="typo-box">
                <div className="variant">{address && 'My '}Token</div>
                <div style={{ display: 'flex', gap: '0.1rem' }}>
                    <div className="type">CW</div>
                    <div className="type">20</div>
                </div>
            </div>
        </ContractBtnBase>
    );
};

const CW721Btn = () => {
    const modal = useModalStore();
    const closeModal = useModalStore().closeModal;
    const navigate = useNavigate();

    const { address } = useWalletStore();
    // const address = useSelector((v: rootState) => v.wallet.address);

    const { handleCw } = useGlobalStore();

    const onClickExecute = () => {
        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <LoadingModal
                    delay={1000}
                    callback={() => {
                        closeModal(id);
                        handleCw('CW721');
                        navigate(address ? '/cw721/mynft' : '/cw721/instantiate');
                    }}
                />
            )
        });
    };

    return (
        <ContractBtnBase onClick={onClickExecute} $isConnected={Boolean(address)}>
            <img src={IC_CW721} alt="cw721" style={{ width: '2.8rem', height: '2.8rem' }} />
            <div className="typo-box">
                <div className="variant">{address && 'My '}NFT</div>
                <div style={{ display: 'flex', gap: '0.1rem' }}>
                    <div className="type">CW</div>
                    <div className="type">721</div>
                </div>
            </div>
        </ContractBtnBase>
    );
};

const Landing = () => {
    const { address } = useWalletStore();
    // const address = useSelector((v: rootState) => v.wallet.address);

    return (
        <ScreenWarpper>
            <HeaderBox>
                <Icons.FirmaCraft width="13.2rem" height="3.4rem" fill="#707070" />
                {address && <WalletConnectionIndicator />}
            </HeaderBox>

            <ContentScreen>
                <ContentBorderBox>
                    <ContentInnerBox>
                        <TitleBox>
                            <Title>{`FIRMA CRAFT : \nCreate your own token`}</Title>
                            <SubTitle>{`Create and manage your CW20 and CW721 tokens\nwith ease and security.`}</SubTitle>
                        </TitleBox>
                        <CardBox>
                            <CardWarp style={{ gridArea: 'inst' }}>
                                <img
                                    src={IMG_LANDING_INSTANTIATE}
                                    alt="instantiate"
                                    style={{ minWidth: '18rem', maxWidth: '18rem', minHeight: '18rem' }}
                                />
                                <CardTitleBox className="title-box">
                                    <CardTitle className="card-title">Instantiate</CardTitle>
                                    <BgColoredTitle>Instantiate</BgColoredTitle>
                                    <GradientTooltipIcon tooltip={`Mint your tokens and\nstart setting them up.`} />
                                </CardTitleBox>
                            </CardWarp>
                            <CardWarp style={{ gridArea: 'query' }}>
                                <img
                                    src={IMG_LANDING_QUERY}
                                    alt="query"
                                    style={{ minWidth: '18rem', maxWidth: '18rem', minHeight: '18rem' }}
                                />
                                <CardTitleBox className="title-box">
                                    <CardTitle className="card-title">Query</CardTitle>
                                    <BgColoredTitle>Query</BgColoredTitle>
                                    <GradientTooltipIcon tooltip={`Query the details and balance\nof your minted tokens.`} />
                                </CardTitleBox>
                            </CardWarp>
                            <div style={{ gridArea: 'execute', display: 'flex', width: '100%', justifyContent: 'center' }}>
                                <CardWarp>
                                    <img
                                        src={IMG_LANDING_EXECUTE}
                                        alt="execute"
                                        style={{ minWidth: '18rem', maxWidth: '18rem', minHeight: '18rem' }}
                                    />
                                    <CardTitleBox className="title-box">
                                        <CardTitle className="card-title">Execute</CardTitle>
                                        <BgColoredTitle>Execute</BgColoredTitle>
                                        <GradientTooltipIcon tooltip={`Manage your minted tokens:\ntransfer, mint, burn, and more.`} />
                                    </CardTitleBox>
                                </CardWarp>
                            </div>
                        </CardBox>
                        <MobileCardBox>
                            <CarouselSection isDesktop variableCards />
                        </MobileCardBox>
                        <ButtonBox>
                            <CW20Btn />
                            <CW721Btn />
                        </ButtonBox>
                    </ContentInnerBox>
                </ContentBorderBox>
            </ContentScreen>
            <DesktopFooter />
        </ScreenWarpper>
    );
};

export default Landing;
