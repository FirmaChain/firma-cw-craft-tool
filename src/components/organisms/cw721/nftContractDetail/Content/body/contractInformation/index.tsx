import CopyIconButton from '@/components/atoms/buttons/copyIconButton';

import {
    SpecificItem,
    SpecificLabelTypo,
    SpecificValueCover,
    SpecificValueTypo,
    SpecificValueWrapper,
    ContractCard,
    CardHeaderTypo,
    CardSpecific,
    SpecificValueBox,
    NFTTableContainer,
    TableExpandButton
} from './style';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import Skeleton from '@/components/atoms/skeleton';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';
import NFTsTable from './nftsTable';
import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import { IC_EXPAND } from '@/components/atoms/icons/pngIcons';

const ContractInformation = () => {
    const network = useSelector((state: rootState) => state.global.network);

    const { contractDetail, nftsInfo } = useNFTContractDetailStore((state) => state);

    const contractAddress = contractDetail?.contractAddress || '';
    const codeId = contractDetail?.codeId;
    const contractName = contractDetail?.name || '';
    const contractSymbol = contractDetail?.symbol || '';
    const codeID = contractDetail?.codeId || '';
    const label = contractDetail?.label;
    const totalSupply = nftsInfo?.totalSupply || '0';

    const [expand, setExpand] = useState(true);

    const isBasic = useMemo(() => {
        const craftConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return codeId === craftConfig.CW20.BASIC_CODE_ID;
    }, [network, codeId]);

    return (
        <ContractCard>
            <CardHeaderTypo>Contract Information</CardHeaderTypo>
            <CardSpecific>
                <SpecificItem>
                    <SpecificLabelTypo>Contract Address</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        {contractAddress ? (
                            <>
                                <SpecificValueTypo>{contractAddress}</SpecificValueTypo>
                                <CopyIconButton text={contractAddress} width={'22px'} height={'22px'} />
                            </>
                        ) : (
                            <Skeleton width="200px" height="22px" />
                        )}
                    </SpecificValueWrapper>
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>Contract Name</SpecificLabelTypo>
                    {contractName ? <SpecificValueTypo>{contractName}</SpecificValueTypo> : <Skeleton width="100px" height="22px" />}
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>Contract Symbol</SpecificLabelTypo>
                    {contractSymbol ? <SpecificValueTypo>{contractSymbol}</SpecificValueTypo> : <Skeleton width="100px" height="22px" />}
                </SpecificItem>

                {!isBasic && (
                    <SpecificItem style={{ height: '28px' }}>
                        <SpecificLabelTypo>Label</SpecificLabelTypo>
                        {typeof label === 'string' ? (
                            <SpecificValueCover>{label}</SpecificValueCover>
                        ) : (
                            <Skeleton width="100px" height="22px" />
                        )}
                    </SpecificItem>
                )}
                <SpecificItem>
                    <SpecificLabelTypo>Code ID</SpecificLabelTypo>
                    {codeID ? <SpecificValueTypo>{codeID}</SpecificValueTypo> : <Skeleton width="100px" height="22px" />}
                </SpecificItem>

                <SpecificItem style={{ alignItems: 'flex-start' }}>
                    <SpecificLabelTypo>Total Supply</SpecificLabelTypo>
                    <SpecificValueBox>
                        <IconButton
                            onClick={() => setExpand(!expand)}
                            style={{ padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}
                        >
                            <SpecificValueWrapper>
                                <SpecificValueTypo>
                                    {`${totalSupply}`}<span>{'NFT'}</span>
                                </SpecificValueTypo>
                            </SpecificValueWrapper>
                            <TableExpandButton $expand={expand} src={IC_EXPAND} alt={'expand'} />
                        </IconButton>
                        <NFTTableContainer $expand={expand}>
                            <NFTsTable />
                        </NFTTableContainer>
                    </SpecificValueBox>
                </SpecificItem>
            </CardSpecific>
        </ContractCard>
    );
};

export default ContractInformation;
