import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import { useEffect } from 'react';
import useExecuteStore from '../../hooks/useExecuteStore';
import LabelInput from '@/components/atoms/input/labelInput';
import useFormStore from '@/store/formStore';

const LOGO_URL_INPUT_FORM_ID = 'EXECUTE_UPDATE_LOGO_URL';
const LOGO_URL_ERROR_TYPE = 'INVALID_ADDRESS';

const UpdateLogo = () => {
    const marketingInfo = useExecuteStore((state) => state.marketingInfo);
    const marketingLogoUrl = useExecuteStore((state) => state.marketingLogoUrl);
    const setMarketingLogoUrl = useExecuteStore((state) => state.setMarketingLogoUrl);

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    useEffect(() => {
        if (marketingInfo) {
            setMarketingLogoUrl(marketingInfo?.logo.url || "");
        }
    }, [marketingInfo]);
    
    const onChangeMarketingLogoUrl = (v: string) => {
        console.log(v);
        setMarketingLogoUrl(v);
    };

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Update Logo</HeaderTitleTypo>
                    <HeaderDescTypo>Change the token's logo URL</HeaderDescTypo>
                </TitleWrap>
            </HeaderWrap>
            <LabelInput
                labelProps={{ label: 'Marketing Logo (Token Logo Link)' }}
                inputProps={{
                    formId: LOGO_URL_ERROR_TYPE,
                    value: marketingLogoUrl === null ? "" : marketingLogoUrl,
                    onChange: onChangeMarketingLogoUrl,
                    placeHolder: 'ex) https://example.thisismy.token.jpg'
                }}
            />
        </Container>
    );
};

export default UpdateLogo;
