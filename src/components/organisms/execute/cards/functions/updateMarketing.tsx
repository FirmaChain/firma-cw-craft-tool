import { Fragment, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import LabelInput from '@/components/atoms/input/labelInput';
import useFormStore from '@/store/formStore';
// import useExecuteStore from '../../hooks/useExecuteStore';

import { CRAFT_CONFIGS } from '@/config';
import { DEFAULT_INPUT_REGEX, NORMAL_TEXT, WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { isValidAddress } from '@/utils/address';
import { useCW20Execute } from '@/context/cw20ExecuteContext';
import useWalletStore from '@/store/walletStore';

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const UpdateMarketing = () => {
    const { address } = useWalletStore();
    // const address = useSelector((state: rootState) => state.wallet.address);

    const context = useCW20Execute();
    const contractInfo = context.contractInfo;
    const marketingInfo = context.marketingInfo;
    const marketingDescription = context.marketingDescription;
    const marketingAddress = context.marketingAddress;
    const marketingProject = context.marketingProject;
    const setMarketingDescription = context.setMarketingDescription;
    const setMarketingAddress = context.setMarketingAddress;
    const setMarketingProject = context.setMarketingProject;
    const setSelectMenu = context.setSelectMenu;
    const clearMarketing = context.clearMarketing;

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
            clearMarketing();
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
