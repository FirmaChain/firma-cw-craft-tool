import { useMemo, useRef } from 'react';
import { TooltipRefProps } from 'react-tooltip';
import Slider, { Settings } from 'react-slick';
import { CAROUSEL_DATA } from '@/constants/mobileLandingData';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { keyframes } from 'styled-components';
import Card from '@/components/atoms/card/card';
import CustomTooltip from '@/components/atoms/tooltip/customTooltip';

const Container = styled.div`
    width: 100%;
    height: auto;
    min-height: 330px;
    margin: 0 auto;
    padding: 48px 0 36px;
    position: relative;
`;

const Slide = styled.div`
    width: fit-content; // 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const dotAnimation = keyframes`
  from {
    width: 8px;
  }
  to {
    width: 28px;
  }
`;

const CustomDots = styled.ul`
    display: flex !important;
    justify-content: center;
    padding: 0;
    margin: 0;

    li {
        width: 8px;
        height: 8px;
        margin: 0 5px;
        border-radius: 50%;
        background-color: #807e7e;
        list-style: none;
        transition: width 0.3s ease;

        &.slick-active {
            animation: ${dotAnimation} 0.3s forwards;
            background-color: #3ceb9c;
            border-radius: 4px;
        }

        button {
            display: none;
        }
    }
`;

const CarouselSection = ({ isDesktop, variableCards }: { isDesktop?: boolean; variableCards?: boolean }) => {
    const tooltipRef = useRef<TooltipRefProps>(null);

    const responsiveOptions = useMemo(() => {
        if (variableCards)
            return [
                {
                    breakpoint: 1320,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                }
            ];
        else return undefined;
    }, [variableCards]);

    const settings: Settings = {
        dots: true,
        arrows: false,
        infinite: true,
        centerMode: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '0',
        customPaging: (i) => <ul style={{ opacity: 0 }}>{i}</ul>,
        appendDots: (dots: any) => <CustomDots>{dots}</CustomDots>,
        beforeChange: () => tooltipRef.current?.close(),
        responsive: responsiveOptions
    };

    return (
        <Container>
            <Slider {...settings}>
                {CAROUSEL_DATA.map((value) => {
                    return (
                        <Slide key={value.title}>
                            <Card data={value} isDesktop={isDesktop} />
                        </Slide>
                    );
                })}
            </Slider>

            <CustomTooltip ref={tooltipRef} />
        </Container>
    );
};

export default CarouselSection;
