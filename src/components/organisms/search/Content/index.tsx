import styled from 'styled-components';
import { Container, ContractWarp, NoticeText } from './style';
import TokenNameCard from './tokenNameCard';
import TokenDetailCard from './tokenDetailCard';
import TokenWalletSearch from './tokenWalletSearch';
import useSearchStore from '../searchStore';
import { FIRMA_DIM_LOGO } from '@/components/atoms/icons/pngIcons';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
// import StyledTable, { IColumn } from '@/components/atoms/table';
// import Cell from '@/components/atoms/table/cells';

const LogoBackground = styled.div`
    position: fixed;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
        width: 480px;
    }
`;

// const columns: IColumn[] = [
//     { id: 'contraactName', label: 'Contract Name', minWidth: '240px' },
//     { id: 'hash', label: 'Hash', renderCell: (id, row) => <Cell.Hash hash={row[id]} />, minWidth: '280px' },
//     { id: 'type', label: 'Type', renderCell: (id, row) => <Cell.TransactionType type={row[id]} />, minWidth: '200px' },
//     { id: 'height', label: 'Block', renderCell: (id, row) => <Cell.BlockHeight block={row[id]} />, minWidth: '120px' },
//     {
//         id: 'address',
//         label: 'From (Wallet Address)',
//         renderCell: (id, row) => <Cell.WalletAddress address={row[id]} sliceLength={10} />,
//         minWidth: '250px'
//     },
//     { id: 'success', label: 'Result', renderCell: (id, row) => <Cell.ResultStatus isSuccess={row[id]} />, minWidth: '120px' },
//     {
//         id: 'timestamp',
//         label: 'Time',
//         renderCell: (id, row) => <Cell.TimeAgo timestamp={row[id]} />,
//         minWidth: '120px'
//     }
// ];

const Content = () => {
    const contractExist = useSearchStore((v) => v.contractExist);
    const contractAddress = useSearchStore((v) => v.contractInfo?.address);
    const address = useSelector((v: rootState) => v.wallet.address);

    return (
        <Container>
            {contractExist === null && address && (
                <LogoBackground>
                    <img src={FIRMA_DIM_LOGO} alt="logo" className="logo" />
                </LogoBackground>
            )}
            {contractExist === false && <NoticeText>{'No contracts have been deployed.'}</NoticeText>}
            {contractExist === true && contractAddress && (
                <ContractWarp>
                    <TokenNameCard />
                    <TokenDetailCard />
                    <TokenWalletSearch />
                </ContractWarp>
            )}
        </Container>
    );
};

export default Content;
