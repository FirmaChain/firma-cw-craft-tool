import { useSelector } from "react-redux";
import styled from "styled-components";

import { rootState } from "@/redux/reducers";
import useFormStore from "@/store/formStore";

import useInstantiateStore from "@/components/organisms/instantiate/instaniateStore";
import { Container } from "@/styles/instantiate";
import { Header } from "@/components/organisms/cw721/instantiate";

export const MainContent = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

const CW721Instantiate = () => {
    const cwMode = useSelector((state: rootState) => state.global.cwMode);

    const clearForm = useFormStore((state) => state.clearForm);
    const clearInput = useInstantiateStore((v) => v.clearForm);

    return (
        <Container style={{ padding: '61px 96px' }}>
            <Header />
        </Container>
    )
}

export default CW721Instantiate;