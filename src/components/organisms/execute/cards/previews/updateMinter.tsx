import { useMemo } from 'react';
import styled from 'styled-components';

import { IC_REFRESH, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import IconButton from '@/components/atoms/buttons/iconButton';
import useExecuteStore from '../../hooks/useExecuteStore';
import { useModalStore } from '@/hooks/useModal';
import { CRAFT_CONFIGS } from '@/config';
import GreenButton from '@/components/atoms/buttons/greenButton';
import useExecuteActions from '../../action';
import { isValidAddress } from '@/utils/address';
import QRModal2, { ModalType } from '@/components/organisms/modal/qrModal2';
import TxModal from '@/components/organisms/modal/txModal';

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

const ItemLabelWrap = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
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

const ExecuteButton = styled(IconButton)<{ disabled?: boolean }>`
    width: 220px !important;
    height: 48px;
    border-radius: 8px;
    background: ${({ disabled }) => (!disabled ? '#02E191' : '#707070')};
    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    outline: none;
    transition:
        background 0.1s,
        transform 0.1s;
`;

const ExecuteButtonTypo = styled.div`
    color: var(--Gray-100, #121212);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 125% */
`;

const AccordionTypo = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-650, #707070)')};

    /* Body/Body2 - Rg */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const USE_WALLET_CONNECT = CRAFT_CONFIGS.USE_WALLET_CONNECT;

const UpdateMinter = () => {
    const contractAddress = useExecuteStore((state) => state.contractAddress);
    const fctBalance = useExecuteStore((state) => state.fctBalance);
    const minterInfo = useExecuteStore((state) => state.minterInfo);
    const minterAddress = useExecuteStore((state) => state.minterAddress);
    const clearMinter = useExecuteStore((state) => state.clearMinter);
    const setSelectMenu = useExecuteStore((state) => state.setSelectMenu);
    const { setMinterInfo } = useExecuteActions();

    const modal = useModalStore();

    const errorMessage = useMemo(() => {
        if (minterAddress === '') return 'Please input minter address';
        if (!isValidAddress(minterAddress)) return 'This is an invalid wallet address.';
        if (minterAddress === minterInfo?.minter) return 'Same address as before';
        return '';
    }, [minterAddress, minterAddress]);

    const onClickUpdateMinter = () => {
        const feeAmount = CRAFT_CONFIGS.DEFAULT_FEE;

        const params = {
            modalType: 'EXECUTES' as ModalType,
            header: {
                title: 'Update Minter'
            },
            txParams: {
                contract: contractAddress,
                type: 'cw20',
                msg: {
                    new_minter: minterAddress
                }
            },
            contentParams: {
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Minter',
                        value: minterAddress,
                        type: 'wallet'
                    }
                ]
            },
            
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => {
                return !USE_WALLET_CONNECT ? (
                    <TxModal
                        module="/cw20/updateMinter"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearMinter();
                            setMinterInfo(contractAddress);
                            setSelectMenu({ value: 'select', label: 'Select' });
                        }}
                    />
                ) : (
                    <QRModal2
                        module="/cw20/updateMinter"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            clearMinter();
                            setMinterInfo(contractAddress);
                            setSelectMenu({ value: 'select', label: 'Select' });
                        }}
                    />
                )
            }
        });
    };

    return (
        <Container>
            <ContentWrap>
                <ItemLabelWrap>
                    <img src={IC_REFRESH} alt="refresh" style={{ width: '24px', height: '24px' }} />
                    <ItemLabelTypo>Minter Address</ItemLabelTypo>
                </ItemLabelWrap>
                <AccordionBox>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                        <img src={IC_WALLET} alt="wallet" style={{ width: '20px' }} />
                        <AccordionTypo className="clamp-single-line" $disabled={!Boolean(minterAddress)}>
                            {minterAddress || 'Wallet Address'}
                        </AccordionTypo>
                    </div>
                </AccordionBox>
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={!minterAddress || Boolean(errorMessage)} onClick={onClickUpdateMinter}>
                    <div className="button-text">Update Minter</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default UpdateMinter;
