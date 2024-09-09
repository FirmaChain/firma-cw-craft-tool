import { styled } from 'styled-components';
import { IC_LEFT_ARROW_CIRCLE } from '@/components/atoms/icons/pngIcons';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
`;

const NoSelectCommentTypo = styled.div`
    color: var(--Gray-600, #707070);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 122.222% */
`;

const NoSelectCommentWrap = styled.div`
    display: flex;
    gap: 12px;
    padding: 85px;
`;

const LeftArrowCircleIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const DefaultView = () => {
    return (
        <Container>
            <NoSelectCommentWrap>
                <LeftArrowCircleIcon src={IC_LEFT_ARROW_CIRCLE} alt={'Left Arrow Circle Icon'} />
                <NoSelectCommentTypo>Select the execution options</NoSelectCommentTypo>
            </NoSelectCommentWrap>
        </Container>
    );
};

export default DefaultView;
