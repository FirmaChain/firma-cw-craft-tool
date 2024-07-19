import { useState } from 'react';
import NetworkSelect from '@/components/atoms/select/networkSelect';

interface IProps {
    onChange: (value: number) => void;
}

const menuItems = [
    { value: '0', label: 'Newest' },
    { value: '1', label: 'Oldest' },
    { value: '2', label: 'Most Popular' },
    { value: '4', label: 'Alphabetical' }
];

const SortSelect = ({ onChange }: IProps) => {
    const [menuType, setMenuType] = useState<number>(0);

    const handleChange = (newValue: string) => {
        setMenuType(Number(newValue));
        onChange(Number(newValue));
    };

    return <NetworkSelect value={menuType.toString()} onChange={handleChange} options={menuItems} minWidth="182px" />;
};

export default SortSelect;
