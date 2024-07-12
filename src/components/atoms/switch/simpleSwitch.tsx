import styled from 'styled-components';

interface IProps {
    checked: boolean;
    onChange: (value: boolean) => void;
}

const Switch2 = styled.label`
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    input:checked + .slider {
        background-color: rgb(48 209 88);
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);

        background-color: #ffffff;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--Gray-500, #383838);
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: '';
        height: 20px;
        width: 20px;
        left: 2px;
        bottom: 2px;
        background-color: var(--Gray-700, #999);
        -webkit-transition: 0.2s;
        transition: 0.2s;
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
`;

const SimpleSwitch = ({ checked, onChange }: IProps) => {
    const handleClickSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <Switch2>
            <input type="checkbox" value={String(checked)} onChange={handleClickSwitch} />
            <span className="slider round"></span>
        </Switch2>
    );
};

export default SimpleSwitch;
