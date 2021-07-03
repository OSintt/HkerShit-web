import React from 'react';
import axios from 'axios';

const url = 'http://localhost:7000';

export default class verifiySomething extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            status: ""
        } 
    }
    onSubmit = async e => {
        e.preventDefault();
        let res = await axios.get(`${url}/api/auth/isAuthenticated`);
        console.log(res)
        this.setState({
            status: res.status
        })
    }
    render() {
        return(
            <div>
                <div className="error-asd">{ this.state.status }</div>
                <form>
                <button
                    type="submit"
                    className="boton"
                    onClick={this.onSubmit}
                >Que</button>
                </form>
            </div>
        )
    }
}