import { IC_VALID_SHIELD } from '@/components/atoms/icons/pngIcons';
import Divider from '@/components/atoms/divider';
import useSearchStore from '../../searchStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import {
    Container,
    LabelAdvancedTypo,
    LabelBasicTypo,
    LabelWrap,
    TokenNameBox,
    TotalSupplyAmount,
    TotalSupplyBox,
    TotalSupplyTitle
} from './style';
import commaNumber from 'comma-number';
import { parseAmountWithDecimal2 } from '@/utils/common';
import { TOOLTIP_ID } from '@/constants/tooltip';
import TokenLogo from '@/components/atoms/icons/TokenLogo';
import { getTokenAmountFromUToken } from '@/utils/balance';
import { CRAFT_CONFIGS } from '@/config';
import Skeleton from '@/components/atoms/skeleton';
import PinButton from '@/components/atoms/buttons/pinButton';
import usePinContractStore from '@/store/pinContractStore';
import TextEllipsis from '@/components/atoms/ellipsis';

const TokenNameCard = () => {
    const logoUrl = useSearchStore((state) => state.marketingInfo?.logo?.url);
    const userAddress = useSelector((state: rootState) => state.wallet.address);
    const symbol = useSearchStore((state) => state.tokenInfo?.symbol);
    const tokenName = useSearchStore((state) => state.tokenInfo?.name);
    const ownerAddress = useSearchStore((state) => state.contractInfo?.contract_info.admin);
    const totalSupply = useSearchStore((state) => state.tokenInfo?.total_supply) || '';
    const codeId = useSearchStore((state) => state.contractInfo?.contract_info.code_id);
    const decimals = useSearchStore((state) => state.tokenInfo?.decimals) || 0;
    const contractInfo = useSearchStore((state) => state.contractInfo);
    const tokenInfo = useSearchStore((state) => state.tokenInfo);
    const marketingInfo = useSearchStore((state) => state.marketingInfo);

    const isOwner = userAddress === ownerAddress;

    const { pinList, addPin, removePin } = usePinContractStore();
    const userPinList = pinList[userAddress.toLowerCase()]?.filter((v) => v.type === 'cw20') || [];

    const isPinned = Boolean(userPinList?.find((v) => v.contractAddress.toLowerCase() === contractInfo?.address.toLowerCase()));

    const handleOnClickPin = (evt) => {
        if (userAddress && contractInfo && tokenInfo && marketingInfo) {
            if (isPinned) removePin(userAddress, contractInfo.address);
            else
                addPin(userAddress, {
                    type: 'cw20',
                    address: userAddress,
                    contractAddress: contractInfo.address,
                    name: tokenInfo.name,
                    symbol: tokenInfo.symbol,
                    label: contractInfo.contract_info.label,
                    tokenLogoUrl: marketingInfo.logo?.url || ''
                });
        }
    };

    return (
        <Container>
            <TokenLogo src={logoUrl} />

            <div style={{ width: '100%' }}>
                <TokenNameBox>
                    <div className="token-name-box">
                        <div className="token-symbol">{symbol}</div>
                        {/* <img src={IC_VALID_SHIELD} alt="verified-icon" style={{ width: '24px' }} /> */}
                    </div>

                    {isOwner && (
                        <div className="owner-tag">
                            <span className="owner-box-text">OWNER</span>
                        </div>
                    )}

                    <div className="divider" />

                    <div className="token-name clamp-single-line">{tokenName}</div>

                    {codeId ? (
                        <LabelWrap>
                            {codeId === CRAFT_CONFIGS.CW20.BASIC_CODE_ID ? (
                                <LabelBasicTypo>{'BASIC'}</LabelBasicTypo>
                            ) : (
                                //? Replace LabelAdvancedTypo with LabelBasicTypo by request (same text color)
                                <LabelBasicTypo>{'ADVANCED'}</LabelBasicTypo>
                            )}
                        </LabelWrap>
                    ) : (
                        <Skeleton width="50px" />
                    )}

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <PinButton isPinned={isPinned} isBlocked={userPinList.length >= 10} onClick={handleOnClickPin} />
                    </div>
                </TokenNameBox>
                <div style={{ margin: '12px 0 8px' }}>
                    <Divider $color="var(--Gray-400, #2C2C2C)" $direction={'horizontal'} />
                </div>
                <TotalSupplyBox>
                    <TotalSupplyTitle>Total supply :</TotalSupplyTitle>
                    <div className="amount" style={{ display: 'flex', gap: '8px' }}>
                        <TextEllipsis
                            CustomDiv={TotalSupplyAmount}
                            text={commaNumber(getTokenAmountFromUToken(totalSupply, String(decimals)))}
                            breakMode={'letters'}
                        />
                        {/* <TotalSupplyAmount>{commaNumber(getTokenAmountFromUToken(totalSupply, String(decimals)))}</TotalSupplyAmount>{' '} */}
                        <TotalSupplyAmount style={{ fontWeight: 400 }}>{symbol}</TotalSupplyAmount>
                    </div>
                </TotalSupplyBox>
            </div>
        </Container>
    );
};

export default TokenNameCard;
