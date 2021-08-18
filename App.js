import React        from 'react';
import { observer } from 'mobx-react';
import UserStores   from './stores/UserStores';
import LoginFrom    from './LoginFrom';
import SubmitButton from './SubmitButton';
import './App.css';

class App extends React.Component {

  async componentDidMount() {
    try {
        let res = await fetch('/isLoggedIn', {
          method: 'post',
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }
        });

        let result = await res.json();
        if (result && result.success){
          UserStores.loading = false;
          UserStores.isLoggedIn = true;
          UserStores.username = result.username;
        }
        else {
          UserStores.loading = false;
          UserStores.isLoggedIn = false;
        }
    }
  
    catch(e) {
      UserStores.loading = false;
      UserStores.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {
        let res = await fetch('/logout', {
          method: 'post',
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }
        });

        let result = await res.json();
        if (result && result.success){
          UserStores.isLoggedIn = true;
          UserStores.username = '';
        }
        else {
          UserStores.loading = false;
          UserStores.isLoggedIn = false;
        }
    }
  
    catch(e) {
        console.log(e)
    }
  }

    render() {
      if (UserStores.loading){
        return (
          <div className="app">
            <div className='container'>
              WELCOME
            </div>
          </div>
        );
      }
      else {
        if (UserStores.isLoggedIn)
        {
          return (
            <div className="app">
              <div className='container'>
                Welcome {UserStores.username}

                <SubmitButton
                    text={'Log Out'}
                    disable={false}
                    onClick={ () => this.doLogout() }
                />
              </div>
            </div>
          );
        }
          return (
            <div className="app">
              <div className='container'>
        
                <LoginFrom/>

              </div>
            </div>
          );
    } 
  }
}

export default observer(App);