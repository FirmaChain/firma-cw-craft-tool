import { useState } from 'react';
import IconButton from './iconButton';
import Icons from '../icons';

interface IProps {
    onToggle: (isOpen: boolean) => void;
}

const ArrowToggleButton = ({ onToggle }: IProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClickButton = () => {
        setIsOpen(!isOpen);
        onToggle(!isOpen);
    };

    return (
        <IconButton
            style={{ display: 'flex', width: '20px', height: '20px', alignItems: 'center', justifyContent: 'center', padding: 0 }}
            onClick={onClickButton}
        >
            {!isOpen ? (
                <Icons.LeftArrow width="16px" height="16px" stroke="#FFFFFF" style={{ transform: 'rotate(90deg)' }} />
            ) : (
                <Icons.LeftArrow width="16px" height="16px" stroke="#FFFFFF" style={{ transform: 'rotate(270deg)' }} />
            )}
        </IconButton>
    );
};

export default ArrowToggleButton;
