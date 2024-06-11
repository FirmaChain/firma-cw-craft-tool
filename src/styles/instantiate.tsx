import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  z-index: 2;
  width: calc(100% - 192px);
  padding-top: 68px;
  padding-left: 96px;
  padding-right: 96px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;