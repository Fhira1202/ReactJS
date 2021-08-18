import React        from 'react';
import InputField   from './Inputfiled';
import SubmitButton from './SubmitButton';
import UserStores   from './stores/UserStores';
import Logo from './Logo.png';


class LoginFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        username : '',
        password : '',
        buttonDisable : false
    }
  }
  setInputValue(property, val) {
    val = val.trim();
    if (val.lenght > 12) {
      return;
    }
    this.setState({
       [property]: val
    })
  }

  resetFrom(){
    this.setState({
      username : '',
      password : '',
      buttonDisable : false
    })
  }
    async doLogin() {
      if(!this.state.username){
        return;
      }
      if(!this.state.password){
        return;
      }
      this.setState({
        buttonDisable: true
      })

      try{
        let res = await fetch('/login',{
          method: 'POST',
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
        });

        let result = await res.json();
        if (result && result.success){
          UserStores.isLoggedIn = true;
          UserStores.username = result.username;
        }

        else if (result && result.success === false){
          this.resetFrom();
          alert(result.msg);
        }
      }

      catch(e){
        console.log(e);
        this.resetFrom();
      }
    }
  
  render(){
      
    return (
        <div className="LoginFrom">
            <center>
               <img src={Logo} alt={"Logo"}/> <br/>
              LOGIN
            </center>

            <InputField 
              type='text'
              placeholder='Username'
              value={this.state.username ? this.state.username : ''}
              onChange={ (val) => this.setInputValue('username', val) }
            />
            <InputField 
              type='password'
              placeholder='Password'
              value={this.state.password ? this.state.password : ''}
              onChange={ (val) => this.setInputValue('password', val) }
            />

            <SubmitButton
              text='Login'
              disabled={this.state.buttonDisable}
              onClick={() => this.doLogin() }
            />
        </div>
      )
    }
}

export default LoginFrom;