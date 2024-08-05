import styled from 'styled-components';

import useInstantiateStore from '../instantiateStore';
import { IC_PREVIEW, IC_TAG, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import ContentItem from './contentItem';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { useMemo } from 'react';
import Submit from './submit';
import { useModalStore } from '@/hooks/useModal';
import { CRAFT_CONFIGS } from '@/config';
import InstantitateModal from '@/components/organisms/modal/cw721/instantiateModal';
import { isValidAddress } from '@/utils/common';

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
    // var(--Gray-900, var(--Primary-Base-White, #fff));
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

const Preview = () => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);
    const address = useSelector((state: rootState) => state.wallet.address);
    const contractMode = useSelector((state: rootState) => state.global.contractMode);
    const network = useSelector((state: rootState) => state.global.network);

    const modal = useModalStore();

    const nftName = useInstantiateStore((v) => v.nftName);
    const nftSymbol = useInstantiateStore((v) => v.nftSymbol);
    const admin = useInstantiateStore((v) => v.admin);
    const minter = useInstantiateStore((v) => v.minter);
    const label = useInstantiateStore((v) => v.label);

    const disableButton = useMemo(() => {
        if (isInit) {
            if (nftName.length < 3) return true;
            if (nftSymbol.length < 3) return true;
            if (label === '') return true;
            if (label.length >= 128) return true;

            if (contractMode === 'ADVANCED') {
                if (admin === '' || !isValidAddress(admin)) return true;
                if (minter === '' || !isValidAddress(minter)) return true;
            }
        }

        return false;
    }, [isInit, nftName, nftSymbol, label, contractMode, admin, minter]);

    const craftConfig = useMemo(() => {
        return network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
    }, [network]);

    const codeId = useMemo(() => {
        const craftConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;

        return contractMode === 'BASIC' ? craftConfig.CW721.BASIC_CODE_ID : craftConfig.CW721.ADVANCED_CODE_ID;
    }, [network, contractMode]);

    const onClickSubmit = () => {
        if (isInit) {
            const messageData = {
                name: nftName,
                minter: contractMode === 'BASIC' ? address : minter,
                symbol: nftSymbol
            };

            const params = {
                admin: contractMode === 'BASIC' ? address : admin,
                codeId: codeId,
                label: label,
                msg: JSON.stringify(messageData),
                type: craftConfig.CW721.TYPE
            };

            const datas: {
                header: { title: string };
                amount: { fee: string; fct: string };
                list: { label: string; value: string }[];
            } = {
                header: {
                    title: 'CW721 Instantiate'
                },
                amount: {
                    fee: craftConfig.DEFAULT_FEE.toString(),
                    fct: ''
                },
                list: [
                    { label: 'Contract Name', value: nftName },
                    { label: 'Contract Symbol', value: nftSymbol }
                ]
            };

            console.log(params);

            modal.openModal({
                modalType: 'custom',
                _component: ({ id }) => <InstantitateModal module="/cosmwasm/instantiateContract" id={id} datas={datas} params={params} />
            });
        } else {
            modal.openModal({ modalType: 'connectWallet' });
        }
    };

    return (
        <ContentWrapper>
            <TitleWrapper>
                <TitleIconWrapper>
                    <TitleIcon src={IC_PREVIEW} alt={'CW721 Instantiate Title Icon'} />
                </TitleIconWrapper>
                <TextGroupWrapper>
                    <TitleText>PREVIEW</TitleText>
                    <TitleDescription>View all token informations for CW721 Contract instantiation</TitleDescription>
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
                    />
                    <ContentItem
                        imagePath={IC_WALLET}
                        name={'Minter Address'}
                        value={contractMode === 'BASIC' ? address : minter}
                        defaultValue={'Wallet Address'}
                    />
                    <ContentItem imagePath={IC_TAG} name={'Label'} value={label} isCover defaultValue={'Label'} />
                </BodyContractInfoWrap>
            </BodyCard>
            <Submit onClickInstantiate={onClickSubmit} disableButton={disableButton} />
        </ContentWrapper>
    );
};

export default Preview;
