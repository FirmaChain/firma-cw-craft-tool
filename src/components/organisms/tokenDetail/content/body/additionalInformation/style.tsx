import styled from 'styled-components';

export const TokenCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
`;

export const TokenCardHeaderTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const TokenCardSpecific = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const SpecificItem = styled.div`
    display: flex;
    gap: 32px;
    align-items: center;
`;

export const SpecificItemByStart = styled.div`
    width: 100%;
    display: flex;
    gap: 32px;
`;

export const SpecificLabelTypo = styled.div`
    width: 224px;
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export const SpecificColumnValue = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const LogoImage = styled.div`
    width: 72px;
    height: 72px;
    background-color: #262626;
    border-radius: 153.409px;
    border: 1px solid #383838;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

export const IconBackground = styled.div`
    width: 72px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.933px;
    background: var(--Gray-450, #262626);
`;

export const SpecificValueTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
`;

export const SpecificMetadataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const SpecificMetadataValueWrapper = styled.div`
    display: flex;
    gap: 4px;
`;

export const SpecificMetadataTypo = styled.div`
    color: var(--Green-700, #02a288);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
`;

export const SpecificMetadataJSON = styled.div`
    width: calc(750px - 48px);
    padding: 24px;
    border-radius: 8px;
    background: var(--Gray-150, #141414);
`;
