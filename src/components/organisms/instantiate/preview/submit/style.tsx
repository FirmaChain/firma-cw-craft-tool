import { styled } from 'styled-components';

export const SubmitWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 28px;
`;

export const BalanceWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const TotalSupplyWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const TotalSupplyTypo = styled.div`
    color: #02e191;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
`;

export const TotalSupplyRight = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

export const TotalSupplyAmount = styled.div`
    color: var(--Green-500, #02e191);
    text-align: right;
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

export const TotalSupplySymbol = styled.div`
    color: var(--Green-500, #02e191);
    text-align: right;
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;

export const MinterCapWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const MinterCapLeft = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

export const MinterCapTypo = styled.div`
    color: var(--Gray-600, #707070);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export const MinterCapRight = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

export const MinterCapAmount = styled.div`
    color: var(--Gray-600, #707070);
    text-align: right;
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const MinterCapSymbol = styled.div`
    color: var(--Gray-600, #707070);
    text-align: right;
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;
