import SearchInputWithButton2 from '@/components/atoms/input/searchInputWithButton';
import { HeaderBox, HeaderWrap, Title } from './styles';
import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
// import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';
import useNFTContractDetail from '@/hooks/useNFTContractDetail';

import { sleep } from '@/utils/common';
import { BYPASS_ALL, NORMAL_TEXT, WALLET_ADDRESS_REGEX } from '@/constants/regex';
import ConnectWallet from '@/components/organisms/execute/header/connectWallet';
import { useCW721Detail } from '@/context/cw721DetailStore';
import useGlobalStore from '@/store/globalStore';
import useWalletStore from '@/store/walletStore';

const EndAdornment = ({
    keyword,
    clearKeyword,
    showClearButton
}: {
    keyword: string;
    clearKeyword: () => void;
    showClearButton?: boolean;
}) => {
    const disableEventBubbling = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }} onClick={disableEventBubbling}>
            {showClearButton && (
                <IconButton style={{ display: 'flex', padding: 0 }} onClick={clearKeyword}>
                    <Icons.XCircle width={'32px'} height={'32px'} fill="#707070" />
                </IconButton>
            )}
        </div>
    );
};

const Header = () => {
    const { address, isInit } = useWalletStore();
    // const address = useSelector((state: rootState) => state.wallet.address);
    // const isInit = useSelector((state: rootState) => state.wallet.isInit);
    const [keyword, setKeyword] = useState<string>('');
    const prevKeyword = useRef<string | null>(null);

    const { handleGlobalLoading } = useGlobalStore();
    // const { contractDetail } = useCW721Detail();

    const { contractDetail, setContractDetail, setNftsInfo, setOwnedNftsInfo, setTransactions, clearForm } = useCW721Detail();
    const { checkExistContract, getNFTContractDetail, getNFTsInfo, getOwnedNFTsInfo, getNFTContractTransactions } = useNFTContractDetail();

    const getRequiredInfo = useCallback(
        async (searchAddress) => {
            handleGlobalLoading(true);

            try {
                if (prevKeyword.current === null || prevKeyword.current?.toLowerCase() !== searchAddress.toLowerCase()) {
                    const exist = await checkExistContract(searchAddress);

                    await sleep(500);

                    if (exist) {
                        clearForm();

                        const txData = await getNFTContractTransactions(searchAddress);
                        const detail = await getNFTContractDetail(searchAddress);
                        const nfts = await getNFTsInfo(searchAddress);

                        if (address) {
                            const ownedNfts = await getOwnedNFTsInfo(searchAddress, address);
                            setOwnedNftsInfo(ownedNfts);
                        }

                        setContractDetail(detail);
                        setNftsInfo(nfts);
                        setTransactions(txData.txData);
                    } else {
                        prevKeyword.current = null;
                        clearForm();
                    }
                    prevKeyword.current = searchAddress;
                } else {
                    return;
                }
            } catch (error) {
                console.log(error);
            } finally {
                handleGlobalLoading(false);
            }
        },
        [prevKeyword]
    );

    const onClickClearKeyword = () => {
        setKeyword('');
        prevKeyword.current = null;
        clearForm();
    };

    // const onClickSearch = () => {
    //     getRequiredInfo();
    // };

    useEffect(() => {
        return () => {
            onClickClearKeyword();
        };
    }, []);

    useEffect(() => {
        onClickClearKeyword();
    }, [address]);

    // useEffect(() => {
    //     if (keyword.length > 44 && isValidAddress(keyword)) onClickSearch();
    // }, [keyword]);

    return (
        <HeaderBox $hideBorder={!Boolean(address)}>
            <HeaderWrap>
                <Title>Search</Title>
                {isInit ? (
                    <SearchInputWithButton2
                        value={keyword}
                        placeHolder={'Search by NFT Contract Name / Symbol / Label / Address'}
                        onChange={(v) => setKeyword(v)}
                        adornment={{
                            end: (
                                <EndAdornment
                                    keyword={keyword}
                                    clearKeyword={onClickClearKeyword}
                                    showClearButton={Boolean(keyword?.length > 0 || contractDetail !== null)}
                                />
                            )
                        }}
                        autoComplete
                        autoCompleteType="cw721"
                        onClickContract={(v) => getRequiredInfo(v)}
                        usePinList
                        regex={NORMAL_TEXT}
                    />
                ) : (
                    <ConnectWallet />
                )}
                {/*  */}
            </HeaderWrap>
        </HeaderBox>
    );
};

export default React.memo(Header);
