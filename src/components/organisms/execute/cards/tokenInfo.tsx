import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Icons from "../../../atoms/icons";
import { IC_VALID_SHIELD } from "../../../atoms/icons/pngIcons";
import { BASIC_LABEL } from "../../../../constants/cw20Types";
import CustomSelectInput from "../../../atoms/input/customSelectInput";

const Container = styled.div`
    width: 100%;
    display: flex;
    padding: 48px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;
    border-radius: 24px;
    border: 1px solid var(--Green-500, #02e191);
    background: var(--200, #1e1e1e);
`;

const TitleTypo = styled.div`
    color: var(--Gray-800, #e6e6e6);
    font-family: "General Sans Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

const TokenBox = styled.div`
    display: flex;
    padding: 20px 24px;
    align-items: center;
    justify-content: flex-start;
    gap: 32px;
    align-self: stretch;
    border-radius: 16px;
    background: var(--Gray-150, #141414);
`;

const ImageWrap = styled.div`
    width: 72px;
    height: 72px;
    flex-shrink: 0;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const TokenInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
`;

const TokenTitleWrap = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;
`;

const TokenSymbolTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: "General Sans Variable";
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 109.091% */
`;

const TokenNameTypo = styled.div`
    color: var(--Gray-700, #999);
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const ValidShieldIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const ContractTypeLabelWrap = styled.div`
    display: flex;
    padding: 2px 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
`;

const ContractTypeTypo = styled.div`
    color: var(--Gray-700, #999);
    text-align: center;
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

interface IProps {
    tokenName: string;
    tokenSymbol: string;
    tokenLogoUrl: string;
    contractLabel: string;
}

const TokenInfo = ({ tokenName, tokenSymbol, tokenLogoUrl, contractLabel }: IProps) => {
    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>("");

    const ContractTypeLabel = useMemo(() => {
        return BASIC_LABEL === contractLabel ? "BASIC" : "ADVANCED";
    }, [contractLabel]);

    useEffect(() => {
        if (tokenLogoUrl) {
            const img = new Image();
            img.src = tokenLogoUrl;
            img.onload = () => {
                setValidTokenLogoUrl(tokenLogoUrl);
            };
            img.onerror = () => {
                setValidTokenLogoUrl("");
            };
        } else {
            setValidTokenLogoUrl("");
        }
    }, [tokenLogoUrl]);

    const RenderTokenLogo = useCallback(() => {
        const isValid = !Boolean(validTokenLogoUrl === "");
        return (
            <ImageWrap style={{ background: isValid ? "transparent" : "#262626" }}>
                {isValid ? <img src={validTokenLogoUrl} style={{ width: "72px", height: "72px" }} /> : <Icons.picture width={"34px"} height={"34px"} />}
            </ImageWrap>
        );
    }, [validTokenLogoUrl]);

    return (
        <Container>
            <TitleTypo>{"TOKEN INFO"}</TitleTypo>
            <TokenBox>
                <RenderTokenLogo />
                <TokenInfoBox>
                    <TokenTitleWrap>
                        <TokenSymbolTypo>{tokenSymbol}</TokenSymbolTypo>
                        <ValidShieldIcon src={IC_VALID_SHIELD} alt={"Firmachain Valid Contract"} />
                        <ContractTypeLabelWrap>
                            <ContractTypeTypo>{ContractTypeLabel}</ContractTypeTypo>
                        </ContractTypeLabelWrap>
                    </TokenTitleWrap>
                    <TokenNameTypo>{tokenName}</TokenNameTypo>
                </TokenInfoBox>
            </TokenBox>
            <CustomSelectInput
                menus={[
                    { value: "test", label: "Test" },
                    { value: "test1", label: "Test1" },
                    { value: "test2", label: "Test2" },
                    { value: "test3", label: "Test3" },
                ]}
            />
        </Container>
    );
};

export default TokenInfo;
