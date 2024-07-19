import { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const customStyles = {
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: state.isHovered ? '#FFFFFF' : 'var(--Gray-750, #999)',
        padding: 0,
        ':hover': {
            color: 'var(--Gray-750, #999)'
        }
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#1E1E1E',
        borderRadius: '8px',
        margin: '6px 0',
        border: '1px solid var(--Gray-500, #383838)',
        zIndex: 2
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '8px',
        gap: '4px',
        display: 'flex',
        flexDirection: 'column'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#141414' : '#1E1E1E',
        '&:hover': {
            backgroundColor: state.isSelected ? '#141414' : '#2b2b2b'
        },
        '&:active': {
            backgroundColor: state.isSelected ? '#141414' : '#424242'
        },
        borderRadius: '6px',
        padding: '4px 8px',
        color: state.isSelected ? '#fff' : 'var(--Gray-650, #707070)',
        width: '100%',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 500
    })
};

const Container = styled.div<{ $open?: boolean; $minWidth?: string }>`
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 11px 12px 11px 16px;
    border-radius: 6px;
    border: 1px solid;
    ${({ $open }) => ($open ? 'border-color: #FFFFFF !important;' : 'border-color: var(--Gray-500, #383838);')}

    ${({ $minWidth }) => $minWidth && `min-width: ${$minWidth};`}

    gap: 10px;

    cursor: pointer;

    .typo {
        ${({ $open }) => ($open ? 'color: #FFFFFF !important;' : 'color: var(--Gray-750, #999);')}

        /* Body/Body2 - Md */
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 142.857% */
    }

    .open-indicater-stroke {
        ${({ $open }) => $open && `stroke : #ffffff !important;`}
    }

    &:hover {
        border-color: var(--Gray-700, #807e7e);

        .typo {
            color: #ffffff;
        }

        .open-indicater-stroke {
            stroke: #ffffff !important;
        }
    }
`;

const BGBox = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: transparent;
`;

const ExecuteSelect = ({
    value,
    placeHolder = 'Select input',
    options,
    minWidth,
    onChange
}: {
    value?: string;
    placeHolder?: string;
    options: { label: string; value: string }[];
    minWidth?: string;
    onChange: (v: string) => void;
}) => {
    const [open, setOpen] = useState(false);

    const selected = options.find((one) => one.value === value);

    return (
        <>
            <Select
                value={selected}
                menuIsOpen={open}
                menuPlacement="auto"
                options={options}
                styles={customStyles}
                placeholder={placeHolder}
                onChange={(newValue) => {
                    onChange(newValue.value);
                    setOpen(false);
                }}
                components={{
                    Control: ({ children, ...rest }) => {
                        return (
                            <Container {...rest} onClick={() => setOpen(!open)} $open={open} $minWidth={minWidth}>
                                <span className="typo">{selected?.label || placeHolder}</span>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    style={{ transform: open ? 'rotate(180deg)' : 'unset' }}
                                >
                                    <path
                                        d="M6 8L10 12L14 8"
                                        stroke="#999999"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Container>
                        );
                    }
                }}
            />
            {open && <BGBox onClick={() => setOpen(false)} />}
        </>
    );
};

export default ExecuteSelect;
