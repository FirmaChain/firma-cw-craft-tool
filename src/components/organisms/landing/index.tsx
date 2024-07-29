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
    ScreenWarpper,
    SubTitle,
    Title,
    TitleBox,
    TooltipIconBox
} from './styles';
import { useModalStore } from '@/hooks/useModal';
import LoadingModal from '../modal/loadingModal';

const TooltipIcon = ({ tooltip }: { tooltip?: string }) => {
    
    return (
        <TooltipIconBox
            data-tooltip-content={tooltip}
            data-tooltip-id={TOOLTIP_ID.LIGHT}
            data-tooltip-wrapper="span"
            data-tooltip-place="bottom"
        >
            <img src={IC_TOOLTIP_16_GRAY} alt="" className="gray-tooltip" style={{ width: '16px', height: '16px' }} />
            {/* <div className="gray-tooltip">
                <Icons.Tooltip width="16px" height="16px" />
            </div> */}
            {/* <Icons.Tooltip width="16px" height="16px" fill="#50D1E5" /> */}
            <img src={IC_TOOLTIP_16_50D1E5} alt="" className="color-tooltip" style={{ width: '16px', height: '16px' }} />
        </TooltipIconBox>
    );
};

// const 
const CW20Btn = () => {
    const modal = useModalStore();
    const closeModal = useModalStore().closeModal;
    const navigate = useNavigate();

    const onClickExecute = () => {
        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => <LoadingModal delay={1000} callback={() => {
                closeModal(id);
                navigate('/instantiate');
            }}/>
        });
    };

    return (
        <ContractBtnBase onClick={onClickExecute}>
            <Icons.CW20 />
            <div className="typo-box">
                <div className="variant">Token</div>
                <div className="type">CW20</div>
            </div>
        </ContractBtnBase>
    );
};

const CW721Btn = () => {
    return (
        <ContractBtnBase disabled>
            <Icons.CW721 />
            <div className="typo-box">
                <div className="variant">NFT</div>
                <div className="type">CW721</div>
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
                        <SubTitle>Create and manage your CW20 and CW721 tokens with ease and security.</SubTitle>
                    </TitleBox>
                    <CardBox>
                        <CardWarp>
                            <img src={IMG_LANDING_INSTANTIATE} alt="instantiate" style={{ width: '180px' }} />
                            <CardTitleBox className="title-box">
                                <CardTitle className="card-title">Instantiate</CardTitle>
                                <BgColoredTitle>Instantiate</BgColoredTitle>
                                <TooltipIcon tooltip={`Mint your tokens and\nstart setting them up.`} />
                            </CardTitleBox>
                        </CardWarp>
                        <CardWarp>
                            <img src={IMG_LANDING_QUERY} alt="query" style={{ width: '180px' }} />
                            <CardTitleBox className="title-box">
                                <CardTitle className="card-title">Query</CardTitle>
                                <BgColoredTitle>Query</BgColoredTitle>
                                <TooltipIcon tooltip={`Query the details and balance\nof your minted tokens.`} />
                            </CardTitleBox>
                        </CardWarp>
                        <CardWarp>
                            <img src={IMG_LANDING_EXECUTE} alt="execute" style={{ width: '180px' }} />
                            <CardTitleBox className="title-box">
                                <CardTitle className="card-title">Execute</CardTitle>
                                <BgColoredTitle>Execute</BgColoredTitle>
                                <TooltipIcon tooltip={`Manage your minted tokens:\ntransfer, mint, burn, and more.`} />
                            </CardTitleBox>
                        </CardWarp>
                    </CardBox>
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
