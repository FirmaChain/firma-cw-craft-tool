import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, SummeryCard, TitleWrap } from './styles';
import { useEffect } from 'react';
import useExecuteStore from '../../hooks/useExecuteStore';
import LabelInput from '@/components/atoms/input/labelInput';
import useFormStore from '@/store/formStore';

const LOGO_URL_INPUT_FORM_ID = 'EXECUTE_UPDATE_LOGO_URL';
const LOGO_URL_ERROR_TYPE = 'INVALID_ADDRESS';

const UpdateLogo = () => {
    const marketingLogoUrl = useExecuteStore((state) => state.marketingLogoUrl);
    const setMarketingLogoUrl = useExecuteStore((state) => state.setMarketingLogoUrl);

    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const onChangeMarketingLogoUrl = (v) => {
        setMarketingLogoUrl(v);
    };

    useEffect(() => {
        useExecuteStore.getState().setMarketingLogoUrl(marketingLogoUrl);
        return () => {
            useExecuteStore.getState().clearForm();
            clearFormError({ id: LOGO_URL_INPUT_FORM_ID });
        };
    }, []);

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
                    value: marketingLogoUrl,
                    onChange: onChangeMarketingLogoUrl,
                    placeHolder: 'ex) https://example.thisismy.token.jpg'
                }}
            />
        </Container>
    );
};

export default UpdateLogo;
