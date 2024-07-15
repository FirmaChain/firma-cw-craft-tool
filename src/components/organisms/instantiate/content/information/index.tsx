import { useState } from 'react';
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
import LabelInput2 from '@/components/atoms/input/labelInput2';
import { FirmaUtil } from '@firmachain/firma-js';
import useFormStore from '@/store/formStore';

interface IProps {
    isBasic: boolean;
    // Basic Options
    onChangeTokenName: (value: string) => void;
    onChangeTokenSymbol: (value: string) => void;
    onChangeTokenLogoUrl: (value: string) => void;
    onChangeTokenDescription: (value: string) => void;
    // Advanced Options
    onChangeDecimals: (value: string) => void;
    onChangeLabel: (value: string) => void;
    onChangeMarketingAddress: (value: string) => void;
    onChangeMarketingProject: (value: string) => void;
}

const Information = ({
    isBasic,
    onChangeTokenName,
    onChangeTokenSymbol,
    onChangeTokenLogoUrl,
    onChangeTokenDescription,
    // Advanced Options
    onChangeDecimals,
    onChangeLabel,
    onChangeMarketingAddress,
    onChangeMarketingProject
}: IProps) => {
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const [tokenName, setTokenName] = useState<string>('');
    const [tokenSymbol, setTokenSymbol] = useState<string>('');
    const [tokenLogoUrl, setTokenLogoUrl] = useState<string>('');
    const [tokenDescription, setTokenDescription] = useState<string>('');
    const [decimals, setDecimals] = useState<string>('');
    const [label, setLabel] = useState<string>('');
    const [marketingAddress, setMarketingAddress] = useState<string>('');
    const [marketingProject, setMarketingProject] = useState<string>('');

    const handleTokenName = (value: string) => {
        setTokenName(value);
        onChangeTokenName(value);
    };

    const handleTokenSymbol = (value: string) => {
        // tokenSymbol
        setTokenSymbol(value);
        onChangeTokenSymbol(value);

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
        onChangeTokenLogoUrl(value);
    };

    const handleDescription = (value: string) => {
        setTokenDescription(value);
        onChangeTokenDescription(value);
    };
    const handleDecimals = (value: string) => {
        if (Number(value) < 0) {
            setDecimals('0');
            onChangeDecimals('0');
        } else {
            setDecimals(value);
            onChangeDecimals(value);
        }
    };

    const handleLabel = (value: string) => {
        setLabel(value);
        onChangeLabel(value);
    };

    const handleMarketingAddress = (value: string) => {
        setMarketingAddress(value);
        onChangeMarketingAddress(value);

        if (FirmaUtil.isValidAddress(value) || value === '') {
            clearFormError({ id: 'marketingAddress', type: 'VALID_ADDRESS' });
        } else {
            setFormError({ id: 'marketingAddress', type: 'VALID_ADDRESS', message: 'Please input valid firmachain wallet address.' });
        }
    };

    const handleMarketingProject = (value: string) => {
        setMarketingProject(value);
        onChangeMarketingProject(value);
    };

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
                    <LabelInput2
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

                    <LabelInput2
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
                        <LabelInput2
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

                        <LabelInput2
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

                <LabelInput2
                    labelProps={{ label: isBasic ? 'Token Image Link (Optional)' : 'Marketing Logo (Optional)' }}
                    inputProps={{
                        value: tokenLogoUrl,
                        formId: 'tokenLogoUrl',
                        placeHolder: 'ex) https://example.thisismy.token.jpg',
                        onChange: handleTokenLogoUrl,
                        imgPreview: true
                    }}
                />

                <LabelInput2
                    labelProps={{ label: isBasic ? 'Token Description (Optional)' : 'Marketing Description (Optional)' }}
                    inputProps={{
                        value: tokenDescription,
                        formId: 'tokenDescription',
                        placeHolder: 'ex) This is my token',
                        onChange: handleDescription
                    }}
                />
                {!isBasic && (
                    <>
                        <LabelInput2
                            labelProps={{ label: 'Marketing Address (Optional)' }}
                            inputProps={{
                                value: marketingAddress,
                                formId: 'marketingAddress',
                                placeHolder: 'Input wallet Address',
                                onChange: handleMarketingAddress
                            }}
                        />

                        <LabelInput2
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
