import IconButton from './iconButton';
import Icons from '../icons';
import styled from 'styled-components';

interface IProps {
    open: boolean;
    onToggle: (isOpen: boolean) => void;
}

const Button = styled(IconButton)<{ $open?: boolean }>`
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    padding: 0;
    transform: ${({ $open }) => ($open ? 'rotate(90deg)' : 'rotate(270deg)')};
    transition: transform 0.2s;
`;

const ArrowToggleButton = ({ open, onToggle }: IProps) => {
    const onClickButton = () => {
        onToggle(!open);
    };

    return (
        <Button onClick={onClickButton} $open={open}>
            <Icons.LeftArrow width="16px" height="16px" stroke="#FFFFFF" />
        </Button>
    );
};

export default ArrowToggleButton;
