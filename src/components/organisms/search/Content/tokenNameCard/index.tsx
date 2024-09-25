import { IC_VALID_SHIELD } from '@/components/atoms/icons/pngIcons';
import Divider from '@/components/atoms/divider';
import useSearchStore from '../../searchStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { Container, LabelAdvancedTypo, LabelBasicTypo, LabelWrap, TokenNameBox, TotalSupplyBox } from './style';
import commaNumber from 'comma-number';
import { parseAmountWithDecimal2 } from '@/utils/common';
import { TOOLTIP_ID } from '@/constants/tooltip';
import TokenLogo from '@/components/atoms/icons/TokenLogo';
import { getTokenAmountFromUToken } from '@/utils/balance';
import { CRAFT_CONFIGS } from '@/config';
import Skeleton from '@/components/atoms/skeleton';

const TokenNameCard = () => {
    const logoUrl = useSearchStore((state) => state.marketingInfo?.logo?.url);
    const userAddress = useSelector((state: rootState) => state.wallet.address);
    const symbol = useSearchStore((state) => state.tokenInfo?.symbol);
    const tokenName = useSearchStore((state) => state.tokenInfo?.name);
    const ownerAddress = useSearchStore((state) => state.contractInfo?.contract_info.admin);
    const totalSupply = useSearchStore((state) => state.tokenInfo?.total_supply) || '';
    const codeId = useSearchStore((state) => state.contractInfo?.contract_info.code_id);
    const decimals = useSearchStore((state) => state.tokenInfo?.decimals) || 0;

    const isOwner = userAddress === ownerAddress;

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

                    {codeId ? (
                        <LabelWrap>
                            {codeId === CRAFT_CONFIGS.CW20.BASIC_CODE_ID ? (
                                <LabelBasicTypo>{'BASIC'}</LabelBasicTypo>
                            ) : (
                                <LabelAdvancedTypo>{'ADVANCED'}</LabelAdvancedTypo>
                            )}
                        </LabelWrap>
                    ) : (
                        <Skeleton width="50px" />
                    )}
                </TokenNameBox>
                <div style={{ margin: '12px 0 8px' }}>
                    <Divider $color="var(--Gray-400, #2C2C2C)" $direction={'horizontal'} />
                </div>
                <TotalSupplyBox>
                    <div className="title">Total supply:</div>
                    <div className="amount">
                        <span className="bold">{commaNumber(getTokenAmountFromUToken(totalSupply, String(decimals)))}</span>{' '}
                        <span className="symbol">{symbol}</span>
                    </div>
                </TotalSupplyBox>
            </div>
        </Container>
    );
};

export default TokenNameCard;
