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
import useFormStore from '@/store/formStore';
// import useInstantiateStore from '../../instaniateStore';
import { DEFAULT_INPUT_REGEX, NORMAL_TEXT, ONLY_ENGLISH, WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { isValidAddress } from '@/utils/address';
import { useCW20Instantiate } from '@/context/cw20InstantiateContext';

interface IProps {
    isBasic: boolean;
}

const Information = ({ isBasic }: IProps) => {
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const context = useCW20Instantiate();

    const tokenName = context.tokenName;
    const tokenSymbol = context.tokenSymbol;
    const tokenLogoUrl = context.tokenLogoUrl;
    const tokenDescription = context.tokenDescription;
    const decimals = context.decimals;
    const label = context.label;
    const marketingAddress = context.marketingAddress;
    const marketingProject = context.marketingProject;
    const walletList = context.walletList;
    const setTokenName = context.setTokenName;
    const setTokenSymbol = context.setTokenSymbol;
    const setTokenLogoUrl = context.setTokenLogoUrl;
    const setTokenDescription = context.setTokenDescription;
    const setDecimals = context.setDecimals;
    const setLabel = context.setLabel;
    const setMarketingAddress = context.setMarketingAddress;
    const setMarketingProject = context.setMarketingProject;
    const setWalletList = context.setWalletList;
    const setMinterCap = context.setMinterCap;

    const handleTokenName = (value: string) => {
        if (value.length === 0 || value.trim().length >= 3) {
            clearFormError({ id: 'tokenName', type: 'MINIMAL_NAME_LENGTH' });
        } else {
            setFormError({ id: 'tokenName', type: 'MINIMAL_NAME_LENGTH', message: 'Minimum 3 characters required.' });
        }

        setTokenName(value);
    };

    const handleTokenSymbol = (value: string) => {
        setTokenSymbol(value);

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

    const clearListAmount = () => {
        setWalletList(
            walletList.map((v) => {
                clearFormError({ id: `${v.id}_AMOUNT` });
                return { ...v, amount: '' };
            })
        );
    };

    const clearMinterCap = () => {
        setMinterCap('');
        clearFormError({ id: 'minterCap' });
    };

    const handleDecimals = (value: string) => {
        if (Number(value) < 0) {
            setDecimals('0');
        } else {
            setDecimals(value);
        }

        clearListAmount();
        clearMinterCap();
    };

    const handleLabel = (value: string) => {
        setLabel(value);

        if (value.trim() === '' && value.length >= 1) {
            setFormError({ id: 'tokenLabel', type: 'EMPTY_LABEL', message: 'Enter label information other than whitespace.' });
        } else {
            clearFormError({ id: 'tokenLabel', type: 'EMPTY_LABEL' });
        }
    };

    const handleMarketingAddress = (value: string) => {
        setMarketingAddress(value);

        if (isValidAddress(value) || value === '') {
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

            handleMarketingAddress('');
            clearFormError({ id: 'marketingAddress' });

            handleMarketingProject('');
            clearFormError({ id: 'marketingProject' });
        } else {
            handleDescription('');
            clearFormError({ id: 'tokenDescription' });
        }

        clearListAmount();
        clearMinterCap();
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
                        labelProps={{ label: 'Token Name', subText: 'Minimum 3 characters' }}
                        inputProps={{
                            value: tokenName,
                            formId: 'tokenName',
                            placeHolder: 'ex) My CW Token',
                            maxLength: 30,
                            onChange: handleTokenName,
                            emptyErrorMessage: 'Please input the token name.',
                            regex: NORMAL_TEXT
                        }}
                    />

                    <LabelInput
                        labelProps={{ label: 'Token Symbol', subText: 'Minimum 3 characters' }}
                        inputProps={{
                            value: tokenSymbol,
                            formId: 'tokenSymbol',
                            placeHolder: 'ex) MCT, FCT',
                            maxLength: 12,
                            onChange: handleTokenSymbol,
                            emptyErrorMessage: 'Please input the token symbol.',
                            regex: ONLY_ENGLISH
                        }}
                    />
                </TokenNameSymbol>
                {!isBasic && (
                    <LabelInput
                        labelProps={{ label: 'Decimals' }}
                        inputProps={{
                            value: decimals,
                            formId: 'tokenDecimal',
                            placeHolder: '0 ~ 18',
                            onChange: handleDecimals,
                            emptyErrorMessage: 'Please input the token decimals.',
                            type: 'number',
                            decimal: 0,
                            maxValue: '18'
                        }}
                    />
                )}
                <LabelInput
                    labelProps={{ label: 'Label' }}
                    inputProps={{
                        value: label,
                        formId: 'tokenLabel',
                        placeHolder: 'ex) Event reward contract',
                        onChange: handleLabel,
                        emptyErrorMessage: 'Please input the token label.',
                        maxLength: 128,
                        regex: NORMAL_TEXT
                    }}
                />
                <LabelInput
                    labelProps={{ label: isBasic ? 'Token Image Link (Optional)' : 'Marketing Logo (Optional)' }}
                    inputProps={{
                        value: tokenLogoUrl,
                        formId: 'tokenLogoUrl',
                        placeHolder: 'ex) https://example.thisismy.token.jpg',
                        onChange: handleTokenLogoUrl,
                        imgPreview: true,
                        regex: DEFAULT_INPUT_REGEX,
                        maxLength: 300
                    }}
                />

                <LabelInput
                    labelProps={{ label: isBasic ? 'Token Description (Optional)' : 'Marketing Description (Optional)' }}
                    inputProps={{
                        value: tokenDescription,
                        formId: 'tokenDescription',
                        placeHolder: 'ex) This is my token',
                        onChange: handleDescription,
                        maxLength: isBasic ? 100 : 300,
                        regex: NORMAL_TEXT
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
                                onChange: handleMarketingAddress,
                                regex: WALLET_ADDRESS_REGEX
                            }}
                        />

                        <LabelInput
                            labelProps={{ label: 'Marketing Project (Optional)' }}
                            inputProps={{
                                value: marketingProject,
                                formId: 'marketingProject',
                                placeHolder: 'ex) https://firmachain.org',
                                onChange: handleMarketingProject,
                                regex: DEFAULT_INPUT_REGEX,
                                maxLength: 300
                            }}
                        />
                    </>
                )}
            </InformationBody>
        </InformationWrapper>
    );
};

export default Information;
