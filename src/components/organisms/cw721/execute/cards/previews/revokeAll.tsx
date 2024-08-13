import { useMemo, useState } from 'react';
import styled from 'styled-components';

import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_WALLET } from '@/components/atoms/icons/pngIcons';
import GreenButton from '@/components/atoms/buttons/greenButton';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { useModalStore } from '@/hooks/useModal';
import { isValidAddress } from '@/utils/address';
import { CRAFT_CONFIGS } from '@/config';
import { QRCodeModal } from '@/components/organisms/modal';

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

const RevokeAllPreview = () => {
    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const nftContractInfo = useCW721ExecuteStore((state) => state.nftContractInfo);
    const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const revokeAddress = useCW721ExecuteStore((state) => state.revokeAddress);
    const clearRevokeForm = useCW721ExecuteStore((state) => state.clearRevokeForm);

    const modal = useModalStore();

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const isEnableButton = useMemo(() => {
        if (revokeAddress === '' || !isValidAddress(revokeAddress)) return false;

        return true;
    }, [revokeAddress]);

    const onClickRevokeAll = () => {
        const feeAmount = CRAFT_CONFIGS.DEFAULT_FEE;

        const params = {
            header: {
                title: 'Revoke All'
            },
            content: {
                symbol: nftContractInfo.symbol,
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Recipient Address',
                        value: revokeAddress,
                        type: 'wallet'
                    }
                ]
            },
            contract: contractAddress,
            msg: {
                operator: revokeAddress
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <QRCodeModal
                    module="/cw721/revokeAll"
                    id={id}
                    params={params}
                    onClickConfirm={() => {
                        clearRevokeForm();
                    }}
                />
            )
        });
    };

    return (
        <Container>
            <ContentWrap $isOpen={isOpen}>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src="/assets/icon/ic_reverse_left.png" alt={'revoke-nft'} />
                        <ItemLabelTypo>Revoke All NFTs</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ArrowToggleButton open={isOpen} onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                <AccordionBox $isOpen={isOpen}>
                    <AccordionRow>
                        <img src={IC_WALLET} alt="wallet" />
                        {revokeAddress === '' && <AccordionTypo $disabled>Wallet Address</AccordionTypo>}
                        {revokeAddress !== '' && <AccordionTypo $disabled={false}>{revokeAddress}</AccordionTypo>}
                    </AccordionRow>
                </AccordionBox>
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickRevokeAll}>
                    <div className="button-text">Revoke All</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default RevokeAllPreview;
