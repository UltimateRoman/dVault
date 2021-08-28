# dVault
A Blockchain-based system to issue and validate digital academic certificates.

![logo](/src/logo.png?raw=true)

A major issue faced by the education sector is document verification and authenticity which has been corrupted by malpractices like fraud and misrepresentation of records.
Hence it is necessary to develop a system that can store, secure and verify these digital certificates in real-time. 

dVault is a decentralized system to issue and validate digital academic certificates . It allows educational institutions to issue credible digital certificates to students (eliminates paper-based certificates) . Also provides facility to verify authenticity of a  certificate using its unique ID . It is proposed to be built using the Celo Blockchain .

Blockchain technology enables keeping of public records (from the viewer side) of educational accomplishments that can be easily verified and accessible (from the issuer side) to many educational institutions in a decentralized manner.

#### [Contract deployment on Celo Alfajores Testnet](https://alfajores-blockscout.celo-testnet.org/address/0xA2E93648f68Aeb2983D1610F309f7d07Eb7A04b3)

<br/>

### Advantages of dVault
- Transparent and secure Authenticity Verification and Issuing of certificates, powered by Blockchain technology.
- Eliminates paper-based records.
- Public Records.
- Non-Tamperable certificates.
- Reliable and Trustworthy.

## Run the dVault DApp

### Install Dependencies

Node JS - [node](https://nodejs.org/en/download/)

Celo Extension Wallet and set Alfajores Test Network.

### Clone the repo

```
$ git clone https://https://github.com/UltimateRoman/dVault

$ cd dVault
```

### Install Truffle and other dependencies

```
$ npm install -g truffle

$ npm install
```

- Create a .secret file in the root directory of the repo and enter your Celo account private key.


### Migrate and Run the DApp

```
$ truffle migrate --network alfajores

$ npm start
```

- Visit localhost:3000 and connect your Celo extension wallet account.
- Enjoy the dVault experience!
