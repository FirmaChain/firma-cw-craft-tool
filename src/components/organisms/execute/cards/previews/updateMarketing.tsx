import { useMemo } from 'react';
import styled from 'styled-components';
import { Fragment } from 'react/jsx-runtime';

import { IC_LINK_FILL, IC_TALK, IC_WALLET_FILL } from '@/components/atoms/icons/pngIcons';
import { useModalStore } from '@/hooks/useModal';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { QRCodeModal } from '@/components/organisms/modal';
import useExecuteStore from '../../hooks/useExecuteStore';
import GreenButton from '@/components/atoms/buttons/greenButton';
import { isValidAddress } from '@/utils/common';
import useExecuteActions from '../../action';

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
    align-items: flex-start;
`;

const ItemLabelWrap = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
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

    opacity: 0.8;
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

const UpdateMarketingPreview = () => {
    const network = useSelector((state: rootState) => state.global.network);

    const contractAddress = useExecuteStore((state) => state.contractAddress);
    const fctBalance = useExecuteStore((state) => state.fctBalance);
    const contractInfo = useExecuteStore((state) => state.contractInfo);
    const marketingInfo = useExecuteStore((state) => state.marketingInfo);
    const marketingDescription = useExecuteStore((state) => state.marketingDescription);
    const marketingAddress = useExecuteStore((state) => state.marketingAddress);
    const marketingProject = useExecuteStore((state) => state.marketingProject);
    const clearMarketing = useExecuteStore((state) => state.clearMarketing);
    const { setMarketingInfo } = useExecuteActions();

    const modal = useModalStore();

    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

    const isBasic = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return contractInfo.contract_info.code_id === config.CW20.BASIC_CODE_ID;
    }, [contractInfo, network]);

    const finalDesc = marketingDescription === null ? marketingInfo?.description : marketingDescription;
    const finalAddress = marketingAddress === null ? marketingInfo?.marketing : marketingAddress;
    const finalProejct = marketingProject === null ? marketingInfo?.project : marketingProject;

    const onClickUpdateMarketing = () => {
        const feeAmount = craftConfig.DEFAULT_FEE;

        let contentList = [];

        if (contractInfo.contract_info.code_id === craftConfig.CW20.BASIC_CODE_ID) {
            contentList.push({
                label: 'Marketing Desc',
                value: finalDesc,
                type: 'url'
            });
        } else {
            contentList = [
                {
                    label: 'Marketing Desc',
                    value: finalDesc,
                    type: 'url'
                },
                {
                    label: 'Marketing Address',
                    value: finalAddress,
                    type: 'url'
                },
                {
                    label: 'Marketing Project',
                    value: finalProejct,
                    type: 'url'
                }
            ];
        }

        const params = {
            header: {
                title: 'Update Marketing'
            },
            content: {
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: contentList
            },
            contract: contractAddress,
            msg: {
                project: isBasic ? '' : finalProejct,
                marketing: finalAddress,
                description: finalDesc
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <QRCodeModal
                    module="/cw20/updateMarketing"
                    id={id}
                    params={params}
                    onClickConfirm={() => {
                        clearMarketing();
                        setMarketingInfo(contractAddress);
                    }}
                />
            )
        });
    };

    const isEnableButton = useMemo(() => {
        if (!isValidAddress(marketingAddress)) return false;
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
                    {marketingDescription !== '' ? (
                        <ItemValueForDescTypo>{finalDesc}</ItemValueForDescTypo>
                    ) : (
                        marketingDescription === '' && <ItemDefaultTypo>Description</ItemDefaultTypo>
                    )}
                </ItemWrap>
                {!isBasic && (
                    <Fragment>
                        <ItemWrap>
                            <ItemLabelWrap>
                                <MarketingIcon src={IC_WALLET_FILL}></MarketingIcon>
                                <ItemLabelTypo>Marketing Address</ItemLabelTypo>
                            </ItemLabelWrap>
                            {marketingAddress !== '' ? (
                                <ItemValueTypo>{finalAddress}</ItemValueTypo>
                            ) : (
                                <ItemDefaultTypo>Wallet Address</ItemDefaultTypo>
                            )}
                        </ItemWrap>
                        <ItemWrap>
                            <ItemLabelWrap>
                                <MarketingIcon src={IC_LINK_FILL}></MarketingIcon>
                                <ItemLabelTypo>Marketing Project</ItemLabelTypo>
                            </ItemLabelWrap>
                            {marketingProject !== '' ? (
                                <ItemValueTypo>{finalProejct}</ItemValueTypo>
                            ) : (
                                <ItemDefaultTypo>Project Url</ItemDefaultTypo>
                            )}
                        </ItemWrap>
                    </Fragment>
                )}
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickUpdateMarketing}>
                    <div className="button-text">Update Marketing</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default UpdateMarketingPreview;
