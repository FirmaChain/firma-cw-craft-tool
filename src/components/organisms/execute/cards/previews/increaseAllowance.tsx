import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import commaNumber from 'comma-number';

import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_CLOCK, IC_COIN_STACK, IC_COIN_STACK2, IC_DOTTED_DIVIDER, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { addStringAmount, formatWithCommas, getTokenAmountFromUToken } from '@/utils/balance';
import { isValidAddress, shortenAddress } from '@/utils/address';
import { ModalActions } from '@/redux/actions';
import IconTooltip from '@/components/atoms/tooltip';
import useExecuteHook from '../../hooks/useExecueteHook';
import useExecuteStore from '../../hooks/useExecuteStore';
import { useModalStore } from '@/hooks/useModal';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
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

const IncreaseAllowancePreview = () => {
    const { contractAddress, fctBalance, allowanceInfo, tokenInfo } = useExecuteStore.getState();
    const { network } = useSelector((state: rootState) => state.global);
    
    const modal = useModalStore();

    const { getCw20Balance } = useExecuteHook();

    const [updatedAmount, setUpdatedAmount] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

    const fetchTokenInfo = useCallback(async () => {
        try {
            if (addressExist) {
                const result = await getCw20Balance(contractAddress, allowanceInfo.address);
                const targetBalance = result.success === true ? result.balance : '0';

                setUpdatedAmount(addStringAmount(allowanceInfo.amount, targetBalance));
            }
        } catch (error) {
            console.log(error);
        }
    }, [contractAddress, allowanceInfo]);

    const addressExist = useMemo(() => {
        return isValidAddress(allowanceInfo.address);
    }, [allowanceInfo.address]);

    useEffect(() => {
        if (addressExist) {
            fetchTokenInfo();
        }
    }, [contractAddress, allowanceInfo]);

    const onClickIncreaseAllowance = () => {
        let expires = {};
        if (allowanceInfo.type === 'at_height') {
            expires = {
                at_height: parseInt(allowanceInfo.expire)
            };
        } else if (allowanceInfo.type === 'at_time') {
            expires = {
                at_time: allowanceInfo.expire.toString()
            };
        } else {
            expires = {
                never: {}
            };
        }
        
        const feeAmount = craftConfig.DEFAULT_FEE;

        const params = {
            header: {
                title: "Increase Allowance",
            },
            content: {
                balance: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: "Increase Allowance Amount",
                        value: allowanceInfo.amount,
                        type: "amount"
                    },
                    {
                        label: "Recipient Address",
                        value: allowanceInfo.address,
                        type: "wallet"
                    },
                    {
                        label: "Expiration",
                        value: allowanceInfo.expire,
                        type: allowanceInfo.type === "at_height" ? "block" : allowanceInfo.type === "at_time" ? "time" : "never"
                    }
                ]
            },
            contract: contractAddress,
            msg: {
                amount: allowanceInfo.amount,
                expires: expires,
                spender: allowanceInfo.address
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => <QRCodeModal module="/cw20/uploadLogo" id={id} params={params} onClickConfirm={() => { console.log(111); }} />
        });

        // ModalActions.handleData({
        //     module: '/cw20/increaseAllowance',
        //     params: {
        //         contract: contractAddress,
        //         msg: {
        //             amount: allowanceInfo.amount,
        //             expires: expires,
        //             spender: allowanceInfo.address
        //         }
        //     }
        // });
    };

    const isEnableButton = useMemo(() => {
        if (!addressExist || allowanceInfo.amount === '') return false;
        if (allowanceInfo.type !== 'never' && (allowanceInfo.expire === '' || allowanceInfo.type === '')) return false;

        return true;
    }, [addressExist, allowanceInfo.amount, allowanceInfo.expire, allowanceInfo.type, allowanceInfo.address]);

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src={IC_COIN_STACK} alt={'Transfer Title Icon'} />
                        <ItemLabelTypo>Increase Allowance Amount</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ItemAmountTypo>{formatWithCommas(getTokenAmountFromUToken(allowanceInfo.amount, tokenInfo.decimals.toString()))}</ItemAmountTypo>
                        <ItemAmountSymbolTypo>{tokenInfo.symbol}</ItemAmountSymbolTypo>
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
                                <AccordionTypo $disabled={true}>
                                    {allowanceInfo.address === '' ? 'Wallet Address' : shortenAddress(allowanceInfo.address, 16, 16)}
                                </AccordionTypo>
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
                        <UpdatedBalanceTypo>{formatWithCommas(getTokenAmountFromUToken(updatedAmount, tokenInfo.decimals.toString()))}</UpdatedBalanceTypo>
                        <UpdatedSymbolTypo>{tokenInfo.symbol}</UpdatedSymbolTypo>
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
