import Icons from '@/components/atoms/icons';
import {
    IC_TOOLTIP_16_50D1E5,
    IC_TOOLTIP_16_GRAY,
    IMG_LANDING_EXECUTE,
    IMG_LANDING_INSTANTIATE,
    IMG_LANDING_QUERY
} from '@/components/atoms/icons/pngIcons';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { useNavigate } from 'react-router-dom';
import {
    BgColoredTitle,
    ButtonBox,
    CardBox,
    CardTitle,
    CardTitleBox,
    CardWarp,
    ContentBox,
    ContentScreen,
    ContractBtnBase,
    MobileCardBox,
    ScreenWarpper,
    SubTitle,
    Title,
    TitleBox,
    TooltipIconBox
} from './styles';
import { useModalStore } from '@/hooks/useModal';
import LoadingModal from '../modal/loadingModal';
import { GlobalActions } from '@/redux/actions';
import { getRandomTimeInMs } from '@/utils/common';
import CarouselSection from './mobile/carouselSection';

const TooltipIcon = ({ tooltip }: { tooltip?: string }) => {
    return (
        <TooltipIconBox
            data-tooltip-content={tooltip}
            data-tooltip-id={TOOLTIP_ID.LIGHT}
            data-tooltip-wrapper="span"
            data-tooltip-place="bottom"
        >
            <img src={IC_TOOLTIP_16_GRAY} alt="" className="gray-tooltip" style={{ width: '16px', height: '16px' }} />

            <img src={IC_TOOLTIP_16_50D1E5} alt="" className="color-tooltip" style={{ width: '16px', height: '16px' }} />
        </TooltipIconBox>
    );
};

const CW20Btn = () => {
    const modal = useModalStore();
    const closeModal = useModalStore().closeModal;
    const navigate = useNavigate();

    const onClickExecute = () => {
        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <LoadingModal
                    delay={getRandomTimeInMs(1.5, 3.8)}
                    callback={() => {
                        closeModal(id);
                        GlobalActions.handleCw('CW20');
                        navigate('/instantiate');
                    }}
                />
            )
        });
    };

    return (
        <ContractBtnBase onClick={onClickExecute}>
            <Icons.CW20 />
            <div className="typo-box">
                <div className="variant">Token</div>
                <div style={{ display: 'flex', gap: '1px' }}>
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

    const onClickExecute = () => {
        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <LoadingModal
                    delay={getRandomTimeInMs(1.5, 3.8)}
                    callback={() => {
                        closeModal(id);
                        GlobalActions.handleCw('CW721');
                        navigate('/cw721/instantiate');
                    }}
                />
            )
        });
    };

    return (
        <ContractBtnBase onClick={onClickExecute}>
            <Icons.CW721 />
            <div className="typo-box">
                <div className="variant">NFT</div>
                <div style={{ display: 'flex', gap: '1px' }}>
                    <div className="type">CW</div>
                    <div className="type">721</div>
                </div>
            </div>
        </ContractBtnBase>
    );
};

const Landing = () => {
    return (
        <ScreenWarpper>
            <ContentScreen>
                <Icons.FirmaCraft width="198px" />
                <ContentBox>
                    <TitleBox>
                        <Title>Create your own token</Title>
                        <SubTitle>{`Create and manage your CW20 and CW721 tokens\nwith ease and security.`}</SubTitle>
                    </TitleBox>
                    <CardBox>
                        <CardWarp style={{ gridArea: 'inst' }}>
                            <img
                                src={IMG_LANDING_INSTANTIATE}
                                alt="instantiate"
                                style={{ minWidth: '180px', maxWidth: '180px', minHeight: '180px' }}
                            />
                            <CardTitleBox className="title-box">
                                <CardTitle className="card-title">Instantiate</CardTitle>
                                <BgColoredTitle>Instantiate</BgColoredTitle>
                                <TooltipIcon tooltip={`Mint your tokens and\nstart setting them up.`} />
                            </CardTitleBox>
                        </CardWarp>
                        <CardWarp style={{ gridArea: 'query' }}>
                            <img src={IMG_LANDING_QUERY} alt="query" style={{ minWidth: '180px', maxWidth: '180px', minHeight: '180px' }} />
                            <CardTitleBox className="title-box">
                                <CardTitle className="card-title">Query</CardTitle>
                                <BgColoredTitle>Query</BgColoredTitle>
                                <TooltipIcon tooltip={`Query the details and balance\nof your minted tokens.`} />
                            </CardTitleBox>
                        </CardWarp>
                        <div style={{ gridArea: 'execute', display: 'flex', width: '100%', justifyContent: 'center' }}>
                            <CardWarp>
                                <img
                                    src={IMG_LANDING_EXECUTE}
                                    alt="execute"
                                    style={{ minWidth: '180px', maxWidth: '180px', minHeight: '180px' }}
                                />
                                <CardTitleBox className="title-box">
                                    <CardTitle className="card-title">Execute</CardTitle>
                                    <BgColoredTitle>Execute</BgColoredTitle>
                                    <TooltipIcon tooltip={`Manage your minted tokens:\ntransfer, mint, burn, and more.`} />
                                </CardTitleBox>
                            </CardWarp>
                        </div>
                    </CardBox>
                    <MobileCardBox>
                        <CarouselSection variableCards />
                    </MobileCardBox>
                    <ButtonBox>
                        <CW20Btn />
                        <CW721Btn />
                    </ButtonBox>
                </ContentBox>
            </ContentScreen>
        </ScreenWarpper>
    );
};

export default Landing;
