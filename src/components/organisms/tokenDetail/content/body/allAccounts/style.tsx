import styled from "styled-components";

export const AllAccountsCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const AllAccountsCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AllAccountsCardHeaderTypo = styled.div`
  color: var(--Gray-900, var(--Primary-Base-White, #FFF));
  font-family: "General Sans Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
`;

export const AllAccountsContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const AllAccountsItem = styled.div`
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