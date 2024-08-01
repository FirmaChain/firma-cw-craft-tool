import { IC_VALID_SHIELD } from '@/components/atoms/icons/pngIcons';
import Divider from '@/components/atoms/divider';
import useCW721SearchStore from '../../cw721SearchStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { Container, TokenNameBox, TotalSupplyBox } from './style';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';

const TokenNameCard = () => {
    const userAddress = useSelector((state: rootState) => state.wallet.address);


    const { contractDetail, nftsInfo } = useNFTContractDetailStore((state) => state);
    const contractAddress = contractDetail?.contractAddress || '';
    const admin = contractDetail?.admin || '';
    const codeId = contractDetail?.codeId || '';
    const minter = contractDetail.minter || '';
    const contractName = contractDetail?.name || '';
    const contractSymbol = contractDetail?.symbol || '';
    const codeID = contractDetail?.codeId || '';
    const label = contractDetail?.label;
    const totalSupply = nftsInfo?.totalSupply || '0';

    // const symbol = useCW721SearchStore((state) => state.nftInfo?.symbol);
    // const nftName = useCW721SearchStore((state) => state.nftInfo?.name);
    // const ownerAddress = useCW721SearchStore((state) => state.contractInfo?.contract_info.admin);

    const isOwner = userAddress === admin;

    return (
        <Container>
            <div style={{ width: '100%' }}>
                <TokenNameBox>
                    <div className="token-name-box">
                        <div className="token-symbol">{contractSymbol}</div>
                        {/* <img src={IC_VALID_SHIELD} alt="verified-icon" style={{ width: '24px' }} /> */}
                    </div>

                    {isOwner && (
                        <div className="owner-tag">
                            <span className="owner-box-text">OWNER</span>
                        </div>
                    )}

                    <div className="divider" />

                    <div className="token-name">{contractName}</div>
                </TokenNameBox>
                <div style={{ margin: '12px 0 8px' }}>
                    <Divider $color="var(--Gray-400, #2C2C2C)" $direction={'horizontal'} />
                </div>
                <TotalSupplyBox>
                    <div className="title">Total supply:</div>
                    <div className="amount">
                        <span className="bold">{totalSupply}</span> <span className="symbol">{'NFT'}</span>
                    </div>
                </TotalSupplyBox>
            </div>
        </Container>
    );
};

export default TokenNameCard;
