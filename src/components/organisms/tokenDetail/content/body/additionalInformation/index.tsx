import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { TokenCardSpecific } from "../tokenInfomation/style";
import { IconBackground, LogoImage, SpecificColumnValue, SpecificItem, SpecificItemByStart, SpecificLabelTypo, SpecificMetadataJSON, SpecificMetadataTypo, SpecificMetadataValueWrapper, SpecificMetadataWrapper, SpecificValueTypo, TokenCard, TokenCardHeaderTypo } from "./style";
import Icons from "../../../../../atoms/icons";
import JsonViewer from "../../../../../atoms/viewer/jsonViewer";
import { rootState } from "../../../../../../redux/reducers";
import { CRAFT_CONFIGS } from "../../../../../../config";
import CopyIconButton from "../../../../../atoms/buttons/copyIconButton";

interface IProps {
  contractAddress: string;
  marketingLogo: string;
  marketingDescription: string;
  marketingAddress: string;
  marketingProject: string;
  metadata: string;
}

const AdditionalInformation = ({ contractAddress, marketingLogo, marketingDescription, marketingAddress, marketingProject, metadata }: IProps) => {
  const { network } = useSelector((state: rootState) => state.global);
  const navigate = useNavigate();

  const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>("");
  const [blockExplorerLink, setBlockExplorerLink] = useState<string>('');

  useEffect(() => {
    const link = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET.BLOCK_EXPLORER : CRAFT_CONFIGS.TESTNET.BLOCK_EXPLORER;
    setBlockExplorerLink(link);
  }, [network]);

  useEffect(() => {
    if (marketingLogo) {
      const img = new Image();
      img.src = marketingLogo;
      img.onload = () => {
        setValidTokenLogoUrl(marketingLogo);
      };
      img.onerror = () => {
        setValidTokenLogoUrl("");
      };
    } else {
      setValidTokenLogoUrl("");
    }
  }, [marketingLogo]);
  
  const onClickViewMetadata = (e: any) => {
    e.preventDefault();
    window.open(`${blockExplorerLink}/accounts/${contractAddress}`);
  };

  return (
    
    <TokenCard>
      <TokenCardHeaderTypo>Additional Information</TokenCardHeaderTypo>
      <TokenCardSpecific>
        <SpecificItemByStart>
          <SpecificLabelTypo>Marketing Logo</SpecificLabelTypo>
          <SpecificColumnValue>
            <LogoImage>
              {validTokenLogoUrl === "" ? 
                <IconBackground>
                  <Icons.picture width={'34px'} height={'34px'} />
                </IconBackground>
                : <img src={validTokenLogoUrl} style={{ width: '72px', height: '72px', maxHeight: '100%', maxWidth: '100%' }} />
              }
            </LogoImage>
          </SpecificColumnValue>
        </SpecificItemByStart>
        <SpecificItem>
          <SpecificLabelTypo>Marketing Decsription</SpecificLabelTypo>
          <SpecificValueTypo>{marketingDescription}</SpecificValueTypo>
        </SpecificItem>
        <SpecificItem>
          <SpecificLabelTypo>Marketing Address</SpecificLabelTypo>
          <SpecificMetadataValueWrapper>
            <SpecificValueTypo>{marketingAddress}</SpecificValueTypo>
            <CopyIconButton text={""} width={"20px"} height={"20px"} />
          </SpecificMetadataValueWrapper>
        </SpecificItem>
        <SpecificItem>
          <SpecificLabelTypo>Marketing Project</SpecificLabelTypo>
          <SpecificValueTypo>{marketingProject}</SpecificValueTypo>
        </SpecificItem>
        <SpecificItemByStart>
          <SpecificLabelTypo>Metadata</SpecificLabelTypo>
          <SpecificMetadataWrapper>
            <SpecificMetadataValueWrapper>
              <SpecificMetadataTypo>View Metadata</SpecificMetadataTypo>
              <CopyIconButton text={""} width={"20px"} height={"20px"} />
            </SpecificMetadataValueWrapper>
            {metadata !== "" ? <JsonViewer data={JSON.parse(metadata)} /> : <></> }
            {/* <ReactJson src={JSON.parse(metadata)} /> */}
          </SpecificMetadataWrapper>
        </SpecificItemByStart>
      </TokenCardSpecific>
    </TokenCard>
  )
};

export default AdditionalInformation;