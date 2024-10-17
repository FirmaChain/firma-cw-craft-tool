import { DEFAULT_INPUT_REGEX } from '@/constants/regex';
import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { useContractSearchQuery } from '@/api/queries';
import { ContractInfoFromDB } from '@/interfaces/common';
import { useDebounce } from 'react-use';
import FirmaLoading from '../globalLoader/firmaLoad';
import TokenLogo from '../icons/TokenLogo';
import { isValidAddress } from '@/utils/address';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { queryClient } from '@/constants/query-client';
import usePinContractStore from '@/store/pinContractStore';
import IconButton from '../buttons/iconButton';
import Divider from '../divider';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import ContractApi from '@/api/contractApi';

const StyledInput = styled.div<{
    $isFocus?: boolean;
    $error?: boolean;
    $currentLength?: number;
    $textAlign?: 'left' | 'center' | 'right';
    $readOnly?: boolean;
}>`
    width: 100%;
    max-width: 100%;
    min-height: 60px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 0px 10px 0px 24px;
    gap: 8px;

    background: var(--Gray-200, #1a1a1a);

    //? Set border color by state
    border: 1px solid
        ${({ $isFocus, $error, $readOnly }) =>
            $error
                ? 'var(--Status-Alert, #E55250) !important'
                : $isFocus && !$readOnly
                  ? 'var(--Gray-550, #FFFFFF) !important'
                  : 'var(--Gray-550, #444)'};
    border-radius: 12px;
    cursor: text;
    box-sizing: border-box;

    &:hover {
        border: 1px solid ${({ $isFocus, $readOnly }) => ($isFocus && !$readOnly ? '#FFFFFF' : 'var(--Gray-550, #565656)')};
    }

    input {
        background: transparent;
        width: 100%;
        height: 100%;
        z-index: 1;
        color: #ffffff;
        border: none;

        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 142.857% */

        text-align: ${({ $textAlign }) => $textAlign};

        &::placeholder {
            color: var(--Gray-600, #707070);
            /* Body/Body2 - Md */
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 22px; /* 142.857% */
        }

        outline: none;
        &:focus {
            outline: 0;
        }
        &:focus-visible {
            outline: 0;
        }
    }
`;

const SearchTypeBtn = styled.button<{ disabled?: boolean; $selected: boolean }>`
    background: ${({ $selected }) => ($selected ? 'var(--Green-500, #02E191)' : 'unset')};
    padding: 3px 19px;
    border-radius: 8px;
    border: 1px solid;
    border-color: ${({ $selected }) => ($selected ? 'var(--Green-500, #02E191) !important' : 'var(--Gray-500, #383838)')};

    user-select: none;

    color: ${({ $selected }) => ($selected ? 'var(--Gray-100, #121212)' : 'var(--Gray-900, var(--Primary-Base-White, #FFF))')};
    font-size: 13px;
    font-style: normal;
    font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
    line-height: 18px; /* 138.462% */
    font-family: 'General Sans Variable';

    ${({ disabled }) =>
        !disabled
            ? `
    cursor: pointer;

    &:hover {
        border-color: #DCDCDC;
    }
    
    &:active {
        border-color: #DCDCDC;
    }
    
    `
            : `
    color: #444;
    border-color: #444 !important;
    cursor: not-allowed;
    `}
`;

const CWTokenTypo = styled.div`
    color: var(--Gray-650, #707070);

    /* Body/Body2 - Md */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */

    padding: 4px 8px;
`;

