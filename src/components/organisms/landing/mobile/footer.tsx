import styled from 'styled-components';
import { COPYRIGHT } from '@/constants/mobileLandingMessages';

const Conatainer = styled.div`
    width: 100%;
    opacity: 0.4;
    background: #000;
    padding: 17px 80px 19px;
`;

const CopyrightText = styled.div`
    color: var(--Primary-Base-White, #fff);
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    text-align: center;
`;

const Footer = () => {
    return (
        <Conatainer>
            <CopyrightText>{COPYRIGHT}</CopyrightText>
        </Conatainer>
    );
};

export default Footer;
