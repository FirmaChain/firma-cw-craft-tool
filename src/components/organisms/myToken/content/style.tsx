import styled from 'styled-components';

export const ContentBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;

    gap: 24px;
`;

export const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100%;
    padding: 0 88px 0 96px;
    align-items: center;

    overflow-y: scroll;
    scrollbar-gutter: stable;

    &::-webkit-scrollbar-track {
        background: #121212;
    }
`;

export const ContentControlWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    max-width: 1600px;
    width: 100%;
    justify-content: flex-start;
`;

export const ContentInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: center;
`;

export const ContractCountTypo = styled.div`
    color: #02e191;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
`;

export const TokenTypo = styled.div`
    color: #999;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
`;

export const ContentBodyWrapper = styled.div`
    width: 100%;
    max-width: 1600px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    background: var(--200, #1e1e1e);
`;

export const NoTokenWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

export const NoTokenTypo = styled.div`
    color: var(--Gray-650, #807e7e);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
`;
