import React from 'react';
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
        return (
            <React.Fragment>
                <br></br>
                <h1 style={{textAlign: "center", color: "black", fontSize:"70px"}}>dVault</h1>
                <br/>
                <h3 style={{textAlign: "center", color: "blue"}}>By Team Galaxy Stars</h3>
                <br></br>
                <img src={logo} alt="logo"/>
                <br/><br/><br/><br/>
                <h2 style={{textAlign: "center", color: "black", fontSize:"45px"}}>Verify Certificates</h2>
                <br/>
                <form onSubmit={async(event) => {
                        event.preventDefault()
                        const res = await this.props.verifyCertificate(this.certid.value)
                        if(res[0]) {
                            this.setState({ found: "yes" })
                            const cert = this.props.certificates(res[1])
                            this.setState({ cert })
                        }
                        else {
                            this.setState({ found: "no" })
                        }
                    }}>
                <div class="mb-3">
                <input placeholder="Enter Certificate ID to search" id="certid" style={{ width: '80%', margin: 'auto' }} type="text" class="form-control" ref={(input) => { this.certid = input }} />
                <Button variant="success" type="submit">
                    Verify
                </Button>
                <p>{this.state.found}</p>

                </div>
                </form>
                <br/>
                        
            </React.Fragment>
        );
    }
}

export default Home;
