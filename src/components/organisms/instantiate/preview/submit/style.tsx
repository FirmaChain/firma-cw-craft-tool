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

// export const InstantiateButton = styled.button<{ disabled?: boolean }>`
//     //? remove button default css
//     border: unset;

//     //? outside
//     width: fit-content;
//     min-width: 220px;
//     height: 48px;
//     border-radius: 8px;
//     cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

//     //? inside
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 10px;
//     padding: 14px 40px;
//     flex-shrink: 0;
//     background: ${({ disabled }) => (disabled ? 'var(--Gray-600, #707070)' : 'var(--Green-500, #02e191)')};

//     //? button text
//     .button-text {
//         color: ${({ disabled }) => (disabled ? 'var(--Gray-550, #444)' : 'var(--Gray-100, #121212)')};
//         text-align: center;
//         font-family: 'General Sans Variable';
//         font-size: 16px;
//         font-style: normal;
//         font-weight: 600;
//         line-height: 20px; /* 125% */
//         text-transform: capitalize;
//     }
// `;
