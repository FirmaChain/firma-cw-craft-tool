import { TRANSACTION_TYPE } from '@/constants/common';
import styled from 'styled-components';

const SwitchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3a3a3a;
    border-radius: 8px;
    width: 168px;
    height: 36px;
    position: relative;
`;

const ActiveIndicator = styled('div')<{ $position: 'left' | 'right' }>`
    background-color: #000;
    border-radius: 6px;
    width: 81px;
    height: 30px;
    margin-top: 3px;
    margin-left: ${({ $position }) => ($position === 'left' ? '3px' : '0px')};
    position: absolute;
    top: 0;
    left: ${({ $position }) => ($position === 'left' ? '0' : '50%')};
    transition: left 0.3s ease;
`;

const SwitchButton = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50%;
    cursor: pointer;
    z-index: 1;
`;

const SwitchLabel = styled.div<{ $active: 'true' | 'false' }>`
    color: ${({ $active }) => ($active === 'true' ? '#02E191' : '#E6E6E6')};
    font-weight: ${({ $active }) => ($active === 'true' ? 600 : 300)};
    text-align: center;
    font-size: 14px;
    font-style: normal;
    line-height: 20px;
`;

interface IProps {
    value: TRANSACTION_TYPE;
    onChange: (type: TRANSACTION_TYPE) => void;
}

const TransactionSwitch = ({ value, onChange }: IProps) => {
    const onChangeActiveType = (value: TRANSACTION_TYPE) => {
        onChange(value);
    };

    return (
        <SwitchContainer>
            <ActiveIndicator $position={value === 'ALL' ? 'left' : 'right'} />
            <SwitchButton onClick={() => onChangeActiveType('ALL')}>
                <SwitchLabel $active={value === 'ALL' ? 'true' : 'false'}>All</SwitchLabel>
            </SwitchButton>
            <SwitchButton onClick={() => onChangeActiveType('MY')}>
                <SwitchLabel $active={value === 'MY' ? 'true' : 'false'}>My</SwitchLabel>
            </SwitchButton>
        </SwitchContainer>
    );
};

export default TransactionSwitch;
