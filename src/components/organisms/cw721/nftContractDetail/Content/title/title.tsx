import {
    GoToButtonTypo,
    GoToExecuteButton,
    SymbolTypo,
    TitleContainer,
    TitleWrapper,
    TokenInfo,
    TokenInfoWrapper,
    NameTypo,
    TotalSupplySymbolTypo,
    TotalSupplyTypo,
    TotalSupplyWrapper
} from './style';
import { useNavigate } from 'react-router-dom';
import commaNumber from 'comma-number';
import Divider from '@/components/atoms/divider';
import Skeleton from '@/components/atoms/skeleton';
// import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';
// import useCW721ExecuteStore from '../../../execute/hooks/useCW721ExecuteStore';

import TextEllipsis from '@/components/atoms/ellipsis';
import { useCW721Detail } from '@/context/cw721DetailStore';
import { useCW721Execute } from '@/context/cw721ExecuteContext';
import useContractAddressStore from '@/store/contractAddressStore';

const Title = () => {
    const { contractDetail, nftsInfo } = useCW721Detail();
    // const { setContractAddress } = useCW721Execute();
    const { setCW721 } = useContractAddressStore();

    const contractAddress = contractDetail?.contractAddress || null;
    const name = contractDetail?.name || null;
    const symbol = contractDetail?.symbol || null;
    const totalSupply = nftsInfo?.totalSupply || 0;

    const navigatge = useNavigate();

    const onClickExecute = () => {
        // setContractAddress(contractAddress);
        setCW721(contractAddress);
        navigatge(`/cw721/execute`);
    };

    return (
        <TitleContainer>
            <TitleWrapper>
                <TokenInfoWrapper>
                    <TokenInfo style={{ height: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
                            {symbol ? <SymbolTypo>{symbol}</SymbolTypo> : <Skeleton />}
                        </div>
                        <div style={{ width: '1px', height: '12px', background: 'var(--Gray-400, #2C2C2C)' }} />

                        {name ? <TextEllipsis CustomDiv={NameTypo} text={name} breakMode={'letters'} /> : <Skeleton width="50px" />}
                    </TokenInfo>

                    <div style={{ padding: '12px 0 8px' }}>
                        <Divider $direction="horizontal" $color="#2c2c2c" />
                    </div>

                    <TotalSupplyWrapper style={{ height: '22px' }}>
                        <TotalSupplyTypo>Total Supply : </TotalSupplyTypo>
                        <TotalSupplySymbolTypo>
                            <span className="bold">{commaNumber(totalSupply)}</span>

                            {'NFT'}
                        </TotalSupplySymbolTypo>
                    </TotalSupplyWrapper>
                </TokenInfoWrapper>
            </TitleWrapper>
            <GoToExecuteButton disabled={!contractAddress} onClick={onClickExecute}>
                <GoToButtonTypo>Go to execute</GoToButtonTypo>
                <GoToButtonTypo>→</GoToButtonTypo>
            </GoToExecuteButton>
        </TitleContainer>
    );
};

export default Title;
