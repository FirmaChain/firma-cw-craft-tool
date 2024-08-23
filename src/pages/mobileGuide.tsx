import LogoButton from '@/components/atoms/buttons/mobileGuideLogoButton';
import Background from '@/components/atoms/mobileLayout/background';
import Content from '@/components/atoms/mobileLayout/content';
import Layout from '@/components/atoms/mobileLayout/layout';
import CarouselSection from '@/components/organisms/landing/mobile/carouselSection';
import Footer from '@/components/organisms/landing/mobile/footer';
import GuideSection from '@/components/organisms/landing/mobile/guideSection';
import TitleSection from '@/components/organisms/landing/mobile/titleSection';

const MobileLanding = () => {
    return (
        <Layout>
            <Background />
            <Content>
                <LogoButton />
                <TitleSection />
                <CarouselSection />
                <GuideSection />
                <Footer />
            </Content>
        </Layout>
    );
};

export default MobileLanding;