const TokenListWarp = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;

    scrollbar-gutter: stable;

    &::-webkit-scrollbar-track {
        background: var(--200, #1e1e1e);
    }
`;

const TokenCardWarp = styled.div`
    display: flex;
    padding: 12px;
    flex-direction: row;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 6px;
    gap: 8px;

    &:hover {
        background: var(--Gray-150, #141414);
        cursor: pointer;
    }

    .token-row {
        display: flex;
        flex-direction: row;
        align-items: center;

        & .token-logo-box {
            width: 24px;
            max-width: 24px;
            height: 24px;
            max-height: 24px;
            margin-right: 10px;
            border-radius: 12px;
            overflow: hidden;
        }

        & .token-name {
            color: var(--Gray-900, var(--Primary-Base-White, #fff));

            /* Body/Body1 - Md */
            font-family: 'General Sans Variable';
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 22px; /* 137.5% */

            margin-right: 4px;
        }

        & .highlight {
            color: var(--Green-500, #02e191);
        }

        & .is-verified {
            width: 20px;
            max-width: 20px;
            height: 20px;
            max-height: 20px;
        }

        & .token-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        & .token-info-typo {
            color: var(--Gray-750, #999);

            /* Body/Body4 - Rg */
            font-family: 'General Sans Variable';
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 14px; /* 116.667% */
        }
    }
`;

const PinButton = ({ isPinned, isBlocked, onClick }: { isPinned: boolean; isBlocked: boolean; onClick: (evt) => void }) => {
    return (
        <IconButton
            disabled={isBlocked && !isPinned}
            style={{
                display: 'flex',
                minWidth: '16px',
                minHeight: '24px',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'unset !important'
            }}
            onClick={(evt) => {
                evt.preventDefault();
                evt.stopPropagation();

                if (isBlocked) {
                    if (isPinned) onClick(evt);
                } else {
                    onClick(evt);
                }
            }}
            data-tooltip-id={TOOLTIP_ID.COMMON}
            data-tooltip-content={isBlocked && !isPinned ? 'You cannot pin more than 10 tokens.' : ''}
        >
            {isPinned ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                        d="M6.42937 0.756229C6.60898 0.203442 7.39102 0.203444 7.57063 0.75623L8.6614 4.11327C8.74173 4.36049 8.9721 4.52786 9.23204 4.52786H12.7618C13.3431 4.52786 13.5847 5.27163 13.1145 5.61327L10.2588 7.68804C10.0485 7.84083 9.96055 8.11165 10.0409 8.35886L11.1316 11.7159C11.3113 12.2687 10.6786 12.7284 10.2083 12.3867L7.35267 10.312C7.14238 10.1592 6.85762 10.1592 6.64733 10.312L3.79166 12.3867C3.32143 12.7284 2.68874 12.2687 2.86835 11.7159L3.95912 8.35886C4.03945 8.11165 3.95145 7.84083 3.74116 7.68804L0.885485 5.61327C0.415257 5.27163 0.656924 4.52786 1.23816 4.52786H4.76796C5.0279 4.52786 5.25827 4.36049 5.3386 4.11327L6.42937 0.756229Z"
                        fill="#02E191"
                    />
                </svg>
            ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M7.42937 1.75623C7.60898 1.20344 8.39102 1.20344 8.57063 1.75623L9.6614 5.11327C9.74173 5.36049 9.9721 5.52786 10.232 5.52786H13.7618C14.3431 5.52786 14.5847 6.27163 14.1145 6.61327L11.2588 8.68804C11.0485 8.84083 10.9606 9.11165 11.0409 9.35886L12.1316 12.7159C12.3113 13.2687 11.6786 13.7284 11.2083 13.3867L8.35267 11.312C8.14238 11.1592 7.85762 11.1592 7.64733 11.312L4.79166 13.3867C4.32143 13.7284 3.68874 13.2687 3.86835 12.7159L4.95912 9.35886C5.03945 9.11165 4.95145 8.84083 4.74116 8.68804L1.88549 6.61327C1.41526 6.27163 1.65692 5.52786 2.23816 5.52786H5.76796C6.0279 5.52786 6.25827 5.36049 6.3386 5.11327L7.42937 1.75623Z"
                        fill="#444444"
                        stroke="#444444"
                        strokeWidth="0.6"
                    />
                </svg>
            )}
        </IconButton>
    );
};

const TokenCard = ({
    tokenInfo,
    keyword,
    filter,
    onClick,
    autoCompleteType
    // isPinned
}: {
    tokenInfo: ContractInfoFromDB;
    keyword: string;
    filter: LocalFilterType;
    onClick: (address: string) => void;
    autoCompleteType: 'cw20' | 'cw721';
    // isPinned: boolean;
}) => {
    const { addPin, removePin } = usePinContractStore();
    const address = useSelector((v: rootState) => v.wallet.address);
    const fullList = usePinContractStore((v) => v.pinList);
    const pinnedList = fullList[address.toLowerCase()]?.filter((one) => one.type === tokenInfo.type) || [];

    const isPinned = Boolean(pinnedList.find((one) => one.contractAddress.toLowerCase() === tokenInfo.contractAddress.toLowerCase()));
    const blockAddPin = pinnedList.length >= 10;

    const nameTypo = useMemo(() => {
        if (filter !== 'name' && filter !== 'pinned') return tokenInfo.name;

        const parts = tokenInfo.name.split(new RegExp(`(${keyword})`, 'gi'));

        return parts.map((part, index) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
                <span key={index} className="highlight">
                    {part}
                </span>
            ) : (
                part
            )
        );
    }, [keyword, filter]);

    const symbolTypo = useMemo(() => {
        if (filter !== 'symbol' && filter !== 'pinned') return tokenInfo.symbol;

        const parts = tokenInfo.symbol.split(new RegExp(`(${keyword})`, 'gi'));

        return parts.map((part, index) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
                <span key={index} className="highlight">
                    {part}
                </span>
            ) : (
                part
            )
        );
    }, [keyword, filter]);

    const addressTypo = useMemo(() => {
        if (filter !== 'address' && filter !== 'pinned') return tokenInfo.contractAddress;

        const parts = tokenInfo.contractAddress.split(new RegExp(`(${keyword})`, 'gi'));

        return parts.map((part, index) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
                <span key={index} className="highlight">
                    {part}
                </span>
            ) : (
                part
            )
        );
    }, [keyword, filter]);

    const labelTypo = useMemo(() => {
        if (filter !== 'label' && filter !== 'pinned') return tokenInfo.label;

        const parts = tokenInfo.label.split(new RegExp(`(${keyword})`, 'gi'));

        return parts.map((part, index) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
                <span key={index} className="highlight">
                    {part}
                </span>
            ) : (
                part
            )
        );
    }, [keyword, filter]);

    const handleTokenPinned = (evt) => {
        if (isPinned) {
            removePin(address, tokenInfo.contractAddress);
        } else {
            addPin(address, { type: autoCompleteType, ...tokenInfo });
        }
    };

    return (
        <TokenCardWarp onClick={() => onClick(tokenInfo.contractAddress)}>
            <PinButton isPinned={isPinned} isBlocked={blockAddPin} onClick={handleTokenPinned} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div className="token-row">
                    {/* {autoCompleteType === 'cw20' && <img src={tokenInfo.tokenLogoUrl} alt="token-logo" className="token-logo" />} */}
                    {autoCompleteType === 'cw20' && (
                        <div className="token-logo-box">
                            <TokenLogo src={tokenInfo.tokenLogoUrl} size="24px" emptyPicSize="12px" />
                        </div>
                    )}

                    <div className="token-name">
                        {nameTypo} ({symbolTypo})
                    </div>
                    {/* <div className="is-verified" /> */}
                </div>
                <div className="token-row">
                    {autoCompleteType === 'cw20' && <div className="token-logo-box" />}
                    <div className="token-info">
                        <div className="token-info-typo">Address : {addressTypo}</div>
                        <div className="token-info-typo">Label : {labelTypo}</div>
                    </div>
                </div>
            </div>
        </TokenCardWarp>
    );
};

const NoContractBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    color: var(--Gray-750, #999);

    /* Body/Body4 - Rg */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

interface InputProps {
    value: string; //
    placeHolder: string; //
    onChange: (value: string) => void; //
    onClickEvent?: () => void;
    textAlign?: 'left' | 'center' | 'right'; //
    readOnly?: boolean; //
    adornment?: {
        start?: React.ReactElement;
        end?: React.ReactElement;
    };
    autoComplete?: boolean;
    autoCompleteType?: 'cw20' | 'cw721';

    usePinList?: boolean;

    onClickContract?: (address: string) => void;
    regex?: RegExp;
}

type FilterType = 'name' | 'label' | 'symbol' | 'address';

type LocalFilterType = FilterType | 'pinned';

const AutoCompleteBox = ({
    keyword,
    setKeyword,
    onClickContract,
    autoCompleteType,
    usePinList,
    visible,
    setVisible
}: {
    keyword: string;
    setKeyword: (v: string) => void;
    onClickContract: (address: string) => void;
    autoCompleteType: 'cw20' | 'cw721';
    usePinList?: boolean;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}) => {
    const cwMode = useSelector((v: rootState) => v.global.cwMode);
    const isContractAddress = keyword.length > 44 && isValidAddress(keyword);
    const address = useSelector((v: rootState) => v.wallet.address);

    const [searchValue, setSearchValue] = useState(keyword);
    const [filter, setFilter] = useState<LocalFilterType>(usePinList ? 'pinned' : 'name');

    const [selectedAddress, setSelectedAddress] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const scrollByJSRef = useRef<boolean>(false);

    const fullList = usePinContractStore((v) => v.pinList);
    const updatePin = usePinContractStore((v) => v.updatePin);
    const pinnedList = fullList[address.toLowerCase()]?.filter((one) => one.type === cwMode.toLowerCase()) || [];

    const { enqueueSnackbar } = useSnackbar();

    const [data, setData] = useState<Record<string, ContractInfoFromDB[] | null>>(null);

    const searchContracts = async (keyword: string) => {
        try {
            const {
                data: contracts,
                success,
                error
            }: { data: Record<string, ContractInfoFromDB[] | null>; success: boolean; error: any } = await ContractApi.getSearchContracts({
                type: autoCompleteType,
                keyword: keyword,
                filter: isValidAddress(keyword) && keyword.length > 44 ? 'address' : 'any'
            });

            if (success) {
                const flattenList = Object.values(contracts)
                    .flat()
                    .filter((v) => v !== null);

                if (Array.isArray(flattenList) && flattenList.length > 0) {
                    flattenList.forEach((v) => {
                        const checkTarget = pinnedList.find(
                            (one) => one.contractAddress?.toLowerCase() === v.contractAddress?.toLowerCase()
                        );

                        if (checkTarget && v.tokenLogoUrl !== checkTarget.tokenLogoUrl) {
                            updatePin(address, { ...checkTarget, tokenLogoUrl: v.tokenLogoUrl });
                        }
                    });
                }

                setData(contracts);
            } else {
                throw new Error(error);
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar({ message: 'Failed to get search result.', variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    // const { data, isFetching } = useContractSearchQuery(
    //     {
    //         type: autoCompleteType,
    //         keyword: searchValue,
    //         filter: isValidAddress(searchValue) && searchValue.length > 44 ? 'address' : 'any'
    //     },
    //     {
    //         enabled: searchValue.replaceAll(' ', '').length > 0,
    //         onSuccess: ({ data, success, error }) => {
    //             if (success) {
    //                 const flattenList = Object.values(data)
    //                     .flat()
    //                     .filter((v) => v !== null);

    //                 if (Array.isArray(flattenList) && flattenList.length > 0) {
    //                     flattenList.forEach((v) => {
    //                         const checkTarget = pinnedList.find(
    //                             (one) => one.contractAddress?.toLowerCase() === v.contractAddress?.toLowerCase()
    //                         );

    //                         if (checkTarget && v.tokenLogoUrl !== checkTarget.tokenLogoUrl) {
    //                             updatePin(address, { ...checkTarget, tokenLogoUrl: v.tokenLogoUrl });
    //                         }
    //                     });
    //                 }
    //             } else {
    //                 console.log(error);
    //                 enqueueSnackbar({ message: 'Failed to get search result.', variant: 'error' });
    //             }
    //         },

    //         onSettled: () => {
    //             setIsLoading(false);
    //         }
    //     }
    // );

    const sortedPinList = useMemo(() => {
        if (!searchValue) return pinnedList;

        if (isValidAddress(searchValue)) return pinnedList.filter((v) => v.contractAddress.toLowerCase() === searchValue.toLowerCase());

        // Start filtering
        const nameList = pinnedList.filter((v) => v.name.toLowerCase().includes(searchValue.toLowerCase()));

        const nameSorted = nameList.sort((a, b) => {
            const aIndex = a.name.toLowerCase().indexOf(searchValue.toLowerCase());
            const bIndex = b.name.toLowerCase().indexOf(searchValue.toLowerCase());

            if (aIndex < bIndex) return -1;
            else if (aIndex > bIndex) return 1;
            else {
                // Alpabetical sort
                return a.name.localeCompare(b.name);
            }
        });

        const remainList = pinnedList.filter((v) => !v.name.toLowerCase().includes(searchValue.toLowerCase()));
        const symbolList = remainList.filter((v) => v.symbol.toLowerCase().includes(searchValue.toLowerCase()));

        const symbolSorted = symbolList.sort((a, b) => {
            const aIndex = a.symbol.toLowerCase().indexOf(searchValue.toLowerCase());
            const bIndex = b.symbol.toLowerCase().indexOf(searchValue.toLowerCase());

            if (aIndex < bIndex) return -1;
            else if (aIndex > bIndex) return 1;
            else {
                // Alpabetical sort
                return a.symbol.localeCompare(b.symbol);
            }
        });

        const _remainList = remainList.filter((v) => !v.symbol.toLowerCase().includes(searchValue.toLowerCase()));
        const labelList = _remainList.filter((v) => v.label.toLowerCase().includes(searchValue.toLowerCase()));

        const labelSorted = labelList.sort((a, b) => {
            const aIndex = a.label.toLowerCase().indexOf(searchValue.toLowerCase());
            const bIndex = b.label.toLowerCase().indexOf(searchValue.toLowerCase());

            if (aIndex < bIndex) return -1;
            else if (aIndex > bIndex) return 1;
            else {
                // Alpabetical sort
                return a.label.localeCompare(b.label);
            }
        });

        return [...nameSorted, ...symbolSorted, ...labelSorted];
    }, [pinnedList, searchValue]);

    const contractList = data || {};

    const isEmptyRes = Object.values(contractList).every((v) => v === null || v?.length === 0);

    useDebounce(
        async () => {
            queryClient.invalidateQueries(['CONTRACT_SEARCH']);

            if (keyword.replaceAll(' ', '').length > 0 && selectedAddress.toLowerCase() !== keyword.toLowerCase()) {
                setIsLoading(true);

                if (isValidAddress(keyword.toLowerCase())) setFilter((prev) => 'address');
                else {
                    if (usePinList) setFilter('pinned');
                    else setFilter('name');
                }

                await searchContracts(keyword);
                setSearchValue((prev) => keyword);
            } else {
                setIsLoading(false);
                setSelectedAddress('');
            }
        },
        1000,
        [keyword]
    );

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['CONTRACT_SEARCH'] });

        if (searchValue.length < 1) {
            if (!usePinList) setVisible((v) => false);
        } else {
            setVisible(() => true);

            const isEmptyRes = Object.values(contractList).every((v) => v === null);

            if (searchValue === '' && isEmptyRes) {
                // setContractList([]);
                if (usePinList) setFilter('pinned');
                else setFilter('name');
            }
        }
    }, [searchValue, usePinList]);

    useEffect(() => {
        if (keyword.length === 0) {
            setSearchValue('');

            if (!usePinList) setVisible(false);
        }
    }, [keyword]);

    const onClickCard = (address: string) => {
        setSelectedAddress(address);
        setKeyword(address);
        // setSearchValue('');
        setVisible(false);
        onClickContract(address);
    };

    const pinRef = useRef<HTMLDivElement>();
    const nameRef = useRef<HTMLDivElement>();
    const symbolRef = useRef<HTMLDivElement>();
    const labelRef = useRef<HTMLDivElement>();
    const addrRef = useRef<HTMLDivElement>();

    const handleChangeFilter = (filterType: LocalFilterType) => {
        scrollByJSRef.current = true;
        setFilter(filterType);

        if (filterType === 'pinned') pinRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        if (filterType === 'name') nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        if (filterType === 'symbol') symbolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        if (filterType === 'label') labelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        if (filterType === 'address') addrRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    // useEffect(() => {
    //     if (usePinList) setVisible(true);
    // }, []);

    const sectionRefs = useRef([]);
    const scrollBaseRef = useRef<HTMLDivElement>();

    useEffect(() => {
        const handleScroll = () => {
            if (scrollByJSRef.current) return;

            const containerTop = scrollBaseRef.current.getBoundingClientRect().top;

            sectionRefs.current.forEach((section, index) => {
                try {
                    const sectionRect = section.getBoundingClientRect();
                    const sectionTop = sectionRect.top;
                    const sectionBottom = sectionRect.bottom;

                    if (containerTop >= sectionTop && containerTop <= sectionBottom) {
                        const filterName = section.dataset?.section;

                        setFilter(filterName);
                    }
                } catch (error) {
                    console.warn(error);
                }
            });
        };

        const container = scrollBaseRef.current;
        container.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (sortedPinList.length > 0) setFilter('pinned');
        else if (contractList['name']) setFilter('name');
        else if (contractList['symbol']) setFilter('symbol');
        else if (contractList['label']) setFilter('label');
        else if (contractList['contractAddress']) setFilter('address');
        else setFilter('name');
    }, [contractList]);

    return (
        <div
            onClick={(evt) => {
                evt.preventDefault();
                evt.stopPropagation();
            }}
            style={{
                display: 'flex',
                width: '100%',
                minHeight: '180px',
                maxHeight: '480px',
                paddingBottom: '20px',
                background: 'var(--200, #1E1E1E)',
                zIndex: 1,
                borderRadius: '8px',
                padding: '16px 16px 8px',
                flexDirection: 'column',
                gap: '12px',
                outline: '1px solid var(--Gray-500, #383838) !important',
                boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.25)'
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                {usePinList && sortedPinList.length > 0 && (
                    <SearchTypeBtn $selected={filter === 'pinned'} onClick={() => handleChangeFilter('pinned')}>
                        Pinned
                    </SearchTypeBtn>
                )}
                {searchValue.length > 0 && (
                    <>
                        {contractList['name']?.length > 0 && (
                            <SearchTypeBtn $selected={filter === 'name'} onClick={() => handleChangeFilter('name')}>
                                Name
                            </SearchTypeBtn>
                        )}
                        {contractList['symbol']?.length > 0 && (
                            <SearchTypeBtn $selected={filter === 'symbol'} onClick={() => handleChangeFilter('symbol')}>
                                Symbol
                            </SearchTypeBtn>
                        )}
                        {contractList['label']?.length > 0 && (
                            <SearchTypeBtn $selected={filter === 'label'} onClick={() => handleChangeFilter('label')}>
                                Label
                            </SearchTypeBtn>
                        )}
                        {contractList['contractAddress']?.length > 0 && (
                            <SearchTypeBtn
                                disabled={!isContractAddress}
                                $selected={filter === 'address'}
                                onClick={() => handleChangeFilter('address')}
                            >
                                Address
                            </SearchTypeBtn>
                        )}
                    </>
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflow: 'hidden', height: '100%' }}>
                <TokenListWarp
                    ref={scrollBaseRef}
                    onWheel={() => {
                        scrollByJSRef.current = false;
                    }}
                >
                    {isLoading ? (
                        <NoContractBox>
                            <FirmaLoading size="40px" />
                        </NoContractBox>
                    ) : searchValue.length > 0 ? (
                        isEmptyRes ? (
                            <NoContractBox>No results found.</NoContractBox>
                        ) : (
                            <>
                                <div
                                    style={{ width: '100%', display: sortedPinList.length > 0 ? 'flex' : 'none', flexDirection: 'column' }}
                                >
                                    <div
                                        data-section="pinned"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                            gap: '4px'
                                        }}
                                        ref={(el) => {
                                            sectionRefs.current[0] = el;
                                            pinRef.current = el;
                                        }}
                                    >
                                        <CWTokenTypo>Pinned</CWTokenTypo>
                                        {sortedPinList?.map((info, index) => (
                                            <TokenCard
                                                tokenInfo={{ type: autoCompleteType, ...info }}
                                                key={`token_card_${info.contractAddress}`}
                                                keyword={searchValue}
                                                filter="pinned"
                                                onClick={onClickCard}
                                                autoCompleteType={autoCompleteType}
                                            />
                                        ))}
                                    </div>
                                    {contractList['name']?.length > 0 ||
                                    contractList['symbol']?.length > 0 ||
                                    contractList['label']?.length > 0 ||
                                    contractList['contractAddress']?.length > 0 ? (
                                        <div style={{ width: '100%', margin: '12px 0' }}>
                                            <Divider $direction={'horizontal'} $color="var(--Gray-500, #383838)" />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>

                                <div
                                    style={{
                                        width: '100%',
                                        display: contractList['name']?.length > 0 ? 'flex' : 'none',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <div
                                        data-section="name"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                            gap: '4px'
                                        }}
                                        ref={(el) => {
                                            sectionRefs.current[1] = el;
                                            nameRef.current = el;
                                        }}
                                    >
                                        <CWTokenTypo>Name</CWTokenTypo>
                                        {contractList['name']?.map((info, index) => (
                                            <TokenCard
                                                tokenInfo={{ type: autoCompleteType, ...info }}
                                                key={`token_card_${info.contractAddress}`}
                                                keyword={searchValue}
                                                filter={'name'}
                                                onClick={onClickCard}
                                                autoCompleteType={autoCompleteType}
                                            />
                                        ))}
                                    </div>
                                    {contractList['symbol']?.length > 0 ||
                                    contractList['label']?.length > 0 ||
                                    contractList['contractAddress']?.length > 0 ? (
                                        <div style={{ width: '100%', margin: '12px 0' }}>
                                            <Divider $direction={'horizontal'} $color="var(--Gray-500, #383838)" />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>

                                <div
                                    style={{
                                        width: '100%',
                                        display: contractList['symbol']?.length > 0 ? 'flex' : 'none',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <div
                                        data-section="symbol"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                            gap: '4px'
                                        }}
                                        ref={(el) => {
                                            sectionRefs.current[2] = el;
                                            symbolRef.current = el;
                                        }}
                                    >
                                        <CWTokenTypo>Symbol</CWTokenTypo>
                                        {contractList['symbol']?.map((info, index) => (
                                            <TokenCard
                                                tokenInfo={{ type: autoCompleteType, ...info }}
                                                key={`token_card_${info.contractAddress}`}
                                                keyword={searchValue}
                                                filter={'symbol'}
                                                onClick={onClickCard}
                                                autoCompleteType={autoCompleteType}
                                            />
                                        ))}
                                    </div>
                                    {contractList['label']?.length > 0 || contractList['contractAddress']?.length > 0 ? (
                                        <div style={{ width: '100%', margin: '12px 0' }}>
                                            <Divider $direction={'horizontal'} $color="var(--Gray-500, #383838)" />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>

                                <div
                                    style={{
                                        width: '100%',
                                        display: contractList['label']?.length > 0 ? 'flex' : 'none',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <div
                                        data-section="label"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                            gap: '4px'
                                        }}
                                        ref={(el) => {
                                            sectionRefs.current[3] = el;
                                            labelRef.current = el;
                                        }}
                                    >
                                        <CWTokenTypo>Label</CWTokenTypo>
                                        {contractList['label']?.map((info, index) => (
                                            <TokenCard
                                                tokenInfo={{ type: autoCompleteType, ...info }}
                                                key={`token_card_${info.contractAddress}`}
                                                keyword={searchValue}
                                                filter={'label'}
                                                onClick={onClickCard}
                                                autoCompleteType={autoCompleteType}
                                            />
                                        ))}
                                    </div>
                                    {contractList['contractAddress']?.length > 0 ? (
                                        <div style={{ width: '100%', margin: '12px 0' }}>
                                            <Divider $direction={'horizontal'} $color="var(--Gray-500, #383838)" />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>

                                <div
                                    data-section="address"
                                    style={{
                                        display: contractList['contractAddress']?.length > 0 ? 'flex' : 'none',
                                        flexDirection: 'column',
                                        width: '100%',
                                        gap: '4px'
                                    }}
                                    ref={(el) => {
                                        sectionRefs.current[4] = el;
                                        addrRef.current = el;
                                    }}
                                >
                                    <CWTokenTypo>Address</CWTokenTypo>
                                    {contractList['contractAddress']?.map((info, index) => (
                                        <TokenCard
                                            tokenInfo={{ type: autoCompleteType, ...info }}
                                            key={`token_card_${info.contractAddress}`}
                                            keyword={searchValue}
                                            filter={'address'}
                                            onClick={onClickCard}
                                            autoCompleteType={autoCompleteType}
                                        />
                                    ))}
                                </div>
                            </>
                        )
                    ) : sortedPinList.length > 0 ? (
                        <div style={{ width: '100%', display: sortedPinList.length > 0 ? 'flex' : 'none', flexDirection: 'column' }}>
                            <div
                                data-section="pinned"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: '4px'
                                }}
                                ref={(el) => {
                                    sectionRefs.current[0] = el;
                                    pinRef.current = el;
                                }}
                            >
                                <CWTokenTypo>Pinned</CWTokenTypo>
                                {sortedPinList?.map((info, index) => (
                                    <TokenCard
                                        tokenInfo={{ type: autoCompleteType, ...info }}
                                        key={`token_card_${info.contractAddress}`}
                                        keyword={searchValue}
                                        filter="pinned"
                                        onClick={onClickCard}
                                        autoCompleteType={autoCompleteType}
                                    />
                                ))}
                            </div>
                            {contractList['name']?.length > 0 ||
                            contractList['symbol']?.length > 0 ||
                            contractList['label']?.length > 0 ||
                            contractList['contractAddress']?.length > 0 ? (
                                <div style={{ width: '100%', margin: '12px 0' }}>
                                    <Divider $direction={'horizontal'} $color="var(--Gray-500, #383838)" />
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    ) : (
                        <NoContractBox>Start typing to search</NoContractBox>
                    )}
                </TokenListWarp>
            </div>
        </div>
    );
};

const SearchInputWithButton2 = React.forwardRef(
    (
        {
            value,
            onChange,
            onClickEvent,
            placeHolder,
            textAlign = 'left',
            readOnly = false,
            adornment,
            regex,
            autoComplete,
            autoCompleteType = 'cw20',
            usePinList = false,
            onClickContract = () => {}
        }: InputProps,
        ref
    ) => {
        const [isFocus, setIsFocus] = useState(false);

        const [isVisible, setVisible] = useState(false);

        const inputRef = useRef<HTMLInputElement>();

        const divRef = useRef(null);

        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setVisible(false);
            } else {
                setVisible(true);
            }
        };

        useEffect(() => {
            // Add a global click event listener (If autoComplete is enabled)
            if (autoComplete) document.addEventListener('click', handleClickOutside);

            // Cleanup the event listener on component unmount
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, []);

        const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Enter') {
                onClickEvent && onClickEvent();
            }
        };

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.currentTarget.value.replace(regex || DEFAULT_INPUT_REGEX, ''));
        };

        return (
            <div ref={divRef} style={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%' }}>
                <StyledInput
                    onClick={(evt) => {
                        inputRef.current?.focus();
                        if (usePinList && !isValidAddress(inputRef.current.value?.toLowerCase())) setVisible(true);
                    }}
                    onKeyDown={handleKeyPress}
                    onBlur={() => {
                        setIsFocus(false);
                    }}
                    $isFocus={isFocus}
                    $currentLength={String(value).length}
                    $textAlign={textAlign}
                    $readOnly={readOnly}
                    onFocus={() => !readOnly && setIsFocus(true)}
                    ref={ref as any}
                >
                    {adornment.start && <>{adornment.start}</>}
                    <input ref={inputRef} value={value} type="text" onChange={handleChange} placeholder={placeHolder} readOnly={readOnly} />
                    {adornment.end && <>{adornment.end}</>}
                </StyledInput>

                {autoComplete && (
                    <div
                        style={{
                            width: '100%',
                            position: 'absolute',
                            top: '66px',
                            display: autoComplete && isVisible ? 'flex' : 'none'
                            // display: autoComplete ? 'flex' : 'none'
                        }}
                    >
                        <AutoCompleteBox
                            keyword={value}
                            autoCompleteType={autoCompleteType}
                            setKeyword={onChange}
                            onClickContract={onClickContract}
                            usePinList={usePinList}
                            visible={isVisible}
                            setVisible={setVisible}
                        />
                    </div>
                )}
            </div>
        );
    }
);

export default SearchInputWithButton2;
