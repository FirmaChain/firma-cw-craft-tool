import { IconButton, Stack } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface IProps {
  isOpen: boolean;
  onToggle: () => void;
};

const ArrowToggleButton = ({ isOpen, onToggle }: IProps) => {
  return (
    <Stack >
      <IconButton sx={{ padding: 0 }} onClick={onToggle}>
        {isOpen ?
          <KeyboardArrowDownIcon sx={{ color: '#FFFFFF', width: '20px', height: '20px' }}/>
          : <KeyboardArrowUpIcon sx={{ color: '#FFFFFF', width: '20px', height: '20px' }}/>
        }
      </IconButton>
    </Stack>
  );
};

export default ArrowToggleButton;