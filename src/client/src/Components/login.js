import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './register/register.css'
const url = 'http://localhost:7000';

const recaptchaRef = React.createRef();

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            error: "",
            redirect: null
        }
    }
    handlePromise(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

    onChangeUsername = async (e) => {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword = async (e) => {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        let res = await axios.post(`${url}/api/users/login`, {
            username: this.state.username,
            password: this.state.password
        });
        if(res.status === 200) {
            this.setState({ error: res.data.message });
        } else {
            this.setState({
                username: ''
            });
            this.setState({
                password: ''
            });
            this.setState({
                error: "Espere un segundo..."
            })
            this.handlePromise(5000)
            this.setState({
                redirect: '/'
            })
        }
    }

    render() {
        if (this.state.redirect) {
    		return <Redirect to={this.state.redirect} />
  		}
        return (
            <div>
					<div className="cuerpo-2">
						<div className="cont">
							<h6 className="error-asd">{this.state.error}</h6>
							<center>
                            <form onSubmit={this.validateForm}>
								<input 
									type="text"
									name="username"
									placeholder="Nombre de Usuario"
									className="input2"
									autoComplete="off"
									onChange={this.onChangeUsername}
									value={this.state.username}
									spellCheck="false"/>
                                <br/>
								<br/>
                                <input 
									type="password"
									name="password"
									placeholder="Contraseña"
									className="input2"
									autoComplete="off"
									onChange={this.onChangePassword}
									value={this.state.password}
									spellCheck="false"/>
                                
								<br/>
								<br/>
								<button type="submit" className="boton" onClick={this.onSubmit}>Iniciar Sesión</button>
							</form>
                                  </center>
						</div>
					</div>
			</div>
        )
    }
}