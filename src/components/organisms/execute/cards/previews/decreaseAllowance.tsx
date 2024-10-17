import { useMemo, useState } from 'react';
import styled from 'styled-components';

import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_CLOCK, IC_COIN_STACK, IC_COIN_STACK2, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { compareStringNumbers, getTokenAmountFromUToken, getUTokenAmountFromToken } from '@/utils/balance';
import { isValidAddress, shortenAddress } from '@/utils/address';
import useExecuteStore, { IAllowanceInfo } from '../../hooks/useExecuteStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { useModalStore } from '@/hooks/useModal';
import Divider from '@/components/atoms/divider';
import { format } from 'date-fns';
import GreenButton from '@/components/atoms/buttons/greenButton';
import commaNumber from 'comma-number';
import { ONE_TO_MINE } from '@/constants/regex';
import { TOOLTIP_ID } from '@/constants/tooltip';
import QRModal2, { ModalType } from '@/components/organisms/modal/qrModal2';
import TxModal from '@/components/organisms/modal/txModal';
import TextEllipsis from '@/components/atoms/ellipsis';
import { useSnackbar } from 'notistack';

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

    ${({ $isOpen }) =>
        $isOpen
            ? `
        max-height: 100%;
        padding: 24px 32px;
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
    font-family: 'General Sans Variable';
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
        return <AccordionTypo $disabled={false}>{format(timeInMs, 'MMMM-dd-yyyy HH:mm:ss a')}</AccordionTypo>;
    }

    return <></>;
};

const USE_WALLET_CONNECT = CRAFT_CONFIGS.USE_WALLET_CONNECT;

const DecreaseAllowancePreview = () => {
    const address = useSelector((state: rootState) => state.wallet.address);
    const admin = useExecuteStore((state) => state.contractInfo?.contract_info?.admin);

    const contractAddress = useExecuteStore((state) => state.contractAddress);
    // const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const fctBalance = useSelector((v: rootState) => v.wallet.fctBalance);
    const allowanceInfo = useExecuteStore((state) => state.allowanceInfo);
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);
    const allowance = useExecuteStore((state) => state.allowance);

    const setIsFetched = useExecuteStore((v) => v.setIsFetched);
    const clearAllowance = useExecuteStore((v) => v.clearAllowance);
    const clearAllowanceInfo = useExecuteStore((v) => v.clearAllowanceInfo);

    const { enqueueSnackbar } = useSnackbar();

    const modal = useModalStore();

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const addressExist = useMemo(() => {
        return isValidAddress(allowance?.address);
    }, [allowance?.address]);

    const updatedAmount = useMemo(() => {
        const _currentAllowance = !isValidAddress(allowance?.address)
            ? BigInt(0)
            : allowanceInfo?.allowance
              ? BigInt(allowanceInfo.allowance)
              : BigInt(0);

        const _reduceAmount = allowance?.amount
            ? BigInt(getUTokenAmountFromToken(allowance?.amount, String(tokenInfo.decimals)))
            : BigInt(0);

        return String(_currentAllowance - _reduceAmount);
    }, [allowance, allowanceInfo, tokenInfo]);

    const hideGotoDetail = address !== admin;

    const onClickDecreaseAllowance = () => {
        if (modal.modals.length >= 1) return;

        if (Number(fctBalance) === 0) {
            enqueueSnackbar({ message: 'Insufficient funds. Please check your account balance.', variant: 'error' });
            return;
        }

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

        const feeAmount = CRAFT_CONFIGS.DEFAULT_FEE;

        const params = {
            modalType: 'EXECUTES' as ModalType,
            header: {
                title: 'Decrease Allowance'
            },
            txParams: {
                contract: contractAddress,
                msg: {
                    amount: getUTokenAmountFromToken(allowance.amount, tokenInfo.decimals.toString()),
                    expires: expires,
                    spender: allowance.address
                }
            },
            contentParams: {
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                decimals: tokenInfo.decimals.toString(),
                symbol: tokenInfo.symbol,
                list: [
                    {
                        label: 'Decrease Allowance Amount',
                        value: getUTokenAmountFromToken(allowance.amount, tokenInfo.decimals.toString()),
                        type: 'execute_amount',
                        initColor: '#02E191',
                        resultColor: '#E6E6E6'
                    },
                    {
                        label: 'Recipient Address',
                        value: allowance.address,
                        type: 'wallet',
                        initColor: '#E6E6E6',
                        resultColor: '#E6E6E6'
                    },
                    {
                        label: 'Expiration',
                        value: allowance.expire,
                        type: allowance.type,
                        initColor: '#E6E6E6',
                        resultColor: '#E6E6E6'
                    }
                ]
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => {
                return !USE_WALLET_CONNECT ? (
                    <TxModal
                        module="/cw20/decreaseAllowance"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearAllowanceInfo();
                            setIsFetched(true);
                            clearAllowance();
                        }}
                        hideGotoDetail={hideGotoDetail}
                    />
                ) : (
                    <QRModal2
                        module="/cw20/decreaseAllowance"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearAllowanceInfo();
                            setIsFetched(true);
                            clearAllowance();
                        }}
                        hideGotoDetail={hideGotoDetail}
                    />
                );
            }
        });
    };

    const isEnableButton = useMemo(() => {
        if (!addressExist || allowanceInfo === null) return false;
        if (!allowance) return false;
        if (!allowance.type || (allowance.type !== 'never' && (!allowance.expire || !allowance.type))) return false;
        if (allowance.address.toLowerCase() === address.toLowerCase()) return false;
        if (!allowance.amount || allowance.amount.replace(ONE_TO_MINE, '') === '') return false;
        if (compareStringNumbers(updatedAmount, '0') === -1) return false;

        return true;
    }, [addressExist, allowanceInfo, allowance, address]);

    return (
        <Container>
            <ContentWrap>
                <ItemBox $isOpen={isOpen}>
                    <ItemWrap>
                        <ItemLabelWrap>
                            <ItemLabelIcon src={IC_COIN_STACK} alt={'Transfer Title Icon'} />
                            <ItemLabelTypo>Decrease Allowance Amount</ItemLabelTypo>
                        </ItemLabelWrap>
                        <ItemAmountWrap style={{ alignItems: 'center', gap: '12px' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                                <TextEllipsis
                                    CustomDiv={ItemAmountTypo}
                                    text={commaNumber(!allowance?.amount ? '0' : allowance.amount)}
                                    breakMode={'letters'}
                                />
                                <ItemAmountSymbolTypo>{tokenInfo.symbol}</ItemAmountSymbolTypo>
                            </div>
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
                                    style={{ whiteSpace: 'pre' }}
                                >
                                    {allowance === null || allowance?.address === ''
                                        ? 'Wallet Address'
                                        : shortenAddress(allowance?.address, 16, 16)}
                                </AccordionTypo>
                                <AccordionValueWrap>
                                    <TextEllipsis
                                        CustomDiv={AccordionTypo}
                                        text={commaNumber(!allowance || !allowance.amount ? '0' : allowance?.amount)}
                                        breakMode={'letters'}
                                        customDivProps={{
                                            $disabled: allowance === null || !Number(allowance.amount)
                                        }}
                                    />
                                    {/* <AccordionTypo
                                        className="clamp-single-line"
                                        $disabled={allowance === null || !Number(allowance.amount)}
                                    >
                                        {commaNumber(!allowance || !allowance.amount ? '0' : allowance?.amount)}
                                    </AccordionTypo> */}
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
                    <ItemLabelWrap style={{ gap: '8px' }}>
                        <TextEllipsis
                            CustomDiv={UpdatedBalanceTypo}
                            text={commaNumber(getTokenAmountFromUToken(updatedAmount, tokenInfo.decimals.toString()))}
                            breakMode={'letters'}
                        />
                        {/* <UpdatedBalanceTypo className="clamp-single-line">
                            {commaNumber(getTokenAmountFromUToken(updatedAmount, tokenInfo.decimals.toString()))}
                        </UpdatedBalanceTypo> */}
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
