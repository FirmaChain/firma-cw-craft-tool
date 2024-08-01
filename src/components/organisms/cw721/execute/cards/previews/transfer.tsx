import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_COIN_STACK, IC_COIN_STACK2, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { shortenAddress } from '@/utils/common';
import Divider from '@/components/atoms/divider';
import IconTooltip from '@/components/atoms/tooltip';
import GreenButton from '@/components/atoms/buttons/greenButton';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { isValidAddress } from '@/utils/address';
import { useModalStore } from '@/hooks/useModal';
import { QRCodeModal } from '@/components/organisms/modal';
import { addStringAmount, subtractStringAmount } from '@/utils/balance';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';

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

const WalletListWrap = styled.div`
    height: auto;
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
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

const WalletItemTokenAmount = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? '#383838' : '#807E7E')};
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

const TransferPreview = () => {
    const address = useSelector((state: rootState) => state.wallet.address);

    const nftContractInfo = useCW721ExecuteStore((state) => state.nftContractInfo);
    const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const transfer = useCW721ExecuteStore((state) => state.transfer);
    const myNftList = useCW721ExecuteStore((state) => state.myNftList);
    const clearTransferForm = useCW721ExecuteStore((state) => state.clearTransferForm);
    
    const { setMyNftList } = useCW721ExecuteAction();

    const modal = useModalStore();

    const [totalTransferCount, setTotalTransferCount] = useState<number>(0);
    const [transferTargets, setTransferTargets] = useState<{ recipient: string, token_id: string}[]>([]);
    const [isDisableButton, setIsDisableButton] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    useEffect(() => {
        if (transfer.length === 1 && transfer[0].recipient === '' && transfer[0].token_ids.length === 1 && transfer[0].token_ids[0] === '') {
            setTotalTransferCount(0)
            setTransferTargets([]);
        } else {
            let tempTransferTargets = [];
            let allValidAddress = false;
            let tokenIdSet = new Set();

            console.log(transfer);
            for (const transferData of transfer) {
                if (transferData.token_ids.length === 0) allValidAddress = true;

                for (const token_id of transferData.token_ids) {
                    if (transferData.recipient === address) {
                        allValidAddress = true;
                    }

                    if (tokenIdSet.has(token_id)) {
                        allValidAddress = true;
                    } else {
                        tokenIdSet.add(token_id);
                    }

                    tempTransferTargets.push({
                        recipient: transferData.recipient,
                        token_id: token_id
                    });

                    if (transferData.recipient === "" || !isValidAddress(transferData.recipient)) {
                        allValidAddress = true;
                    }

                    if (token_id === '' || token_id === '0' || !myNftList.includes(token_id)) {
                        allValidAddress = true;
                    }
                }
            }

            setIsDisableButton(allValidAddress);
            setTotalTransferCount(tempTransferTargets.length);
            setTransferTargets(tempTransferTargets);
        }
    }, [transfer]);

    const onClickTransfer = () => {
        const feeAmount = transferTargets.length * 15000;
        
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
                        value: totalTransferCount.toString(),
                        type: 'nft_id'
                    },
                    {
                        label: 'Total Wallet Count',
                        value: subtractStringAmount(myNftList.length.toString(), totalTransferCount.toString()),
                        type: 'wallet'
                    }
                ]
            },
            contract: contractAddress,
            msg: transferTargets
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
                        setMyNftList(contractAddress, address);
                    }}
                />
            )
        });
    };

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src={IC_COIN_STACK} alt={'Transfer Title Icon'} />
                        <ItemLabelTypo>Total Transfer Amount</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ItemAmountTypo>{totalTransferCount}</ItemAmountTypo>
                        <ItemAmountSymbolTypo>NFT</ItemAmountSymbolTypo>
                        <ArrowToggleButton onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                {isOpen && (
                    <WalletListWrap>
                        {transferTargets.length === 0 && (
                            <WalletItemWrap>
                                <WalletLeftItemWrap>
                                    <WalletItemIcon src={IC_WALLET} alt={'Wallet Item'} />
                                    <WalletItemAddressTypo $disabled>Wallet Address</WalletItemAddressTypo>                                    
                                </WalletLeftItemWrap>
                                <WalletItemTokenAmount $disabled={false}>{`0 ${nftContractInfo.symbol}`}</WalletItemTokenAmount>
                            </WalletItemWrap>
                        )}
                        {transferTargets.map((value, index) => (
                            <WalletItemWrap key={index}>
                                <WalletLeftItemWrap>
                                    <WalletItemIcon src={IC_WALLET} alt={'Wallet Item'} />
                                    <WalletItemAddressTypo $disabled={!value.recipient}>
                                        {value.recipient !== '' ? shortenAddress(value.recipient, 12, 12) : 'Wallet Address'}
                                    </WalletItemAddressTypo>
                                </WalletLeftItemWrap>
                                <WalletItemTokenAmount $disabled={false}>{`${value.token_id} ${nftContractInfo.symbol}`}</WalletItemTokenAmount>
                            </WalletItemWrap>
                        ))}
                    </WalletListWrap>
                )}
                <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" />
                <ItemWrap>
                    <ItemLabelWrap>
                        <CoinStack2Icon src={IC_COIN_STACK2} alt={'Update Balance Icon'} />
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                            <UpdatedBalanceLabelTypo>Updated Balance</UpdatedBalanceLabelTypo>
                            <IconTooltip size="14px" />
                        </div>
                    </ItemLabelWrap>
                    <ItemLabelWrap>
                        <UpdatedBalanceTypo>{subtractStringAmount(myNftList.length.toString(), totalTransferCount.toString())}</UpdatedBalanceTypo>
                        <UpdatedSymbolTypo>NFT</UpdatedSymbolTypo>
                    </ItemLabelWrap>
                </ItemWrap>
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={isDisableButton} onClick={onClickTransfer}>
                    <div className="button-text">Transfer</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default TransferPreview;
