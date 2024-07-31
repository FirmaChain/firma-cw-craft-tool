import { Fragment } from "react/jsx-runtime";
import ContentBody from "./body";
import { ContentBox, ContentWrapper } from "./style";
import Title from "./title/title";

const Content = () => {
    return (
        <ContentBox>
            <ContentWrapper>
                <Title />
                <ContentBody />
            </ContentWrapper>
        </ContentBox>
    );
};

export default Content;
