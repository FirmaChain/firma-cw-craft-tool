import styled from 'styled-components';

export const AmountWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    // width: 552px;
    padding: 32px 44px;
    display: flex;
    flex-direction: column;
    // border-radius: 0px 0px 24px 24px;
    border-top: 1px solid var(--Gray-550, #444);
    gap: 24px;
`;

export const MinterCapWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const MinterCapHeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const HeaderLeftWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 17px;
    align-items: center;
`;

export const HeaderMinterCapText = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export const HeaderRightWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

export const HeaderMinterCapAmount = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const HeaderMinterCapTokenSymbol = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export const DetailWrapper = styled.div`
    width: calc(100% - 64px);
    display: flex;
    padding: 24px 32px;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
`;

export const DetailLeftWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

export const DetailAddressText = styled.div`
    color: var(--Gray-650, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

export const DetailMinterCapAmount = styled.div`
    color: var(--Gray-650, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;
