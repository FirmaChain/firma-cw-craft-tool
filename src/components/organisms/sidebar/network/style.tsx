import styled from 'styled-components';

export const NetworkMenuContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const MenuHeader = styled.div`
    color: var(--Gray-700, #999);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

export const SelectStyle = {
    control: (provided: any) => ({
        ...provided,
        backgroundColor: '#1E1E1E',
        borderRadius: '6px',
        border: '1px solid #383838',
        boxShadow: 'none'
    }),
    option: (provided: any) => ({
        ...provided,
        backgroundColor: '#1E1E1E',
        color: '#FFFFFF',
        borderRadius: '0px',
        '&:hover': {
            backgroundColor: '#1E1E1E'
        }
    }),
    indicatorSeparator: (provided: any) => ({
        ...provided,
        display: 'none'
    }),
    dropdownIndicator: (provided: any) => ({
        ...provided,
        color: '#FFFFFF'
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: '#FFFFFF'
    }),
    menuList: (provided: any) => ({
        ...provided,
        backgroundColor: '#3d3b48',
        borderRadius: '0',
        margin: '0',
        padding: '0',
        border: '1px solid #383838'
    })
};
