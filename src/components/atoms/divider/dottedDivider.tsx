import styled from 'styled-components';

const DottedDividerWrapper = styled.div`
  width: 100%;
  height: 2px;
  display: flex;
`;

const HalfDottedDivider = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="552" height="2" viewBox="0 0 552 2" fill="none">
      <path d="M0 1L552 1.00005" stroke="#383838" strokeDasharray="4 4"/>
    </svg>
  );
};

const FullDottedDivider = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1424" height="2" viewBox="0 0 1424 2" fill="none">
      <path d="M0 1L1424 1.00012" stroke="#383838" strokeDasharray="4 4"/>
    </svg>
  )
}

export {
  HalfDottedDivider,
  FullDottedDivider
};
