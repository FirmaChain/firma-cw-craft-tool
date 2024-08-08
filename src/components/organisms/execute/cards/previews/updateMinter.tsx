import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FirmaUtil } from '@firmachain/firma-js';
import styled from 'styled-components';

import { IC_REFRESH, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import IconButton from '@/components/atoms/buttons/iconButton';
import useExecuteStore from '../../hooks/useExecuteStore';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { rootState } from '@/redux/reducers';
import { useModalStore } from '@/hooks/useModal';
import { CRAFT_CONFIGS } from '@/config';
import { shortenAddress } from '@/utils/common';
import { QRCodeModal } from '@/components/organisms/modal';
import GreenButton from '@/components/atoms/buttons/greenButton';
import useExecuteActions from '../../action';

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

const UpdateMinter = () => {
    const contractAddress = useExecuteStore((state) => state.contractAddress);
    const fctBalance = useExecuteStore((state) => state.fctBalance);
    const minterInfo = useExecuteStore((state) => state.minterInfo);
    const minterAddress = useExecuteStore((state) => state.minterAddress);
    const clearMinter = useExecuteStore((state) => state.clearMinter);
    const setSelectMenu = useExecuteStore((state) => state.setSelectMenu);
    const { setMinterInfo } = useExecuteActions();

    const network = useSelector((state: rootState) => state.global.network);

    const modal = useModalStore();

    const errorMessage = useMemo(() => {
        if (minterAddress === '') return 'Please input minter address';
        if (!FirmaUtil.isValidAddress(minterAddress)) return 'This is an invalid wallet address.';
        if (minterAddress === minterInfo?.minter) return 'Same address as before';
        return '';
    }, [minterAddress, minterAddress]);

    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

    const onClickUpdateMinter = () => {
        const feeAmount = craftConfig.DEFAULT_FEE;

        const params = {
            header: {
                title: 'Update Minter'
            },
            content: {
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
            contract: contractAddress,
            msg: {
                new_minter: minterAddress
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <QRCodeModal
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
