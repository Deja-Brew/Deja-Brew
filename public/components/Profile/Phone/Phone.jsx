import React, { Component } from 'react';
import axios from 'axios';
import DisplayPhone from './DisplayPhone.jsx';
import QueryPhone from './QueryPhone.jsx';

export default class Phone extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.editPhone=this.handleEditPhone.bind(this);
    this.submitPhone=this.handleSubmitPhone.bind(this);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ PhoneNum: nextProps.phone })
    this.setState({ displayPhone: <DisplayPhone handlePhoneClick={ this.editPhone } phone={ nextProps.phone } /> });
  }

  handleEditPhone() {
    this.setState({ displayPhone: <QueryPhone handleSubmit={ this.submitPhone } /> });
  }

  handleSubmitPhone(phoneSubmission) {
    console.log('phone number submitted', phoneSubmission)
    if (phoneSubmission !== undefined) {
      phoneSubmission = '+1 ' + phoneSubmission;
      this.setState({ PhoneNum: phoneSubmission });
      axios.put('/users/' + this.props.userId, { phone: phoneSubmission })
      .then(() => {
        this.setState({ displayPhone: <DisplayPhone handlePhoneClick={ this.editPhone } phone={ phoneSubmission } /> });
      })
    } else {
      this.setState({ displayPhone: <DisplayPhone handlePhoneClick={ this.editPhone } phone={ this.state.PhoneNum } /> });
    }
  }
  
  render() {
    return (
      <div>
        { this.state.displayPhone }
      </div>
    )
  }
}
