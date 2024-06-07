import Switch, { switchClasses } from '@mui/joy/Switch';
import { Theme } from "@mui/joy";

interface IProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const SimpleSwitch = ({ checked, onChange }: IProps) => {
  const handleClickSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };
  
  return (
    <Switch
      checked={checked}
      onChange={handleClickSwitch}
      sx={(theme: Theme) => ({
        '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
        '--Switch-thumbSize': '20px',
        '--Switch-trackWidth': '44px',
        '--Switch-trackHeight': '24px',
        '--Switch-thumbBackground': '#999',
        [`& .${switchClasses.thumb}`]: {
          transition: 'width 0.2s, left 0.2s',
        },
        '&:active': {
          '--Switch-thumbWidth': '32px',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-trackBackground': 'rgb(48 209 88)',
          '&:hover': {
            '--Switch-trackBackground': 'rgb(48 209 88)',
          },
        },
      })}
    />
  )
}

export default SimpleSwitch;