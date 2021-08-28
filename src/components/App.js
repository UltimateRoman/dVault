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
      for (let j = 1; j <= cCount; j++) {
        console.log(cCount.toString())
        const certificate = await dvault.methods.certificates(j).call()
        
        this.setState({
          certificates: [...this.state.certificates, certificate]
        })
        if ((certificate.issuer === this.state.account || certificate.recipient === this.state.account) && (certificate.isValid)) {
          this.setState({
            myCertificates: [...this.state.myCertificates, certificate]
          })
        }
      }
      
       this.setState({ loading: false })
    } else {
      window.alert('Contract could not be deployed.')
    }
    console.log("hi")
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
      window.alert("Certificate successfully issued")

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
    this.setState({ loading: false })
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
                    : <Issue users={this.state.users} account={this.state.account} createUser={this.createUser} issueCertificate={this.issueCertificate} />
                }
              </React.Fragment>
          )} />
   
          <Route exact path="/certificates" render={props => (
              <React.Fragment>
                {
                  this.state.loading
                    ? <div class="center"><HalfCircleSpinner size="100" color="red" /></div>
                    : <Certificate users={this.state.users} account={this.state.account} myCertificates={this.state.myCertificates} revokeCertificate={this.revokeCertificate} />
                }
              </React.Fragment>
          )} />
          </Router>
      </div>
    );
  }
}

export default App;
