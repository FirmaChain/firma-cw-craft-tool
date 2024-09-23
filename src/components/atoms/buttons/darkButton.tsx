import React from 'react';
import IconButton from '@/components/atoms/buttons/iconButton';
import styled from 'styled-components';

const SwitchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3a3a3a;
    border-radius: 8px;
    height: 40px;
    position: relative;
`;

const ActiveIndicator = styled('div')<{ $position: 'left' | 'right' }>`
    background-color: #000;
    border-radius: 6px;
    width: ${({ $position }) => ($position === 'left' ? '82px' : '110px')};
    height: 32px;
    margin-top: 4px;
    margin-left: ${({ $position: position }) => (position === 'left' ? '4px' : '0px')};
    position: absolute;
    top: 0;
    left: ${({ $position: position }) => (position === 'left' ? '0' : '43%')};
    transition: left 0.3s ease;
`;

const SwitchButton = styled(IconButton)<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    z-index: 1;
`;

const SwitchLabel = styled.div<{ $active: 'true' | 'false' }>`
    color: ${({ $active }) => ($active === 'true' ? '#02E191' : '#E6E6E6')};
    font-weight: ${({ $active }) => ($active === 'true' ? 600 : 400)};
    text-align: center;
    font-size: 14px;
    font-style: normal;
    line-height: 20px;
    white-space: pre;
`;

interface IProps {
    value: boolean;
    typos: {
        left: string;
        right: string;
    };
    onChange: (type: boolean) => void;
}

const DarkButton = ({ value, typos, onChange }: IProps) => {
    return (
        <SwitchContainer>
            <ActiveIndicator $position={value ? 'left' : 'right'} />
            <SwitchButton style={{ width: '85px' }} onClick={() => onChange(true)}>
                <SwitchLabel $active={value ? 'true' : 'false'}>{typos.left}</SwitchLabel>
            </SwitchButton>
            <SwitchButton style={{ width: '114px' }} onClick={() => onChange(false)}>
                <SwitchLabel $active={!value ? 'true' : 'false'}>{typos.right}</SwitchLabel>
            </SwitchButton>
        </SwitchContainer>
    );
};

export default React.memo(DarkButton);
