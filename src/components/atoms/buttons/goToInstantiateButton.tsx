import styled from 'styled-components';
import ColorButton from './colorButton';

const Base = styled(ColorButton)`
    &:hover {
        background: #02e191 !important;
        border-color: #02e191 !important;
        color: var(--Gray-100, #121212) !important;
        filter: unset;
    }
`;

const GoToInstantiateButton = ({ disabled, text, onClick }: { disabled?: boolean; text: string; onClick: () => void }) => (
    <Base
        width={'178px'}
        height={'40px'}
        color={'#262626'}
        text={text}
        disabled={disabled}
        border={'1px solid var(--Green-500, #02E191)'}
        sx={{
            color: 'var(--Green-500, #02E191)',
            fontSize: '14px',
            fontWeight: 600,
            fontStyle: 'normal',
            lineHeight: '20px'
        }}
        onClick={onClick}
    />
);

export default GoToInstantiateButton;
