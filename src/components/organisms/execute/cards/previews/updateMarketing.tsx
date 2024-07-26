import { useMemo } from 'react';
import styled from 'styled-components';
import { Fragment } from 'react/jsx-runtime';

import { IC_LINK_FILL, IC_TALK, IC_WALLET_FILL } from '@/components/atoms/icons/pngIcons';
import { useModalStore } from '@/hooks/useModal';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { shortenAddress } from '@/utils/common';
import { QRCodeModal } from '@/components/organisms/modal';
import useExecuteStore from '../../hooks/useExecuteStore';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
`;

const ContentWrap = styled.div`
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 32px 44px;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
`;

const ItemWrap = styled.div`
    display: flex;
    gap: 32px;
`;

const ItemLabelWrap = styled.div`
    display: flex;
    gap: 16px;
`;

const MarketingIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const ItemLabelTypo = styled.div`
    width: 138px;
    color: #02e191;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const ItemValueForDescTypo = styled.div`
    width: 338px;
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    overflow-wrap: break-word;
`;

const ItemValueTypo = styled.div`
    width: 338px;
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const ItemDefaultTypo = styled.div`
    color: var(--Gray-500, #383838);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const ButtonWrap = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ExecuteButton = styled.button<{ $isEnable: boolean }>`
    width: 220px !important;
    height: 48px;
    border-radius: 8px;
    background: ${(props) => (props.$isEnable ? '#02E191' : '#707070')};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${(props) => (props.$isEnable ? 'pointer' : 'inherit')};
    pointer-events: ${(props) => (props.$isEnable ? 'auto' : 'none')};
    border: none;
    outline: none;
    transition:
        background 0.1s,
        transform 0.1s;

    &:active {
        transform: scale(0.99);
    }
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

const UpdateMarketingPreview = () => {
    const { network } = useSelector((state: rootState) => state.global);

    const { contractAddress, fctBalance, contractInfo, marketingInfo, marketingDescription, marketingAddress, marketingProject } = useExecuteStore.getState();

    const modal = useModalStore();

    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

    const isBasic = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return contractInfo.contract_info.code_id === config.CW20.BASIC_CODE_ID;
    }, [contractInfo, network]);

    const onClickUpdateMarketing = () => {
        const feeAmount = craftConfig.DEFAULT_FEE;

        let contentList = [];

        if (contractInfo.contract_info.code_id === craftConfig.CW20.BASIC_CODE_ID) {
            contentList.push({
                label: "Marketing Desc",
                value: shortenAddress(marketingDescription, 15, 15),
                type: "wallet"
            });
        } else {
            contentList = [
                {
                    label: "Marketing Desc",
                    value: marketingDescription.length >= 35 ? shortenAddress(marketingDescription, 15, 15) : marketingDescription,
                    type: "wallet"
                },
                {
                    label: "Marketing Address",
                    value: marketingAddress.length >= 35 ? shortenAddress(marketingAddress, 15, 15) : marketingAddress,
                    type: "wallet"
                },
                {
                    label: "Marketing Project",
                    value: marketingProject.length >= 35 ? shortenAddress(marketingProject, 15, 15) : marketingProject,
                    type: "wallet"
                }
            ]
        }
        const params = {
            header: {
                title: "Update Marketing",
            },
            content: {
                balance: fctBalance,
                feeAmount: feeAmount.toString(),
                list: contentList
            },
            contract: contractAddress,
            msg: {
                project: marketingProject,
                marketing: marketingAddress,
                description: marketingDescription
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => <QRCodeModal module="/cw20/updateMarketing" id={id} params={params} onClickConfirm={() => { console.log(111); }} />
        });
    };

    const isEnableButton = useMemo(() => {
        if (
            marketingInfo.description !== marketingDescription ||
            marketingInfo.marketing !== marketingAddress ||
            marketingInfo.project !== marketingProject
        )
            return true;

        return false;
    }, [marketingInfo, marketingDescription, marketingAddress, marketingProject]);

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLabelWrap>
                        <MarketingIcon src={IC_TALK}></MarketingIcon>
                        <ItemLabelTypo>Marketing Desc</ItemLabelTypo>
                    </ItemLabelWrap>
                    {marketingDescription !== '' && <ItemValueForDescTypo>{marketingDescription}</ItemValueForDescTypo>}
                    {marketingDescription === '' && <ItemDefaultTypo>Description</ItemDefaultTypo>}
                </ItemWrap>
                {!isBasic && (
                    <Fragment>
                        <ItemWrap>
                            <ItemLabelWrap>
                                <MarketingIcon src={IC_WALLET_FILL}></MarketingIcon>
                                <ItemLabelTypo>Marketing Address</ItemLabelTypo>
                            </ItemLabelWrap>
                            {marketingAddress !== '' && <ItemValueTypo>{marketingAddress}</ItemValueTypo>}
                            {marketingAddress === '' && <ItemDefaultTypo>Wallet Address</ItemDefaultTypo>}
                        </ItemWrap>
                        <ItemWrap>
                            <ItemLabelWrap>
                                <MarketingIcon src={IC_LINK_FILL}></MarketingIcon>
                                <ItemLabelTypo>Marketing Project</ItemLabelTypo>
                            </ItemLabelWrap>
                            {marketingProject !== '' && <ItemValueTypo>{marketingProject}</ItemValueTypo>}
                            {marketingProject === '' && <ItemDefaultTypo>Project Url</ItemDefaultTypo>}
                        </ItemWrap>
                    </Fragment>
                )}
            </ContentWrap>
            <ButtonWrap>
                <ExecuteButton $isEnable={isEnableButton} onClick={onClickUpdateMarketing}>
                    <ExecuteButtonTypo>Update Marketing</ExecuteButtonTypo>
                </ExecuteButton>
            </ButtonWrap>
        </Container>
    );
};

export default UpdateMarketingPreview;
