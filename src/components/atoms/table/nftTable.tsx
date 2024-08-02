/*
# wanted view
	- nft image list
	- page number not supported (chain issue)
	- sorting not supported (chain issue, sort by string)

# req
	- nft id list?
*/

import styled from 'styled-components';
import IconButton from '../buttons/iconButton';
import { useState } from 'react';
import { NoDataTypo } from './styles';
import { BarLoader } from 'react-spinners';
import Icons from '../icons';
import { StyledOverlayScrollbar } from '@/components/organisms/instantiate/preview/dashboard/style';

const TableBackground = styled.div`
    width: 100%;
    min-height: 208px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    position: relative;

    padding: 36px 40px 20px 40px;

    justify-content: flex-start;

    border-radius: 12px;
    background: var(--Gray-150, #141414);
`;

const TableGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));

    max-height: 248px;
    overflow-y: scroll;

    gap: 24px 12px;
`;

const EmptyBoxWrap = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    align-items: center;
    justify-content: center;
`;

const NFTCardWrap = styled(IconButton)`
    display: flex;

    width: 88px;
    height: 112px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;

    border-radius: 12px;
    border: 1px solid var(--Gray-500, #383838);

    .nft-image {
        display: flex;
        min-width: 64px;
        max-width: 64px;
        min-height: 64px;
        max-height: 64px;

        object-fit: cover;

        justify-content: center;
        align-items: center;

        border-radius: 8px;
        border: 1px solid var(--Gray-550, #444);
    }

    .typo {
        color: var(--Gray-900, var(--Primary-Base-White, #fff));
        text-align: center;

        /* Body/Body1 - Md */
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 137.5% */

        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
    }
`;

const EmptyBox = ({ isLoading, isEmpty }: { isLoading?: boolean; isEmpty?: boolean }) => {
    return (
        <EmptyBoxWrap>
            {isLoading && <BarLoader color="#EFEFEF" />}
            {isEmpty && <NoDataTypo className="select-none">There is no data</NoDataTypo>}
        </EmptyBoxWrap>
    );
};

const NFTCard = ({ item }: { item: { id: string; imgUrl: string } }) => {
    return (
        <NFTCardWrap>
            <img src={item.imgUrl} alt="" className="nft-image" />
            <div className="typo">{item.id}</div>
        </NFTCardWrap>
    );
};

const PaginationButton = styled(IconButton)`
    display: flex;
    width: 20px;
    height: 20px;
    padding: 0;

    outline: unset !important;
`;

const NftTable = ({ items, isLoading }: { items?: { id: string; imgUrl: string }[]; isLoading?: boolean }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const currentItems = items?.slice(currentPage * 20, (currentPage + 1) * 20);

    const endPageNumber = Math.ceil(items?.length / 20);

    const isEmpty = !items || items.length === 0;

    const setPageNumber = (value: number) => {
        setCurrentPage(value);
    };

    return (
        <TableBackground>
            {isLoading ? (
                <EmptyBox isLoading />
            ) : isEmpty ? (
                <EmptyBox isEmpty />
            ) : (
                <StyledOverlayScrollbar defer>
                    <TableGrid>
                        {currentItems.map((item, idx) => (
                            <NFTCard key={idx} item={item} />
                        ))}
                    </TableGrid>
                </StyledOverlayScrollbar>
            )}
            {!isLoading && !isEmpty && (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <PaginationButton disabled={currentPage === 0} onClick={() => setPageNumber(0)}>
                        <Icons.LeftDoubleArrow width="20px" height="20px" />
                    </PaginationButton>
                    <PaginationButton disabled={currentPage === 0} onClick={() => setPageNumber(currentPage - 1)}>
                        <Icons.PrevPage width="20px" height="20px" />
                    </PaginationButton>
                    <div style={{ width: '12px' }} />
                    <PaginationButton disabled={currentPage + 1 >= endPageNumber} onClick={() => setPageNumber(currentPage + 1)}>
                        <Icons.PrevPage width="20px" height="20px" style={{ transform: 'rotate(180deg)' }} />
                    </PaginationButton>
                    <PaginationButton disabled={currentPage + 1 >= endPageNumber} onClick={() => setPageNumber(endPageNumber - 1)}>
                        <Icons.RightDoubleArrow width="20px" height="20px" />
                    </PaginationButton>
                </div>
            )}
        </TableBackground>
    );
};

export default NftTable;
