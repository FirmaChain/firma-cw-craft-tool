import styled from 'styled-components';
import { GUIDE_DESCRIPTION, GUIDE_TITLE } from '@/constants/mobileLandingMessages';
import { IC_GUIDE, IC_MEDIUM } from '@/components/atoms/icons/pngIcons';
import CustomButton from '@/components/atoms/buttons/mobileGuideButton';
import { openLink } from '@/utils/common';
import { CRAFT_CONFIGS } from '@/config';

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 36px;
    padding: 60px 32px 77px;
`;

const GuideDescBox = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;

const GuideTitleText = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: center;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
`;

const GuideDescText = styled.div`
    color: var(--Gray-650, #707070);
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    white-space: pre-line;
`;

const ButtonBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const GuideSection = () => {
    return (
        <Container>
            <GuideDescBox>
                <GuideTitleText>{GUIDE_TITLE}</GuideTitleText>
                <GuideDescText>{GUIDE_DESCRIPTION}</GuideDescText>
            </GuideDescBox>
            <ButtonBox>
                <CustomButton icon={IC_GUIDE} title={'Guide'} onClick={() => openLink(CRAFT_CONFIGS.GUIDE_URL)} />
                <CustomButton icon={IC_MEDIUM} title={'Medium'} onClick={() => openLink('https://medium.com/firmachain')} border={true} />
            </ButtonBox>
        </Container>
    );
};

export default GuideSection;
