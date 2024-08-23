import styled from 'styled-components';
import { IMG_SMALL_DIVIDER } from '@/components/atoms/icons/pngIcons';
import { CRAFT_DESCRIPTION } from '@/constants/mobileLandingMessages';

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding: 8px 32px 0;
`;

const SmallDivider = styled.img`
    max-width: 22px;
    width: 100%;
    object-fit: cover;
`;

const TitleWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding: 20px 0 12px;
`;

const TitleText = styled.div`
    color: var(--Green-500, #02e191);
    text-align: center;
    font-size: 38px;
    font-style: normal;
    font-weight: 600;
    line-height: 56px;
`;

const LabelBox = styled.div`
    display: flex;
    padding: 6px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 32px;
    border: 1px solid rgba(2, 225, 145, 0.5);
    background: var(--Gray-400, #2c2c2c);
`;

const LabelText = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
`;

const DescriptionText = styled.div`
    color: #707070;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    white-space: pre-line;
    padding: 24px 0 0;
`;

const TitleSection = () => {
    return (
        <Container>
            <SmallDivider src={IMG_SMALL_DIVIDER} alt={'Divider'} />
            <TitleWrap>
                <TitleText>{'Create'}</TitleText>
                <TitleText style={{ marginTop: '-10px' }}>{'yout own token'}</TitleText>
            </TitleWrap>
            <LabelBox>
                <LabelText>{'Web Only'}</LabelText>
            </LabelBox>
            <DescriptionText>{CRAFT_DESCRIPTION}</DescriptionText>
        </Container>
    );
};

export default TitleSection;
