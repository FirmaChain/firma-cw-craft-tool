import { styled } from 'styled-components';

export const TotalSupplyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const TotalSupplySummery = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
`;

export const SummeryRightTotalSupply = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-900, var(--Primary-Base-White, #02e191))')};
    // var(--Gray-900, var(--Primary-Base-White, #02e191));
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const SummeryRightTokenSymbol = styled.div`
    color: var(--Gray-700, #02e191);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    word-break: break-word;
`;

export const WalletListWrapper = styled.div`
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
`;

export const WalletListItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
`;

export const ItemLeftWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

export const ItemLeftAddress = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-600, #707070)')};
    // var(--Gray-600, #707070);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

export const ItemTokenAmount = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-650, #807e7e)')};
    // var(--Gray-650, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;
