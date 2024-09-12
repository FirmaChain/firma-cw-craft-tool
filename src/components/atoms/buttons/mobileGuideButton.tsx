import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    padding: 12px 32px 14px 36px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 16px;
    cursor: pointer;
`;

const BorderContainer = styled(Container)`
    border: 2px solid var(--Green-500, #02e191);
    background: var(--Gray-300, #222);
    box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.3);

    &:hover {
        background: var(--Gray-150, #141414);
    }
`;

const FillContainer = styled(Container)`
    background: var(--Green-500, #02e191);
    box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.3);

    &:hover {
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), #02e191;
    }
`;

const FillTitleText = styled.div`
    color: var(--Gray-300, #222);
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 40px;
`;

const BorderTitleText = styled.div`
    color: var(--Green-500, #02e191);
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 40px;
`;

const IconImg = styled.img`
    width: 32px;
    height: 32px;
    object-fit: contain;
`;

interface IProps {
    border?: boolean;
    icon: string;
    title: string;
    onClick: () => void;
}

const CustomButton = ({ border = false, icon, title, onClick }: IProps) => {
    if (border === true) {
        return (
            <BorderContainer onClick={onClick}>
                <IconImg src={icon} alt={title} />
                <BorderTitleText>{title}</BorderTitleText>
            </BorderContainer>
        );
    }

    return (
        <FillContainer onClick={onClick}>
            <IconImg src={icon} alt={title} />
            <FillTitleText>{title}</FillTitleText>
        </FillContainer>
    );
};

export default CustomButton;
