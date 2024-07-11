import { IconButton, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';

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
        <Stack>
            <IconButton sx={{ padding: 0 }} onClick={onClickButton}>
                {!isOpen ? (
                    <KeyboardArrowDownIcon sx={{ color: '#FFFFFF', width: '20px', height: '20px' }} />
                ) : (
                    <KeyboardArrowUpIcon sx={{ color: '#FFFFFF', width: '20px', height: '20px' }} />
                )}
            </IconButton>
        </Stack>
    );
};

export default ArrowToggleButton;
