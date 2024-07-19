import styled from 'styled-components';

export const DefaultTypo = styled.div`
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: #dcdcdc;
`;

export const TypeCover = styled.div<{ bgColor: string }>`
    padding: 5px 10px;
    background-color: ${(props) => props.bgColor};
    border-radius: 4px;
    width: fit-content;
`;

export const TypeTypo = styled.div<{ color: string }>`
    color: ${(props) => props.color};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;

export const WalletAddressWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
