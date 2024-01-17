import styled from "styled-components";
import "../../styles/variables.css"

export const Navbar = styled.nav`
	display: flex;
	justify-content: space-between;
	padding: 1em 1.5em;
	color: var(--blue);
	height: 6vh;
`

export const NavbarLogo = styled.div`
	display: flex;
	align-items: center;
`

export const ImgLogo = styled.img`
	width: 190px;
	margin-right: 0.8em;
`

export const List = styled.ul`
	display: flex;
	align-items: center;
	list-style: none;
`

export const ListItem = styled.li`
  color: var(--blue);
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  padding: 0.5em 0.8em;
  border-radius: 5px;
  margin: 0 5px;
  border: 1px solid;

  &:hover {
    background-color: var(--blue);
    color: white;

    a {
      color: white;
    }
  }

  a {
    color:var(--blue);
    text-decoration: none;
  }
`;
