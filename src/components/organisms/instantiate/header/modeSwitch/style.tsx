import styled from 'styled-components';

const shouldForwardActiveProp = (prop: PropertyKey) => prop !== 'isActive' && prop !== 'position';

export const SwitchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--Gray-450, #313131);
    background: var(--Gray-300, #222);
    border-radius: 8px;
    width: 254px;
    height: 38px;
    position: relative;
    padding: 3px 4px;
    box-sizing: border-box;
`;

export const SwitchButton = styled('div').withConfig({ shouldForwardProp: shouldForwardActiveProp })<{
    $isActive: boolean;
    $position: 'left' | 'right';
}>`
    // color: ${({ $isActive: isActive, $position: position }) => (isActive ? (position === 'left' ? '#2C2C2C' : '#00BF7A') : '#E6E6E6')};
    font-weight: ${({ $isActive: isActive }) => (isActive ? 600 : 400)};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50%;
    cursor: pointer;
    z-index: 1;
`;

export const ActiveIndicator = styled('div').withConfig({ shouldForwardProp: shouldForwardActiveProp })<{ $position: 'left' | 'right' }>`
    box-sizing: border-box;
    background-color: #e6e6e6;
    border-radius: 6px;
    width: 122px;
    height: 30px;
    // margin-top: 4px;
    // margin-top: 3px;
    margin-left: ${({ $position: position }) => (position === 'left' ? '4px' : '0px')};
    position: absolute;
    top: 50%;
    left: ${({ $position: position }) => (position === 'left' ? '0' : '50%')};
    transition: left 0.3s ease;
    transform: translateY(-50%);
`;

export const SwitchLabel = styled.div`
    font-size: 16px;
    font-style: normal;
    line-height: 22px;

    transition: all 0.2s;
`;

export const BasicTypo = styled(SwitchLabel)<{ $active?: boolean }>`
    color: ${({ $active }) => ($active ? 'var(--Gray-400, #2C2C2C)' : 'var(--Gray-700, #807e7e)')};
`;

export const AdvancedTypo = styled(SwitchLabel)<{ $active?: boolean }>`
    ${({ $active }) =>
        $active
            ? `background: linear-gradient(90deg, #00BF7A 0%, #0E9AB0 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;`
            : 'color: var(--Gray-700, #807e7e);'}
`;
