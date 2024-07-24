import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

export const ModalWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    overflow: hidden;
    outline: 0;
`;

export const ModalInner = styled.div<{ width: string }>`
    background: white;
    width: ${(props) => props.width || '600px'};
    background-color: #262626;
    max-width: 100%;
    padding: 28px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 28px;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const CloseIcon = styled.img`
    width: 24px;
    height: 24px;
`;
