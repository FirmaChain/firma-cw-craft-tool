import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import { CardContainer, CardTitle, SectionContainer } from './style';
import Divider from '@/components/atoms/divider';
import StyledTable, { IColumn } from '@/components/atoms/table';
import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import { useEffect, useState } from 'react';
import { isValidAddress, parseExpires } from '@/utils/common';
import useCW721SearchStore from '../cw721SearchStore';
import Cell from '@/components/atoms/table/cells';
import DarkButton from '@/components/atoms/buttons/darkButton';

const EndAdornment = ({
    keyword,
    disableSearch = false,
    onClickSearch,
    onClickClear
}: {
    keyword: string;
    disableSearch?: boolean;
    onClickSearch: () => void;
    onClickClear: () => void;
}) => {
    const _disableSearch = keyword === '' || disableSearch;

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
            {keyword && (
                <IconButton style={{ padding: 0, display: 'flex' }} onClick={onClickClear}>
                    <Icons.XCircle width={'32px'} height={'32px'} />
                </IconButton>
            )}

            <IconButton style={{ padding: 0, display: 'flex' }} disabled={_disableSearch} onClick={onClickSearch}>
                <Icons.Search
                    width="28px"
                    height="28px"
                    fill={_disableSearch ? '#807E7E' : '#FFFFFF'}
                    stroke={_disableSearch ? '#807E7E' : '#FFFFFF'}
                />
            </IconButton>
        </div>
    );
};

const TokenWalletSearch = () => {
    const contractAddress = useCW721SearchStore((v) => v.contractInfo?.address);

    //? Search keyword (wallet address)
    const [keyword, setKeyword] = useState<string>('');
    const [searchById, setSearchById] = useState(true);

    //? Search result
    // const { getWalletSearch } = useTokenDetail();

    const getAddressInfo = async () => {
        if (keyword.length > 0 && isValidAddress(keyword)) {
            // const searchResult = await getWalletSearch(contractAddress, keyword);
            // if (searchResult) {
            // }
        }
    };

    useEffect(() => {
        //? Reset inforamtion when contract changed
        //? May be useless [if all component un-mounted] when contract change
        setKeyword('');
    }, [contractAddress]);

    const columns: IColumn[] = [
        {
            id: 'Receiver',
            label: 'Receiver',
            renderCell: (id, row) => <Cell.WalletAddress address={row[id]} />,
            width: '50%',
            minWidth: '450px'
        },
        {
            id: 'Expires',
            label: 'Expires',
            renderCell: (id, row) => parseExpires(JSON.stringify(row['Expires'])),
            width: '55%',
            minWidth: '200px'
        }
    ];

    return (
        <CardContainer>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '32px' }}>
                <CardTitle className="card-title">Search</CardTitle>

                <DarkButton
                    value={searchById}
                    typos={{
                        left: 'Token ID',
                        right: 'Wallet Address'
                    }}
                    onChange={(v) => setSearchById(v)}
                />
            </div>

            <SearchInputWithButton2
                value={keyword}
                placeHolder={'Search Wallet Address'}
                onChange={(v) => setKeyword(v)}
                onClickEvent={getAddressInfo}
                adornment={{
                    end: (
                        <EndAdornment
                            keyword={keyword}
                            disableSearch={!isValidAddress(keyword)}
                            onClickSearch={getAddressInfo}
                            onClickClear={() => setKeyword('')}
                        />
                    )
                }}
            />
            <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" />
            <SectionContainer className="section-horizontal">
                <div className="box-row">
                    <div className="section-title" style={{ minWidth: '224px' }}>
                        Owner
                    </div>
                    <div className="box-value">
                        <div className="white-typo single-line-clamp">{'-'}</div>
                        {/* {keyword && <CopyIconButton width="22px" height="22px" text={keyword} />} */}
                    </div>
                </div>
                <div className="box-row">
                    <div className="section-title" style={{ minWidth: '224px' }}>
                        Token URL
                    </div>
                    <div className="box-value">
                        <div className="white-typo single-line-clamp">{'-'}</div>
                        {/* {keyword && <CopyIconButton width="22px" height="22px" text={keyword} />} */}
                    </div>
                </div>
            </SectionContainer>
            <SectionContainer className="section-vertical">
                <div className="section-title">Approvals</div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '24px' }}>
                    <StyledTable columns={columns} rows={[]} isLoading={false} />
                </div>
            </SectionContainer>
        </CardContainer>
    );
};

export default TokenWalletSearch;
