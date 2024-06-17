import styled from "styled-components";

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ContentControlWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const ContentInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
`;

export const ContractCountTypo = styled.div`
  color: #02E191;
  font-family: "General Sans Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`;

export const TokenTypo = styled.div`
  color: #999;
  font-family: "General Sans Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`;

export const ContentBodyWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background: var(--200, #1E1E1E);
`;

export const NoTokenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const NoTokenTypo = styled.div`
  color: var(--Gray-650, #807E7E);
  text-align: center;
  font-family: "General Sans Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;