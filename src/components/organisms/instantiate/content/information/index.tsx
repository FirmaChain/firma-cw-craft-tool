import { useEffect } from 'react';
import {
    IconBackground,
    InformationBody,
    InformationWrapper,
    TextGroupWrapper,
    TitleDescription,
    TitleText,
    TitleWrapper,
    TokenNameSymbol
} from './style';
import Icons from '@/components/atoms/icons';
import LabelInput from '@/components/atoms/input/labelInput';
import { FirmaUtil } from '@firmachain/firma-js';
import useFormStore from '@/store/formStore';
import useInstantiateStore from '../../instaniateStore';

interface IProps {
    isBasic: boolean;
}

const Information = ({ isBasic }: IProps) => {
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const tokenName = useInstantiateStore((v) => v.tokenName);
    const tokenSymbol = useInstantiateStore((v) => v.tokenSymbol);
    const tokenLogoUrl = useInstantiateStore((v) => v.tokenLogoUrl);
    const tokenDescription = useInstantiateStore((v) => v.tokenDescription);
    const decimals = useInstantiateStore((v) => v.decimals);
    const label = useInstantiateStore((v) => v.label);
    const marketingAddress = useInstantiateStore((v) => v.marketingAddress);
    const marketingProject = useInstantiateStore((v) => v.marketingProject);
    const setTokenName = useInstantiateStore((v) => v.setTokenName);
    const setTokenSymbol = useInstantiateStore((v) => v.setTokenSymbol);
    const setTokenLogoUrl = useInstantiateStore((v) => v.setTokenLogoUrl);
    const setTokenDescription = useInstantiateStore((v) => v.setTokenDescription);
    const setDecimals = useInstantiateStore((v) => v.setDecimals);
    const setLabel = useInstantiateStore((v) => v.setLabel);
    const setMarketingAddress = useInstantiateStore((v) => v.setMarketingAddress);
    const setMarketingProject = useInstantiateStore((v) => v.setMarketingProject);

    const handleTokenName = (value: string) => {
        setTokenName(value);
    };

    const handleTokenSymbol = (value: string) => {
        setTokenSymbol(value);

        if (/^[a-zA-Z]+$/.test(value) || value.length === 0) {
            clearFormError({ id: 'tokenSymbol', type: 'ONLY_ENGLISH' });
        } else {
            setFormError({ id: 'tokenSymbol', type: 'ONLY_ENGLISH', message: 'Number is not included.' });
        }

        if (value.length === 0 || value.length >= 3) {
            clearFormError({ id: 'tokenSymbol', type: 'MINIMAL_SYMBOL_LENGTH' });
        } else {
            setFormError({ id: 'tokenSymbol', type: 'MINIMAL_SYMBOL_LENGTH', message: 'Minimum 3 characters required.' });
        }
    };

    const handleTokenLogoUrl = (value: string) => {
        setTokenLogoUrl(value);
    };

    const handleDescription = (value: string) => {
        setTokenDescription(value);
    };
    const handleDecimals = (value: string) => {
        if (Number(value) < 0) {
            setDecimals('0');
        } else {
            setDecimals(value);
        }
    };

    const handleLabel = (value: string) => {
        setLabel(value);
    };

    const handleMarketingAddress = (value: string) => {
        setMarketingAddress(value);

        if (FirmaUtil.isValidAddress(value) || value === '') {
            clearFormError({ id: 'marketingAddress', type: 'VALID_ADDRESS' });
        } else {
            setFormError({ id: 'marketingAddress', type: 'VALID_ADDRESS', message: 'This is an invalid wallet address.' });
        }
    };

    const handleMarketingProject = (value: string) => {
        setMarketingProject(value);
    };

    useEffect(() => {
        //? Reset unused states by mode
        if (isBasic) {
            handleDecimals('');
            clearFormError({ id: 'tokenDecimal' });

            handleLabel('');
            clearFormError({ id: 'tokenLabel' });

            handleMarketingAddress('');
            clearFormError({ id: 'marketingAddress' });

            handleMarketingProject('');
            clearFormError({ id: 'marketingProject' });
        } else {
            handleDescription('');
            clearFormError({ id: 'tokenDescription' });
        }
    }, [isBasic]);

    return (
        <InformationWrapper>
            <TitleWrapper>
                <IconBackground>
                    <Icons.Coins width={'32px'} height={'32px'} />
                </IconBackground>
                <TextGroupWrapper>
                    <TitleText>TOKEN INFORMATION</TitleText>
                    <TitleDescription>Input the token details.</TitleDescription>
                </TextGroupWrapper>
            </TitleWrapper>
            <InformationBody>
                <TokenNameSymbol>
                    <LabelInput
                        labelProps={{ label: 'Token Name' }}
                        inputProps={{
                            value: tokenName,
                            formId: 'tokenName',
                            placeHolder: 'ex) My CW Token',
                            maxLength: 30,
                            onChange: handleTokenName,
                            emptyErrorMessage: 'Please input token name.',
                            regex: /[^A-Za-z0-9\s]/g
                        }}
                    />

                    <LabelInput
                        labelProps={{ label: 'Token Symbol' }}
                        inputProps={{
                            value: tokenSymbol,
                            formId: 'tokenSymbol',
                            placeHolder: 'ex) MCT, FCT',
                            maxLength: 6,
                            onChange: handleTokenSymbol,
                            emptyErrorMessage: 'Please input token symbol.',
                            regex: /[^a-zA-Z0-9]/g
                        }}
                    />
                </TokenNameSymbol>
                {!isBasic && (
                    <>
                        <LabelInput
                            labelProps={{ label: 'Decimals' }}
                            inputProps={{
                                value: decimals,
                                formId: 'tokenDecimal',
                                placeHolder: '0 ~ 18',

                                onChange: handleDecimals,
                                emptyErrorMessage: 'Please input token decimal.',
                                type: 'number',
                                decimal: 0,
                                maxValue: 18
                            }}
                        />

                        <LabelInput
                            labelProps={{ label: 'Label' }}
                            inputProps={{
                                value: label,
                                formId: 'tokenLabel',
                                placeHolder: 'ex) Event reward contract',
                                onChange: handleLabel,
                                emptyErrorMessage: 'Please input token label.'
                            }}
                        />
                    </>
                )}

                <LabelInput
                    labelProps={{ label: isBasic ? 'Token Image Link (Optional)' : 'Marketing Logo (Optional)' }}
                    inputProps={{
                        value: tokenLogoUrl,
                        formId: 'tokenLogoUrl',
                        placeHolder: 'ex) https://example.thisismy.token.jpg',
                        onChange: handleTokenLogoUrl,
                        imgPreview: true
                    }}
                />

                <LabelInput
                    labelProps={{ label: isBasic ? 'Token Description (Optional)' : 'Marketing Description (Optional)' }}
                    inputProps={{
                        value: tokenDescription,
                        formId: 'tokenDescription',
                        placeHolder: 'ex) This is my token',
                        onChange: handleDescription,
                        maxLength: 100
                    }}
                />
                {!isBasic && (
                    <>
                        <LabelInput
                            labelProps={{ label: 'Marketing Address (Optional)' }}
                            inputProps={{
                                value: marketingAddress,
                                formId: 'marketingAddress',
                                placeHolder: 'Input wallet Address',
                                onChange: handleMarketingAddress
                            }}
                        />

                        <LabelInput
                            labelProps={{ label: 'Marketing Project (Optional)' }}
                            inputProps={{
                                value: marketingProject,
                                formId: 'marketingProject',
                                placeHolder: 'ex) http://firmachain.org',
                                onChange: handleMarketingProject
                            }}
                        />
                    </>
                )}
            </InformationBody>
        </InformationWrapper>
    );
};

export default Information;
