import styled from 'styled-components';

export const WalletSearchWrapper = styled.div`
    padding: 40px 40px;
    display: flex;
    flex-direction: column;
    // gap: 32px;
    border-radius: 24px;
    background: var(--200, #1e1e1e);
`;

export const WalletTitleTypo = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const BalanceWrapper = styled.div`
    display: flex;
    gap: 32px;
`;

export const BalanceLabelTypo = styled.div`
    width: 224px;
    color: #999999;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export const BalanceAmountWrapper = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

export const BalanceAmountTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
`;

export const BalanceSymbolTypo = styled.div`
    color: var(--Gray-600, #707070);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export const BalanceDefaultTypo = styled.div`
    color: var(--Gray-500, #383838);

    /* Body/Body1 - Md */
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 137.5% */
`;
