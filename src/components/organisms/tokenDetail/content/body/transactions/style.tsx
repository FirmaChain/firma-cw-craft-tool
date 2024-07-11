import styled from 'styled-components';

export const TransactionsCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
`;

export const CradHeaderWrapper = styled.div`
    display: flex;
    gap: 16px;
`;

export const HeaderTitleTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const HeaderSubTitleTypo = styled.div`
    color: var(--Gray-600, #707070);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

export const TransactionContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
