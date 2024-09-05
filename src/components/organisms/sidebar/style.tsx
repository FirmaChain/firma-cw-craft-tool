import styled from 'styled-components';
import IconButton from '@/components/atoms/buttons/iconButton';

export const DrawerStyled = styled('div')`
    box-sizing: border-box;
    height: 100%;
    min-width: 224px;

    position: fixed;

    border: 0px;
    margin: 0px;
    padding: 0px;
    background-color: ${({ theme }) => theme.colors.background_navbar};
    width: ${({ theme }) => theme.sizes.navbar_width};

    // @media only screen and (max-width: 1400px) {
    //     display: none;
    // }
`;

export const SidebarWrapper = styled.div`
    height: 100%;
    padding: 26px 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const FeatureWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const FooterWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const LogoWrapper = styled.div`
    padding: 0px 18px;
`;

export const SwitchWrapper = styled.div`
    height: 36px;
`;

export const MenuListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const MenuItem = styled(IconButton)`
    width: 168px;
    height: 22px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 0;
`;

export const MenuItemText = styled.div<{ selected: boolean }>`
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    color: ${({ selected }) => (selected ? '#E6E6E6' : '#807E7E')};
`;

export const AddressCard = styled.div`
    width: 168px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid #13e69a;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
`;

export const AddressText = styled.div`
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    background: linear-gradient(90deg, #02e191 0%, #13e6d9 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const ExternalLinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
`;

export const ExternalLinkButton = styled.a`
    background: none;
    border: none;
    color: #707070;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    cursor: pointer;
    transition: color 0.3s ease;
    text-decoration: none;

    &:focus {
        outline: none;
    }

    &:disabled {
        color: #bdc3c7;
        cursor: not-allowed;
    }
`;

export const SocialWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: center;
`;

export const SocialIcon = styled.img`
    width: 24px;
    height: 24px;
`;

export const SocialIconButton = styled.div`
    width: 24px;
    height: 24px;

    &:focus {
        outline: none;
    }
    &:disabled {
        color: #bdc3c7;
        cursor: not-allowed;
    }
    &:hover {
        cursor: pointer;
    }
`;

export const CopyrightWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

export const CopyrightText = styled.div`
    color: #5a5a5a;
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
`;
