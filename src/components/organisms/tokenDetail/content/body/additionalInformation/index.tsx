import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TokenCardSpecific } from '../tokenInfomation/style';
import {
    IconBackground,
    LogoImage,
    SpecificColumnValue,
    SpecificItem,
    SpecificItemByStart,
    SpecificLabelTypo,
    SpecificMetadataJSON,
    SpecificMetadataTypo,
    SpecificMetadataValueWrapper,
    SpecificMetadataWrapper,
    SpecificValueTypo,
    TokenCard,
    TokenCardHeaderTypo
} from './style';
import Icons from '@/components/atoms/icons';
import JsonViewer from '@/components/atoms/viewer/jsonViewer';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import CopyIconButton from '@/components/atoms/buttons/copyIconButton';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { IC_NAVIGATION } from '@/components/atoms/icons/pngIcons';

interface IProps {
    contractAddress: string;
    marketingLogo: string;
    marketingDescription: string;
    marketingAddress: string;
    marketingProject: string;
    metadata: string;
}

const AdditionalInformation = ({
    contractAddress,
    marketingLogo,
    marketingDescription,
    marketingAddress,
    marketingProject,
    metadata
}: IProps) => {
    const network = useSelector((state: rootState) => state.global.network);
    const navigate = useNavigate();

    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');
    const [blockExplorerLink, setBlockExplorerLink] = useState<string>('');

    const isBasic = useMemo(() => {
        return marketingLogo === 'null' && marketingDescription === 'null' && marketingProject === 'null';
    }, [marketingDescription, marketingLogo, marketingProject]);

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
                setValidTokenLogoUrl('');
            };
        } else {
            setValidTokenLogoUrl('');
        }
    }, [marketingLogo]);

    const onClickViewMetadata = () => {
        window.open(`${blockExplorerLink}/accounts/${contractAddress}`);
    };

    return (
        <TokenCard>
            <TokenCardHeaderTypo>Additional Information</TokenCardHeaderTypo>
            <TokenCardSpecific>
                <SpecificItemByStart>
                    <SpecificLabelTypo>{isBasic ? 'Token' : 'Marketing'} Logo</SpecificLabelTypo>
                    <SpecificColumnValue>
                        <LogoImage>
                            {validTokenLogoUrl === '' ? (
                                <IconBackground>
                                    <Icons.Picture width={'34px'} height={'34px'} />
                                </IconBackground>
                            ) : (
                                <img
                                    src={validTokenLogoUrl}
                                    style={{ width: '72px', height: '72px', maxHeight: '100%', maxWidth: '100%' }}
                                    alt="token-logo"
                                    data-tooltip-content={validTokenLogoUrl ? marketingLogo : ''}
                                    data-tooltip-id={TOOLTIP_ID.COMMON}
                                    data-tooltip-wrapper="span"
                                    data-tooltip-place="bottom"
                                />
                            )}
                        </LogoImage>
                    </SpecificColumnValue>
                </SpecificItemByStart>
                <SpecificItem>
                    <SpecificLabelTypo>{isBasic ? 'Token' : 'Marketing'} Decsription</SpecificLabelTypo>
                    <SpecificValueTypo $disabled={!Boolean(marketingDescription) || marketingDescription === 'null'}>
                        {marketingDescription !== 'null' ? marketingDescription : 'Token Description'}
                    </SpecificValueTypo>
                </SpecificItem>
                {!isBasic && (
                    <>
                        <SpecificItem>
                            <SpecificLabelTypo>Marketing Address</SpecificLabelTypo>
                            <SpecificMetadataValueWrapper>
                                <SpecificValueTypo $disabled={!Boolean(marketingDescription) || marketingAddress === 'null'}>
                                    {marketingAddress === 'null' ? 'Marketing Address' : marketingAddress}
                                </SpecificValueTypo>
                                {marketingAddress !== 'null' && <CopyIconButton text={marketingAddress} width={'20px'} height={'20px'} />}
                            </SpecificMetadataValueWrapper>
                        </SpecificItem>

                        <SpecificItem>
                            <SpecificLabelTypo>Marketing Project</SpecificLabelTypo>
                            <SpecificValueTypo $disabled={!Boolean(marketingProject) || marketingProject === 'null'}>
                                {marketingProject === 'null' ? 'Marketing Project' : marketingProject}
                            </SpecificValueTypo>
                        </SpecificItem>
                    </>
                )}
                <SpecificItemByStart>
                    <SpecificLabelTypo>Metadata</SpecificLabelTypo>
                    <SpecificMetadataWrapper>
                        <SpecificMetadataValueWrapper style={{ width: 'fit-content', cursor: 'pointer' }} onClick={onClickViewMetadata}>
                            <SpecificMetadataTypo>View Metadata</SpecificMetadataTypo>

                            <img src={IC_NAVIGATION} alt="navigation" style={{ width: '20px', height: '20px' }} />
                        </SpecificMetadataValueWrapper>
                        {metadata !== '' ? <JsonViewer data={JSON.parse(metadata)} /> : <></>}
                    </SpecificMetadataWrapper>
                </SpecificItemByStart>
            </TokenCardSpecific>
        </TokenCard>
    );
};

export default AdditionalInformation;
