import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView  } from 'react-native';
import { loginUser } from '../api/api.js'

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g

export default class Login extends Component {

  state = {
    email: '',
    password: '',
    emailHasError: false,
    passwordHasError: false,
    loginButtonText: 'Access'
  }

  handleSubmitForm = () => {
    this.changeLoginButtonText();
    const { navigate } = this.props.navigation
    const { email, password } = this.state
    const isValidateEmail = emailRegex.test(email)
    console.log(isValidateEmail)
    const isValidatePassword = password.trim().length > 0 ? true : false
    this.emailHasError = false;
    this.passwordHasError = false;
    const isValidate = isValidateEmail && isValidatePassword;
    console.log('GOGOGOG');
    loginUser({email, password}).then((data, res) => {
        console.log('data', data);
        if(data.hasOwnProperty('failed')) {
            console.log('FAILED', data);
            this.setState({loginError: true, loginButtonText: 'Login'});
        }else {
            navigate('Feed')
        }

    })
  }

  handleInputChange = (field, value) => {
    this.setState({
      ...this.state,
      emailHasError: false,
      passwordHasError: false,
      [field] : value
    })
  }

  changeLoginButtonText = () => {
    this.setState({
      loginButtonText: 'Loading ...'
    });
  }

  getTextInputStyle = (isNotValid) => {
    return {
      color: isNotValid ? 'red' : 'black'
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const { handleSubmitForm, handleInputChange } = this
    return  (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableOpacity style={styles.labelButton} onPress={() => navigate('Logout')}>
          <Text style={styles.labels}>
            <Text style={styles.labelText}>Logout Test</Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Image style={styles.logo} source={require('../../components/images/login.png')} />
        </View>
        <View style={styles.containerInputs}>
          <View>
          <TextInput
            style = {[styles.input, this.getTextInputStyle(this.state.emailHasError)]}
             autoCapitalize="none"
             onSubmitEditing={() => this.passwordInput.focus()}
             onChangeText={value => handleInputChange('email', value)}
             autoCorrect={false}
             keyboardType='email-address'
             returnKeyType="next"
             placeholder='Email'
             underlineColorAndroid='#3892E9'
             placeholderTextColor={this.state.emailHasError ? 'red' : '#000'}
             />
            {this.renderEmailErrorText()}
         </View>
         <View>
          <TextInput
            style={[styles.input, this.getTextInputStyle(this.state.passwordHasError)]}
            onChangeText={value => handleInputChange('password', value)}
            returnKeyType="go"
            ref={(input)=> this.passwordInput = input}
            placeholder='Password'
            underlineColorAndroid='#3892E9'
            placeholderTextColor={this.state.passwordHasError ? 'red' : '#000'}
            secureTextEntry />
            {this.renderPasswordErrorText()}
            {this.renderLoginErrorText()}
          </View>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.handleSubmitForm()} >
            <Text
             style={styles.buttonText}
             onPress={() => this.handleSubmitForm()}>{ this.state.loginButtonText }</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.labelButton} onPress={() => navigate('Register')}>
            <Text style={styles.labels}>
              <Text style={styles.labelText}>Do not have an account?</Text><Text style={styles.labelBoldText}> Register now</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.labelButton} onPress={() => navigate('ForgotPassword')}>
            <Text style={styles.labels}>
              <Text style={styles.labelText}>I forgot</Text><Text style={styles.labelBoldText}> my password</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  renderEmailErrorText() {
    if (this.state.emailHasError) {
      return <Text style={styles.errorText}>{`This email is invalid`}</Text>
    }
  }
  renderPasswordErrorText() {
    if (this.state.passwordHasError) {
      return <Text style={styles.errorText}>{`Password is incorrect`}</Text>
    }
  }

  renderLoginErrorText() {
    if (this.state.loginError) {
        return <Text style={styles.errorText}>{`Password or Email is incorrect`}</Text>
      }
  }

}

const styles = StyleSheet.create({
  buttonView: {
   padding: 20
  },
  container: {
      flex: 1,
      backgroundColor: '#FFF'
  },
  containerInputs: {
   padding: 20
  },
  input:{
      height: 40,
      backgroundColor: '#fff',
      marginBottom: 10,
      padding: 10,
  },
  loginContainer:{
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
  },
  logo: {
      position: 'absolute',
      width: '100%',
      height: '100%'
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
  errorText: {
    color: 'red',
    fontSize: 12,
    paddingLeft: 10
  }
});
