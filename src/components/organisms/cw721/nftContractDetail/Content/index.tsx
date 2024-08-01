import { Fragment } from "react/jsx-runtime";
import ContentBody from "./body";
import { ContentBox, ContentWrapper } from "./style";
import Title from "./title/title";
import Search from "./search";

const Content = () => {
    return (
        <ContentBox>
            <ContentWrapper>
                <Title />
                <ContentBody />
                <Search />
            </ContentWrapper>
        </ContentBox>
    );
};

export default Content;
