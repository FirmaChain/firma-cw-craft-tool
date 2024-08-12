import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_COIN_STACK, IC_COIN_STACK2, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { shortenAddress } from '@/utils/common';
import Divider from '@/components/atoms/divider';
import IconTooltip from '@/components/atoms/tooltip';
import GreenButton from '@/components/atoms/buttons/greenButton';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { isValidAddress } from '@/utils/address';
import { useModalStore } from '@/hooks/useModal';
import { QRCodeModal } from '@/components/organisms/modal';
import { subtractStringAmount } from '@/utils/balance';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';
import { ExecutePreviewOverlayScroll } from '@/components/organisms/instantiate/preview/dashboard/style';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { CRAFT_CONFIGS } from '@/config';

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

const TransferPreview = () => {
    const network = useSelector((state: rootState) => state.global.network);
    const userAddress = useSelector((state: rootState) => state.wallet.address);
    
    const approveInfoById = useCW721ExecuteStore((state) => state.approveInfoById);
    const nftContractInfo = useCW721ExecuteStore((state) => state.nftContractInfo);
    const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const userTransferList = useCW721ExecuteStore((state) => state.transfer);
    const myNftList = useCW721ExecuteStore((state) => state.myNftList);
    const clearTransferForm = useCW721ExecuteStore((state) => state.clearTransferForm);

    const { setMyNftList } = useCW721ExecuteAction();

    const modal = useModalStore();

    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const transferIdsWithEmpty = useMemo(() => {
        const ids = userTransferList.map((oneData) => oneData.token_ids).flat();
        // .filter((v) => v !== '');

        return ids;
    }, [userTransferList]);

    const transferIds = useMemo(() => {
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
            token_ids.filter((v) => v !== '').forEach((id) => result.push({ recipient, token_id: id }));
        });

        return result;
    }, [userTransferList]);

    const enableButton = useMemo(() => {
        //! transfer list has empty value
        if (userTransferList.some((oneData) => oneData.recipient === '' || oneData.token_ids.length === 0)) return false;

        //! some transfer address same with current user address
        // if (userTransferList.some((v) => v.recipient === userAddress)) return false;

        //! some trnasfer address is invalid
        if (!userTransferList.some((v) => isValidAddress(v.recipient))) return false;

        //! some transfer id has empty value (means some id input ends with ',')
        if (transferIdsWithEmpty.includes('')) return false;

        //! transfer list has duplicated token id
        const idsMap = new Map();
        const realNumber = transferIdsWithEmpty.filter((v) => v !== '');
        realNumber.forEach((v) => idsMap.set(v, v));
        const realTransferIds = Array.from(idsMap.keys());
        if (realTransferIds.length !== realNumber.length) return false;

        //! trnasfer nft ids not owned by user (not owned + not approved)
        if (realTransferIds.some((id) => !myNftList.includes(id) && !approveInfoById[id])) return false;

        return true;
    }, [approveInfoById, myNftList, transferIdsWithEmpty, userTransferList]);

    const onClickTransfer = () => {
        const feeAmount = transferListForModal.length === 1
        ? Number(craftConfig.DEFAULT_FEE) : transferListForModal.length * Number(craftConfig.BULK_FEE);

        const params = {
            header: {
                title: 'Transfer'
            },
            content: {
                symbol: nftContractInfo.symbol,
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Total Transfer Amount',
                        value: transferIds.length.toString(),
                        type: 'nft'
                    },
                    {
                        label: 'Total Wallet Count',
                        value: userTransferList.length.toString(),
                        type: 'wallet-count'
                    }
                ]
            },
            contract: contractAddress,
            msg: transferListForModal
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <QRCodeModal
                    module="/cw721/transfer"
                    id={id}
                    params={params}
                    onClickConfirm={() => {
                        clearTransferForm();
                        setMyNftList(contractAddress, userAddress);
                    }}
                />
            )
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
                        <ItemAmountWrap>
                            <ItemAmountTypo>{transferIds.length}</ItemAmountTypo>
                            <ItemAmountSymbolTypo>NFT</ItemAmountSymbolTypo>
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
                                        <WalletItemAddressTypo $disabled={!value.recipient}>
                                            {value.recipient ? value.recipient : 'Wallet Address'}
                                        </WalletItemAddressTypo>
                                    </WalletLeftItemWrap>
                                    <WalletItemTokenAmount
                                        $disabled={value.count === 0}
                                        $isError={false}
                                    >{`${value.count} NFT`}</WalletItemTokenAmount>
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
                            <IconTooltip size="14px" tooltip={"Updated Balance is the number of NFTs held after the transfer."}/>
                        </div>
                    </ItemLabelWrap>
                    <ItemLabelWrap>
                        <UpdatedBalanceTypo>
                            {subtractStringAmount(myNftList.length.toString(), transferIds.length.toString())}
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
