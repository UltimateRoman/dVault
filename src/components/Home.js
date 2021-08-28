import React from 'react';
import logo from '../logo.png';

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <br></br>
                <h1 style={{textAlign: "center", color: "black", fontSize:"70px"}}>dVault</h1>
                <br/>
                <h3 style={{textAlign: "center", color: "blue"}}>By Team Galaxy Stars</h3>
                <br></br>
                <img src={logo} alt="logo"/>

                
            </React.Fragment>
        );
    }
}

export default Home;
