import styled from 'styled-components';
import Icons from '../icons';

const Container = styled.div<{ $disabled: boolean }>`
    width: 100%;
    padding: 8px 0px;
    display: flex;
    border-radius: 8px;
    border: 1px solid;
    align-items: center;
    justify-content: center;
    gap: 6px;

    ${({ $disabled }) =>
        $disabled === true &&
        `
        cursor: not-allowed;
        border-color: var(--Gray-100, #313131);
        > div {
            color: var(--Gray-500, #383838);
        }

        > svg > path {
            stroke: var(--Gray-500, #383838);
        }
    `};
    ${({ $disabled }) =>
        $disabled === false &&
        `
        cursor: pointer;
        border-color: var(--Gray-600, #707070);
        
        > div {
            color: var(--Gray-700, #999);
        }

        > svg > path {
            stroke: var(--Gray-700, #999);
        }

        &:hover {
            background: var(--Gray-800, #DCDCDC);
            border-color: var(--Gray-800, #DCDCDC);

            > div {
                color: var(--Gray-250, var(--200, #1E1E1E));
            }

            > svg > path {
                stroke: #1e1e1e;
            }
        }
    `};
`;

const TitleTypo = styled.div<{ $disabled?: boolean }>`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

interface IProps {
    disabled: boolean;
    count: number;
    maxCount: number;
    onClick: () => void;
}

const AddWalletButton = ({ disabled, count, maxCount, onClick }: IProps) => {
    return (
        <Container $disabled={disabled} onClick={() => !disabled && onClick()}>
            <Icons.Add width={'16px'} height={'16px'} />
            <TitleTypo>
                Add (<span style={{ fontWeight: '600' }}>{count}</span>/{maxCount})
            </TitleTypo>
        </Container>
    );
};

export default AddWalletButton;
