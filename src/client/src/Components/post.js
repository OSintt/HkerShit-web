import React from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { Redirect } from 'react-router-dom';
import './post/post.css';


const url = 'http://localhost:7000';

const recaptchaRef = React.createRef();

export default class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            title: "",
            error: "",
            isVerified: "",
            hasPassword: "",
            isVisible: "",
            redirect: null
        }
    }
    handlePromise(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
    onChange = e => {
        console.log("Captcha Passed")
        const recaptchaValue = recaptchaRef.current.getValue();
        this.setState({ isVerified: recaptchaValue });
    }
    onChangeContent = e => {
        this.setState({
            content: e.target.value
        })
    }
    onChangeTitle = e => {
        this.setState({
            title: e.target.value
        })
    }
    onSubmit = async (e) => {
        e.preventDefault();
        console.log("si")
        let res = await axios({
            method: "POST",
            url: `${url}/api/doxes/dox`,
            data: {
                content: this.state.content,
                title: this.state.title,
                captcha: this.state.isVerified,
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(res.status === 200) {
            this.setState({ error: res.data.message });
        } else {
            this.setState({
                content: ''
            });

            this.setState({
                title: ''
            });

            this.setState({
                error: 'Su dox fue publicado!, espere a que sea verificado.'
            })
            await this.handlePromise(5000);
            this.setState({ redirect: '/' });
        }
    }
    render() {
        if (this.state.redirect) {
    		return <Redirect to={this.state.redirect} />
  		}
        return(
            <div>
					<div className="cuerpo">
						<div className="cont">
							<h6 className="error-asd">{this.state.error}</h6>
							<form onSubmit={this.validateForm}>
								<input 
									type="text"
									name="title"
									placeholder="Título"
									className="input"
									autoComplete="off"
									onChange={this.onChangeTitle}
									value={this.state.title}
									spellCheck="false"/>
								<br/>
								<br/>
								<textarea 
									type="text" 
									name="content"
									placeholder="Contenido del dx" 
									className="textarea"
									spellCheck="false"
									onChange={this.onChangeContent}
									value={this.state.content}/>
								<button type="submit" className="boton" onClick={this.onSubmit}>Enviar</button>
							</form>
								  <ReCAPTCHA
								  	ref={recaptchaRef}
								  	theme="dark"
								    sitekey="6LeXkdAaAAAAANIACQo-utFdBQwnT6IiuXWoPwUp"
								    onChange={this.onChange}
								  />
						</div>
					</div>
			</div>
        )
    }
}