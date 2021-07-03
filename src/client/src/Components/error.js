import React from 'react';
import './error/error.css';
import TypeIt from 'typeit-react';

export default class Error extends React.Component{
    render() {
		return (
			<div>
					<h1 className="center-error-asd">404<br/><TypeIt
				options={{cursor: false}}
			>Error : Page not found</TypeIt></h1>	
						<div className="logo center-error">
					        <img src="https://media.discordapp.net/attachments/826930595707748382/835182249053126656/image0.png" alt="Logo"/>
					    </div>
				<TypeIt
					options={{cursor: false}}
				>
					<h4 className="center-error discord"><a href="/">Regresar</a></h4>		
				</TypeIt>	
			</div>
		)
	}
}