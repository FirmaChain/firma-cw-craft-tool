import Icons from '@/components/atoms/icons';
import { IMG_LANDING_EXECUTE, IMG_LANDING_INSTANTIATE, IMG_LANDING_QUERY } from '@/components/atoms/icons/pngIcons';
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

const TooltipIcon = ({ tooltip }: { tooltip?: string }) => {
    return (
        <TooltipIconBox
            data-tooltip-content={tooltip}
            data-tooltip-id={TOOLTIP_ID.LIGHT}
            data-tooltip-wrapper="span"
            data-tooltip-place="bottom"
        >
            <div className="gray-tooltip">
                <Icons.Tooltip width="16px" height="16px" />
            </div>
            <svg width="16" height="16" viewBox="0 0 17 16" fill="none">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.1665 8.00218C16.1665 12.2331 12.7319 15.6684 8.50022 15.6684C4.26079 15.6684 0.833984 12.2333 0.833984 8.00218C0.833985 3.76951 4.26075 0.335937 8.50022 0.335938C12.7319 0.335938 16.1665 3.76973 16.1665 8.00218ZM8.50024 12.2709C9.06857 12.2709 9.53755 11.8006 9.53755 11.2336V7.69775C9.53755 7.12369 9.06311 6.66844 8.50024 6.66844C7.93241 6.66844 7.47093 7.12862 7.47093 7.69775L7.47093 11.2336C7.47093 11.7956 7.92699 12.2709 8.50024 12.2709ZM8.50019 5.99073C9.06827 5.99073 9.5295 5.5295 9.5295 4.96142C9.5295 4.39581 9.07073 3.92411 8.49219 3.92411C7.91918 3.92411 7.46288 4.39831 7.46288 4.96142C7.46288 5.53198 7.9266 5.99073 8.50019 5.99073Z"
                    fill="#50D1E5"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.1665 8.00218C16.1665 12.2331 12.7319 15.6684 8.50022 15.6684C4.26079 15.6684 0.833984 12.2333 0.833984 8.00218C0.833985 3.76951 4.26075 0.335937 8.50022 0.335938C12.7319 0.335938 16.1665 3.76973 16.1665 8.00218ZM8.50024 12.2709C9.06857 12.2709 9.53755 11.8006 9.53755 11.2336V7.69775C9.53755 7.12369 9.06311 6.66844 8.50024 6.66844C7.93241 6.66844 7.47093 7.12862 7.47093 7.69775L7.47093 11.2336C7.47093 11.7956 7.92699 12.2709 8.50024 12.2709ZM8.50019 5.99073C9.06827 5.99073 9.5295 5.5295 9.5295 4.96142C9.5295 4.39581 9.07073 3.92411 8.49219 3.92411C7.91918 3.92411 7.46288 4.39831 7.46288 4.96142C7.46288 5.53198 7.9266 5.99073 8.50019 5.99073Z"
                    fill="black"
                    fillOpacity="0.2"
                />
            </svg>
        </TooltipIconBox>
    );
};

const CW20Btn = () => {
    const navigate = useNavigate();

    const onClickExecute = () => {
        navigate('/instantiate');
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
