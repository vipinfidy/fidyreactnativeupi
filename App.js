
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RNUpiPayment from 'react-native-upi-payment';
/*
    first
    npm install react-native-upi-payment
    react-native link
*/

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      Status: "", txnId: "",
    }
  }
  render() {
    that = this;
    function floo() {
      RNUpiPayment.initializePayment({
        vpa: 'fidypaym@yesbank', // vpa 
        payeeName: 'Fidypay',  //name
        amount: '1', // your amount
        transactionRef: 'fidy123' // unique ID
      }, successCallback, failureCallback);
    }

    // fail responce
    function failureCallback(data) {
      if (data['Status'] == "SUCCESS") {
        that.setState({ Status: "SUCCESS" });
        that.setState({ txnId: data['txnId'] });
      } else {
        that.setState({ Status: "FAILURE" })
      }
    }

    // success responce
    function successCallback(data) {

      if (data['Status'] == "SUCCESS") {
        that.setState({ Status: "SUCCESS" });
        that.setState({ txnId: data['txnId'] });
      } else {
        that.setState({ Status: "FAILURE" })
      }
    }
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <TouchableOpacity style={{
          height: 35, width: 250, backgroundColor: 'blue',
          borderRadius: 10, justifyContent: 'center', alignItems: 'center'
        }}
          onPress={() => { floo() }}>
          <Text style={{ color: 'white', }}> Click to open Upi app</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 20, color: 'black' }}>{this.state.Status + "\n"}</Text>
        <Text style={{ marginTop: 5, color: 'red' }}>{this.state.txnId}</Text>
      </View>
    );
  }
}
