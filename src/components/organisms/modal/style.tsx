import styled from 'styled-components';

export const ModalTitle = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 40px;
    display: flex;
    font-size: 24px;
    color: white;
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const ModalContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const ModalSubTitle = styled.div`
    width: 100%;
    color: #b4b4b4;
    text-align: center;
    font-size: 14px;
    margin-bottom: 10px;
`;

export const QRContainer = styled.div`
    width: 100%;
    height: 208px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
`;

export const ContactUsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
`;

export const ContactUsLeftTypo = styled.div`
    font-size: 1.6rem;
    color: white;
    opacity: 0.5;
`;

export const ContactUsRightTypo = styled.div`
    text-align: right;
    font-size: 1.6rem;
    color: White;
    text-decoration: underline;
    cursor: pointer;
`;

export const TxConfirmWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
`;

export const TxConfirmTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: center;
    align-items: center;
`;

export const TxConfirmContentTypo = styled.div`
    color: var(--Gray-750, #dcdcdc);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

export const TxCofirmTitleTypoWrapper = styled.div`
    display: flex;
    gap: 4px;
`;

export const TxConfirmModuleTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const TxConfirmSuccessTypo = styled.div`
    color: var(--Status-Success, var(--Primary-Base-White, #57d962));
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const TxConfirmFailedTypo = styled.div`
    color: rgb(229, 82, 80);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const TxConfirmButtonWrapper = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    margin-bottom: 24px;
`;
