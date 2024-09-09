import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_CLOCK, IC_COINS_HAND, IC_ID_CIRCLE, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { format } from 'date-fns';
import GreenButton from '@/components/atoms/buttons/greenButton';
import commaNumber from 'comma-number';
import { IAllowanceInfo } from '@/components/organisms/execute/hooks/useExecuteStore';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { isValidAddress } from '@/utils/address';
import { CRAFT_CONFIGS } from '@/config';
import { useModalStore } from '@/hooks/useModal';
import { addNanoSeconds } from '@/utils/time';
import QRModal2, { ModalType } from '@/components/organisms/modal/qrModal2';
import TxModal from '@/components/organisms/modal/txModal';

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

    transition: all 0.2s all;

    ${({ $isOpen }) => $isOpen ? `
        gap: 24px;
    `: `
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
    gap: 20px;

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
        return (
            <AccordionTypo $disabled={false}>
                {format(timeInMs, 'MMMM-dd-yyyy HH:mm:ss a')}
            </AccordionTypo>
        );
    }

    return <></>;
};

const USE_WALLET_CONNECT = CRAFT_CONFIGS.USE_WALLET_CONNECT;

const ApprovePreview = () => {
    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const nftContractInfo = useCW721ExecuteStore((state) => state.nftContractInfo);
    const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const approveRecipientAddress = useCW721ExecuteStore((state) => state.approveRecipientAddress);
    const approveTokenId = useCW721ExecuteStore((state) => state.approveTokenId);
    const approveType = useCW721ExecuteStore((state) => state.approveType);
    const approveValue = useCW721ExecuteStore((state) => state.approveValue);
    const clearApproveForm = useCW721ExecuteStore((state) => state.clearApproveForm);

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
        if (approveRecipientAddress === '' || !isValidAddress(approveRecipientAddress)) return false;
        if (approveTokenId === '' || approveTokenId === '0') return false;
        if (approveType === '') return false;
        if (approveType !== 'Forever' && approveValue === '') return false;

        return true;
    }, [approveRecipientAddress, approveTokenId, approveType, approveValue]);

    const onClickApprove = () => {
        if (modal.modals.length >= 1) return ;
        
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
                title: 'Approve'
            },
            txParams: {
                contract: contractAddress,
                msg: {
                    expires: expires,
                    spender: approveRecipientAddress,
                    token_id: approveTokenId
                }
            },
            contentParams: {
                symbol: nftContractInfo.symbol,
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Token ID',
                        value: approveTokenId,
                        type: 'nft_id',
                        initColor: '#02E191',
                        resultColor: '#FFF'
                    },
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
            },
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => {
                return !USE_WALLET_CONNECT ? (
                    <TxModal
                        module="/cw721/approve"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearApproveForm();
                        }}
                    />
                ) : (
                    <QRModal2
                        module="/cw721/approve"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearApproveForm();
                        }}
                    />
                )
            }
        });
    };

    return (
        <Container>
            <ContentWrap $isOpen={isOpen}>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src={IC_COINS_HAND} alt={'approve-nft'} />
                        <ItemLabelTypo>Approve NFT</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ArrowToggleButton open={isOpen} onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                <AccordionBox $isOpen={isOpen}>
                    <AccordionRow>
                        <img src={IC_WALLET} alt="wallet" />
                        {approveRecipientAddress === '' && <AccordionTypo $disabled>Wallet Address</AccordionTypo>}
                        {approveRecipientAddress !== '' && <AccordionTypo $disabled={false}>{approveRecipientAddress}</AccordionTypo>}
                    </AccordionRow>
                    <AccordionRow>
                        <img src={IC_ID_CIRCLE} alt="token-id" />
                        {approveTokenId === '' && <AccordionTypo $disabled>Token ID</AccordionTypo>}
                        {approveTokenId !== '' && <AccordionTypo $disabled={false}>{approveTokenId}</AccordionTypo>}
                    </AccordionRow>
                    <AccordionRow>
                        <img src={IC_CLOCK} alt="clock" />
                        <ExpirationBox allowanceInfo={{ address: '', amount: '', type: convertType, expire: approveValue }} />
                    </AccordionRow>
                </AccordionBox>
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickApprove}>
                    <div className="button-text">Approve</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default ApprovePreview;
