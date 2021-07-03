import React from 'react';
import {
	Nav,  
	NavMenu, 
	NavLink
} from './navbarcomps/navbar';

export default class Navbar extends React.Component {
	
	render() { 
		return (
			<div>
				<Nav>
					<NavMenu>
						<NavLink to="/">
							Inicio
						</NavLink>
						<NavLink to="/dxes/page/0">
							Dxes
						</NavLink>
						<NavLink to="/post">
							Publicar
						</NavLink>
						<NavLink to="/register">
							Register
						</NavLink>
					</NavMenu>			
				</Nav>
			</div>		
		)
	}

}