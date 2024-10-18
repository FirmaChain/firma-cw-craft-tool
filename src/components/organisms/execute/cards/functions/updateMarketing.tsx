import { Fragment, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
import useFormStore from '@/store/formStore';
import useExecuteStore from '../../hooks/useExecuteStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { DEFAULT_INPUT_REGEX, NORMAL_TEXT, WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { isValidAddress } from '@/utils/address';

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const UpdateMarketing = () => {
    const address = useSelector((state: rootState) => state.wallet.address);

    const contractInfo = useExecuteStore((state) => state.contractInfo);
    const marketingInfo = useExecuteStore((state) => state.marketingInfo);
    const marketingDescription = useExecuteStore((state) => state.marketingDescription);
    const marketingAddress = useExecuteStore((state) => state.marketingAddress);
    const marketingProject = useExecuteStore((state) => state.marketingProject);
    const setMarketingDescription = useExecuteStore((state) => state.setMarketingDescription);
    const setMarketingAddress = useExecuteStore((state) => state.setMarketingAddress);
    const setMarketingProject = useExecuteStore((state) => state.setMarketingProject);
    const setSelectMenu = useExecuteStore((state) => state.setSelectMenu);

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const isBasic = useMemo(() => {
        return contractInfo.contract_info.code_id === CRAFT_CONFIGS.CW20.BASIC_CODE_ID;
    }, [contractInfo]);

    const handleAddress = (value: string) => {
        if (isValidAddress(value) || value === '') clearFormError({ id: `input address`, type: 'INVALID_WALLET_ADDRESS' });
        else setFormError({ id: `input address`, type: 'INVALID_WALLET_ADDRESS', message: 'This is an invalid wallet address.' });

        setMarketingAddress(value);
    };

    const currentDesc = marketingDescription === null ? marketingInfo?.description || '' : marketingDescription;
    const currentAddr = marketingAddress === null ? marketingInfo?.marketing || '' : marketingAddress;
    const currentProj = marketingProject === null ? marketingInfo?.project || '' : marketingProject;

    useEffect(() => {
        if (marketingInfo) {
            if (marketingInfo?.marketing.toLowerCase() !== address.toLowerCase()) setSelectMenu({ value: 'select', label: 'Select' });
            else {
                setMarketingDescription(marketingInfo.description);
                setMarketingAddress(marketingInfo.marketing);
                setMarketingProject(marketingInfo.project);
            }
        }
    }, [marketingInfo]);

    useEffect(() => {
        return () => {
            useFormStore.getState().clearForm();
            useExecuteStore.getState().clearMarketing();
        };
    }, []);

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
                        value: currentDesc,
                        formId: 'input description',
                        placeHolder: 'This is token Description',
                        onChange: setMarketingDescription,
                        maxLength: isBasic ? 100 : 300,
                        regex: NORMAL_TEXT
                    }}
                />
                {!isBasic && address === marketingInfo?.marketing && (
                    <Fragment>
                        <LabelInput
                            labelProps={{
                                label: 'Marketing Address (Optional)'
                            }}
                            inputProps={{
                                value: currentAddr,
                                formId: 'input address',
                                placeHolder: 'Input Wallet Address',
                                onChange: handleAddress,
                                regex: WALLET_ADDRESS_REGEX
                            }}
                        />
                        <LabelInput
                            labelProps={{
                                label: 'Marketing Project (Optional)'
                            }}
                            inputProps={{
                                value: currentProj,
                                formId: 'input project',
                                placeHolder: 'ex) https://firmachain.org',
                                onChange: setMarketingProject,
                                regex: DEFAULT_INPUT_REGEX,
                                maxLength: 300
                            }}
                        />
                    </Fragment>
                )}
            </ContentWrap>
        </Container>
    );
};

export default UpdateMarketing;
