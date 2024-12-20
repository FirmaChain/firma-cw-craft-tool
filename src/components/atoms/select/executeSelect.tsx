import { DropDownOverlayScrollbar } from '@/components/organisms/instantiate/preview/dashboard/style';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const customStyles = {
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#1E1E1E',
        borderRadius: '8px',
        margin: '6px 0',
        border: '1px solid var(--Gray-500, #383838)',
        zIndex: 2,
        maxHeight: '218px'
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '8px',
        gap: '4px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '218px',
        overflowY: 'auto'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#141414' : '#1E1E1E',
        '&:hover': {
            backgroundColor: state.isDisabled ? 'none' : state.isSelected ? '#141414' : '#2b2b2b'
        },
        '&:active': {
            backgroundColor: state.isDisabled ? 'none' : state.isSelected ? '#141414' : '#424242'
        },
        borderRadius: '6px',
        padding: '8px 12px',
        color: state.isDisabled ? '#383838' : state.isSelected ? '#fff' : 'var(--Gray-650, #707070)',
        width: '100%',
        cursor: state.isDisabled ? 'inherit' : 'pointer',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '22px'
    })
};

const Container = styled.div<{ $open?: boolean; $minWidth?: string; $maxWidth?: string; $isDisabled?: boolean }>`
    user-select: none;

    box-sizing: border-box;

    background: ${({ $open }) => ($open ? 'var(--Gray-400, #2C2C2C)' : 'transparent')};

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 11px 12px 11px 16px;
    border-radius: 6px;
    border: 1px solid;
    ${({ $open, $isDisabled }) =>
        $isDisabled
            ? 'border-color: var(--Gray-500, #383838);'
            : $open
              ? 'border-color: #FFFFFF !important;'
              : 'border-color: var(--Gray-500, #383838);'}

    ${({ $minWidth }) => $minWidth && `min-width: ${$minWidth};`}
    ${({ $maxWidth }) => $maxWidth && `max-width: ${$maxWidth};`}

    gap: 10px;

    cursor: pointer;

    .typo {
        ${({ $open, $isDisabled }) =>
            $isDisabled ? 'color: var(--Gray-550, #444);' : $open ? 'color: #FFFFFF !important;' : 'color: var(--Gray-750, #999);'}

        /* Body/Body2 - Md */
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 142.857% */
    }

    .open-indicater-stroke {
        ${({ $open, $isDisabled }) => ($isDisabled ? `stroke : #444444 !important` : $open && `stroke : #ffffff !important;`)}
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

const SelectListBox = styled.div`
    width: 100%;
    display: flex;
    max-height: 218px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    padding: 8px;

    .list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
`;

const ExecuteSelect = ({
    value,
    placeHolder = 'Select input',
    options,
    minWidth,
    maxWidth,
    onChange,
    disabled = false,
    disabledTooltip
}: {
    value?: string;
    placeHolder?: string;
    options: { label: string; value: string; isDisabled?: boolean }[];
    minWidth?: string;
    maxWidth?: string;
    onChange: (v: string) => void;
    disabled?: boolean;
    disabledTooltip?: string;
}) => {
    const [open, setOpen] = useState(false);

    const selected = options.find((one) => one.value === value);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const outSideClick = (e) => {
            const { target } = e;
            if (divRef.current && !divRef.current.contains(target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', outSideClick);
    }, []);

    return (
        <div
            ref={divRef}
            data-tooltip-content={disabled ? disabledTooltip : ''}
            data-tooltip-id={TOOLTIP_ID.COMMON}
            data-tooltip-wrapper="span"
            data-tooltip-place="bottom"
            style={{ maxWidth: maxWidth || 'unset', minWidth: minWidth || 'unset' }}
        >
            <Select
                value={selected}
                menuIsOpen={open}
                isDisabled={disabled}
                menuPlacement="auto"
                options={options}
                styles={customStyles}
                placeholder={placeHolder}
                onChange={(newValue) => {
                    onChange(newValue.value);
                    setOpen(false);
                }}
                components={{
                    Control: ({ children }) => {
                        return (
                            <Container
                                onClick={() => setOpen(!open)}
                                $open={open}
                                $minWidth={minWidth}
                                $maxWidth={maxWidth}
                                $isDisabled={disabled}
                            >
                                <span className="typo">{selected?.label || placeHolder}</span>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    style={{ transform: open ? 'rotate(180deg)' : 'unset' }}
                                >
                                    <path
                                        className="open-indicater-stroke"
                                        d="M6 8L10 12L14 8"
                                        stroke="#999999"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Container>
                        );
                    },
                    MenuList: ({ children }) => {
                        return (
                            <SelectListBox>
                                <DropDownOverlayScrollbar defer>
                                    <div className="list">{children}</div>
                                </DropDownOverlayScrollbar>
                            </SelectListBox>
                        );
                    }
                }}
            />
        </div>
    );
};

export default ExecuteSelect;
