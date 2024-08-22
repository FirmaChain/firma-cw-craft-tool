import { useEffect, useMemo, useRef, useState } from 'react';

import { TokenCardSpecific } from '../tokenInfomation/style';
import {
    LessTypo,
    SpecificColumnValue,
    SpecificItem,
    SpecificItemByStart,
    SpecificLabelTypo,
    SpecificMetadataValueWrapper,
    SpecificMetadataWrapper,
    SpecificValueTypo,
    TokenCard,
    TokenCardHeaderTypo
} from './style';
import JsonViewer from '@/components/atoms/viewer/jsonViewer';
import { CRAFT_CONFIGS } from '@/config';
import CopyIconButton from '@/components/atoms/buttons/copyIconButton';
import { IC_ROUND_ARROW_UP } from '@/components/atoms/icons/pngIcons';
import useTokenDetailStore from '@/store/useTokenDetailStore';
import Skeleton from '@/components/atoms/skeleton';
import { openLink } from '@/utils/common';
import CopyMetadata from '@/components/atoms/buttons/copyMetadata';
import TokenLogo from '@/components/atoms/icons/TokenLogo';
import { useMeasure } from 'react-use';

const AdditionalInformation = () => {
    const contractAddress = useTokenDetailStore((state) => state.tokenDetail?.contractAddress) || '';
    const codeId = useTokenDetailStore((state) => state.tokenDetail?.codeId);
    const marketingLogo = useTokenDetailStore((state) => state.tokenDetail?.marketingLogoUrl) || '';
    const marketingDescription = useTokenDetailStore((state) => state.tokenDetail?.marketingDescription);
    const marketingAddress = useTokenDetailStore((state) => state.tokenDetail?.marketing);
    const marketingProject = useTokenDetailStore((state) => state.tokenDetail?.marketingProject);
    const metadata = useTokenDetailStore((state) => state.tokenDetail?.metadata);

    const [ref, { width }] = useMeasure();

    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string | null>(null);
    const [blockExplorerLink, setBlockExplorerLink] = useState<string>('');

    const isBasic = useMemo(() => {
        if (codeId) {
            return codeId === CRAFT_CONFIGS.CW20.BASIC_CODE_ID;
        }
    }, [codeId]);

    useEffect(() => {
        setBlockExplorerLink(CRAFT_CONFIGS.BLOCK_EXPLORER);
    }, []);

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

    // const onClickViewMetadata = () => {
    //     openLink(`${blockExplorerLink}/accounts/${contractAddress}`);
    // };

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
    }, [marketingDescription, width]);

    return (
        <TokenCard ref={ref}>
            <TokenCardHeaderTypo>Additional Information</TokenCardHeaderTypo>
            <TokenCardSpecific>
                <SpecificItemByStart>
                    <SpecificLabelTypo>{isBasic ? 'Token' : 'Marketing'} Logo</SpecificLabelTypo>
                    <SpecificColumnValue>
                        <TokenLogo src={validTokenLogoUrl} size="90px" showTooltip />
                    </SpecificColumnValue>
                </SpecificItemByStart>
                {!isBasic && (
                    <SpecificItem>
                        <SpecificLabelTypo>Marketing Address</SpecificLabelTypo>
                        {typeof marketingAddress === 'string' ? (
                            <SpecificMetadataValueWrapper>
                                <SpecificValueTypo className="clamp-single-line">
                                    {!marketingAddress ? '-' : marketingAddress}
                                </SpecificValueTypo>
                                {!marketingAddress === false && <CopyIconButton text={marketingAddress} width={'20px'} height={'20px'} />}
                            </SpecificMetadataValueWrapper>
                        ) : (
                            <Skeleton width="100px" height="22px" />
                        )}
                    </SpecificItem>
                )}
                <SpecificItem style={{ alignItems: 'flex-start' }}>
                    <SpecificLabelTypo>{isBasic ? 'Token' : 'Marketing'} Description</SpecificLabelTypo>
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
                                            height: isClamped ? '100%' : descRef.current.scrollHeight,
                                            // overflow: isClamped ? 'hidden' : 'visible'
                                            overflow: 'hidden',
                                            transition: 'all 0.2s'
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
                            <SpecificLabelTypo>Marketing Project</SpecificLabelTypo>
                            {typeof marketingProject === 'string' ? (
                                <SpecificValueTypo className="clamp-single-line">
                                    {!marketingProject ? '-' : marketingProject}
                                </SpecificValueTypo>
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
