import { useMemo } from 'react';

import styled from 'styled-components';

import useModalStore from '@/store/modalStore';
import { CRAFT_CONFIGS } from '@/config';

import { IC_COIN_STACK, IC_COIN_STACK2 } from '@/components/atoms/icons/pngIcons';
import {
    compareStringNumbers,
    formatWithCommas,
    getTokenAmountFromUToken,
    getUTokenAmountFromToken,
    subtractStringAmount
} from '@/utils/balance';
// import useExecuteStore from '../../hooks/useExecuteStore';
import Divider from '@/components/atoms/divider';
import GreenButton from '@/components/atoms/buttons/greenButton';
import useExecuteActions from '../../action';
import QRModal2, { ModalType } from '@/components/organisms/modal/qrModal2';
import TxModal from '@/components/organisms/modal/txModal';
import TextEllipsis from '@/components/atoms/ellipsis';
import { useSnackbar } from 'notistack';
import IconTooltip from '@/components/atoms/tooltip';
import { useCW20Execute } from '@/context/cw20ExecuteContext';
import useWalletStore from '@/store/walletStore';

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
    gap: 16px;
`;

const ItemLeftWrap = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;

const CoinStackIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const BurnInfoTitleTypo = styled.div`
    color: #02e191;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */

    opacity: 0.8;
    white-space: pre;
`;

const ItemRightWrap = styled.div`
    display: flex;
    gap: 8px;
`;

const BurnAmountTypo = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const BurnSymbolTypo = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
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

const USE_WALLET_CONNECT = CRAFT_CONFIGS.USE_WALLET_CONNECT;

const BurnPreview = () => {
    const { address, fctBalance } = useWalletStore();
    // const address = useSelector((v: rootState) => v.wallet.address);
    // const fctBalance = useSelector((v: rootState) => v.wallet.fctBalance);

    const context = useCW20Execute();
    const admin = context.contractInfo?.contract_info?.admin;
    const contractAddress = context.contractAddress;
    // const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const cw20Balance = context.cw20Balance;
    const burnAmount = context.burnAmount || '0';
    const tokenInfo = context.tokenInfo;
    const clearBurn = context.clearBurn;

    const { setCw20Balance, setTokenInfo } = useExecuteActions();

    const { enqueueSnackbar } = useSnackbar();

    const modal = useModalStore();

    const updatedBalance = useMemo(() => {
        let amount = '0';

        amount = subtractStringAmount(getTokenAmountFromUToken(cw20Balance, String(tokenInfo.decimals)), burnAmount);

        return amount;
    }, [cw20Balance, burnAmount]);

    const hideGotoDetail = address !== admin;

    const onClickBurn = () => {
        if (modal.modals.length >= 1) return;

        if (Number(fctBalance) === 0) {
            enqueueSnackbar({ message: 'Insufficient funds. Please check your account balance.', variant: 'error' });
            return;
        }

        const feeAmount = CRAFT_CONFIGS.DEFAULT_FEE;
        const amount = getUTokenAmountFromToken(burnAmount, tokenInfo.decimals.toString());

        const params = {
            modalType: 'EXECUTES' as ModalType,
            header: {
                title: 'Burn'
            },
            txParams: {
                contract: contractAddress,
                msg: {
                    amount
                }
            },
            contentParams: {
                symbol: tokenInfo.symbol,
                decimals: tokenInfo.decimals.toString(),
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Total Burn Amount',
                        value: amount,
                        type: 'execute_amount',
                        initColor: '#02E191',
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
                        id={id}
                        module={'/cw20/burnToken'}
                        params={params}
                        onClickConfirm={() => {
                            clearBurn();
                            setCw20Balance(contractAddress, address);
                            setTokenInfo(contractAddress);
                        }}
                        hideGotoDetail={hideGotoDetail}
                    />
                ) : (
                    <QRModal2
                        module="/cw20/burnToken"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearBurn();
                            setCw20Balance(contractAddress, address);
                            setTokenInfo(contractAddress);
                        }}
                        hideGotoDetail={hideGotoDetail}
                    />
                );
            }
        });
    };

    const isEnableButton = useMemo(() => {
        if (compareStringNumbers(fctBalance, CRAFT_CONFIGS.DEFAULT_FEE.toString()) !== 1) return false;

        if (cw20Balance === '' || cw20Balance === '0') return false;
        if (burnAmount === '' || burnAmount === '0' || Number(burnAmount) === 0) return false;

        return true;
    }, [cw20Balance, burnAmount]);

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLeftWrap>
                        <CoinStackIcon src={IC_COIN_STACK} alt={'Burn Title Icon'} />
                        <BurnInfoTitleTypo>Total Burn Amount</BurnInfoTitleTypo>
                    </ItemLeftWrap>
                    <ItemRightWrap>
                        <TextEllipsis
                            CustomDiv={BurnAmountTypo}
                            text={formatWithCommas(burnAmount !== null ? burnAmount : '0')}
                            breakMode={'letters'}
                        />
                        {/* <BurnAmountTypo className="clamp-single-line">
                            {formatWithCommas(burnAmount !== null ? burnAmount : '0')}
                        </BurnAmountTypo> */}
                        <BurnSymbolTypo>{tokenInfo.symbol}</BurnSymbolTypo>
                    </ItemRightWrap>
                </ItemWrap>
                <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" />
                <ItemWrap>
                    <ItemLeftWrap>
                        <CoinStack2Icon src={IC_COIN_STACK2} alt={'Burn Update Balance Icon'} />
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                            <UpdatedBalanceLabelTypo>Updated Balance</UpdatedBalanceLabelTypo>
                            <IconTooltip
                                size="14px"
                                tooltip={'This is the expected balance after the transaction. Make sure to double check before execution.'}
                            />
                        </div>
                    </ItemLeftWrap>
                    <ItemRightWrap>
                        <TextEllipsis CustomDiv={UpdatedBalanceTypo} text={formatWithCommas(updatedBalance)} breakMode={'letters'} />
                        {/* <UpdatedBalanceTypo className="clamp-single-line">{formatWithCommas(updatedBalance)}</UpdatedBalanceTypo> */}
                        <UpdatedSymbolTypo>{tokenInfo.symbol}</UpdatedSymbolTypo>
                    </ItemRightWrap>
                </ItemWrap>
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickBurn}>
                    <div className="button-text">Burn</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default BurnPreview;
