import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { IC_ROUND_ARROW_DOWN } from '../icons/pngIcons';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1c1c1c;
    padding: 20px;
    border-radius: 10px;
    gap: 8px;
`;

const StyledDatePicker = styled(DatePicker)`
    background-color: #1c1c1c;
    color: #ffffff;
    border: 1px solid #555555;
    padding: 10px;
    border-radius: 5px;
    text-align: center;

    .react-datepicker__header {
        background-color: #2c2c2c;
        border-bottom: 1px solid #555555;
    }

    .react-datepicker__current-month,
    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
        color: #ffffff;
    }

    .react-datepicker__day--selected,
    .react-datepicker__day--keyboard-selected {
        background-color: #4caf50;
    }
`;

const TimePicker = styled.select`
    width: 66px;
    background-color: #1c1c1c;
    color: #ffffff;
    border: 1px solid #555555;
    padding: 10px;
    border-radius: 5px;
    appearance: none;
    background-image: url(${IC_ROUND_ARROW_DOWN});
    background-repeat: no-repeat;
    background-position: right 3px center;
    background-size: 20px;
`;

const ExpirationDatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());

    const renderCustomHeader = ({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
    }) => (
        <div>
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {"<"}
            </button>
            <select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(value)}
            >
                {Array(10)
                    .fill(0)
                    .map((_, i) => (
                        <option key={i} value={2020 + i}>
                            {2020 + i}
                        </option>
                    ))}
            </select>
            <select
                value={date.getMonth()}
                onChange={({ target: { value } }) => changeMonth(value)}
            >
                {Array(12)
                    .fill(0)
                    .map((_, i) => (
                        <option key={i} value={i}>
                            {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                        </option>
                    ))}
            </select>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                {">"}
            </button>
        </div>
    );

    return (
        <Container>
            <StyledDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                renderCustomHeader={renderCustomHeader}
                showTimeSelect
                dateFormat="yyyy.MM.dd"
            />
            <TimePicker>
                {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                        {i < 10 ? `0${i}` : i}
                    </option>
                ))}
            </TimePicker>
            <TimePicker>
                {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>
                        {i < 10 ? `0${i}` : i}
                    </option>
                ))}
            </TimePicker>
            <TimePicker>
                {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>
                        {i < 10 ? `0${i}` : i}
                    </option>
                ))}
            </TimePicker>
        </Container>
    );
};

export default ExpirationDatePicker;
