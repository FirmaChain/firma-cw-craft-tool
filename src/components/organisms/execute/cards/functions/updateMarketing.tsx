import { Fragment, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
import { FirmaUtil } from '@firmachain/firma-js';
import useFormStore from '@/store/formStore';
import React from 'react';
import useExecuteStore from '../../hooks/useExecuteStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { NETWORKS } from '@/constants/common';

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const UpdateMarketing = () => {
    const network = useSelector((state: rootState) => state.global.network);
    const address = useSelector((state: rootState) => state.wallet.address);

    const contractInfo = useExecuteStore((state) => state.contractInfo);
    const marketingDescription = useExecuteStore((state) => state.marketingDescription) || '';
    const marketingAddress = useExecuteStore((state) => state.marketingAddress) || '';
    const marketingProject = useExecuteStore((state) => state.marketingProject) || '';
    const setMarketingDescription = useExecuteStore((state) => state.setMarketingDescription);
    const setMarketingAddress = useExecuteStore((state) => state.setMarketingAddress);
    const setMarketingProject = useExecuteStore((state) => state.setMarketingProject);

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFromError = useFormStore((state) => state.clearFormError);

    const isBasic = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return contractInfo.contract_info.code_id === config.CW20.BASIC_CODE_ID;
    }, [contractInfo, network]);

    const handleAddress = (value: string) => {
        if (FirmaUtil.isValidAddress(value) || value === '') clearFromError({ id: `input address`, type: 'INVALID_WALLET_ADDRESS' });
        else setFormError({ id: `input address`, type: 'INVALID_WALLET_ADDRESS', message: 'Please input valid wallet address' });

        setMarketingAddress(value);
    };

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Update Marketing</HeaderTitleTypo>
                    <HeaderDescTypo>Change the marketing information associated with the token</HeaderDescTypo>
                </TitleWrap>
            </HeaderWrap>
            <ContentWrap>
                <LabelInput
                    labelProps={{
                        label: 'Marketing Description (Token Description)'
                    }}
                    inputProps={{
                        value: marketingDescription,
                        formId: 'input description',
                        placeHolder: 'This is token Description',
                        onChange: setMarketingDescription
                    }}
                />
                {!isBasic && address === marketingAddress && (
                    <Fragment>
                        <LabelInput
                            labelProps={{
                                label: 'Marketing Address (Optional)'
                            }}
                            inputProps={{
                                value: marketingAddress,
                                formId: 'input address',
                                placeHolder: 'Input Wallet Address',
                                onChange: handleAddress
                            }}
                        />
                        <LabelInput
                            labelProps={{
                                label: 'Marketing Project (Optional)'
                            }}
                            inputProps={{
                                value: marketingProject,
                                formId: 'input project',
                                placeHolder: 'ex) http://firmachain.org',
                                onChange: setMarketingProject
                            }}
                        />
                    </Fragment>
                )}
            </ContentWrap>
        </Container>
    );
};

export default UpdateMarketing;
