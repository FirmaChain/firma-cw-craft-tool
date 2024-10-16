import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { IC_LINK_FILL } from '@/components/atoms/icons/pngIcons';
import useExecuteStore from '../../hooks/useExecuteStore';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { CRAFT_CONFIGS } from '@/config';
import { useModalStore } from '@/hooks/useModal';
import Divider from '@/components/atoms/divider';
import GreenButton from '@/components/atoms/buttons/greenButton';
import useExecuteActions from '../../action';
import TokenLogo from '@/components/atoms/icons/TokenLogo';
import QRModal2, { ModalType } from '@/components/organisms/modal/qrModal2';
import TxModal from '@/components/organisms/modal/txModal';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { useSnackbar } from 'notistack';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
`;

const ContentWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
`;

const ContentHeaderWrap = styled.div`
    width: 100%;
    height: auto;
    padding: 28px 44px;
`;

const ContentBodyWrap = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    padding: 32px 44px;
    gap: 32px;
`;

const ItemLabelWrap = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;

const ItemLabelTypo = styled.div`
    color: #02e191;
    opacity: 0.8;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */

    white-space: pre;
    width: 138px;
`;

const ItemValueTypo = styled.div`
    width: 100%;
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ButtonWrap = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LinkIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const USE_WALLET_CONNECT = CRAFT_CONFIGS.USE_WALLET_CONNECT;

const UpdateLogo = () => {
    const contractAddress = useExecuteStore((state) => state.contractAddress);
    // const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const fctBalance = useSelector((v: rootState) => v.wallet.fctBalance);
    const marketingInfo = useExecuteStore((state) => state.marketingInfo);
    const marketingLogoUrl = useExecuteStore((state) => state.marketingLogoUrl);
    const clearLogoUrl = useExecuteStore((state) => state.clearLogoUrl);
    const { setMarketingInfo } = useExecuteActions();

    const { enqueueSnackbar } = useSnackbar();

    const modal = useModalStore();

    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');

    const errorMessage = useMemo(() => {
        if (String(marketingLogoUrl).trim() === marketingInfo.logo.url) return 'Same logo as before';
        return '';
    }, [marketingInfo, marketingLogoUrl]);

    useEffect(() => {
        if (marketingLogoUrl) {
            const img = new Image();
            img.src = marketingLogoUrl;
            img.onload = () => {
                setValidTokenLogoUrl(marketingLogoUrl);
            };
            img.onerror = () => {
                setValidTokenLogoUrl('');
            };
        } else {
            setValidTokenLogoUrl('');
        }
    }, [marketingLogoUrl]);

    const onClickUpdateLogo = () => {
        if (modal.modals.length >= 1) return;

        if (Number(fctBalance) === 0) {
            enqueueSnackbar({ message: 'Insufficient funds. Please check your account balance.', variant: 'error' });
            return;
        }

        const feeAmount = CRAFT_CONFIGS.DEFAULT_FEE;

        const params = {
            modalType: 'EXECUTES' as ModalType,
            header: {
                title: 'Update Logo'
            },
            txParams: {
                type: 'cw20',
                contract: contractAddress,
                msg: {
                    url: marketingLogoUrl
                }
            },
            contentParams: {
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Marketing Logo',
                        value: marketingLogoUrl,
                        type: 'url',
                        initColor: '#E6E6E6',
                        resultColor: '#E6E6E6'
                    }
                ]
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => {
                return !USE_WALLET_CONNECT ? (
                    <TxModal
                        module="/cw20/updateLogo"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearLogoUrl();
                            setMarketingInfo(contractAddress);
                        }}
                    />
                ) : (
                    <QRModal2
                        module="/cw20/updateLogo"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearLogoUrl();
                            setMarketingInfo(contractAddress);
                        }}
                    />
                );
            }
        });
    };

    return (
        <Container>
            <ContentWrap>
                <ContentHeaderWrap>
                    <TokenLogo src={validTokenLogoUrl} size="90px" />
                </ContentHeaderWrap>
                <Divider $direction={'horizontal'} $color="var(--Gray-550, #444)" />
                <ContentBodyWrap>
                    <ItemLabelWrap>
                        <LinkIcon src={IC_LINK_FILL} alt={'Update Marketing Logo'} />
                        <ItemLabelTypo>Marketing Logo</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemValueTypo
                        data-tooltip-content={marketingLogoUrl?.length >= 30 ? marketingLogoUrl : ''}
                        data-tooltip-id={TOOLTIP_ID.COMMON}
                        data-tooltip-wrapper="span"
                        data-tooltip-place="bottom"
                    >
                        {marketingLogoUrl}
                    </ItemValueTypo>
                </ContentBodyWrap>
            </ContentWrap>
            <ButtonWrap>
                <GreenButton
                    disabled={typeof marketingLogoUrl !== 'string' || Boolean(errorMessage) || marketingInfo.logo.url === marketingLogoUrl}
                    onClick={onClickUpdateLogo}
                >
                    <div className="button-text">Update Logo</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default UpdateLogo;
