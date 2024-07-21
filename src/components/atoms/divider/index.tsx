import styled from 'styled-components';

interface IDividerProps {
    /*
	@Default horizontal
    ! Currently vertical not working
	*/
    $direction: 'vertical' | 'horizontal';
    /*
	@Default #383838
	*/
    $color?: string;
    /*
	@Default line
	*/
    $variant?: 'line' | 'dash';
    /*
	@Default 4px
	! Only works when variant = 'dot'
	*/
    $dotWidth?: string;
    /*
	@Default 4px;
	! Only works when variant = 'dot'
	*/
    $dotSpacing?: string;
    /*
	@Default: 1px
	*/
    $thickness?: string;
    /*
	@Default 100%;
	*/
    $maxLength?: string;
}

const Base = styled.div<IDividerProps>`
    width: ${({ $direction: direction, $thickness: thickness }) => (direction === 'vertical' ? thickness : '100%')};
    max-width: ${({ $direction: direction, $maxLength: maxLength }) => (direction === 'horizontal' ? maxLength : '100%')};

    height: ${({ $direction: direction, $thickness: thickness }) => (direction === 'horizontal' ? thickness : '100%')};
    max-height: ${({ $direction: direction, $maxLength: maxLength }) => (direction === 'vertical' ? maxLength : '100%')};
    min-height: ${({ $thickness: thickness }) => thickness};

    background: ${({ $variant: variant, $color: color, $dotWidth: dotWidth, $dotSpacing: dotSpacing }) =>
        variant === 'dash' ? `linear-gradient(to right, ${color} ${dotWidth || '4px'}, transparent ${dotSpacing || '4px'})` : color};

    background-size: calc(${({ $dotWidth: dotWidth }) => dotWidth || '4px'} + ${({ $dotSpacing: dotSpacing }) => dotSpacing || '4px'}) 1px; /* 4px dash, 4px gap */
`;

const Divider = (props: IDividerProps) => {
    const base: IDividerProps = {
        $direction: 'horizontal',
        $color: '#383838',
        $variant: 'line',
        $dotWidth: '4px',
        $dotSpacing: '4px',
        $thickness: '1px',
        $maxLength: '100%',
        ...props
    };

    return <Base {...base} />;
};

export default Divider;
