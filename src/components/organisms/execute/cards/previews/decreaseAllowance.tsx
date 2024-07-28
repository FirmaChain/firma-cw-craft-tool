import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_CLOCK, IC_COIN_STACK, IC_COIN_STACK2, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { formatWithCommas, getTokenAmountFromUToken, subtractStringAmount } from '@/utils/balance';
import { isValidAddress } from '@/utils/address';
import IconTooltip from '@/components/atoms/tooltip';
import useExecuteHook from '../../hooks/useExecueteHook';
import useExecuteStore, { IAllowanceInfo } from '../../hooks/useExecuteStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { useModalStore } from '@/hooks/useModal';
import { QRCodeModal } from '@/components/organisms/modal';
import Divider from '@/components/atoms/divider';
import { format } from 'date-fns';
import GreenButton from '@/components/atoms/buttons/greenButton';

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

    /* Body/Body2 - Rg */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const ExpirationBox = ({ allowanceInfo }: { allowanceInfo: IAllowanceInfo }) => {
    if (allowanceInfo.type === 'never') return <AccordionTypo $disabled={false}>Forever</AccordionTypo>;
    if (!allowanceInfo.expire) return <AccordionTypo $disabled={true}>Expiration</AccordionTypo>;
    if (allowanceInfo.type === 'at_height')
        return <AccordionTypo $disabled={false}>{formatWithCommas(allowanceInfo.expire)} Block</AccordionTypo>;
    if (allowanceInfo.type === 'at_time')
        return (
            <AccordionTypo $disabled={false}>
                {format(new Date(Math.floor(Number(allowanceInfo.expire) / 1000000)), 'yyyy-MM-dd HH:mm:ss')}
            </AccordionTypo>
        );

    return <></>;
};

const DecreaseAllowancePreview = () => {
    const contractAddress = useExecuteStore((state) => state.contractAddress);
    const fctBalance = useExecuteStore((state) => state.fctBalance);
    const allowanceInfo = useExecuteStore((state) => state.allowanceInfo);
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);
    const allowance = useExecuteStore((state) => state.allowance);

    const network = useSelector((state: rootState) => state.global.network);

    const modal = useModalStore();

    const { getCw20Balance } = useExecuteHook();

    const [updatedAmount, setUpdatedAmount] = useState<string>('0');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

    const fetchTokenInfo = useCallback(async () => {
        try {
            if (addressExist) {
                const result = await getCw20Balance(contractAddress, allowance.address);
                const targetBalance = result.success === true ? result.balance : '0';

                setUpdatedAmount(subtractStringAmount(targetBalance, allowance.amount));
            }
        } catch (error) {
            console.log(error);
        }
    }, [contractAddress, allowance]);

    const addressExist = useMemo(() => {
        return isValidAddress(allowance.address);
    }, [allowance.address]);

    const onClickDecreaseAllowance = () => {
        let expires = {};
        if (allowance.type === 'at_height') {
            expires = {
                at_height: parseInt(allowance.expire)
            };
        } else if (allowance.type === 'at_time') {
            expires = {
                at_time: allowance.expire.toString()
            };
        } else {
            expires = {
                never: {}
            };
        }

        const feeAmount = craftConfig.DEFAULT_FEE;

        const params = {
            header: {
                title: 'Decrease Allowance'
            },
            content: {
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                decimals: tokenInfo.decimals.toString(),
                symbol: tokenInfo.symbol,
                list: [
                    {
                        label: 'Decrease Allowance Amount',
                        value: allowance.amount,
                        type: 'amount'
                    },
                    {
                        label: 'Recipient Address',
                        value: allowance.address,
                        type: 'wallet'
                    },
                    {
                        label: 'Expiration',
                        value: allowance.expire,
                        type: allowance.type
                    }
                ]
            },
            contract: contractAddress,
            msg: {
                amount: allowance.amount,
                expires: expires,
                spender: allowance.address
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <QRCodeModal
                    module="/cw20/decreaseAllowance"
                    id={id}
                    params={params}
                    onClickConfirm={() => {
                        console.log(111);
                    }}
                />
            )
        });
    };

    const isEnableButton = useMemo(() => {
        console.log(allowance);
        if (!addressExist || allowance.amount === '') return false;
        console.log(2222);
        if (allowance.type === 'never') return true;
        console.log(1111);
        if (!allowance.expire || allowance.type === '') return false;
        console.log("allowance.expire", allowance.expire);
        return true;
    }, [addressExist, allowance.amount, allowance.expire, allowance.type, allowance.address]);

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src={IC_COIN_STACK} alt={'Transfer Title Icon'} />
                        <ItemLabelTypo>Decrease Allowance Amount</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ItemAmountTypo>
                            {formatWithCommas(getTokenAmountFromUToken(allowanceInfo.allowance, tokenInfo.decimals.toString()))}
                        </ItemAmountTypo>
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
                                {/* <AccordionTypo $disabled={!allowanceInfo.address}>
                                    {allowanceInfo.address || 'Wallet Address'}
                                </AccordionTypo> */}
                                {/* <AccordionTypo $disabled={!Number(allowanceInfo.amount)}>
                                    {formatWithCommas(getTokenAmountFromUToken(allowanceInfo.amount, tokenInfo.decimals.toString()))}
                                </AccordionTypo> */}
                            </div>
                        </AccordionRow>
                        <AccordionRow>
                            <img src={IC_CLOCK} alt="clock" />
                            {/* <ExpirationBox allowanceInfo={allowanceInfo} /> */}
                        </AccordionRow>
                    </AccordionBox>
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
                        <UpdatedBalanceTypo>
                            {formatWithCommas(getTokenAmountFromUToken(updatedAmount, tokenInfo.decimals.toString()))}
                        </UpdatedBalanceTypo>
                        <UpdatedSymbolTypo>{tokenInfo.symbol}</UpdatedSymbolTypo>
                    </ItemLabelWrap>
                </ItemWrap>
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickDecreaseAllowance}>
                    <div className="button-text">Decrease Allowance</div>
                </GreenButton>
                {/* <ExecuteButton $isEnable={isEnableButton} onClick={onClickDecreaseAllowance}>
                    <ExecuteButtonTypo>Decrease Allowance</ExecuteButtonTypo>
                </ExecuteButton> */}
            </ButtonWrap>
        </Container>
    );
};

export default DecreaseAllowancePreview;
