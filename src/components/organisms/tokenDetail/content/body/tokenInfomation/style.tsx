import styled from "styled-components";

export const TokenCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const TokenCardHeaderTypo = styled.div`
  color: var(--Gray-900, var(--Primary-Base-White, #FFF));
  font-family: "General Sans Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
`;

export const TokenCardSpecific = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SpecificItem = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;

export const SpecificLabelTypo = styled.div`
  width: 224px;
  color: var(--Gray-700, #999);
  font-family: "General Sans Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

export const SpecificValueWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const SpecificValueTypo = styled.div`
  color: var(--Gray-900, var(--Primary-Base-White, #FFF));
  font-family: "General Sans Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`;

export const SpecificValueSymbol = styled.div`
  color: var(--Gray-600, #707070);
  font-family: "General Sans Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

export const SpecificValueCover = styled.div`
  padding: 4px 12px;
  border-radius: 100px;
  border: 1px solid var(--Gray-500, #383838);
  background: var(--Gray-400, #2C2C2C);
  color: var(--Gray-700, #999);
  font-family: "General Sans Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;