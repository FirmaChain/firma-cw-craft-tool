import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_COIN_STACK, IC_COIN_STACK2, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import Divider from '@/components/atoms/divider';
import IconTooltip from '@/components/atoms/tooltip';
import GreenButton from '@/components/atoms/buttons/greenButton';
// import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { isValidAddress } from '@/utils/address';
import useModalStore from '@/store/modalStore';
import { formatWithCommas, subtractStringAmount } from '@/utils/balance';

import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';
import { CRAFT_CONFIGS } from '@/config';
import QRModal2, { ModalType } from '@/components/organisms/modal/qrModal2';
import TxModal from '@/components/organisms/modal/txModal';
import { shortenAddress } from '@/utils/common';
import { TOOLTIP_ID } from '@/constants/tooltip';
import TextEllipsis from '@/components/atoms/ellipsis';
import { useSnackbar } from 'notistack';
import { useCW721Execute } from '@/context/cw721ExecuteContext';
import useWalletStore from '@/store/walletStore';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
    overflow: hidden;
`;

const ContentScrollWrap = styled.div`
    display: flex;
    width: 100%;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
    overflow: hidden;
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 32px 44px;

    gap: 24px;

    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
    overflow: hidden;
`;

const ItemBox = styled.div<{ $isOpen: boolean }>`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 24px;
    height: fit-content;
    transition: all 0.2s all;

    ${({ $isOpen }) =>
        $isOpen
            ? `
        gap: 24px;
    `
            : `
        gap: 0px;
    `}
`;

const ItemWrap = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ItemLabelWrap = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;

const ItemLabelIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const ItemLabelTypo = styled.div`
    color: #02e191;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */

    opacity: 0.8;
`;

const ItemAmountWrap = styled.div`
    display: flex;
    gap: 8px;
`;

const ItemAmountTypo = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const ItemAmountSymbolTypo = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const WalletListWrap = styled.div<{ $isOpen: boolean }>`
    overflow-y: scroll;
    display: flex;
    flex-direction: column;

    transition: all 0.15s ease;
    width: 100%;

    ${({ $isOpen }) =>
        $isOpen
            ? `
    max-height: 100%;
    padding: 24px 26px 24px 32px;
    gap: 20px;
    opacity: 1;
`
            : `
    max-height: 0px;
    padding: 0px 32px;
    gap: 0px;
    opacity: 0;
`}
`;

const WalletItemWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    gap: 16px;
`;

const WalletLeftItemWrap = styled.div`
    width: 100%;
    display: flex;
    gap: 16px;
`;

const WalletItemIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const WalletItemAddressTypo = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-650, #707070)')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const WalletItemTokenAmount = styled.div<{ $disabled?: boolean; $isError: boolean }>`
    color: ${({ $disabled, $isError }) => ($disabled ? '#383838' : $isError ? '#E55250' : '#807E7E')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */

    white-space: pre;
`;

const CoinStack2Icon = styled.img`
    width: 24px;
    height: 24px;
`;

const UpdatedBalanceLabelTypo = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const UpdatedBalanceTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const UpdatedSymbolTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
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

const ScrollbarContainer = styled.div`
    border-radius: 12px;
    display: flex;
    background: var(--Gray-150, #141414);
    overflow: hidden;
`;

const USE_WALLET_CONNECT = CRAFT_CONFIGS.USE_WALLET_CONNECT;

const TransferPreview = () => {
    const { address: userAddress, fctBalance } = useWalletStore();
    // const userAddress = useSelector((state: rootState) => state.wallet.address);

    const context = useCW721Execute();
    const owner = context.ownershipInfo?.owner;
    const approveInfoById = context.approveInfoById;
    const nftContractInfo = context.nftContractInfo;
    // const fctBalance = context.fctBalance
    // const fctBalance = useSelector((v: rootState) => v.wallet.fctBalance);
    const contractAddress = context.contractAddress;
    const userTransferList = context.transfer;
    const myNftList = context.myNftList;
    const clearTransferForm = context.clearTransferForm;

    const { setMyNftList } = useCW721ExecuteAction();

    const { enqueueSnackbar } = useSnackbar();

    const modal = useModalStore();

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const transferIdsWithEmpty = useMemo(() => {
        const ids = userTransferList.map((oneData) => oneData.token_ids).flat();

        return ids;
    }, [userTransferList]);

    const userTransferIDs = useMemo(() => {
        const ids = userTransferList
            .map((oneData) => oneData.token_ids)
            .flat()
            .filter((v) => v !== '' && approveInfoById[v] !== true);

        return ids;
    }, [approveInfoById, userTransferList]);

    const allTransferIDs = useMemo(() => {
        const ids = userTransferList
            .map((oneData) => oneData.token_ids)
            .flat()
            .filter((v) => v !== '');

        return ids;
    }, [userTransferList]);

    const transferListForPreview = useMemo(() => {
        //? return transfer nft count with address

        const result: { recipient: string; count: number }[] = [];

        userTransferList.forEach(({ recipient, token_ids }) => {
            const count = token_ids.filter((v) => v !== '').length;

            result.push({ recipient, count });
        });

        return result;
    }, [userTransferList]);

    const transferListForModal = useMemo(() => {
        //? flat provided ids with recipient address

        const result: { recipient: string; token_id: string }[] = [];

        userTransferList.forEach(({ recipient, token_ids }) => {
            token_ids.filter((v) => v !== '').forEach((id) => result.push({ recipient, token_id: String(BigInt(id)) }));
        });

        return result;
    }, [userTransferList]);

    const enableButton = useMemo(() => {
        //? @Dev disable this line for case [when transfer approved nft to connected wallet]
        // if (userTransferList.some((v) => v.recipient.toLowerCase() === userAddress.toLowerCase())) return false;

        //! transfer list has empty value
        if (userTransferList.some((oneData) => oneData.recipient === '' || oneData.token_ids.length === 0)) return false;

        //! some trnasfer address is invalid
        if (!userTransferList.some((v) => isValidAddress(v.recipient))) return false;

        //! some transfer id has empty value (means some id input ends with ',')
        if (transferIdsWithEmpty.includes('')) return false;

        //! transfer list has duplicated token id
        const idsMap = new Map();
        const realNumber = transferIdsWithEmpty.filter((v) => v !== '');
        realNumber.forEach((v) => idsMap.set(String(BigInt(v)), true));
        const realTransferIds = Array.from(idsMap.keys());
        if (realTransferIds.length !== realNumber.length) return false;

        //! trnasfer nft ids not owned by user (not owned + not approved)
        if (realTransferIds.some((id) => !myNftList.includes(id) && !approveInfoById[id])) return false;

        return true;
    }, [approveInfoById, myNftList, transferIdsWithEmpty, userTransferList, userAddress]);

    const hideGotoDetail = userAddress !== owner;

    const onClickTransfer = () => {
        if (modal.modals.length >= 1) return;

        if (Number(fctBalance) === 0) {
            enqueueSnackbar({ message: 'Insufficient funds. Please check your account balance.', variant: 'error' });
            return;
        }

        const feeAmount =
            transferListForModal.length === 1
                ? Number(CRAFT_CONFIGS.DEFAULT_FEE)
                : transferListForModal.length * Number(CRAFT_CONFIGS.BULK_FEE);

        const params = {
            modalType: 'EXECUTES' as ModalType,
            header: {
                title: 'Transfer'
            },
            txParams: {
                contract: contractAddress,
                msg: transferListForModal,
                totalLength: JSON.stringify(transferListForModal).length,
                walletLength: transferListForModal.length
            },
            contentParams: {
                symbol: nftContractInfo.symbol,
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Total Transfer Amount',
                        value: allTransferIDs.length.toString(),
                        type: 'nft',
                        initColor: '#02E191',
                        resultColor: '#E6E6E6'
                    },
                    {
                        label: 'Total Wallet Count',
                        value: userTransferList.length.toString(),
                        type: 'wallet-count',
                        initColor: '#807E7E',
                        resultColor: '#807E7E'
                    }
                ]
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => {
                return !USE_WALLET_CONNECT ? (
                    <TxModal
                        module="/cw721/transfer"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearTransferForm();
                            setMyNftList(contractAddress, userAddress);
                        }}
                        hideGotoDetail={hideGotoDetail}
                    />
                ) : (
                    <QRModal2
                        module="/cw721/transfer"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearTransferForm();
                            setMyNftList(contractAddress, userAddress);
                        }}
                        hideGotoDetail={hideGotoDetail}
                    />
                );
            }
        });
    };

    return (
        <Container>
            <ContentBox>
                <ItemBox $isOpen={isOpen}>
                    <ItemWrap>
                        <ItemLabelWrap>
                            <ItemLabelIcon src={IC_COIN_STACK} alt={'Transfer Title Icon'} />
                            <ItemLabelTypo>Total Transfer Amount</ItemLabelTypo>
                        </ItemLabelWrap>
                        <ItemAmountWrap style={{ gap: '12px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'content', gap: '8px' }}>
                                <ItemAmountTypo>{allTransferIDs.length}</ItemAmountTypo>

                                <ItemAmountSymbolTypo>NFT</ItemAmountSymbolTypo>
                            </div>
                            <ArrowToggleButton open={isOpen} onToggle={setIsOpen} />
                        </ItemAmountWrap>
                    </ItemWrap>
                    <ScrollbarContainer>
                        {/* <ExecutePreviewOverlayScroll defer> */}
                        <WalletListWrap $isOpen={isOpen} className="address-scrollbar">
                            {transferListForPreview.map((value, index) => (
                                <WalletItemWrap key={index}>
                                    <WalletLeftItemWrap>
                                        <WalletItemIcon src={IC_WALLET} alt={'Wallet Item'} />

                                        <WalletItemAddressTypo
                                            $disabled={!value.recipient}
                                            data-tooltip-id={TOOLTIP_ID.COMMON}
                                            data-tooltip-content={value.recipient?.length > 24 ? value.recipient : ''}
                                        >
                                            {value.recipient ? shortenAddress(value.recipient, 12, 12) : 'Wallet Address'}
                                        </WalletItemAddressTypo>
                                    </WalletLeftItemWrap>

                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px' }}>
                                        <WalletItemTokenAmount $disabled={value.count === 0} $isError={false}>
                                            {value.count}
                                        </WalletItemTokenAmount>
                                        <WalletItemTokenAmount style={{ color: '#444444' }} $disabled={value.count === 0} $isError={false}>
                                            NFT
                                        </WalletItemTokenAmount>
                                    </div>
                                </WalletItemWrap>
                            ))}
                        </WalletListWrap>
                        {/* </ExecutePreviewOverlayScroll> */}
                    </ScrollbarContainer>
                </ItemBox>
                <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" />
                <ItemWrap>
                    <ItemLabelWrap>
                        <CoinStack2Icon src={IC_COIN_STACK2} alt={'Update Balance Icon'} />
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                            <UpdatedBalanceLabelTypo>Updated Balance</UpdatedBalanceLabelTypo>
                            <IconTooltip
                                size="14px"
                                tooltip={
                                    'Updated Balance is the number of NFTs held after the transfer.\nFor approved NFTs (not owned), the number is not displayed.'
                                }
                            />
                        </div>
                    </ItemLabelWrap>
                    <ItemLabelWrap style={{ gap: '8px' }}>
                        <UpdatedBalanceTypo>
                            {subtractStringAmount(myNftList.length.toString(), userTransferIDs.length.toString())}
                        </UpdatedBalanceTypo>
                        <UpdatedSymbolTypo>NFT</UpdatedSymbolTypo>
                    </ItemLabelWrap>
                </ItemWrap>
            </ContentBox>

            <ButtonWrap>
                <GreenButton disabled={!enableButton} onClick={onClickTransfer}>
                    <div className="button-text">Transfer</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default TransferPreview;
