import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const WhiteTextTypography = withStyles({
  root: {
    color: "darkblue"
  }
})(Typography);

const ipfsClient = require('ipfs-http-client')

      const projectId = process.env.REACT_APP_PROJECT_ID 
      const projectSecret = process.env.REACT_APP_PROJECT_SECRET 
      const auth =
        'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

      const client = ipfsClient({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
          authorization: auth
         // Access-Control-Allow-Origin: true

        }
      })

class Issue extends Component {

  onSubmit = (event) => {
    event.preventDefault();
    // if(this.state.filesSelected){
    //   const reader = new window.FileReader()
    //   reader.readAsArrayBuffer(this.fileinput.current.files[0])
    //   reader.onloadend = () => {
    //     this.setState({ buffer: Buffer(reader.result) })
    //   }
    //   client.pin.add(this.state.buffer).then((res) => {
    //     console.log(res)
    //   })
      // .then((result)=>{
      //   //this.props.issueCertificate( "https://"+result.data.value.cid+"/"+result.data.value.files[0].name,this.recepient.current.value, this.descinput.current.value)
      // console.log(result)
      // }
      // )}
    this.props.issueCertificate(this.linkinput.current.value, this.recepient.current.value, this.descinput.current.value) 
}


  constructor(props) {
    super(props);
    this.fileinput = React.createRef();
    this.recepient = React.createRef();
    this.descinput = React.createRef();
    this.linkinput = React.createRef();

    this.state={
      filesSelected: false,
      buffer: null
    }
  }

  render() {
    return (
      <React.Fragment>
        <br/><br/>          
        <Typography component="h1" variant="h1" align="center" color="inherit" gutterBottom>
          <WhiteTextTypography variant="h1">
            Issue new certificate
          </WhiteTextTypography>
        </Typography>
        <br/><br/>

        <center>
        <div style={{width:700, padding: "10px", borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", backgroundColor: '#00e6e6'}} >
          <div style={{width:600}}>
            <form onSubmit={this.onSubmit} noValidate autoComplete="off">
              <div class="mb-3">
                <br/>
                <label for="exampleFormControlTextarea1" class="form-label"><h3 style={{ color: "Navy" }}>Certificate Recepient</h3></label>
                <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.recepient} placeholder="Enter address of recepient" required />
              </div>
              <br/><br/>

              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"><h3 style={{ color: "Navy" }}>Description </h3></label>
                <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.descinput} placeholder="Enter a Description of certificate" required />
              </div>
              <br/><br/>

              <div class="mb-3">
                <label for="formFile" class="form-label"><h3 style={{ color: "Navy" }}>Choose File</h3></label>
                <input type="file" class="form-control" id="formFile" ref={this.fileinput} onChange={(event) =>{
                  event.preventDefault();
                  if(this.fileinput.current.files[0]){
                    this.setState({filesSelected:true})
                  }
                  }} />
              </div>
              <br/>
                <h4 style={{ textAlign: "center"}}>OR</h4>
              <br/>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"><h3>File URL</h3></label>
                <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.linkinput} placeholder="Enter file link" />
              </div>
              <br/><br/>

              <button type="submit" class="btn btn-success mb-3">Issue Certificate</button>
              <br/><br/>
            </form>
          </div>
        </div>
        </center>
      </React.Fragment>
      );
    }
  }
  
  export default Issue;