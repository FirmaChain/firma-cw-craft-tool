import styled from "styled-components";

export const SummeryContainer = styled.div`
  width: calc(100% - 48px);
  background-color: #141414;
  border-radius: 16px;
  display: flex;
  padding: 16px 24px;
`;

export const SummeryAttribute = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const SummeryAttributeKey = styled.div`
  color: var(--Gray-650, #807E7E);
  font-family: "General Sans Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

export const SummeryAttributeValue = styled.div`
  color: var(--Gray-800, #E6E6E6);
  font-family: "General Sans Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;