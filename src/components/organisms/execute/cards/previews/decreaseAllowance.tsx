import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_CLOCK, IC_COIN_STACK, IC_COIN_STACK2, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { getTokenAmountFromUToken, getUTokenAmountFromToken, subtractStringAmount } from '@/utils/balance';
import { isValidAddress, shortenAddress } from '@/utils/address';
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
import commaNumber from 'comma-number';
import { ONE_TO_MINE } from '@/constants/regex';
import { TOOLTIP_ID } from '@/constants/tooltip';

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

const ItemBox = styled.div<{ $isOpen: boolean }>`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 24px;
    height: fit-content;
    transition: all 0.2s all;

    ${({ $isOpen }) => $isOpen ? `
        gap: 24px;
    `: `
        gap: 0px;
    `}
`

const ItemWrap = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
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
    white-space: pre;
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

const AccordionBox = styled.div<{ $isOpen: boolean }>`
    height: fit-content;
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
    transition: all 0.15s ease;

    ${({ $isOpen }) => $isOpen ? `
        max-height: 100%;
        padding: 24px 32px;
        gap: 20px;
        opacity: 1;
    `: `
        max-height: 0px;
        padding: 0px 32px;
        gap: 0px;
        opacity: 0;
    `}  
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

    white-space: pre;
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

const AccordionValueWrap = styled.div`
    display: flex;
    gap: 6px;
    justify-content: center;
    align-items: center;
`;

const AccordionSymbolTypo = styled.div`
    color: var(--Gray-550, #444);
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const ExpirationBox = ({ allowanceInfo }: { allowanceInfo: IAllowanceInfo | null }) => {
    if (!allowanceInfo) return <AccordionTypo $disabled>Expiration</AccordionTypo>;

    if (allowanceInfo.type === 'never') return <AccordionTypo $disabled={false}>Forever</AccordionTypo>;
    if (!allowanceInfo.expire) return <AccordionTypo $disabled={true}>Expiration</AccordionTypo>;
    if (allowanceInfo.type === 'at_height')
        return (
            <AccordionTypo className="clamp-single-line" $disabled={false}>
                {commaNumber(allowanceInfo.expire)} Block
            </AccordionTypo>
        );
    if (allowanceInfo.type === 'at_time') {
        const timeInMs = Math.floor(Number(allowanceInfo.expire) / 1000000);
        return (
            <AccordionTypo $disabled={false}>
                {format(timeInMs, 'MMMM-dd-yyyy HH:mm:ss a')}
            </AccordionTypo>
        );
    }

    return <></>;
};

const DecreaseAllowancePreview = () => {
    const userAddress = useSelector((v: rootState) => v.wallet.address);
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
    const [isOpen, setIsOpen] = useState<boolean>(true);

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
                setUpdatedAmount('0');
            }
        } catch (error) {
            console.log(error);
        }
    }, [allowance?.address]);

    useEffect(() => {
        const convertAmount = getUTokenAmountFromToken(
            allowance === null ? '0' : !allowance?.amount ? '0' : allowance?.amount,
            tokenInfo.decimals.toString()
        );
        setUpdatedAmount(subtractStringAmount(allowanceInfo === null ? '0' : allowanceInfo?.allowance, convertAmount));
    }, [allowance?.amount]);

    useEffect(() => {
        const convertAmount = getUTokenAmountFromToken(
            allowanceInfo === null ? '0' : !allowance?.amount ? '0' : allowance?.amount,
            tokenInfo.decimals.toString()
        );
        setUpdatedAmount(subtractStringAmount(allowanceInfo === null ? '0' : allowanceInfo?.allowance, convertAmount));
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
                        label: 'Decrease Allowance Amount',
                        value: getUTokenAmountFromToken(allowance.amount, tokenInfo.decimals.toString()),
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
        if (!allowance.type || (allowance.type !== 'never' && (!allowance.expire || !allowance.type))) return false;
        if (allowance.address.toLowerCase() === userAddress.toLowerCase()) return false;
        if (!allowance.amount || allowance.amount.replace(ONE_TO_MINE, '') === '') return false;

        return true;
    }, [addressExist, allowance?.amount, allowance?.expire, allowance?.type, allowance?.address, allowance?.amount, userAddress]);

    console.log('allowance', allowance);

    return (
        <Container>
            <ContentWrap>
                <ItemBox $isOpen={isOpen}>
                    <ItemWrap>
                        <ItemLabelWrap>
                            <ItemLabelIcon src={IC_COIN_STACK} alt={'Transfer Title Icon'} />
                            <ItemLabelTypo>Decrease Allowance Amount</ItemLabelTypo>
                        </ItemLabelWrap>
                        <ItemAmountWrap>
                            <ItemAmountTypo className="clamp-single-line">
                                {commaNumber(!allowance?.amount ? '0' : allowance.amount)}
                            </ItemAmountTypo>
                            <ItemAmountSymbolTypo>{tokenInfo.symbol}</ItemAmountSymbolTypo>
                            <ArrowToggleButton open={isOpen} onToggle={setIsOpen} />
                        </ItemAmountWrap>
                    </ItemWrap>
                    <AccordionBox $isOpen={isOpen}>
                        <AccordionRow>
                            <img src={IC_WALLET} alt="wallet" />
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '16px'
                                }}
                            >
                                <AccordionTypo
                                    $disabled={!allowance || !allowance?.address}
                                    data-tooltip-content={allowance?.address.length >= 25 ? allowance.address : ''}
                                    data-tooltip-id={TOOLTIP_ID.COMMON}
                                    data-tooltip-wrapper="span"
                                    data-tooltip-place="bottom"
                                >
                                    {allowance === null || allowance?.address === ''
                                        ? 'Wallet Address'
                                        : shortenAddress(allowance?.address, 16, 16)}
                                </AccordionTypo>
                                <AccordionValueWrap>
                                    <AccordionTypo className="clamp-single-line" $disabled={allowance === null || !Number(allowance.amount)}>
                                        {/* {commaNumber(allowance === null ? '0' : allowance?.amount) || 0} */}
                                        {commaNumber(!allowance || !allowance.amount ? '0' : allowance?.amount)}
                                    </AccordionTypo>
                                    <AccordionSymbolTypo>{tokenInfo.symbol}</AccordionSymbolTypo>
                                </AccordionValueWrap>
                            </div>
                        </AccordionRow>
                        <AccordionRow>
                            <img src={IC_CLOCK} alt="clock" />
                            <ExpirationBox allowanceInfo={allowance} />
                        </AccordionRow>
                    </AccordionBox>
                </ItemBox>
                <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" />
                <ItemWrap>
                    <ItemLabelWrap>
                        <CoinStack2Icon src={IC_COIN_STACK2} alt={'Update Balance Icon'} />

                        <UpdatedBalanceLabelTypo>Updated Balance</UpdatedBalanceLabelTypo>
                    </ItemLabelWrap>
                    <ItemLabelWrap>
                        <UpdatedBalanceTypo className="clamp-single-line">
                            {commaNumber(getTokenAmountFromUToken(updatedAmount, tokenInfo.decimals.toString()))}
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
