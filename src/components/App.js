import React, { Component } from 'react';
import Web3 from 'web3';
import Dvault from '../abis/Dvault.json'; 
import './App.css';


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
          cerificates: [...this.state.certificates, cert]
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

  async issueCertificate(url, recipient, desc) {
    this.setState({ loading: true })
    const uid = await this.state.dvault.methods.issueCertificate(url, recipient, desc).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
    if(uid) {
      window.alert("Certificate succesfully issued. Unique ID: " + uid)
    }
    else {
      window.alert("Error occurred! Please try again.")
    }
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
    const res = await this.state.dvault.methods.verifyCertificate(uid).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
    if(res[0]) {
      window.alert("Valid certificate")
    }
    else {
      window.alert("Invalid certificate")
    }
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dvault: null,
      users: [],
      certificates: [],
      myCertificates: [],
      loading: true
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <h1>dVault</h1>
        </nav>
      </div>
    );
  }
}

export default App;
