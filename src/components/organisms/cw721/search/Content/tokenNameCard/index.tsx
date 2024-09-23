import Divider from '@/components/atoms/divider';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { Container, TokenNameBox, TotalSupplyBox } from './style';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';

const TokenNameCard = () => {
    const userAddress = useSelector((state: rootState) => state.wallet.address);

    const { contractDetail, nftsInfo } = useNFTContractDetailStore((state) => state);
    const admin = contractDetail?.admin || '';
    const contractName = contractDetail?.name || '';
    const contractSymbol = contractDetail?.symbol || '';
    const totalSupply = nftsInfo?.totalSupply || '0';

    const isOwner = userAddress === admin;

    return (
        <Container>
            <div style={{ width: '100%' }}>
                <TokenNameBox>
                    <div className="token-name-box">
                        <div className="token-symbol">{contractSymbol}</div>
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
