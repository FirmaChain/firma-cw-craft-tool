import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { TokenCardSpecific } from '../tokenInfomation/style';
import {
    IconBackground,
    LessTypo,
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
import { IC_NAVIGATION, IC_ROUND_ARROW_UP } from '@/components/atoms/icons/pngIcons';
import useTokenDetailStore from '@/store/useTokenDetailStore';
import Skeleton from '@/components/atoms/skeleton';
import { openLink } from '@/utils/common';
import CopyMetadata from '@/components/atoms/buttons/copyMetadata';

const AdditionalInformation = () => {
    const network = useSelector((state: rootState) => state.global.network);

    const contractAddress = useTokenDetailStore((state) => state.tokenDetail?.contractAddress) || '';
    const codeId = useTokenDetailStore((state) => state.tokenDetail?.codeId);
    const marketingLogo = useTokenDetailStore((state) => state.tokenDetail?.marketingLogoUrl) || '';
    const marketingDescription = useTokenDetailStore((state) => state.tokenDetail?.marketingDescription);
    const marketingAddress = useTokenDetailStore((state) => state.tokenDetail?.marketing);
    const marketingProject = useTokenDetailStore((state) => state.tokenDetail?.marketingProject);
    const metadata = useTokenDetailStore((state) => state.tokenDetail?.metadata);

    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string | null>(null);
    const [blockExplorerLink, setBlockExplorerLink] = useState<string>('');

    const isBasic = useMemo(() => {
        if (codeId) {
            const craftConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
            return codeId === craftConfig.CW20.BASIC_CODE_ID;
        }
    }, [network, codeId]);

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
        openLink(`${blockExplorerLink}/accounts/${contractAddress}`);
    };

    const descRef = useRef<HTMLDivElement>();
    const [needClamp, setNeedClamp] = useState(false);
    const [isClamped, setIsClamped] = useState(true);

    const openClamp = () => setIsClamped(false);
    const closeClamp = () => setIsClamped(true);

    useEffect(() => {
        const height = descRef.current?.clientHeight;

        if (height > 66) {
            if (!needClamp) setNeedClamp(true);
        } else {
            //? height < 66px
            if (needClamp) setNeedClamp(false);
            setIsClamped(true);
        }
    }, [marketingDescription]);

    return (
        <TokenCard>
            <TokenCardHeaderTypo>Additional Information</TokenCardHeaderTypo>
            <TokenCardSpecific>
                <SpecificItemByStart>
                    <SpecificLabelTypo>{isBasic ? 'Token' : 'Marketing'} Logo</SpecificLabelTypo>
                    <SpecificColumnValue>
                        <LogoImage>
                            {validTokenLogoUrl === null ? (
                                <Skeleton width="90px" height="90px" borderRadius="50%" />
                            ) : validTokenLogoUrl === '' ? (
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
                <SpecificItem style={{ alignItems: 'flex-start' }}>
                    <SpecificLabelTypo>{isBasic ? 'Token' : 'Marketing'} Decsription</SpecificLabelTypo>
                    {typeof marketingDescription === 'string' ? (
                        <div className="box-value">
                            {!marketingDescription ? (
                                <SpecificValueTypo>{'-'}</SpecificValueTypo>
                            ) : (
                                <div style={{ width: '100%', textAlign: 'left', position: 'relative' }}>
                                    {/* //? hidden description typo for more/less button */}
                                    <SpecificValueTypo
                                        ref={descRef}
                                        style={{
                                            zIndex: -1,
                                            position: 'absolute',
                                            opacity: 0,
                                            maxHeight: '70px',
                                            overflow: 'hidden',
                                            wordBreak: 'break-all'
                                        }}
                                    >
                                        {marketingDescription === '' ? 'Description' : marketingDescription}
                                    </SpecificValueTypo>
                                    <div
                                        style={{
                                            maxHeight: isClamped ? '66px' : 'unset',
                                            overflow: isClamped ? 'hidden' : 'visible'
                                        }}
                                    >
                                        <SpecificValueTypo>
                                            <span>{marketingDescription || 'Description'} </span>

                                            {needClamp && !isClamped && (
                                                <span
                                                    style={{
                                                        background: 'var(--200, #1e1e1e)',
                                                        padding: 0,
                                                        cursor: 'pointer',
                                                        whiteSpace: 'pre'
                                                    }}
                                                    onClick={closeClamp}
                                                >
                                                    <LessTypo>less</LessTypo>
                                                    <img
                                                        src={IC_ROUND_ARROW_UP}
                                                        alt="arrow"
                                                        style={{ width: '16px', height: '16px', transform: 'translateY(2px)' }}
                                                    />
                                                </span>
                                            )}
                                        </SpecificValueTypo>
                                        {needClamp && isClamped && (
                                            <span
                                                style={{
                                                    width: 'fit-content',
                                                    height: '20px',
                                                    position: 'absolute',
                                                    right: 0,
                                                    bottom: 0,
                                                    background: 'var(--200, #1e1e1e)',
                                                    padding: 0,
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={openClamp}
                                            >
                                                <SpecificValueTypo>
                                                    <span>... </span>more
                                                </SpecificValueTypo>
                                                <img
                                                    src={IC_ROUND_ARROW_UP}
                                                    alt="arrow"
                                                    style={{ width: '16px', height: '16px', transform: 'rotate(180deg)' }}
                                                />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Skeleton width="100px" height="22px" />
                    )}
                </SpecificItem>
                {!isBasic && (
                    <>
                        <SpecificItem>
                            <SpecificLabelTypo>Marketing Address</SpecificLabelTypo>
                            {typeof marketingAddress === 'string' ? (
                                <SpecificMetadataValueWrapper>
                                    <SpecificValueTypo>{!marketingAddress ? '-' : marketingAddress}</SpecificValueTypo>
                                    {!marketingAddress === false && (
                                        <CopyIconButton text={marketingAddress} width={'20px'} height={'20px'} />
                                    )}
                                </SpecificMetadataValueWrapper>
                            ) : (
                                <Skeleton width="100px" height="22px" />
                            )}
                        </SpecificItem>

                        <SpecificItem>
                            <SpecificLabelTypo>Marketing Project</SpecificLabelTypo>
                            {typeof marketingProject === 'string' ? (
                                <SpecificValueTypo>{!marketingProject ? '-' : marketingProject}</SpecificValueTypo>
                            ) : (
                                <Skeleton width="100px" height="22px" />
                            )}
                        </SpecificItem>
                        <SpecificItemByStart>
                            <SpecificLabelTypo>Metadata</SpecificLabelTypo>
                            {metadata ? (
                                <SpecificMetadataWrapper style={{ overflow: 'hidden' }}>
                                    <CopyMetadata metaData={metadata} />
                                    {metadata !== '' ? <JsonViewer data={JSON.parse(metadata)} /> : <></>}
                                </SpecificMetadataWrapper>
                            ) : (
                                <Skeleton width="100px" height="22px" />
                            )}
                        </SpecificItemByStart>
                    </>
                )}
            </TokenCardSpecific>
        </TokenCard>
    );
};

export default AdditionalInformation;
