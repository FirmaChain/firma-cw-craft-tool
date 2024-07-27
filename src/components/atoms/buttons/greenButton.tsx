import styled from 'styled-components';

const GreenButton = styled.button<{ disabled?: boolean }>`
    //? remove button default css
    border: unset;

    //? outside
    width: fit-content;
    min-width: 220px;
    height: 48px;
    border-radius: 8px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

    //? inside
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 14px 40px;
    flex-shrink: 0;
    background: ${({ disabled }) => (disabled ? 'var(--Gray-600, #707070)' : 'var(--Green-500, #02e191)')};

    //? button text
    .button-text {
        color: ${({ disabled }) => (disabled ? 'var(--Gray-450, #313131)' : 'var(--Gray-100, #121212)')};
        text-align: center;
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px; /* 125% */
        text-transform: capitalize;
    }

    ${({ disabled }) =>
        !disabled &&
        `&:hover {
        filter: brightness(0.85);
    }

    &:active {
        filter: brightness(0.7);
    }`}
`;

export default GreenButton;
