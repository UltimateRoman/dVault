import React, { Component } from 'react';
import Web3 from 'web3';
import Dvault from '../abis/Dvault.json'; 
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { HalfCircleSpinner } from 'react-epic-spinners';
import Home from './Home'
import Issue from './Issue'
import Certificate from './Certificate'
import Navbar from './Navbar'


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.celo) {
      await window.celo.enable()
      window.web3 = new Web3(window.celo)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Use the Celo Extension Wallet!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Dvault.networks[networkId]

    if (networkData) {
      const dvault = new web3.eth.Contract(Dvault.abi, networkData.address)
      this.setState({ dvault })
      const uCount = await dvault.methods.uCount.call()
      for (let i = 1; i <= uCount; i++) {
        const user = await dvault.methods.users(i).call()
        this.setState({
            users: [...this.state.users, user]
        })
      }

      const cCount = await dvault.methods.cCount.call()
      for (let i = 1; i <= cCount; i++) {
        const cert = await dvault.methods.certificates(i).call()
        this.setState({
          certificates: [...this.state.certificates, cert]
        })
        if ((cert.issuer === this.state.account || cert.recipient === this.state.account) && (cert.isValid === true)) {
          this.setState({
            myCertificates: [...this.state.myCertificates, cert]
          })
        }
      }
      this.setState({ loading: false })
    } else {
      window.alert('Contract could not be deployed.')
    }
  }

  createUser(name, type) {
    this.setState({ loading: true })
    this.state.dvault.methods.createUser(name, type).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  issueCertificate(url, recipient, desc) {
    this.setState({ loading: true })
    this.state.dvault.methods.issueCertificate(url, recipient, desc).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      uid = receipt["events"]["generatedCertificate"].returnValues.uid
      if(uid) {
        window.alert("Certificate successfully issued. Unique ID: " + uid)
      }
      else {
        window.alert("Unsuccessful, please try again.")
      }
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  revokeCertificate(id) {
    this.setState({ loading: true })
    this.state.dvault.methods.revokeCertificate(id).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  async verifyCertificate(uid) {
    this.setState({ loading: true })
    const res = await this.state.dvault.methods.verifyCertificate(uid).call()
    return res
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dvault: null,
      users: [],
      certificates: [],
      myCertificates: [],
      loading: false
    }

    this.createUser = this.createUser.bind(this)
    this.issueCertificate = this.issueCertificate.bind(this)
    this.revokeCertificate = this.revokeCertificate.bind(this)
    this.verifyCertificate = this.verifyCertificate.bind(this)
  }

  render() {
    return (
      <div style={{ height: 800 }}>
        <Router>
          <Navbar />
          <Route exact path="/" render={props => (
            <React.Fragment>
              {
                this.state.loading
                  ? <div class="center"><HalfCircleSpinner size="100" color="red" /></div>
                  : <Home account={this.state.account} certificates={this.state.certificates} verifyCertificate={this.verifyCertificate} />
              }
            </React.Fragment>
          )} />

          <Route exact path="/issue" render={props => (
              <React.Fragment>
                {
                  this.state.loading
                    ? <div class="center"><HalfCircleSpinner size="100" color="red" /></div>
                    : <Issue users={this.state.users} account={this.state.account} issueCertificate={this.issueCertificate} />
                }
              </React.Fragment>
          )} />
   
          <Route exact path="/certificates" render={props => (
              <React.Fragment>
                {
                  this.state.loading
                    ? <div class="center"><HalfCircleSpinner size="100" color="red" /></div>
                    : <Certificate myCertificates={this.state.myCertificates} revokeCertificate={this.revokeCertificate} />
                }
              </React.Fragment>
          )} />
          </Router>
      </div>
    );
  }
}

export default App;
