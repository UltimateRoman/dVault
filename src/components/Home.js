import React, {Component} from 'react';
import logo from '../logo.png';
import { Button } from 'react-bootstrap';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            found: "ns",
            cert: null
        }
    }

    render() {
        console.log(this.props.certificates)
        return (
            <React.Fragment>
                <br></br>
                <h1 style={{textAlign: "center", color: "black", fontSize:"70px"}}>dVault</h1>
                <br/>
                <h3 style={{textAlign: "center", color: "blue"}}>By Team Galaxy Stars</h3>
                <br></br>
                <center><img src={logo} alt="logo"/></center>
                <br/><br/><br/><br/>
                <h2 style={{textAlign: "center", color: "black", fontSize:"45px"}}>Verify Certificates</h2>
                <br/>
                <form onSubmit={async(event) => {
                        event.preventDefault()
                        const res = await this.props.verifyCertificate(this.certid.value)
                        console.log(res)
                        if(res[0]===true) {
                            window.alert("Verified as valid certificate")
                            this.setState({ found: "yes" },() => console.log(this.state.found))
                        }
                        else {
                            window.alert("Warning !!! Invalid certificate ID")
                            this.setState({ found: "no" })
                        }
                    }}>
                <div class="mb-3">
                <input placeholder="Enter Certificate ID to search" id="certid" style={{ width: '80%', margin: 'auto' }} type="text" class="form-control" ref={(input) => { this.certid = input }} />
                <br/><br/>
                <center>
                <Button variant="success" type="submit">
                    Verify
                </Button>
                <h5>{this.state.found}</h5>
                {this.state.found==="yes"&&
                    <h5>Verified as valid certificate</h5>
                }
                 {this.state.found==="no"&&
                    <h5>Invalid certificate ID</h5>
                }
                </center>
                </div>
                </form>
                <br/>
                        
            </React.Fragment>
        );
    }
}

export default Home;
