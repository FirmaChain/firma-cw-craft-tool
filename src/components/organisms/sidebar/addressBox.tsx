import IconButton from '@/components/atoms/buttons/iconButton';
import { AddressCard, AddressText } from './style';
import Icons from '@/components/atoms/icons';
import { copyToClipboard, shortenAddress } from '@/utils/common';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import Divider from '@/components/atoms/divider';
import styled from 'styled-components';
import { IC_LOG_OUT } from '@/components/atoms/icons/pngIcons';
import { useEffect, useState } from 'react';

import { formatWithCommas, getTokenAmountFromUToken } from '@/utils/balance';
import Skeleton from '@/components/atoms/skeleton';
import { GlobalActions, WalletActions } from '@/redux/actions';
import { persistor } from '@/redux';
import useResetStoreData from '@/hooks/useResetStoreData';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';

const BalanceBox = styled(AddressCard)<{ $isOpen: boolean }>`
    position: absolute;
    z-index: 1;

    margin-top: 6px;
    background: var(--Gray-200, #1a1a1a);
    flex-direction: column;
    gap: 10px;
    transition: all 0.3s ease;
    overflow: hidden;
    height: fit-content;

    ${({ $isOpen }) =>
        $isOpen
            ? `
        max-height: 500px;
        padding: 10px;
    `
            : `
        max-height: 0px;
        padding: 0 10px;
        border: 0px solid transparent;
    `}

    .bg-box {
        border-radius: 4px;
        background: var(--Gray-350, #262626);
        width: 100%;
        display: flex;
        gap: 2px;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        padding: 8px 0;
    }

    .title {
        color: var(--Gray-650, #707070);
        text-align: center;

        /* Body/Caption */
        font-family: 'General Sans Variable';
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 12px; /* 120% */
    }

    .balance-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 2px;
    }

    .balance {
        color: var(--Gray-900, var(--Primary-Base-White, #fff));

        /* Body/Caption */
        font-family: 'General Sans Variable';
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 12px; /* 120% */

        padding-right: 2px;
    }
`;

const DisconnectBtn = styled(IconButton)`
    width: 100%;
    height: 18px;
    padding: 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 6px;

    .typo {
        color: var(--Gray-800, #dcdcdc);

        /* Body/Body4 - Md */
        font-family: 'General Sans Variable';
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 14px; /* 116.667% */
    }
`;

const BalanceTitleTypo = styled.div`
    color: var(--Gray-650, #707070);
    text-align: center;
    font-family: "General Sans Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
`;

const BalanceAmountTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #FFF));
    font-family: "General Sans Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
`;

const AddressBox = () => {
    const { address } = useSelector((state: rootState) => state.wallet);
    const { cwMode, isFetchedBalance } = useSelector((state: rootState) => state.global);

    const navigate = useNavigate();
    const location = useLocation();

    const { enqueueSnackbar } = useSnackbar();
    const { resetAll } = useResetStoreData();

    const { firmaSDK } = useFirmaSDKContext();

    const [balance, setBalance] = useState<string>('');
    const [open, setOpen] = useState(false);

    const onClickAddress = async (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        const errorMessage = await copyToClipboard(address);

        if (errorMessage) enqueueSnackbar({ variant: 'error', message: errorMessage });
        else enqueueSnackbar({ variant: 'success', message: 'Copied!', key: 'COPIED' });
    };

    const onClickLogout = () => {
        persistor.purge();
        resetAll();
        WalletActions.clearStore();

        switch (cwMode) {
            case 'CW20':
                if (location.pathname.includes('instantiate')) {
                    navigate(`/instantiate`);
                } else if (location.pathname.includes('execute')) {
                    navigate(`/execute`);
                } else if (location.pathname.includes('search')) {
                    navigate(`/search`);
                } else if (location.pathname.includes('mytoken')) {
                    navigate(`/mytoken`);
                }
                break;

            case 'CW721':
                if (location.pathname.includes('instantiate')) {
                    navigate(`/cw721/instantiate`);
                } else if (location.pathname.includes('execute')) {
                    navigate(`/cw721/execute`);
                } else if (location.pathname.includes('search')) {
                    navigate(`/cw721/search`);
                } else if (location.pathname.includes('mynft')) {
                    navigate(`/cw721/mynft`);
                }
                break;
        }
    };

    const getBalance = async () => {
        const balance = await firmaSDK.Bank.getBalance(address?.toLowerCase());
        setBalance(balance);
    };

    useEffect(() => {
        getBalance();
        GlobalActions.handleFetchedBalance(false);
    }, [isFetchedBalance]);

    return (
        <div style={{ position: 'relative' }}>
            <IconButton style={{ padding: 0 }} onClick={() => setOpen(!open)}>
                {/* <IconButton style={{ padding: 0 }} onClick={onClickAddress}> */}
                <AddressCard>
                    <AddressText>{shortenAddress(address, 8, 6)}</AddressText>
                    <div style={{ display: 'flex' }} onClick={onClickAddress}>
                        <Icons.Copy width="20px" height="20px" fill="#FFFFFF" />
                    </div>
                </AddressCard>
            </IconButton>
            <BalanceBox $isOpen={open}>
                <div className="bg-box" style={{}}>
                    <BalanceTitleTypo>Balance :</BalanceTitleTypo>
                    <div className="balance-box">
                        {balance ? (
                            <BalanceAmountTypo>{formatWithCommas(getTokenAmountFromUToken(balance, '6'))}</BalanceAmountTypo>
                        ) : (
                            <Skeleton width="80px" height="12px" />
                        )}
                        <Icons.FirmaChain width="12px" height="12px" fill="#FFFFFF" />
                    </div>
                </div>

                <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-450, #313131)" />
                <DisconnectBtn onClick={onClickLogout}>
                    <img src={IC_LOG_OUT} alt="logout" style={{ width: '14px' }} />
                    <div className="typo">Disconnect</div>
                </DisconnectBtn>
            </BalanceBox>
        </div>
    );
};

export default AddressBox;
