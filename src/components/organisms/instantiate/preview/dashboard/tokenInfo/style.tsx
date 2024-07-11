import { styled } from 'styled-components';

export const TokenInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: calc(100% - 88px);
    padding: 28px 44px;
    gap: 32px;
    border-radius: 24px 24px 0px 0px;
    border-top: 1px solid var(--Gray-550, #444);
    border-right: 1px solid var(--Gray-550, #444);
    border-left: 1px solid var(--Gray-550, #444);
`;

export const TokenInfoLogoImage = styled.div`
    width: 90px;
    height: 90px;
    background-color: #262626;
    border-radius: 153.409px;
    border: 1px solid #383838;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

export const IconBackground = styled.div`
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.933px;
    background: var(--Gray-450, #262626);
`;

export const TokenInfoDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const DetailTitle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`;

export const TokenNameText = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const TokenSymbolText = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export const TokenDescriptionText = styled.div`
    color: var(--Gray-600, #707070);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;
