import React, { useEffect, useState } from 'react';
import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import styled from 'styled-components';
import ExpirationSelect from '../select/expirationSelect';
import Icons from '../icons';
import { format, set } from 'date-fns';
import IconButton from '../buttons/iconButton';
import { getNextNearestDate } from '@/utils/time';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1c1c1c;
    // padding: 20px;
    border-radius: 10px;
    gap: 8px;
`;

const StyledDatePicker = styled.div<{ open?: boolean }>`
    .react-datepicker {
        width: 311px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        border: 1px solid var(--Gray-500, #383838);
        background: var(--200, #1e1e1e);

        padding: 16px;
    }

    .react-datepicker__header {
        background: transparent;
        border-bottom: unset;

        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 0;
    }

    .react-datepicker__week {
        display: flex;
    }

    .react-datepicker__day-names {
        display: flex;
        height: 36px;
        align-items: center;

        .react-datepicker__day-name {
            width: 40px;

            margin: 0;

            color: var(--Gray-750, #999);
            text-align: center;
            font-family: Inter;
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: 0.3px;
            text-transform: uppercase;
        }
    }

    .react-datepicker__day {
        margin: 0;

        width: 40px;
        height: 40px;

        display: flex;
        align-items: center;
        justify-content: center;

        text-align: center;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px; /* 171.429% */

        color: #ffffff;

        border-radius: 6px;

        &:hover {
            background-color: #444444;
        }
    }

    .react-datepicker__day--selected {
        background-color: var(--Green-500, #02e191) !important;
        color: var(--Gray-100, #121212);
    }

    .react-datepicker__day--keyboard-selected {
        background-color: rgba(2, 225, 145, 0.2);
    }

    .react-datepicker__day--disabled {
        color: var(--Gray-575, #474747);

        &:hover {
            background-color: unset;
        }
    }
`;

const DateWrap = styled.div<{ $open?: boolean }>`
    width: 138px;
    height: 36px;
    border-radius: 6px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    padding: 7px 20px;
    border: 1px solid;
    border-color: ${({ $open }) => ($open ? '#FFFFFF !important' : 'var(--Gray-500, #383838)')};
    background: ${({ $open }) => ($open ? '#2c2c2c' : 'var(--200, #1e1e1e)')};

    .typo {
        color: var(--Gray-900, var(--Primary-Base-White, #fff));
        text-align: right;

        /* Body/Body2 - Md */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;

        white-space: pre;
    }

    &:hover {
        border-color: var(--Gray-700, #807e7e);
    }
`;

const CalendarTitle = styled.div`
    color: var(--Primary-Base-White, #fff);
    text-align: center;
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 184.615% */
`;

const HOURS = new Array(24).fill(null).map((_, idx) => {
    return { label: String(idx).padStart(2, '0'), value: String(idx) };
});

const MINUTES = new Array(12).fill(null).map((_, idx) => {
    const value = idx * 5;
    return { label: String(value).padStart(2, '0'), value: String(value) };
});

// const SECONDS = new Array(12).fill(null).map((_, idx) => {
//     const value = idx * 5;
//     return { label: String(value).padStart(2, '0'), value: String(value) };
// });

const BGBox = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: transparent;
`;

function toTimestamp(dateObj, hours, minutes, seconds) {
    const h = parseInt(hours, 10);
    const m = parseInt(minutes, 10);
    const s = parseInt(seconds, 10);

    const updatedDate = set(dateObj, { hours: h, minutes: m, seconds: s, milliseconds: 0 });

    return updatedDate.getTime().toString();
}

const DateInputBox = React.forwardRef(
    (
        { open, onClickOpen, onClickClose, date }: { open: boolean; onClickOpen: () => void; onClickClose: () => void; date: Date },
        ref: any
    ) => {
        return (
            <>
                <DateWrap className="pointer" onClick={onClickOpen} $open={open} ref={ref}>
                    <Icons.Calendar width="16px" />
                    <div className="typo">{format(date, 'yyyy.MM.dd')}</div>
                </DateWrap>
                {open && <BGBox onClick={onClickClose} />}
            </>
        );
    }
);

const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    increaseYear,
    decreaseYear,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    prevYearButtonDisabled,
    nextYearButtonDisabled
}: ReactDatePickerCustomHeaderProps) => (
    <div style={{ display: 'flex', gap: '12px' }}>
        <IconButton onClick={decreaseYear} disabled={prevYearButtonDisabled} style={{ padding: 0 }}>
            <Icons.LeftDoubleArrow width="24px" height="24px" stroke={prevYearButtonDisabled ? '#474747' : '#FFFFFF'} />
        </IconButton>
        <IconButton onClick={decreaseMonth} disabled={prevMonthButtonDisabled} style={{ padding: 0 }}>
            <Icons.PrevPage width="24px" height="24px" stroke={prevMonthButtonDisabled ? '#474747' : '#FFFFFF'} />
        </IconButton>
        <CalendarTitle>{format(date, 'MMM yyyy')}</CalendarTitle>

        <IconButton onClick={increaseMonth} disabled={nextMonthButtonDisabled} style={{ padding: 0 }}>
            <Icons.PrevPage
                width="24px"
                height="24px"
                style={{ transform: 'rotate(180deg)' }}
                stroke={nextMonthButtonDisabled ? '#474747' : '#FFFFFF'}
            />
        </IconButton>
        <IconButton onClick={increaseYear} disabled={nextYearButtonDisabled} style={{ padding: 0 }}>
            <Icons.RightDoubleArrow width="24px" height="24px" stroke={nextYearButtonDisabled ? '#474747' : '#FFFFFF'} />
        </IconButton>
    </div>
);

const ExpirationDatePicker = ({ setTargetTimestamp }: { setTargetTimestamp: (v: string) => void }) => {
    const [open, setOpen] = useState(false);

    const now = getNextNearestDate();
    const [selected, setSelected] = useState({
        date: new Date(),
        hour: now.getHours().toString(),
        min: now.getMinutes().toString(),
        sec: now.getSeconds().toString()
    });

    const handleSelected = (id: string, value: string | Date) => {
        const newValue = { ...selected, [id]: value };

        setSelected(newValue);

        const newTimestamp = toTimestamp(newValue.date, newValue.hour, newValue.min, newValue.sec);
        setTargetTimestamp(newTimestamp);
    };

    useEffect(() => {
        const newTimestamp = toTimestamp(selected.date, selected.hour, selected.min, selected.sec);
        setTargetTimestamp(newTimestamp);
    }, []);

    return (
        <Container>
            <StyledDatePicker>
                <DatePicker
                    onCalendarOpen={() => setOpen(true)}
                    onClickOutside={() => setOpen(false)}
                    selected={selected.date}
                    open={open}
                    onChange={(date: Date) => {
                        handleSelected('date', date);
                        setOpen(false);
                    }}
                    renderCustomHeader={(props) => <CustomHeader {...props} />}
                    dateFormat="yyyy.MM.dd"
                    enableTabLoop={false}
                    customInput={
                        <DateInputBox
                            open={open}
                            onClickOpen={() => setOpen(true)}
                            onClickClose={() => setOpen(false)}
                            date={selected.date}
                        />
                    }
                    minDate={new Date()}
                    showPopperArrow={false}
                />
            </StyledDatePicker>

            <ExpirationSelect
                minWidth="70px"
                maxWidth="70px"
                options={HOURS}
                onChange={(v) => handleSelected('hour', v)}
                value={selected.hour}
                placeHolder="0"
            />
            <ExpirationSelect
                minWidth="70px"
                maxWidth="70px"
                options={MINUTES}
                onChange={(v) => handleSelected('min', v)}
                value={selected.min}
                placeHolder="0"
            />
            {/* <ExpirationSelect
                minWidth="70px"
                options={SECONDS}
                onChange={(v) => handleSelected('sec', v)}
                value={selected.sec}
                placeHolder="0"
            /> */}
        </Container>
    );
};

export default ExpirationDatePicker;
