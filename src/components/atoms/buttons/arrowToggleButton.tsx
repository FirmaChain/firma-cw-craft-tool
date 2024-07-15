import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import IconButton from './iconButton';

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton style={{ display: 'flex' }} onClick={onClickButton}>
                {!isOpen ? (
                    <KeyboardArrowDownIcon sx={{ color: '#FFFFFF', width: '20px', height: '20px' }} />
                ) : (
                    <KeyboardArrowUpIcon sx={{ color: '#FFFFFF', width: '20px', height: '20px' }} />
                )}
            </IconButton>
        </div>
    );
};

export default ArrowToggleButton;
