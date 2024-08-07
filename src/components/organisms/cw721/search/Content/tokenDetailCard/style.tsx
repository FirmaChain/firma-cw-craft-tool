import styled from 'styled-components';

export const ContractCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
`;

export const CardHeaderTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const CardSpecific = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const SpecificItem = styled.div<{ $isNFTList?: boolean }>`
    display: flex;
    gap: 32px;
    align-items: center;

    ${({ $isNFTList }) =>
        $isNFTList &&
        `@media (max-width: 1200px) {
        gap: 24px;
        flex-direction: column;
    }`}
`;

export const SpecificLabelTypo = styled.div`
    min-width: 224px;
    max-width: 224px;
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export const SpecificValueBox = styled.div`
    width: 100%;
    display: flex;
    gap: 16px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const SpecificValueWrapper = styled.div`
    display: flex;
    gap: 8px;
`;

export const SpecificValueTypo = styled.div`
    display: flex;
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    gap: 8px;
`;

export const SpecificSubValueType = styled.div`
    color: var(--Gray-650, #707070);
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

export const SpecificValueSymbol = styled.div`
    color: var(--Gray-600, #707070);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export const SpecificValueCover = styled.div`
    padding: 3px 12px;
    border-radius: 100px;
    border: 1px solid var(--Gray-500, #383838);
    background: var(--Gray-400, #2c2c2c);
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;

    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;
`;

export const NFTTableContainer = styled.div<{ $expand: boolean }>`
    width: 100%;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
    transition: all 0.5s ease;
    ${({ $expand }) =>
        $expand
            ? `
        max-height: 1500px;
    `
            : `
        max-height: 0px;
    `}
    overflow: hidden;
`;

export const TableExpandButton = styled.img<{ $expand: boolean }>`
    width: 20px;
    height: 20px;
    object-fit: contain;
    transition: all 0.5s ease;
    ${({ $expand }) =>
        $expand
            ? `
        transform: rotate(0deg);
    `
            : `
        transform: rotate(180deg);
    `}
`;
