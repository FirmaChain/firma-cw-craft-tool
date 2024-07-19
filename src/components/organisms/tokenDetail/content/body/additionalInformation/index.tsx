import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { TokenCardSpecific } from '../tokenInfomation/style';
import {
    IconBackground,
    LogoImage,
    SpecificColumnValue,
    SpecificItem,
    SpecificItemByStart,
    SpecificLabelTypo,
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
import useTokenDetailStore from '@/store/useTokenDetailStore';

const isFalsy = (value?: string) => {
    return value === '' || value.toLowerCase() === 'null' || !Boolean(value);
};

const AdditionalInformation = () => {
    const network = useSelector((state: rootState) => state.global.network);

    const contractAddress = useTokenDetailStore((state) => state.tokenDetail?.contractAddress) || '';
    const marketingLogo = useTokenDetailStore((state) => state.tokenDetail?.marketingLogoUrl) || '';
    const marketingDescription = useTokenDetailStore((state) => state.tokenDetail?.marketingDescription) || '';
    const marketingAddress = useTokenDetailStore((state) => state.tokenDetail?.marketing) || '';
    const marketingProject = useTokenDetailStore((state) => state.tokenDetail?.marketingProject) || '';
    const metadata = useTokenDetailStore((state) => state.tokenDetail?.metadata) || '';

    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');
    const [blockExplorerLink, setBlockExplorerLink] = useState<string>('');

    const isBasic = useMemo(() => {
        if (!marketingLogo && !marketingDescription && !marketingProject) return true;
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
                                    style={{ width: '90px', height: '90px', borderRadius: '50%' }}
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
                    <SpecificValueTypo $disabled={isFalsy(marketingDescription)}>
                        {isFalsy(marketingDescription) ? 'Token Description' : marketingDescription}
                    </SpecificValueTypo>
                </SpecificItem>
                {!isBasic && (
                    <>
                        <SpecificItem>
                            <SpecificLabelTypo>Marketing Address</SpecificLabelTypo>
                            <SpecificMetadataValueWrapper>
                                <SpecificValueTypo $disabled={isFalsy(marketingAddress)}>
                                    {isFalsy(marketingAddress) ? 'Marketing Address' : marketingAddress}
                                </SpecificValueTypo>
                                {marketingAddress !== 'null' && <CopyIconButton text={marketingAddress} width={'20px'} height={'20px'} />}
                            </SpecificMetadataValueWrapper>
                        </SpecificItem>

                        <SpecificItem>
                            <SpecificLabelTypo>Marketing Project</SpecificLabelTypo>
                            <SpecificValueTypo $disabled={isFalsy(marketingProject)}>
                                {isFalsy(marketingProject) ? 'Marketing Project' : marketingProject}
                            </SpecificValueTypo>
                        </SpecificItem>
                        <SpecificItemByStart>
                            <SpecificLabelTypo>Metadata</SpecificLabelTypo>
                            <SpecificMetadataWrapper>
                                <SpecificMetadataValueWrapper
                                    style={{ width: 'fit-content', cursor: 'pointer' }}
                                    onClick={onClickViewMetadata}
                                >
                                    <SpecificMetadataTypo>View Metadata</SpecificMetadataTypo>

                                    <img src={IC_NAVIGATION} alt="navigation" style={{ width: '20px', height: '20px' }} />
                                </SpecificMetadataValueWrapper>
                                {metadata !== '' ? <JsonViewer data={JSON.parse(metadata)} /> : <></>}
                            </SpecificMetadataWrapper>
                        </SpecificItemByStart>
                    </>
                )}
            </TokenCardSpecific>
        </TokenCard>
    );
};

export default AdditionalInformation;
