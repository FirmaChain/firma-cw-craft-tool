import { IC_ALIGN_TOP_ARROW } from '@/components/atoms/icons/pngIcons';
import AddWallet from './addWallet';
import Information from './information';
import { ContentBox, ContentWrapper } from './style';
import SectionScrollToTopButton from '@/components/atoms/buttons/sectionScrolltoTopButton';
import styled from 'styled-components';

interface IProps {
    isBasic: boolean;
}

const ScrollButtonBox = styled.div`
    width: 100%;

    @media (max-width: 1653px) {
        display: none;
    }
`;

const Content = ({ isBasic }: IProps) => {
    return (
        <ContentBox>
            <ContentWrapper>
                <Information isBasic={isBasic} />
                <AddWallet />
            </ContentWrapper>
            <ScrollButtonBox>
                <SectionScrollToTopButton />
            </ScrollButtonBox>
        </ContentBox>
    );
};

export default Content;
