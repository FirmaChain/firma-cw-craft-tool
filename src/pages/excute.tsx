import Contents from "../components/organisms/execute/contents";
import Header from "../components/organisms/execute/header";
import { Container } from "../styles/instantiate";
import { ContractProvider } from "../components/organisms/execute/context/contractContext";

const Execute = () => {
    return (
        <ContractProvider>
            <Container>
                <Header />
                <Contents />
            </Container>
        </ContractProvider>
    );
};

export default Execute;
