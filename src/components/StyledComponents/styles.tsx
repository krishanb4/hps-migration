import styled from 'styled-components';
import { Container } from './Globalstyles';
import { Link } from 'react-router-dom';
import { GiBarbute } from 'react-icons/gi';


export const Nav = styled.nav`
    font-size: 18px;
    position: sticky;
    top: 0;
    z-index: 999;
    height: 80px;
    background-color: transparent;
    /* box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.5); */
    // box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: center;
    align-items: center;

`;

export const NavbarContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    ${Container};
`;

export const Logo = styled.a`
    padding: 1rem 0;
    color: #7b7fda;
    text-decoration: none;
    font-weight: bold
    font-size: 1.7rem;

    span{
        font-weight: 300;
        font-size: 1.3rem;
    }
`;

export const WalletConectButton = styled.button`
    -webkit-box-align: center;
    align-items: center;
    border: 0px;
    border-radius: 16px;
    box-shadow: rgb(14 14 44 / 40%) 0px -1px 0px 0px inset;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    -webkit-box-pack: center;
    justify-content: center;
    letter-spacing: 0.03em;
    line-height: 1;
    opacity: 1;
    outline: 0px;
    transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
    height: 32px;
    padding: 0px 16px;
    background-color: #D62AD0;
    color: white;
`;

export const NavLogo = styled(Link)`
color: #fff;
cursor: pointer;
display: flex;
align-items: center;
text-decoration: none;
font-size: 2.5rem;
font-weight: 800;
transition: all .5s ease;
&:hover{
    transform: scale(1.08);
}
@media only screen and (max-width:700px){
    font-size: 1rem;
}
`;


export const NavIcon = styled.img`
margin-right: .8rem;
transition: all .5s ease;
color: #fff;
&:hover {
    transform: scale(2);
}
`;


export const MenuIcon = styled.div`
display: none;

@media (max-width: 1000px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, 20%);
    font-size: 4rem;
    cursor: pointer;
}
`;


export const Menu = styled.ul<{ click: boolean; }>`
display: flex;
align-items: center;
text-align: center;

@media only screen and (max-width:1000px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 80px;
    left: ${({ click }) => click ? '0' : '-100%'};
    background-color: rgba(0, 0, 0, 0.9);
    transition: all .5s ease;
}
`;

export const MenuItem = styled.li`
list-style: none;
height: 80px;


@media only screen and (max-width:1000px){
    width: 100%;
    &:hover {
        border: none;
    }
}
`;

export const MenuLink = styled(Link)`
text-decoration: none;
font-weight: bold;
font-size: 1rem;
color: #fff;
display: flex;
justify-content: space-between;
align-items: center;
padding: 1rem 2rem;
height: 100%;
transition: all .2s ease;

&:hover {
    color: #000;
    transform: traslateY(-3rem);

}
&:active {
    transform: traslateY(3rem);
    color: #E38B06;
}

@media only screen and (max-width:1000px){
    display: block;
    padding: 3rem;
    text-align: center;
    transition: all .2s ease;
}
`;

export const MenuItemBtn = styled.li`
list-style: none;
@media screen and (max-width:1000px){
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 120px;
}
`;


export const MenuLinkBtn = styled.button`
text-decoration: none;
display: flex;
justify-content: center;
align-items: center;
padding: 8px 16px;
height: 34%;
width: 100%;
border: none;
outline: none;
border-radius: 10px;
background-color: #0c0c0c;
color: #fff;
font-weight: bold;
cursor: pointer;
&:hover {
    color: #000;
    background-color: #fff;
}
`;