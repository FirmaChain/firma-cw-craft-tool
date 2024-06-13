import styled from "styled-components";

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
  color: #B4B4B4;
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