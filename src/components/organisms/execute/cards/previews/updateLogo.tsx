import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { IC_LINK_FILL } from '@/components/atoms/icons/pngIcons';
import IconButton from '@/components/atoms/buttons/iconButton';
import useExecuteStore from '../../hooks/useExecuteStore';
import { TOOLTIP_ID } from '@/constants/tooltip';
import Icons from '@/components/atoms/icons';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { useModalStore } from '@/hooks/useModal';
import { QRCodeModal } from '@/components/organisms/modal';
import Divider from '@/components/atoms/divider';
import GreenButton from '@/components/atoms/buttons/greenButton';
import useExecuteActions from '../../action';
import TokenLogo from '@/components/atoms/icons/TokenLogo';

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

const ExecuteButton = styled(IconButton)<{ disabled?: boolean }>`
    width: 220px !important;
    height: 48px;
    border-radius: 8px;
    background: ${({ disabled }) => (!disabled ? '#02E191' : '#707070')};
    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    outline: none;
    transition:
        background 0.1s,
        transform 0.1s;
`;

const ExecuteButtonTypo = styled.div`
    color: var(--Gray-100, #121212);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 125% */
`;

const ImageWrap = styled.div`
    width: 72px;
    height: 72px;
    flex-shrink: 0;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const LinkIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const UpdateLogo = () => {
    const network = useSelector((state: rootState) => state.global.network);

    const contractAddress = useExecuteStore((state) => state.contractAddress);
    const fctBalance = useExecuteStore((state) => state.fctBalance);
    const marketingInfo = useExecuteStore((state) => state.marketingInfo);
    const marketingLogoUrl = useExecuteStore((state) => state.marketingLogoUrl);
    const clearLogoUrl = useExecuteStore((state) => state.clearLogoUrl);
    const { setMarketingInfo } = useExecuteActions();

    const modal = useModalStore();

    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');

    const errorMessage = useMemo(() => {
        if (marketingLogoUrl === '') return 'Please input url';
        if (marketingLogoUrl === marketingInfo.logo.url) return 'Same logo as before';
        return '';
    }, [marketingInfo, marketingLogoUrl]);

    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

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
        const feeAmount = craftConfig.DEFAULT_FEE;

        const params = {
            header: {
                title: 'Update Logo'
            },
            content: {
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Marketing Logo',
                        value: marketingLogoUrl,
                        type: 'url'
                    }
                ]
            },
            contract: contractAddress,
            msg: {
                url: marketingLogoUrl
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <QRCodeModal
                    module="/cw20/updateLogo"
                    id={id}
                    params={params}
                    onClickConfirm={() => {
                        clearLogoUrl();
                        setMarketingInfo(contractAddress);
                    }}
                />
            )
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
                    <ItemValueTypo>{marketingLogoUrl}</ItemValueTypo>
                </ContentBodyWrap>
            </ContentWrap>
            <ButtonWrap>
                <GreenButton
                    disabled={!marketingLogoUrl || Boolean(errorMessage) || marketingInfo.logo.url === marketingLogoUrl}
                    onClick={onClickUpdateLogo}
                >
                    <div className="button-text">Update Logo</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default UpdateLogo;
