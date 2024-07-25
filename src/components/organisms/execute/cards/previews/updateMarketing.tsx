import { IC_LINK_FILL, IC_TALK, IC_WALLET_FILL } from '@/components/atoms/icons/pngIcons';
import styled from 'styled-components';
import { useContractContext } from '../../context/contractContext';
import { Fragment } from 'react/jsx-runtime';
import { BASIC_LABEL } from '@/constants/cw20Types';
import { useEffect, useMemo } from 'react';
import React from 'react';
import { ModalActions } from '@/redux/actions';
import { useModalStore } from '@/hooks/useModal';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { shortenAddress } from '@/utils/common';
import { QRCodeModal } from '@/components/organisms/modal';

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

interface IProps {
    fctAmount: string;
    codeId: string;
    label: string;
    marketingDescription: string;
    marketingAddress: string;
    marketingProject: string;
}

const UpdateMarketingPreview = ({ fctAmount, codeId, label, marketingDescription, marketingAddress, marketingProject }: IProps) => {
    const { network } = useSelector((state: rootState) => state.global);

    const { _contract, _marketingDescription, _marketingAddress, _marketingProject, _setIsFetched } = useContractContext();
    
    const modal = useModalStore();

    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

    const onClickUpdateMarketing = () => {
        const feeAmount = craftConfig.DEFAULT_FEE;

        let contentList = [];

        if (codeId === craftConfig.CW20.BASIC_CODE_ID) {
            contentList.push({
                label: "Marketing Desc",
                value: shortenAddress(_marketingDescription, 15, 15),
                type: "wallet"
            });
        } else {
            contentList = [
                {
                    label: "Marketing Desc",
                    value: _marketingDescription.length >= 35 ? shortenAddress(_marketingDescription, 15, 15) : _marketingDescription,
                    type: "wallet"
                },
                {
                    label: "Marketing Address",
                    value: _marketingAddress.length >= 35 ? shortenAddress(_marketingAddress, 15, 15) : _marketingAddress,
                    type: "wallet"
                },
                {
                    label: "Marketing Project",
                    value: _marketingProject.length >= 35 ? shortenAddress(_marketingProject, 15, 15) : _marketingProject,
                    type: "wallet"
                }
            ]
        }
        const params = {
            header: {
                title: "Update Logo",
            },
            content: {
                balance: fctAmount,
                feeAmount: feeAmount.toString(),
                list: contentList
            },
            contract: _contract,
            msg: {
                project: _marketingProject,
                marketing: _marketingAddress,
                description: _marketingDescription
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => <QRCodeModal module="/cw20/updateMarketing" id={id} params={params} />
        });

        // ModalActions.handleData({
        //     module: '/cw20/updateMarketing',
        //     params: {
        //         contract: _contract,
        //         msg: {
        //             project: _marketingProject,
        //             marketing: _marketingAddress,
        //             description: _marketingDescription
        //         }
        //     }
        // });
        // ModalActions.handleQrConfirm(true);
        // ModalActions.handleSetCallback({
        //     callback: () => {
        //         _setIsFetched(true);
        //     }
        // });
    };

    const isEnableButton = useMemo(() => {
        if (
            _marketingDescription !== marketingDescription ||
            _marketingAddress !== marketingAddress ||
            _marketingProject !== marketingProject
        )
            return true;

        return false;
    }, [_marketingDescription, _marketingAddress, _marketingProject]);

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLabelWrap>
                        <MarketingIcon src={IC_TALK}></MarketingIcon>
                        <ItemLabelTypo>Marketing Desc</ItemLabelTypo>
                    </ItemLabelWrap>
                    {_marketingDescription !== '' && <ItemValueForDescTypo>{_marketingDescription}</ItemValueForDescTypo>}
                    {_marketingDescription === '' && <ItemDefaultTypo>Description</ItemDefaultTypo>}
                </ItemWrap>
                {label !== BASIC_LABEL && (
                    <Fragment>
                        <ItemWrap>
                            <ItemLabelWrap>
                                <MarketingIcon src={IC_WALLET_FILL}></MarketingIcon>
                                <ItemLabelTypo>Marketing Address</ItemLabelTypo>
                            </ItemLabelWrap>
                            {_marketingAddress !== '' && <ItemValueTypo>{_marketingAddress}</ItemValueTypo>}
                            {_marketingAddress === '' && <ItemDefaultTypo>Wallet Address</ItemDefaultTypo>}
                        </ItemWrap>
                        <ItemWrap>
                            <ItemLabelWrap>
                                <MarketingIcon src={IC_LINK_FILL}></MarketingIcon>
                                <ItemLabelTypo>Marketing Project</ItemLabelTypo>
                            </ItemLabelWrap>
                            {_marketingProject !== '' && <ItemValueTypo>{_marketingProject}</ItemValueTypo>}
                            {_marketingProject === '' && <ItemDefaultTypo>Project Url</ItemDefaultTypo>}
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
