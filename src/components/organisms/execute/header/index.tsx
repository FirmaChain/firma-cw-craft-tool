import { useSelector } from "react-redux";
import { HeaderTitle, HeaderWrapper } from "./style";
import { rootState } from "../../../../redux/reducers";
import ConnectWallet from "./connectWallet";
import SearchContract from "./searchContract";

const Header = () => {
    const { isInit } = useSelector((state: rootState) => state.wallet);

    return (
        <HeaderWrapper>
            <HeaderTitle>Execute</HeaderTitle>
            {isInit ? <SearchContract /> : <ConnectWallet />}
        </HeaderWrapper>
    );
};

export default Header;
