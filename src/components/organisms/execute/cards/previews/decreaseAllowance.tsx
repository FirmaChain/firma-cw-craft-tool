import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_CLOCK, IC_COIN_STACK, IC_COIN_STACK2, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { formatWithCommas, getTokenAmountFromUToken, getUTokenAmountFromToken, subtractStringAmount } from '@/utils/balance';
import { isValidAddress, shortenAddress } from '@/utils/address';
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
    const setIsFetched = useExecuteStore((v) => v.setIsFetched);
    const clearAllowance = useExecuteStore((v) => v.clearAllowance);
    const clearAllowanceInfo = useExecuteStore((v) => v.clearAllowanceInfo);
    const { setAllowanceInfo } = useExecuteActions();

    const network = useSelector((state: rootState) => state.global.network);
    const address = useSelector((state: rootState) => state.wallet.address);

    const modal = useModalStore();

    const [updatedAmount, setUpdatedAmount] = useState<string>('0');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

    const addressExist = useMemo(() => {
        return isValidAddress(allowance?.address);
    }, [allowance?.address]);

    useEffect(() => {
        try {
            if (addressExist) {
                setAllowanceInfo(contractAddress, address, allowance?.address);
            } else {
                setUpdatedAmount("0");
            }
        } catch (error) {
            console.log(error);
        }
    }, [allowance?.address]);

    useEffect(() => {
        const convertAmount = getUTokenAmountFromToken(allowance === null ? "0" : !allowance.amount ? "0" : allowance?.amount, tokenInfo.decimals.toString());
        setUpdatedAmount(subtractStringAmount(allowanceInfo === null ? "0" : allowanceInfo?.allowance, convertAmount));
    }, [allowance?.amount]);

    useEffect(() => {
        const convertAmount = getUTokenAmountFromToken(allowanceInfo === null ? "0" : !allowance?.amount ? "0" : allowance?.amount, tokenInfo.decimals.toString());
        setUpdatedAmount(subtractStringAmount(allowanceInfo === null ? "0" : allowanceInfo?.allowance, convertAmount));
    }, [allowanceInfo]);

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
                        label: "Decrease Allowance Amount",
                        value: getUTokenAmountFromToken(allowance.amount, tokenInfo.decimals.toString()),
                        type: "amount"
                    },
                    {
                        label: "Recipient Address",
                        value: allowance.address,
                        type: "wallet"
                    },
                    {
                        label: "Expiration",
                        value: allowance.expire,
                        type: allowance.type === "at_height" ? "block" : allowance.type === "at_time" ? "time" : "never"
                    }
                ]
            },
            contract: contractAddress,
            msg: {
                amount: getUTokenAmountFromToken(allowance.amount, tokenInfo.decimals.toString()),
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
                        clearAllowanceInfo();
                        setIsFetched(true);
                        clearAllowance();
                    }}
                />
            )
        });
    };

    const isEnableButton = useMemo(() => {
        if (!addressExist || allowanceInfo === null) return false;
        if (!allowance) return false;
        if (!allowance.type || allowance.type !== 'never' && (!allowance.expire || !allowance.type)) return false;

        return true;
    }, [addressExist, allowance?.amount, allowance?.expire, allowance?.type, allowance?.address]);

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src={IC_COIN_STACK} alt={'Transfer Title Icon'} />
                        <ItemLabelTypo>Decrease Allowance Amount</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ItemAmountTypo>{formatWithCommas(allowance?.amount === undefined ? "0" : allowance.amount)}</ItemAmountTypo>
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
                                <AccordionTypo $disabled={allowance === null ? false : !allowance.address}>
                                    {allowance.address === '' ? 'Wallet Address' : shortenAddress(allowance.address, 16, 16)}
                                </AccordionTypo>
                                <AccordionTypo $disabled={allowance === null ? false : !Number(allowance.amount)}>
                                    {formatWithCommas(allowance === null ? "0" : allowance.amount )}
                                </AccordionTypo>
                            </div>
                        </AccordionRow>
                        <AccordionRow>
                            <img src={IC_CLOCK} alt="clock" />
                            <ExpirationBox allowanceInfo={allowance} />
                            <AccordionTypo $disabled={true}>Expiration</AccordionTypo>
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
            </ButtonWrap>
        </Container>
    );
};

export default DecreaseAllowancePreview;
