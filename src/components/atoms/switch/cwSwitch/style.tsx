import IconButton from '@/components/atoms/buttons/iconButton';
import styled from 'styled-components';

export const SwitchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3a3a3a;
    border-radius: 8px;
    width: 168px;
    height: 36px;
    position: relative;
`;

export const ActiveIndicator = styled('div') <{ $position: 'left' | 'right' }>`
    background-color: #000;
    border-radius: 6px;
    width: 81px;
    height: 30px;
    margin-top: 3px;
    margin-left: ${({ $position: position }) => (position === 'left' ? '3px' : '0px')};
    position: absolute;
    top: 0;
    left: ${({ $position: position }) => (position === 'left' ? '0' : '50%')};
    transition: left 0.2s ease;
`;

export const SwitchButton = styled(IconButton) <{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50%;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    z-index: 1;
`;

export const SwitchLabel = styled.div<{ $active: 'true' | 'false' }>`
    color: ${({ $active }) => ($active === 'true' ? '#02E191' : '#E6E6E6')};
    font-weight: ${({ $active }) => ($active === 'true' ? 600 : 300)};
    text-align: center;
    font-size: 14px;
    font-style: normal;
    line-height: 20px;
`;
