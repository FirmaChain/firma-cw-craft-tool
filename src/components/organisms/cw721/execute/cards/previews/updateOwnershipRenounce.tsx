import ColorButton from '@/components/atoms/buttons/colorButton';
import { useModalStore } from '@/hooks/useModal';
import styled from 'styled-components';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { IC_WARNING } from '@/components/atoms/icons/pngIcons';
import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';
import { GlobalActions } from '@/redux/actions';
import { useSnackbar } from 'notistack';
import { sleep } from '@/utils/common';
import QRModal2, { ModalType } from '@/components/organisms/modal/qrModal2';
import TxModal from '@/components/organisms/modal/txModal';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
    align-items: center;
`;

const WarningTextWrap = styled.div`
    display: flex;
    padding: 12px 20px;
    gap: 16px;
    width: 100%;
    border-radius: 8px;
    background: rgba(229, 82, 80, 0.2);
`;

const WarningIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const WarningTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 137.5% */
    white-space: pre-wrap;
`;

const USE_WALLET_CONNECT = CRAFT_CONFIGS.USE_WALLET_CONNECT;

const UpdateOwnershipRenouncePreview = () => {
    const WARNING_TEXT: string = `If you renounce ownership of the NFT contract, the contract will stay active,\nbut you’ll lose control, and the Minter role will be removed.`;
    const WARNING_MODAL_TEXT: string = `Are you sure you want to renounce ownership of the NFT contract?\nBy renouncing, you'll lose control and the Minter role will be removed.`;

    const isInit = useSelector((state: rootState) => state.wallet.isInit);
    const address = useSelector((state: rootState) => state.wallet.address);

    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    // const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const fctBalance = useSelector((v: rootState) => v.wallet.fctBalance);
    const ownershipInfo = useCW721ExecuteStore((state) => state.ownershipInfo);

    const { setMinter, setOwnershipInfo } = useCW721ExecuteAction();
    const { enqueueSnackbar } = useSnackbar();

    const onClickConfirm = async () => {
        GlobalActions.handleGlobalLoading(true);

        await sleep(200);

        try {
            useCW721ExecuteStore.getState().setSelectMenu({
                value: 'select',
                label: 'Select'
            });
            await sleep(400);
            await setMinter(contractAddress);
            await sleep(600);
            await setOwnershipInfo(contractAddress);
            await sleep(600);
        } catch (error) {
            console.log(error);
            enqueueSnackbar({ variant: 'error', message: 'Update contract info failed.' });
        } finally {
            GlobalActions.handleGlobalLoading(false);
        }
    };

    const modal = useModalStore();

    const isEnableButton = useMemo(() => {
        if (ownershipInfo && ownershipInfo.owner === address) return true;

        // CHECK DATE & BLOCK HEIGHT
        return false;
    }, [ownershipInfo, address]);

    const onClickRenounce = () => {
        if (modal.modals.length >= 1) return;

        if (Number(fctBalance) === 0) {
            enqueueSnackbar({ message: 'Insufficient funds. Please check your account balance.', variant: 'error' });
            return;
        }

        const feeAmount = CRAFT_CONFIGS.DEFAULT_FEE;

        const params = {
            modalType: 'EXECUTES' as ModalType,
            header: {
                title: 'Update Ownership Renounce'
            },
            txParams: {
                contract: contractAddress,
                msg: { update: 'renounce_ownership' }
            },
            contentParams: {
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Warning :',
                        value: WARNING_MODAL_TEXT,
                        type: 'warning',
                        initColor: '',
                        resultColor: ''
                    }
                ]
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => {
                return !USE_WALLET_CONNECT ? (
                    <TxModal
                        module="/cw721/updateOwnershipRenounce"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            onClickConfirm();
                        }}
                    />
                ) : (
                    <QRModal2
                        module="/cw721/updateOwnershipRenounce"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            onClickConfirm();
                        }}
                    />
                );
            }
        });
    };

    return (
        <Container>
            <WarningTextWrap>
                <WarningIcon src={IC_WARNING} alt={'Preview Warning Icon'} />
                <WarningTypo>{WARNING_TEXT}</WarningTypo>
            </WarningTextWrap>
            <ColorButton
                width={'168px'}
                height={'40px'}
                color={isEnableButton ? '#E55250B3' : '#707070'}
                text={!isInit ? 'Connect Wallet' : 'Renounce'}
                sx={{ color: '#121212', fontStyle: 'normal', fontSize: '14px', fontWeight: 600 }}
                onClick={onClickRenounce}
                disabled={!isEnableButton}
            />
        </Container>
    );
};

export default UpdateOwnershipRenouncePreview;
