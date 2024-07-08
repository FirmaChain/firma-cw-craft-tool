import styled from "styled-components";
import TokenInfo from "../cards/tokenInfo";
import Preview from "../cards/preview";
import { useContractContext } from "../context/contractContext";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { rootState } from "../../../../redux/reducers";
import useTokenDetail, { ITokenDetailState } from "../../../../hooks/useTokenDetail";
import { FIRMA_DIM_LOGO } from "../../../atoms/icons/pngIcons";

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 32px;
`;

const DimBox = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Contents = () => {
    const { address } = useSelector((state: rootState) => state.wallet);
    const { contract } = useContractContext();
    const { getTokenDetail } = useTokenDetail();

    const [tokenInfo, setTokenInfo] = useState<ITokenDetailState | null>(null);

    const fetchTokenInfo = useCallback(async () => {
        try {
            const tokenDetail = await getTokenDetail(contract, address);
            setTokenInfo(tokenDetail);
        } catch (error) {
            console.log(error);
        }
    }, [contract, address]);

    const ContractExist = useMemo(() => {
        return !Boolean(contract === "");
    }, [contract]);

    useEffect(() => {
        if (ContractExist) {
            fetchTokenInfo();
        }
    }, [ContractExist]);

    return (
        <Fragment>
            {ContractExist ? (
                <Container>
                    {tokenInfo === null ? (
                        <Fragment />
                    ) : (
                        <Fragment>
                            <TokenInfo tokenName={tokenInfo.tokenName} tokenSymbol={tokenInfo.tokenSymbol} tokenLogoUrl={tokenInfo.marketingLogoUrl} contractLabel={tokenInfo.label} />
                            <Preview />
                        </Fragment>
                    )}
                </Container>
            ) : (
                <DimBox>
                    <img src={FIRMA_DIM_LOGO} alt={"Firmachain"} style={{ width: "480px", height: "480px" }} />
                </DimBox>
            )}
        </Fragment>
    );
};

export default Contents;
