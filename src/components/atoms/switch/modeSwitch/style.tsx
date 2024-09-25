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
    padding: 4px;
    box-sizing: border-box;
`;

export const SwitchButton = styled('div').withConfig({ shouldForwardProp: shouldForwardActiveProp })<{
    $isActive: boolean;
    $position: 'left' | 'right';
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50%;
    cursor: pointer;
    z-index: 1;
    position: relative;
`;

export const ActiveIndicator = styled('div').withConfig({ shouldForwardProp: shouldForwardActiveProp })<{ $position: 'left' | 'right' }>`
    box-sizing: border-box;
    background-color: #e6e6e6;
    border-radius: 6px;
    width: ${({ $position: position }) => (position === 'left' ? '108px' : '138px')};
    height: 30px;
    position: absolute;
    top: 50%;
    left: ${({ $position: position }) => (position === 'left' ? '4px' : 'calc(100% - 138px - 4px)')};
    transition:
        width 0.2s ease,
        left 0.2s ease;
    transform: translateY(-50%);
`;

export const SwitchLabel = styled.div`
    font-size: 16px;
    font-style: normal;
    line-height: 22px;

    transition: all 0.2s;
`;

export const BasicTypo = styled.div<{ $active?: boolean }>`
    color: ${({ $active }) => ($active ? 'var(--Gray-400, #2C2C2C)' : 'var(--Gray-700, #807e7e)')};

    font-size: 16px;
    font-style: normal;
    line-height: 22px;
    font-weight: ${({ $active }) => ($active ? '600' : '400')};
`;

export const AdvancedTypo = styled.div<{ $active?: boolean }>`
    font-size: 16px;
    font-style: normal;
    line-height: 22px;
    font-weight: ${({ $active }) => ($active ? '600' : '400')};

    ${({ $active }) =>
        $active
            ? `background: linear-gradient(90deg, #00BF7A 0%, #0E9AB0 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;`
            : 'color: var(--Gray-700, #807e7e);'}
`;
