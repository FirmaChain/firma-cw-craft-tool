import styled from 'styled-components';

const Button = styled.button`
    padding-block: 0;
    padding-inline: 0;
`

const IconButton = styled(Button)(({ disabled = false }: { disabled?: boolean }) => {
    const styleOptions = disabled
        ? {
            filter: 'brightness(0.8)',
            cursor: 'not-allowed'
        }
        : {
            cursor: 'pointer',
            '&:hover': {
                filter: 'brightness(0.85)'
            },

            '&:active': {
                filter: 'brightness(0.7)'
            }
        };

    return {
        background: 'transparent',
        border: 'unset',

        ...styleOptions
    };
});

export default IconButton;
