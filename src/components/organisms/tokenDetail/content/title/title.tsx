import { useEffect, useState } from "react";

import {
    GoToButtonTypo,
    GoToExecuteButton,
    IconBackground,
    TitleContainer,
    TitleLogoImage,
    TitleWrapper,
    TokenInfo,
    TokenInfoWrapper,
    TokenNameTypo,
    TokenSymbolTypo,
    TotalSupplyBalanceTypo,
    TotalSupplySymbolTypo,
    TotalSupplyWrapper,
} from "./style";
import Icons from "../../../../atoms/icons";
import { useNavigate } from "react-router-dom";

interface IProps {
    tokenLogoUrl: string;
    tokenSymbol: string;
    tokenName: string;
    totalSupply: string;
}

const Title = ({ tokenLogoUrl, tokenSymbol, tokenName, totalSupply }: IProps) => {
    const navigatge = useNavigate();
    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>("");

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

    const onClickExecute = () => {
        navigatge("/execute");
    };

    return (
        <TitleContainer>
            <TitleWrapper>
                <TitleLogoImage>
                    {validTokenLogoUrl === "" ? (
                        <IconBackground>
                            <Icons.picture width={"34px"} height={"34px"} />
                        </IconBackground>
                    ) : (
                        <img src={validTokenLogoUrl} style={{ width: "72px", height: "72px", maxHeight: "100%", maxWidth: "100%" }} />
                    )}
                </TitleLogoImage>
                <TokenInfoWrapper>
                    <TokenInfo>
                        <TokenSymbolTypo>{tokenSymbol}</TokenSymbolTypo>
                        <Icons.Dot width={"4px"} height={"4px"} />
                        <TokenNameTypo>{tokenName}</TokenNameTypo>
                    </TokenInfo>
                    <TotalSupplyWrapper>
                        <TotalSupplyBalanceTypo>{totalSupply}</TotalSupplyBalanceTypo>
                        <TotalSupplySymbolTypo>{tokenSymbol}</TotalSupplySymbolTypo>
                    </TotalSupplyWrapper>
                </TokenInfoWrapper>
            </TitleWrapper>
            <GoToExecuteButton onClick={onClickExecute}>
                <GoToButtonTypo>Go to excute</GoToButtonTypo>
                <GoToButtonTypo>→</GoToButtonTypo>
            </GoToExecuteButton>
        </TitleContainer>
    );
};

export default Title;
