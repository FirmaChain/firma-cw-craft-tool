import { styled } from "styled-components";

export const TotalSupplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TotalSupplySummery = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SummeryLeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 17px;
`;

export const SummeryLeftText = styled.div`
  color: var(--Gray-700, #02E191);
  font-family: "General Sans Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

export const SummeryRightWrapeer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const SummeryRightTotalSupply = styled.div`
  color: var(--Gray-900, var(--Primary-Base-White, #02E191));
  font-family: "General Sans Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
`;

export const SummeryRightTokenSymbol = styled.div`
  color: var(--Gray-700, #02E191);
  font-family: "General Sans Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

export const WalletListWrapper = styled.div`
  width: calc(100% - 64px);
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 12px;
  background: var(--Gray-150, #141414);
`;

export const WalletListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ItemLeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const ItemLeftAddress = styled.div`
  color: var(--Gray-600, #707070);
  font-family: "General Sans Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

export const ItemTokenAmount = styled.div`
  color: var(--Gray-650, #807E7E);
  font-family: "General Sans Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;