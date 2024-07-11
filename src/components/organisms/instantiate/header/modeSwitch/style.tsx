import styled from 'styled-components';
import { Box } from '@mui/material';

const shouldForwardActiveProp = (prop: PropertyKey) => prop !== 'isActive' && prop !== 'position';

export const SwitchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #222222;
    border-radius: 32px;
    width: 354px;
    height: 44px;
    position: relative;
`;

export const SwitchButton = styled(Box).withConfig({ shouldForwardProp: shouldForwardActiveProp })<{
    isActive: boolean;
    position: 'left' | 'right';
}>`
    color: ${({ isActive, position }) => (isActive ? (position === 'left' ? '#2C2C2C' : '#00BF7A') : '#E6E6E6')};
    font-weight: ${({ isActive }) => (isActive ? 600 : 300)};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50%;
    cursor: pointer;
    z-index: 1;
`;

export const ActiveIndicator = styled(Box).withConfig({ shouldForwardProp: shouldForwardActiveProp })<{ position: 'left' | 'right' }>`
    background-color: #e6e6e6;
    border-radius: 32px;
    width: 168px;
    height: 38px;
    margin-top: 3px;
    margin-left: ${({ position }) => (position === 'left' ? '3px' : '0px')};
    position: absolute;
    top: 0;
    left: ${({ position }) => (position === 'left' ? '0' : '50%')};
    transition: left 0.3s ease;
`;

export const SwitchLabel = styled.div`
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;
