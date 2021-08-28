import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import './App.css';

class Certificate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isInstitution: false
        }
    }

    componentWillReceiveProps() {
        this.props.users.map((user) => {
            if(user.userAddress==this.props.account) {
                console.log(user)
                if(user.userType == "Institution") {
                    this.setState({isInstitution: true })
                }
            }
          }
        )
        console.log(this.props.myCertificates)
    }    

    render() {
        if(this.state.isInstitution) {
            return (
                <div className="container-fluid mt-5" style={{ textAlign: 'center' }}>
                    <div className="row">
                        <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ margin: '0% 15%' }}>
                            <h1>Issued Certificates</h1>
                            {this.props.myCertificates.map((cert, key) => {
                                return (
                                    <Card>
                                        <Card.Header>Certificate ID: {cert.uid}</Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                Recipient Address: {cert.recipient}
                                            </Card.Text>
                                            <Card.Text>
                                                {cert.desc}
                                            </Card.Text>
                                            <a href={cert.url} target="_blank" rel="noopener noreferrer"><p class="badge badge-primary">View Certificate</p></a>
                                            <br/><br/>
                                            <Button
                                                variant="danger"
                                                name={cert.id}
                                                onClick={(event) => {
                                                    this.props.revokeCertificate(event.target.name)
                                                }}
                                            >
                                                Revoke this Certificate
                                        </Button>
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                        </main>
                    </div>
                </div>
            );
        } 
        else
         {
             return(
            <div className="container-fluid mt-5" style={{ textAlign: 'center' }}>
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ margin: '0% 15%' }}>
                        <h1>Your Certificates</h1>
                        {this.props.myCertificates.map((cert, key) => {
                            return (
                                <Card>
                                    <Card.Header>Certificate ID: {cert.uid}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            Issuer Address: {cert.issuer}
                                        </Card.Text>
                                        <Card.Text>
                                            {cert.desc}
                                        </Card.Text>
                                        <a href={cert.url} target="_blank" rel="noopener noreferrer"><p class="badge badge-primary">View Certificate</p></a>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </main>
                </div>
            </div>
             );
        }
    }
}

export default Certificate;