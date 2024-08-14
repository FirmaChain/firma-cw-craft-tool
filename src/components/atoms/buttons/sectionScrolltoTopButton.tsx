import styled from 'styled-components';
import IconButton from './iconButton';
import { scrollToTop } from '@/utils/common';
import { IC_ALIGN_TOP_ARROW } from '../icons/pngIcons';

export const ContentWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 48px 48px;
    display: flex;
    flex-direction: column;
    gap: 72px;
    border-radius: 24px;
    background: var(--200, #1e1e1e);
`;

export const ScrollButtonBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 24px;
`;

export const ScrollToTopButton = styled(IconButton)`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    padding: 12px;
    background: #313131;

    img {
        width: 24px;
    }
`;

const SectionScrollToTopButton = () => {
    return (
        <ScrollButtonBox>
            <ScrollToTopButton onClick={() => scrollToTop('smooth')}>
                <img src={IC_ALIGN_TOP_ARROW} alt="go to top" />
            </ScrollToTopButton>
        </ScrollButtonBox>
    );
};

export default SectionScrollToTopButton;
