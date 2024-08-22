import styled from 'styled-components';
import IconButton from './iconButton';

const ExpirationTypeButton = styled(IconButton)<{ $selected?: boolean }>`
    width: 152px;
    height: 36px;
    border-radius: 8px;
    // padding: 8px 16px;

    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--Gray-500, #383838);
    background: ${({ $selected }) => ($selected ? 'var(--Gray-800, #dcdcdc)' : 'transparent')};
    filter: unset !important;

    span {
        color: ${({ $selected }) =>
            $selected ? 'var(--Gray-250, var(--200, #1e1e1e))' : 'var(--Gray-900, var(--Primary-Base-White, #FFF))'};

        /* Body/Body2 - Bd */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
        line-height: 20px; /* 142.857% */
    }

    &:hover {
        background: ${({ $selected }) => ($selected ? 'var(--Gray-800, #dcdcdc)' : 'var(--Gray-600, #5a5a5a)')};
    }

    &:active {
        background: ${({ $selected }) => ($selected ? 'var(--Gray-800, #dcdcdc)' : 'var(--Gray-600, #5a5a5a)')};
    }
`;

export default ExpirationTypeButton;
