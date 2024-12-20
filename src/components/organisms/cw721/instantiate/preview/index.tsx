import styled from 'styled-components';

// import useInstantiateStore from '../instantiateStore';
import { IC_PREVIEW, IC_TAG, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import ContentItem from './contentItem';

import { useMemo } from 'react';
import Submit from './submit';
import useModalStore from '@/store/modalStore';
import { CRAFT_CONFIGS } from '@/config';
import { useScrollContext } from '@/context/scrollContext';
import { isValidAddress } from '@/utils/address';
import QRModal2, { ModalType } from '@/components/organisms/modal/qrModal2';
import TxModal from '@/components/organisms/modal/txModal';
import { useSnackbar } from 'notistack';
import { useCW721Instantiate } from '@/context/cw721InstantiateContext';
import useGlobalStore from '@/store/globalStore';
import useWalletStore from '@/store/walletStore';

const ContentWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: fit-content;
    padding: 48px 48px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    border-radius: 24px;
    background: var(--200, #1e1e1e);
    position: sticky;
    transition: top 0.2s ease;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

const TitleIconWrapper = styled.div`
    width: 52px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.933px;
    background: var(--Gray-450, #313131);
`;

const TitleIcon = styled.img`
    width: 32px;
    height: 32px;
`;

const TextGroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const TitleText = styled.div`
    color: var(--Green-300, #63f6a5);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

const TitleDescription = styled.div`
    color: var(--Gray-650, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

const BodyCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
`;

const BodyNftInfoWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: flex-start;
    padding: 28px 44px;
    border-radius: 24px 24px 0px 0px;
    border-top: 1px solid var(--Gray-550, #444);
    border-right: 1px solid var(--Gray-550, #444);
    border-left: 1px solid var(--Gray-550, #444);
`;

const BodyNftNameTypo = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-550, #444)' : 'var(--Gray-900, var(--Primary-Base-White, #FFF))')};
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

const BodyNftSymbolTypo = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-700, #999)')};
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    white-space: pre;
`;

const BodyContractInfoWrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 32px 44px;
    gap: 20px;
    border-radius: 0px 0px 24px 24px;
    border: 1px solid var(--Gray-550, #444);
`;

const USE_WALLET_CONNECT = CRAFT_CONFIGS.USE_WALLET_CONNECT;

const Preview = () => {
    const { scroll } = useScrollContext();
    const { isInit, address, fctBalance } = useWalletStore();
    // const isInit = useSelector((state: rootState) => state.wallet.isInit);
    // const address = useSelector((state: rootState) => state.wallet.address);
    // const fctBalance = useSelector((state: rootState) => state.wallet.fctBalance);
    const contractMode = useGlobalStore((v) => v.contractMode);
    // useSelector((state: rootState) => state.global.contractMode);

    const { enqueueSnackbar } = useSnackbar();

    const modal = useModalStore();

    const context = useCW721Instantiate();

    const nftName = context.nftName;
    const nftSymbol = context.nftSymbol;
    const admin = context.admin;
    const minter = context.minter;
    const label = context.label;
    const clearForm = context.clearForm;

    const disableButton = useMemo(() => {
        if (isInit) {
            if (nftName.length < 3) return true;
            if (nftSymbol.length < 3) return true;
            if (label === '') return true;
            if (label.length > 128) return true;

            if (contractMode === 'ADVANCED') {
                if (admin === '' || !isValidAddress(admin)) return true;
                if (minter === '' || !isValidAddress(minter)) return true;
            }
        }

        return false;
    }, [isInit, nftName, nftSymbol, label, contractMode, admin, minter]);

    const codeId = useMemo(() => {
        return contractMode === 'BASIC' ? CRAFT_CONFIGS.CW721.BASIC_CODE_ID : CRAFT_CONFIGS.CW721.ADVANCED_CODE_ID;
    }, [contractMode]);

    const onClickSubmit = () => {
        if (isInit) {
            if (Number(fctBalance) === 0) {
                enqueueSnackbar({ message: 'Insufficient funds. Please check your account balance.', variant: 'error' });
                return;
            }

            const messageData = {
                name: nftName,
                minter: contractMode === 'BASIC' ? address : minter,
                symbol: nftSymbol
            };

            const params = {
                modalType: 'INSTANTIATE' as ModalType,
                header: {
                    title: 'CW721 Instantiation'
                },
                txParams: {
                    admin: contractMode === 'BASIC' ? address : admin,
                    codeId: codeId,
                    label: label,
                    type: 'cw721',
                    msg: messageData,
                    contract: ''
                },
                contentParams: {
                    list: [
                        {
                            label: 'Contract Name',
                            value: nftName,
                            type: 'default',
                            initColor: '#E6E6E6',
                            resultColor: '#E6E6E6'
                        },
                        {
                            label: 'Contract Symbol',
                            value: nftSymbol,
                            type: 'default',
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
                            module="/cw721/instantiateContract"
                            id={id}
                            params={params}
                            onClickConfirm={() => {
                                clearForm();
                            }}
                        />
                    ) : (
                        <QRModal2
                            module="/cw721/instantiateContract"
                            id={id}
                            params={params}
                            onClickConfirm={() => {
                                clearForm();
                            }}
                        />
                    );
                }
            });
        } else {
            modal.openModal({ modalType: 'connectWallet' });
        }
    };

    return (
        <ContentWrapper style={{ top: `${scroll.y}px` }}>
            <TitleWrapper>
                <TitleIconWrapper>
                    <TitleIcon src={IC_PREVIEW} alt={'CW721 Instantiate Title Icon'} />
                </TitleIconWrapper>
                <TextGroupWrapper>
                    <TitleText>PREVIEW</TitleText>
                    <TitleDescription>View all token information for CW721 contract instantiation.</TitleDescription>
                </TextGroupWrapper>
            </TitleWrapper>
            <BodyCard>
                <BodyNftInfoWrap>
                    <BodyNftNameTypo $disabled={nftName === ''}>{nftName || 'Name'}</BodyNftNameTypo>
                    <BodyNftSymbolTypo $disabled={nftSymbol === ''}>{nftSymbol || 'Symbol'}</BodyNftSymbolTypo>
                </BodyNftInfoWrap>
                <BodyContractInfoWrap>
                    <ContentItem
                        imagePath={IC_WALLET}
                        name={'Admin Address'}
                        value={contractMode === 'BASIC' ? address : admin}
                        defaultValue={'Wallet Address'}
                        tooltip={address.length >= 30 ? address : ''}
                    />
                    <ContentItem
                        imagePath={IC_WALLET}
                        name={'Minter Address'}
                        value={contractMode === 'BASIC' ? address : minter}
                        defaultValue={'Wallet Address'}
                        tooltip={address.length >= 30 ? address : ''}
                    />
                    <ContentItem
                        imagePath={IC_TAG}
                        name={'Label'}
                        value={label}
                        isCover
                        defaultValue={'Label'}
                        tooltip={label.length >= 30 ? label : ''}
                    />
                </BodyContractInfoWrap>
            </BodyCard>
            <Submit onClickInstantiate={onClickSubmit} disableButton={disableButton} />
        </ContentWrapper>
    );
};

export default Preview;
