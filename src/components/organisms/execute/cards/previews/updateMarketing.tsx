import { useMemo } from 'react';
import styled from 'styled-components';
import { Fragment } from 'react/jsx-runtime';

import { IC_LINK_FILL, IC_TALK, IC_WALLET_FILL } from '@/components/atoms/icons/pngIcons';
import useModalStore from '@/store/modalStore';

import { CRAFT_CONFIGS } from '@/config';
// import useExecuteStore from '../../hooks/useExecuteStore';
import GreenButton from '@/components/atoms/buttons/greenButton';
import useExecuteActions from '../../action';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { isValidAddress } from '@/utils/address';
import QRModal2, { ModalType } from '@/components/organisms/modal/qrModal2';
import TxModal from '@/components/organisms/modal/txModal';
import { useSnackbar } from 'notistack';
import { useCW20Execute } from '@/context/cw20ExecuteContext';
import useWalletStore from '@/store/walletStore';

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
    height: auto;
    display: flex;
    gap: 32px;
    align-items: flex-start;
`;

const ItemLabelWrap = styled.div`
    height: auto;
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
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const ItemValueTypo = styled.div`
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

const USE_WALLET_CONNECT = CRAFT_CONFIGS.USE_WALLET_CONNECT;

const UpdateMarketingPreview = () => {
    const { address, fctBalance } = useWalletStore();
    // const address = useSelector((state: rootState) => state.wallet.address);
    // const fctBalance = useSelector((v: rootState) => v.wallet.fctBalance);

    const context = useCW20Execute();
    const admin = context.contractInfo?.contract_info?.admin;
    const contractAddress = context.contractAddress;
    // const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const contractInfo = context.contractInfo;
    const marketingInfo = context.marketingInfo;
    const marketingDescription = context.marketingDescription;
    const marketingAddress = context.marketingAddress;
    const marketingProject = context.marketingProject;
    const clearMarketing = context.clearMarketing;
    const { setMarketingInfo } = useExecuteActions();

    const { enqueueSnackbar } = useSnackbar();

    const modal = useModalStore();

    const isBasic = useMemo(() => {
        return contractInfo.contract_info.code_id === CRAFT_CONFIGS.CW20.BASIC_CODE_ID;
    }, [contractInfo]);

    const finalDesc = (marketingDescription === null ? marketingInfo?.description : marketingDescription) || '';
    const finalAddress = (marketingAddress === null ? marketingInfo?.marketing : marketingAddress) || '';
    const finalProejct = (marketingProject === null ? marketingInfo?.project : marketingProject) || '';

    const hideGotoDetail = address !== admin;

    const onClickUpdateMarketing = () => {
        if (modal.modals.length >= 1) return;

        if (Number(fctBalance) === 0) {
            enqueueSnackbar({ message: 'Insufficient funds. Please check your account balance.', variant: 'error' });
            return;
        }

        const feeAmount = CRAFT_CONFIGS.DEFAULT_FEE;

        let contentList = [];

        if (contractInfo.contract_info.code_id === CRAFT_CONFIGS.CW20.BASIC_CODE_ID) {
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
                    type: 'url',
                    initColor: '#E6E6E6',
                    resultColor: '#E6E6E6'
                },
                {
                    label: 'Marketing Address',
                    value: finalAddress === '' ? address : finalAddress,
                    type: 'wallet',
                    initColor: '#E6E6E6',
                    resultColor: '#E6E6E6'
                },
                {
                    label: 'Marketing Project',
                    value: finalProejct,
                    type: 'url',
                    initColor: '#E6E6E6',
                    resultColor: '#E6E6E6'
                }
            ];
        }

        const msg = {
            project: isBasic ? '' : finalProejct,
            marketing: finalAddress === '' ? address : finalAddress,
            description: finalDesc
        };

        const params = {
            modalType: 'EXECUTES' as ModalType,
            header: {
                title: 'Update Marketing'
            },
            txParams: {
                contract: contractAddress,
                type: 'cw20',
                msg,
                totalLength: JSON.stringify(msg).length
            },
            contentParams: {
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: contentList
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => {
                return !USE_WALLET_CONNECT ? (
                    <TxModal
                        module="/cw20/updateMarketing"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearMarketing();
                            setMarketingInfo(contractAddress);
                        }}
                        hideGotoDetail={hideGotoDetail}
                    />
                ) : (
                    <QRModal2
                        module="/cw20/updateMarketing"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearMarketing();
                            setMarketingInfo(contractAddress);
                        }}
                        hideGotoDetail={hideGotoDetail}
                    />
                );
            }
        });
    };

    const isEnableButton = useMemo(() => {
        if (marketingAddress === '' && marketingInfo.marketing !== address) return true;
        if (marketingAddress !== '' && !isValidAddress(marketingAddress)) return false;
        if (
            (marketingAddress !== '' && marketingInfo.marketing !== marketingAddress) ||
            marketingInfo.description !== marketingDescription ||
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
                    {finalDesc ? (
                        <ItemValueForDescTypo
                            className="clamp-multi-line"
                            data-tooltip-content={finalDesc?.length >= 35 ? finalDesc : ''}
                            data-tooltip-id={TOOLTIP_ID.COMMON}
                            data-tooltip-wrapper="span"
                            data-tooltip-place="bottom"
                        >
                            {finalDesc}
                        </ItemValueForDescTypo>
                    ) : (
                        <ItemDefaultTypo>Description</ItemDefaultTypo>
                    )}
                </ItemWrap>
                {!isBasic && (
                    <Fragment>
                        <ItemWrap>
                            <ItemLabelWrap>
                                <MarketingIcon src={IC_WALLET_FILL}></MarketingIcon>
                                <ItemLabelTypo>Marketing Address</ItemLabelTypo>
                            </ItemLabelWrap>
                            {finalAddress ? (
                                <ItemValueTypo
                                    className="clamp-single-line"
                                    data-tooltip-content={finalAddress?.length >= 35 ? finalAddress : ''}
                                    data-tooltip-id={TOOLTIP_ID.COMMON}
                                    data-tooltip-wrapper="span"
                                    data-tooltip-place="bottom"
                                >
                                    {finalAddress}
                                </ItemValueTypo>
                            ) : (
                                <ItemDefaultTypo>Wallet Address</ItemDefaultTypo>
                            )}
                        </ItemWrap>
                        <ItemWrap>
                            <ItemLabelWrap>
                                <MarketingIcon src={IC_LINK_FILL}></MarketingIcon>
                                <ItemLabelTypo>Marketing Project</ItemLabelTypo>
                            </ItemLabelWrap>
                            {finalProejct ? (
                                <ItemValueTypo
                                    className="clamp-single-line"
                                    data-tooltip-content={finalProejct?.length >= 35 ? finalProejct : ''}
                                    data-tooltip-id={TOOLTIP_ID.COMMON}
                                    data-tooltip-wrapper="span"
                                    data-tooltip-place="bottom"
                                >
                                    {finalProejct}
                                </ItemValueTypo>
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
