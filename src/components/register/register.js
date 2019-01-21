import React, {Component} from 'react';
import {  View, Text, TextInput, TouchableOpacity, Image, Alert, Button ,StyleSheet ,StatusBar, Container, KeyboardAvoidingView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Form, FormItem } from 'react-native-form-validation';
import Spinner from 'react-native-loading-spinner-overlay';
import { Select, Option } from 'react-native-select-list';
import { registerUser } from '../api/api.js'

export default class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      view1:'1',
      nameError: false,
      emailError: false,
      passwordError: false,
      loading: true,
      success: false,
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        loading: !this.state.loading
      });
    }, 1000);
  }

    textChange(event){
      this.setState({
        nameInput:event.nativeEvent.text
      });
    }
    emailChange(event){
      this.setState({
        emailInput:event.nativeEvent.text
      });
    }
    passwordChange(event){
      this.setState({
        passwordInput:event.nativeEvent.text
      });
    }
    confirmPasswordChange(event){
      this.setState({
        confirmPasswordInput:event.nativeEvent.text
      });
    }

    submit(){
        this.setState({
            nameError: false,
            emailError: false,
            passwordError: false,
        });

        this.validate();

        const {nameError, emailError, passwordError} = this.state;
        const { navigate } = this.props.navigation
        if(!nameError && !emailError && !passwordError) {
            console.log('PASS');
            registerUser({
                email: this.state.emailInput,
                password: this.state.passwordInput
            }).then((data) => {
                this.setState({success: true});
                setTimeout(() => {
                    navigate('Login');
                }, 2000)
            });
        }
    }

    validate() {
        if(!this.state.nameInput || this.state.nameInput === '') {
            this.setState({nameError: 'Please insert name'})
        }
        if(!this.state.emailInput || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.emailInput)) {
            this.setState({emailError: 'Please insert valid email'})
        }
        if(!this.state.passwordInput || !this.state.confirmPasswordInput) {
            this.setState({passwordError: 'Please insert password'});
            return;
        }
        if(this.state.passwordInput.length < 5) {
            this.setState({passwordError: 'Password must have minim 5 characters'});
            return;
        }
        if(this.state.passwordInput !== this.state.confirmPasswordInput) {
            this.setState({passwordError: 'Please confirm password'});
        }
    }

    render() {
      const { goBack } = this.props.navigation;

      if(this.state.loading){
        return (
          <View style={{ flex: 1 }}>
            <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}} />
          </View>
        )
      }else{
        return (
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.loginContainer}>
              <Image style={styles.logo} source={require('../../components/images/login.png')} />
            </View>
            <View style={styles.containerInputs}>
                    {this.state.success && <Text>Account has been created.</Text>}
                    <TextInput style = {styles.input}
                      autoCapitalize="none"
                      //onSubmitEditing={() => this.dropDown.focus()}
                      ref={(input)=> this.nameInput = input}
                      autoCorrect={false}
                      keyboardType='default'
                      returnKeyType="next"
                      placeholder='Name'
                      placeholderTextColor="#000"
                      value={this.state.nameInput}
                      onChange={this.textChange.bind(this)}
                    />
                    {this.state.nameError && <Text style={styles.error} >{this.state.nameError}</Text>}

                    <TextInput
                      style={styles.input}
                      autoCapitalize="none"
                      onSubmitEditing={() => this.passwordInput.focus()}
                      ref={(input)=> this.emailInput = input}
                      autoCorrect={false}
                      keyboardType='email-address'
                      returnKeyType="next"
                      placeholder='E-mail'
                      placeholderTextColor="#000"
                      onChange={this.emailChange.bind(this)}
                    />
                    {this.state.emailError && <Text style={styles.error} >{this.state.emailError}</Text>}

                    <TextInput
                      style={styles.input}
                      returnKeyType="next"
                      onSubmitEditing={() => this.newPasswordInput.focus()}
                      ref={(input)=> this.passwordInput = input}
                      placeholder='Password'
                      placeholderTextColor="#000"
                      secureTextEntry
                      onChange={this.passwordChange.bind(this)}/>

                    <TextInput
                      style={styles.input}
                      returnKeyType="go"
                      ref={(input)=> this.newPasswordInput = input}
                      placeholder='Confirm Password'
                      placeholderTextColor="#000"
                      secureTextEntry
                      onChange={this.confirmPasswordChange.bind(this)}
                    />
                    {this.state.passwordError && <Text style={styles.error} >{this.state.passwordError}</Text>}
            </View>

            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.submit.bind(this)}>
                 <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.labelButton} onPress={() => goBack()}>
                <Text style={styles.labels}>
                  <Text style={styles.labelText}>
                    Already registered?
                  </Text>
                  <Text style={styles.labelBoldText}> Access</Text>
                </Text>
              </TouchableOpacity>

            </View>
          </KeyboardAvoidingView>
        );
      }
    }

}

const styles = StyleSheet.create({
  buttonView: {
   padding: 20
  },
  container: {
      flex: 1,
      backgroundColor: '#FFF',
  },
  error: {
      color: 'red',
      paddingLeft: 5
  },
  loginContainer:{
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
  },
  logo: {
      position: 'absolute',
      width: '100%',
      height: '100%',
  },
  containerInputs: {
   padding: 20
  },
  input:{
      height: 40,
      backgroundColor: '#fff',
      marginBottom: 10,
      padding: 10,
      color: '#000'
  },
  dropDown:{
      height: 40,
      marginBottom: 10,
      padding: 10,
      color: '#000'
  },
  title:{
      color: "#FFF",
      marginTop: 120,
      width: 180,
      textAlign: 'center',
      opacity: 0.9
  },
  buttonContainer:{
      backgroundColor: '#2980b6',
      paddingVertical: 15,
      borderRadius: 25
  },
  buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
  },
  labelText:{
      color: '#000',
      textAlign: 'center',
  },
  labelBoldText:{
      color: '#000',
      textAlign: 'center',
      fontWeight: '700'
  },
  labelButton:{
      paddingTop: 10,
  },
  labels:{
    flexDirection: 'row',
    textAlign: 'center',
  }
});
