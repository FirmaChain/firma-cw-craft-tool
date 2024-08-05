import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_CLOCK, IC_REFRESH, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { format } from 'date-fns';
import GreenButton from '@/components/atoms/buttons/greenButton';
import commaNumber from 'comma-number';
import { IAllowanceInfo } from '@/components/organisms/execute/hooks/useExecuteStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { useModalStore } from '@/hooks/useModal';
import { CRAFT_CONFIGS } from '@/config';
import { isValidAddress } from '@/utils/address';
import { addNanoSeconds } from '@/utils/time';
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

    opacity: 0.8;
`;

const ItemAmountWrap = styled.div`
    display: flex;
    gap: 8px;
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
    if (allowanceInfo.type === 'at_time')
        return (
            <AccordionTypo $disabled={false}>
                {format(new Date(Math.floor(Number(allowanceInfo.expire))), 'yyyy-MM-dd HH:mm:ss')}
            </AccordionTypo>
        );

    return <></>;
};

const UpdateOwnershipTransferPreview = () => {
    const network = useSelector((state: rootState) => state.global.network);

    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const nftContractInfo = useCW721ExecuteStore((state) => state.nftContractInfo);
    const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const approveRecipientAddress = useCW721ExecuteStore((state) => state.approveRecipientAddress);
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

    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

    const isEnableButton = useMemo(() => {
        if (approveRecipientAddress === '' || !isValidAddress(approveRecipientAddress)) return false;
        if (approveType === '') return false;
        if (approveType !== 'Forever' && approveValue === '') return false;

        return true;
    }, [approveRecipientAddress, approveType, approveValue]);

    const onClickUpdateOwnershipTransfer = () => {
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

        const feeAmount = craftConfig.DEFAULT_FEE;

        const params = {
            header: {
                title: 'Update Ownership Transfer'
            },
            content: {
                symbol: nftContractInfo.symbol,
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Recipient Address',
                        value: approveRecipientAddress,
                        type: 'wallet'
                    },
                    {
                        label: 'Expiration',
                        value: convertValue,
                        type: convertType
                    }
                ]
            },
            contract: contractAddress,
            msg: {
                expiry: expires,
                new_owner: approveRecipientAddress
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <QRCodeModal
                    module="/cw721/updateOwnershipTransfer"
                    id={id}
                    params={params}
                    onClickConfirm={() => {
                        clearApproveForm();
                    }}
                />
            )
        });
    };

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src={IC_REFRESH} alt={'update-ownership-transfer'} />
                        <ItemLabelTypo>Update Ownership Transfer</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ArrowToggleButton open={isOpen} onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                {isOpen && (
                    <AccordionBox>
                        <AccordionRow>
                            <img src={IC_WALLET} alt="wallet" />
                            {approveRecipientAddress === '' && <AccordionTypo $disabled>Wallet Address</AccordionTypo>}
                            {approveRecipientAddress !== '' && <AccordionTypo $disabled={false}>{approveRecipientAddress}</AccordionTypo>}
                        </AccordionRow>
                        <AccordionRow>
                            <img src={IC_CLOCK} alt="clock" />
                            <ExpirationBox allowanceInfo={{ address: '', amount: '', type: convertType, expire: approveValue }} />
                        </AccordionRow>
                    </AccordionBox>
                )}
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
