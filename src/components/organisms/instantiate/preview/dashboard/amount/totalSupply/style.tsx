import { styled } from 'styled-components';

export const TotalSupplyWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const TotalSupplySummery = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
`;

export const SummeryLeftWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

export const SummeryLeftText = styled.div`
    color: var(--Gray-700, #02e191);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    white-space: pre;

    opacity: 0.8;
`;

export const SummeryRightWrapeer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    overflow: hidden;
`;

export const SummeryRightTotalSupply = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-900, var(--Primary-Base-White, #02e191))')};
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const SummeryRightTokenSymbol = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? '#383838' : '#02e191')};
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export const WalletListWrapper = styled.div<{ $isOpen: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
    height: fit-content;
    overflow: hidden;
    transition: all 1s ease;

    ${({ $isOpen }) =>
        $isOpen
            ? `
        opacity: 1;
        padding: 24px 32px;
        max-height: 100%;
        margin-top: 20px;

        > div {
            max-height: 100%; 
        }
    `
            : `
        opacity: 0;
        max-height: 0px;
        margin-top: 0px;

        > div {
            max-height: 0px; 
        }
    `}
`;

export const WalletListItem = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
    overflow: hidden;
    transition: all 0.15s ease;
`;

export const ItemLeftWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

export const ItemLeftAddress = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-600, #707070)')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;

    white-space: pre;
`;

export const ItemTokenWrap = styled.div`
    display: flex;
    gap: 6px;
`;

export const ItemTokenAmount = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-650, #807e7e)')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;

export const ItemTokenSymbol = styled.div`
    color: var(--Gray-550, #444);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;
