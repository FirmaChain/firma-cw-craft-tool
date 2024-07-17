import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import commaNumber from 'comma-number';

import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_CLOCK, IC_COIN_STACK, IC_COIN_STACK2, IC_DOTTED_DIVIDER, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import {
    addStringAmount,
    formatWithCommas,
    getTokenAmountFromUToken,
} from '@/utils/balance';
import { useContractContext } from '../../context/contractContext';
import { isValidAddress, shortenAddress } from '@/utils/address';
import { ModalActions } from '@/redux/actions';
import IconTooltip from '@/components/atoms/tooltip';
import useExecuteHook from '../../hooks/useExecueteHook';

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
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

interface IProps {
    tokenSymbol: string;
    decimals: string;
}

const IncreaseAllowancePreview = ({ tokenSymbol, decimals }: IProps) => {
    const { _contract, _allowanceInfo, _isFetched, _setIsFetched, _setAllowanceInfo } = useContractContext();
    const { getCw20Balance } = useExecuteHook();

    const [updatedAmount, setUpdatedAmount] = useState<string>('0');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const fetchTokenInfo = useCallback(async () => {
        try {
            if (addressExist) {
                const result = await getCw20Balance(_contract, _allowanceInfo.address);
                const targetBalance = result.success === true ? result.balance : "0";

                setUpdatedAmount(addStringAmount(_allowanceInfo.amount, targetBalance));
            }
        } catch (error) {
            console.log(error);
        }
    }, [_contract, _allowanceInfo.address, _allowanceInfo.amount]);

    const addressExist = useMemo(() => {
        return isValidAddress(_allowanceInfo.address);
    }, [_allowanceInfo.address]);

    useEffect(() => {
        if (addressExist) {
            fetchTokenInfo();
            _setIsFetched(false);
        }
    }, [_contract, _allowanceInfo, _isFetched]);

    const onClickIncreaseAllowance = () => {
        let expires = {}
        if (_allowanceInfo.type === "at_height") {
            expires = {
                'at_height': parseInt(_allowanceInfo.expire)
            }
        } else if (_allowanceInfo.type === "at_time") {
            expires = {
                'at_time': _allowanceInfo.expire.toString()
            }
        } else {
            expires = {
                never: {}
            }
        }
        ModalActions.handleData({
            module: '/cw20/increaseAllowance',
            params: {
                contract: _contract,
                msg: {
                    amount: _allowanceInfo.amount,
                    expires: expires,
                    spender: _allowanceInfo.address
                }
            }
        });
        ModalActions.handleQrConfirm(true);
        ModalActions.handleSetCallback({
            callback: () => {
                _setAllowanceInfo({
                    address: "",
                    amount: "",
                    expire: "",
                    type: ""
                });
                _setIsFetched(true);
            }
        });
    };

    const isEnableButton = useMemo(() => {
        if (!addressExist || _allowanceInfo.amount === "") return false;
        if (_allowanceInfo.expire === "" || _allowanceInfo.type === "") return false;

        return true;
    }, [addressExist, _allowanceInfo.amount, _allowanceInfo.expire, _allowanceInfo.type, _allowanceInfo.address]);

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src={IC_COIN_STACK} alt={'Transfer Title Icon'} />
                        <ItemLabelTypo>Increase Allowance Amount</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ItemAmountTypo>{formatWithCommas(getTokenAmountFromUToken(_allowanceInfo.amount, decimals))}</ItemAmountTypo>
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
                                <AccordionTypo $disabled={true}>{_allowanceInfo.address === "" ? "Wallet Address": shortenAddress(_allowanceInfo.address, 16, 16)}</AccordionTypo>
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
                <ExecuteButton $isEnable={isEnableButton} onClick={onClickIncreaseAllowance}>
                    <ExecuteButtonTypo>Increase Allowance</ExecuteButtonTypo>
                </ExecuteButton>
            </ButtonWrap>
        </Container>
    );
};

export default IncreaseAllowancePreview;
