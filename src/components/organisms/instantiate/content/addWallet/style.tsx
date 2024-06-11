import styled from "styled-components";

export const AddWalletWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const IconBackground = styled.div`
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6.933px;
  background: var(--Gray-450, #313131);
`;

export const TextGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TitleText = styled.div`
  color: var(--Green-300, #63F6A5);
  font-family: "General Sans Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
`;

export const TitleDescription = styled.div`
  color: var(--Gray-650, #807E7E);
  font-family: "General Sans Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

export const AddWalletBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;