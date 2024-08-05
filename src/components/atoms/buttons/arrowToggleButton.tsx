import IconButton from './iconButton';
import Icons from '../icons';

interface IProps {
    open: boolean;
    onToggle: (isOpen: boolean) => void;
}

const ArrowToggleButton = ({ open, onToggle }: IProps) => {
    const onClickButton = () => {
        onToggle(!open);
    };

    return (
        <IconButton
            style={{ display: 'flex', width: '20px', height: '20px', alignItems: 'center', justifyContent: 'center', padding: 0 }}
            onClick={onClickButton}
        >
            {open ? (
                <Icons.LeftArrow width="16px" height="16px" stroke="#FFFFFF" style={{ transform: 'rotate(90deg)' }} />
            ) : (
                <Icons.LeftArrow width="16px" height="16px" stroke="#FFFFFF" style={{ transform: 'rotate(270deg)' }} />
            )}
        </IconButton>
    );
};

export default ArrowToggleButton;
