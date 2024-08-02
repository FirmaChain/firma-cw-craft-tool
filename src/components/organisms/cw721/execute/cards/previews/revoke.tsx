import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_ID_CIRCLE, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import GreenButton from '@/components/atoms/buttons/greenButton';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { useModalStore } from '@/hooks/useModal';
import { isValidAddress } from '@/utils/address';
import { QRCodeModal } from '@/components/organisms/modal';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';

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

const RevokePreview = () => {
    const network = useSelector((state: rootState) => state.global.network);
    const address = useSelector((state: rootState) => state.wallet.address);

    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const nftContractInfo = useCW721ExecuteStore((state) => state.nftContractInfo);
    const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const revokeAddress = useCW721ExecuteStore((state) => state.revokeAddress);
    const revokeTokenId = useCW721ExecuteStore((state) => state.revokeTokenId);
    const nftApprovalInfo = useCW721ExecuteStore((state) => state.nftApprovalInfo);
    const myNftList = useCW721ExecuteStore((state) => state.myNftList);
    const clearRevokeForm = useCW721ExecuteStore((state) => state.clearRevokeForm);
    
    const modal = useModalStore();
    
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isEnableButton, setIsEnableButton] = useState<boolean>(false);

    useEffect(() => {
        if (revokeTokenId === '') {
            setIsEnableButton(false);
        } else {
            if (myNftList.includes(revokeTokenId)) {
                if (nftApprovalInfo.spender === '' && nftApprovalInfo.expires === null) {
                    setIsEnableButton(false);
                } else if (nftApprovalInfo.spender === revokeAddress && nftApprovalInfo.expires !== null) {
                    setIsEnableButton(true);
                }
            } else {
                setIsEnableButton(false);
            }
        }
    }, [revokeAddress, revokeTokenId, nftApprovalInfo]);
    
    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

    const onClickRevoke = () => {
        const feeAmount = craftConfig.DEFAULT_FEE;

        const params = {
            header: {
                title: 'Revoke'
            },
            content: {
                symbol: nftContractInfo.symbol,
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Token ID',
                        value: revokeTokenId,
                        type: 'nft_id'
                    },
                    {
                        label: 'Recipient Address',
                        value: revokeAddress,
                        type: 'wallet'
                    },
                ]
            },
            contract: contractAddress,
            msg: {
                spender: revokeAddress,
                token_id: revokeTokenId
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <QRCodeModal
                    module="/cw721/revoke"
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
            <ContentWrap>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src="/assets/icon/ic_reverse_left.png" alt={'revoke-nft'} />
                        <ItemLabelTypo>Revoke NFT</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ArrowToggleButton onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                {isOpen && (
                    <AccordionBox>
                        <AccordionRow>
                            <img src={IC_WALLET} alt="wallet" />
                            {revokeAddress === '' && <AccordionTypo $disabled>Wallet Address</AccordionTypo>}
                            {revokeAddress !== '' && <AccordionTypo $disabled={false}>{revokeAddress}</AccordionTypo>}
                        </AccordionRow>
                        <AccordionRow>
                            <img src={IC_ID_CIRCLE} alt="token-id" />
                            {revokeTokenId === '' && <AccordionTypo $disabled>Token ID</AccordionTypo>}
                            {revokeTokenId !== '' && <AccordionTypo $disabled={false}>{revokeTokenId}</AccordionTypo>}
                        </AccordionRow>
                    </AccordionBox>
                )}
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickRevoke}>
                    <div className="button-text">Revoke</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default RevokePreview;
