import IconButton from '@/components/atoms/buttons/iconButton';
import styled from 'styled-components';

export const ContentBodyContainer = styled.div`
    padding: 40px 40px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    border-radius: 24px;
    background: var(--200, #1e1e1e);
`;

export const ContractCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
`;

export const CardHeaderTypo = styled.div`
    color: #02E191;
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

export const SearchButton = styled.div`
    display: flex;
    width: 168px;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: var(--Green-500, #02E191);
    color: var(--Gray-100, #121212);
    text-align: center;
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
`

export const SpecificItem = styled.div`
    display: flex;
    gap: 32px;
    align-items: center;
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
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;

    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;

    > span {
        padding-left: 5px;
        color: var(--Gray-650, #707070);
        font-size: 16px;
        font-weight: 400;
    }
`;

export const SpecificPlaceholderTypo = styled.div`
    color: var(--Gray-500, #383838);
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
`