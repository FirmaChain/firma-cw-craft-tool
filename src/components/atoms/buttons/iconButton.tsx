import styled from 'styled-components';

const IconButton = styled('button')(({ disabled = false }: { disabled?: boolean }) => {
    const styleOptions = disabled
        ? {
              filter: 'brightness(0.8)',
              cursor: 'not-allowed'
          }
        : {
              cursor: 'pointer',
              '&:hover': {
                  filter: 'brightness(1.1)'
              },

              '&:active': {
                  filter: 'brightness(1.3)'
              }
          };

    return {
        background: 'transparent',
        border: 'unset',

        ...styleOptions
    };
});

export default IconButton;
