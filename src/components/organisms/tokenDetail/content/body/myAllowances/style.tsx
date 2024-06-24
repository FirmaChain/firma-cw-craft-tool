import { styled } from "styled-components";

export const AllowanceCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const AllowanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const AllowanceCardHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AllowanceCardHeaderTypo = styled.div`
  color: var(--Gray-900, var(--Primary-Base-White, #FFF));
  font-family: "General Sans Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
`;

export const AllowanceContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AllowanceItem = styled.div`
  display: flex;
  gap: 32px;
`;

export const ItemLabel = styled.div`
  width: 224px;
  color: var(--Gray-700, #999);
  font-family: "General Sans Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  white-space: pre-wrap;
`;

export const ItemValue = styled.div`
  width: calc(100% - 48px);
  padding: 20px 24px;
`;