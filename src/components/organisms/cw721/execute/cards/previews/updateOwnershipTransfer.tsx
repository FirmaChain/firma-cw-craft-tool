import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_CLOCK, IC_REFRESH, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { format } from 'date-fns';
import GreenButton from '@/components/atoms/buttons/greenButton';
import commaNumber from 'comma-number';
import { IAllowanceInfo } from '@/components/organisms/execute/hooks/useExecuteStore';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { useModalStore } from '@/hooks/useModal';
import { CRAFT_CONFIGS } from '@/config';
import { isValidAddress } from '@/utils/address';
import { addNanoSeconds } from '@/utils/time';
import QRModal2, { ModalType } from '@/components/organisms/modal/qrModal2';
import TxModal from '@/components/organisms/modal/txModal';
import { shortenAddress } from '@/utils/common';
import { TOOLTIP_ID } from '@/constants/tooltip';
import TextEllipsis from '@/components/atoms/ellipsis';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { useSnackbar } from 'notistack';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
`;

const ContentWrap = styled.div<{ $isOpen: boolean }>`
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 32px 44px;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);

    transition: all 0.2s ease;

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
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const ExpirationBox = ({ allowanceInfo }: { allowanceInfo?: IAllowanceInfo | null }) => {
    if (!allowanceInfo) return <AccordionTypo $disabled>Expiration</AccordionTypo>;

    if (allowanceInfo.type === 'never') return <AccordionTypo $disabled={false}>Forever</AccordionTypo>;
    if (!allowanceInfo.expire) return <AccordionTypo $disabled={true}>Expiration</AccordionTypo>;
    if (allowanceInfo.type === 'at_height')
        return <AccordionTypo $disabled={false}>{commaNumber(allowanceInfo?.expire)} Block</AccordionTypo>;
    if (allowanceInfo.type === 'at_time') {
        const timeInMs = Math.floor(Number(allowanceInfo.expire));
        return <AccordionTypo $disabled={false}>{format(timeInMs, 'MMMM-dd-yyyy HH:mm:ss a')}</AccordionTypo>;
    }

    return <></>;
};

const USE_WALLET_CONNECT = CRAFT_CONFIGS.USE_WALLET_CONNECT;

const UpdateOwnershipTransferPreview = () => {
    const address = useSelector((v: rootState) => v.wallet.address);
    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const nftContractInfo = useCW721ExecuteStore((state) => state.nftContractInfo);
    // const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const fctBalance = useSelector((v: rootState) => v.wallet.fctBalance);
    const approveRecipientAddress = useCW721ExecuteStore((state) => state.approveRecipientAddress);
    const approveType = useCW721ExecuteStore((state) => state.approveType);
    const approveValue = useCW721ExecuteStore((state) => state.approveValue);
    const clearApproveForm = useCW721ExecuteStore((state) => state.clearApproveForm);

    const { enqueueSnackbar } = useSnackbar();

    const modal = useModalStore();

    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [convertType, setConvertType] = useState<string>('at_height');

    useEffect(() => {
        if (approveType === 'Time') {
            setConvertType('at_time');
        } else if (approveType === 'Height') {
            setConvertType('at_height');
        } else {
            setConvertType('never');
        }
    }, [approveType, approveValue]);

    const isEnableButton = useMemo(() => {
        if (
            approveRecipientAddress === '' ||
            !isValidAddress(approveRecipientAddress) ||
            approveRecipientAddress.toLowerCase() === address.toLowerCase()
        )
            return false;
        if (approveType === '') return false;
        if (approveType !== 'Forever' && approveValue === '') return false;

        return true;
    }, [approveRecipientAddress, approveType, approveValue, address]);

    const onClickUpdateOwnershipTransfer = () => {
        if (modal.modals.length >= 1) return;

        if (Number(fctBalance) === 0) {
            enqueueSnackbar({ message: 'Insufficient funds. Please check your account balance.', variant: 'error' });
            return;
        }

        let expires = {};
        let convertValue = '';

        if (convertType === 'at_height') {
            expires = {
                at_height: parseInt(approveValue)
            };
            convertValue = approveValue;
        } else if (convertType === 'at_time') {
            expires = {
                at_time: addNanoSeconds(approveValue).toString()
            };
            convertValue = addNanoSeconds(approveValue).toString();
        } else {
            expires = null;
            convertValue = null;
        }

        const feeAmount = CRAFT_CONFIGS.DEFAULT_FEE;

        const params = {
            modalType: 'EXECUTES' as ModalType,
            header: {
                title: 'Update Ownership Transfer'
            },
            txParams: {
                contract: contractAddress,
                msg: {
                    expiry: expires,
                    new_owner: approveRecipientAddress
                }
            },
            contentParams: {
                symbol: nftContractInfo.symbol,
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Recipient Address',
                        value: approveRecipientAddress,
                        type: 'wallet',
                        initColor: '#FFF',
                        resultColor: '#FFF'
                    },
                    {
                        label: 'Expiration',
                        value: convertValue,
                        type: convertType,
                        initColor: '#FFF',
                        resultColor: '#FFF'
                    }
                ]
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => {
                return !USE_WALLET_CONNECT ? (
                    <TxModal
                        module="/cw721/updateOwnershipTransfer"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearApproveForm();
                        }}
                        hideGotoDetail={false}
                    />
                ) : (
                    <QRModal2
                        module="/cw721/updateOwnershipTransfer"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearApproveForm();
                        }}
                        hideGotoDetail={false}
                    />
                );
            }
        });
    };

    return (
        <Container>
            <ContentWrap $isOpen={isOpen}>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src={IC_REFRESH} alt={'update-ownership-transfer'} />
                        <ItemLabelTypo>Update Ownership Transfer</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ArrowToggleButton open={isOpen} onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                <AccordionBox $isOpen={isOpen}>
                    <AccordionRow>
                        <img src={IC_WALLET} alt="wallet" />
                        {approveRecipientAddress === '' && <AccordionTypo $disabled>Wallet Address</AccordionTypo>}
                        {approveRecipientAddress !== '' && (
                            <TextEllipsis CustomDiv={AccordionTypo} text={approveRecipientAddress} breakMode={'letters'} />
                        )}
                    </AccordionRow>
                    <AccordionRow>
                        <img src={IC_CLOCK} alt="clock" />
                        <ExpirationBox allowanceInfo={{ address: '', amount: '', type: convertType, expire: approveValue }} />
                    </AccordionRow>
                </AccordionBox>
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickUpdateOwnershipTransfer}>
                    <div className="button-text">Update Ownership Transfer</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default UpdateOwnershipTransferPreview;
