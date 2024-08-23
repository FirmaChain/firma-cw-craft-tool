import styled from 'styled-components';
import { IC_INFO } from '@/components/atoms/icons/pngIcons';
import { TOOLTIP_ID } from '@/constants/tooltip';

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Box = styled.div`
    width: fit-content;
    display: inline-flex;
    padding: 32px 48px;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    border-radius: 30px;
    background: var(--Gray-400, #2c2c2c);
`;

const CardImg = styled.img`
    width: 200px;
    height: 200px;
    object-fit: contain;
`;

const TitleWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const TitleText = styled.div`
    color: var(--Gray-850, #e6e6e6);
    text-align: center;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

const TooltipImgWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin: -5px;
    z-index: 1;
`;

const TooltipImg = styled.img`
    width: 16px;
    height: 16px;
    object-fit: contain;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

interface IDataSate {
    img: string;
    title: string;
    tooltip: string;
}

interface IProps {
    data: IDataSate;
}

const Card = ({ data }: IProps) => {
    return (
        <Container>
            <Box>
                <CardImg src={data.img} alt={data.title} />
                <TitleWrap>
                    <TitleText>{data.title}</TitleText>
                    <TooltipImgWrap data-tooltip-id={TOOLTIP_ID.MOBILE} data-tooltip-content={data.tooltip}>
                        <TooltipImg src={IC_INFO} alt={data.tooltip} />
                    </TooltipImgWrap>
                </TitleWrap>
            </Box>
        </Container>
    );
};

export default Card;
