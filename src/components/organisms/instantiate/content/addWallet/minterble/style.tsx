import { styled } from 'styled-components';

export const MinterbleWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const MinterbleOption = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

export const MinterbleText = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const MinterbleInputBox = styled.div<{ $isOpen: boolean }>`
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex-direction: column;
    gap: 10px;
    height: fit-content;

    overflow: hidden;
    transition: all 0.2s ease;
    transition-delay: 0.2s;

    ${({ $isOpen }) =>
        $isOpen
            ? `
       
        max-height: 300px;
        opacity: 1;
    `
            : `
        max-height: 0px;
        opacity: 0;
    `};
`;
