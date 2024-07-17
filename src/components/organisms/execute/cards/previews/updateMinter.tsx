import { IC_REFRESH, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import styled from 'styled-components';
import IconButton from '@/components/atoms/buttons/iconButton';
import useExecuteStore from '../../hooks/useExecuteStore';
import { useMemo } from 'react';
import { FirmaUtil } from '@firmachain/firma-js';
import { TOOLTIP_ID } from '@/constants/tooltip';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
`;

const ContentWrap = styled.div`
    width: calc(100% - 88px);
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
`;

const AccordionBox = styled.div`
    width: calc(100% - 64px);
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

    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;

const UpdateMinter = ({ minterAddress }: { minterAddress: string }) => {
    const _minterAddress = useExecuteStore((state) => state.minterAddress);

    const errorMessage = useMemo(() => {
        if (_minterAddress === '') return 'Please input address';
        if (!FirmaUtil.isValidAddress(_minterAddress)) return 'Invalid address';
        if (_minterAddress === minterAddress) return 'Same address as before';
        return '';
    }, [_minterAddress, minterAddress]);

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
                        <AccordionTypo $disabled={!Boolean(_minterAddress)}>{_minterAddress || 'Wallet Address'}</AccordionTypo>
                    </div>
                </AccordionBox>
            </ContentWrap>
            <ButtonWrap>
                <ExecuteButton
                    disabled={!minterAddress || Boolean(errorMessage)}
                    onClick={() => {}}
                    data-tooltip-content={errorMessage}
                    data-tooltip-id={TOOLTIP_ID.COMMON}
                    data-tooltip-wrapper="span"
                    data-tooltip-place="bottom"
                >
                    <ExecuteButtonTypo>Update Minter</ExecuteButtonTypo>
                </ExecuteButton>
            </ButtonWrap>
        </Container>
    );
};

export default UpdateMinter;
