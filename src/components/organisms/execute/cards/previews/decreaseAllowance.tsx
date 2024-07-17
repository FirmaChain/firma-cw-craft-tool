import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_CLOCK, IC_COIN_STACK, IC_COIN_STACK2, IC_DOTTED_DIVIDER, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import {
    addStringAmount,
    formatWithCommas,
    getTokenAmountFromUToken,
    getUTokenAmountFromToken,
    subtractStringAmount
} from '@/utils/balance';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useContractContext } from '../../context/contractContext';
import { shortenAddress } from '@/utils/common';
import { isValidAddress } from '@/utils/address';
import { ModalActions } from '@/redux/actions';
import commaNumber from 'comma-number';
import IconTooltip from '@/components/atoms/tooltip';
import IconButton from '@/components/atoms/buttons/iconButton';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
`;

const ContentWrap = styled.div`
    width: calc(100% - 88px);
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

const AccordionBox = styled.div`
    width: calc(100% - 64px);
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

const WalletItemAddressTypo = styled.div`
    color: var(--Gray-650, #707070);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const WalletItemTokenAmount = styled.div`
    color: var(--Gray-700, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const DOTTED_DIVIDER = styled.img`
    width: 100%;
    height: auto;
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

const AccordionRow = styled.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '16px',

    img: { width: '20px', height: '20px' }
});

const AccordionTypo = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-650, #707070)')};

    /* Body/Body2 - Rg */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

interface IProps {
    addressAmount: string;
    tokenSymbol: string;
    decimals: string;
}

const DecreaseAllowancePreview = ({ addressAmount, tokenSymbol, decimals }: IProps) => {
    const { _contract, _walletList, _setIsFetched, _setWalletList } = useContractContext();

    const [totalTransferAmount, setTotalTransferAmount] = useState<string>('0');
    const [updatedAmount, setUpdatedAmount] = useState<string>('0');
    const [isEnableButton, setIsEnableButton] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const calculateTotalBurnBalance = useCallback(() => {
        let calcTransferAmount = '0';
        let allAddressesValid = true;
        let allAmountsValid = true;

        for (const wallet of _walletList) {
            if (!isValidAddress(wallet.recipient)) {
                allAddressesValid = false;
            }
            if (!wallet.amount || wallet.amount.trim() === '') {
                allAmountsValid = false;
            }
            calcTransferAmount = addStringAmount(calcTransferAmount, wallet.amount);
        }

        const remainAmount = subtractStringAmount(addressAmount, getUTokenAmountFromToken(calcTransferAmount, decimals));
        setUpdatedAmount(remainAmount);

        setIsEnableButton(allAddressesValid && allAmountsValid);
        setTotalTransferAmount(getUTokenAmountFromToken(calcTransferAmount, decimals));
    }, [_walletList, addressAmount, decimals]);

    useEffect(() => {
        calculateTotalBurnBalance();
    }, [_walletList, calculateTotalBurnBalance]);

    const onClickTransfer = () => {
        const convertWalletList = [];

        for (const wallet of _walletList) {
            convertWalletList.push({
                recipient: wallet.recipient,
                amount: getUTokenAmountFromToken(wallet.amount, decimals)
            });
        }

        ModalActions.handleData({
            module: '/cw20/transfer',
            params: {
                contract: _contract,
                msg: convertWalletList
            }
        });
        ModalActions.handleQrConfirm(true);
        ModalActions.handleSetCallback({
            callback: () => {
                _setWalletList([]);
                _setIsFetched(true);
            }
        });
    };

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src={IC_COIN_STACK} alt={'Transfer Title Icon'} />
                        <ItemLabelTypo>Decrease Allowance Amount</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ItemAmountTypo>{formatWithCommas(getTokenAmountFromUToken(totalTransferAmount, decimals))}</ItemAmountTypo>
                        <ItemAmountSymbolTypo>{tokenSymbol}</ItemAmountSymbolTypo>
                        <ArrowToggleButton onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                {isOpen && (
                    <AccordionBox>
                        <AccordionRow>
                            <img src={IC_WALLET} alt="wallet" />
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <AccordionTypo $disabled={true}>Wallet Address</AccordionTypo>
                                <AccordionTypo $disabled={true}>{commaNumber(0)}</AccordionTypo>
                            </div>
                        </AccordionRow>
                        <AccordionRow>
                            <img src={IC_CLOCK} alt="clock" />
                            <AccordionTypo $disabled={true}>Expiration</AccordionTypo>
                        </AccordionRow>
                    </AccordionBox>
                )}
                <DOTTED_DIVIDER src={IC_DOTTED_DIVIDER} alt={'Dotted Divider'} />
                <ItemWrap>
                    <ItemLabelWrap>
                        <CoinStack2Icon src={IC_COIN_STACK2} alt={'Update Balance Icon'} />
                        <UpdatedBalanceLabelTypo>Updated Balance</UpdatedBalanceLabelTypo>
                        <IconTooltip size="14px" tooltip="UPDATED_ALLOANCE_TOOLTIP" />
                    </ItemLabelWrap>
                    <ItemLabelWrap>
                        <UpdatedBalanceTypo>{formatWithCommas(getTokenAmountFromUToken(updatedAmount, decimals))}</UpdatedBalanceTypo>
                        <UpdatedSymbolTypo>{tokenSymbol}</UpdatedSymbolTypo>
                    </ItemLabelWrap>
                </ItemWrap>
            </ContentWrap>
            <ButtonWrap>
                <ExecuteButton disabled onClick={onClickTransfer}>
                    <ExecuteButtonTypo>Decrease Allowance</ExecuteButtonTypo>
                </ExecuteButton>
            </ButtonWrap>
        </Container>
    );
};

export default DecreaseAllowancePreview;
