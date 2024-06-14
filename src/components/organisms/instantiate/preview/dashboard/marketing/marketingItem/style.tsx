import { styled } from "styled-components";

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

export const ItemLeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const ItemText = styled.div`
  color: var(--Gray-700, #999);
  font-family: "General Sans Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  width: 150px;
`;

export const ItemValue = styled.div`
  color: var(--Gray-900, var(--Primary-Base-White, #FFF));
  font-family: "General Sans Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  overflow: hidden;
`;

export const ItemValueCover = styled.div`
  padding: 4px 12px;
  border-radius: 100px;
  border: 1px solid var(--Gray-500, #383838);
  background: var(--Gray-400, #2C2C2C);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const ItemCoverValue = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #707070;
  overflow: hidden;
`;