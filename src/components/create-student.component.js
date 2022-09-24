import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import MyAlert from "./MyAlert";
import { useState } from "react";

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default class CreateStudent extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentRollno = this.onChangeStudentRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      email: '',
      rollno: '',
      alertmsg: '',
      alerthed: 'Success: '
    }
  }
  
  onChangeStudentName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeStudentEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeStudentRollno(e) {
    this.setState({ rollno: e.target.value })
  }

  onSubmit(e) {
  
    // const [alert,showAlert] = useState('');
    // const recordInserted = (event) => {showAlert('Record Inserted Successfully');}
    // const recordUpdated = (event) => {showAlert('Record Updated Successfully');}
    
    e.preventDefault()

    if(this.state.name.length<3)
    { 
      this.setState({alertmsg: 'Please input a valid Student Name'});
      this.setState({alerthed: 'Failed! '});
      return false;
    }

    if(this.state.email.length<3)
    { 
      this.setState({alertmsg: 'Please input a valid Student Email'});
      this.setState({alerthed: 'Failed! '});
      return false;
    }

    if(!isNumeric(this.state.rollno))
    { 
      this.setState({alertmsg: 'Please enter numeric value only in RollNo!'});
      this.setState({alerthed: 'Failed! '});
      return false;
    }
    else {this.setState({alertmsg: 'Record updated successfully'});
          this.setState({alerthed: 'Success! '});  }

    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      rollno: this.state.rollno
    };
    axios.post('http://localhost:4000/students/create-student', studentObject)
      .then(res => console.log(res.data));

    this.setState({ name: '', email: '', rollno: '' })
  }

  render() {
    return (
      <div className='container'>
      <MyAlert msg={this.state.alertmsg} hed={this.state.alerthed}/>

    <div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Roll No</Form.Label>
          <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeStudentRollno} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Create Student
        </Button>
      </Form>
    </div>    </div>
);
  }
}