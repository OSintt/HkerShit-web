import React from 'react';
import './home/home.css';
import TypeIt from 'typeit-react'

export default class Home extends React.Component {
    render() {
		return(
			<div>
				<div className="container">
				    <h1 className="dGen">
                		<TypeIt>3rd Gen</TypeIt>
            		</h1>
				    <div className="logo">
				        <img src="https://media.discordapp.net/attachments/826930595707748382/835182249053126656/image0.png" alt="Logo"/>
				    </div>
				    <div className="presentation">
				        <h2 className="h2-home">#666 HackerSquad</h2>
				        <h3>
				            Web Oficial
				        </h3>
				    </div>
				    <div className="discord">
				        <a href="https://discord.gg/a798YzVARB">DISCORD</a>
				    </div>
				</div>
			</div>
		)
	}
}