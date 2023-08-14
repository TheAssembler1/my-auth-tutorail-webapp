import './App.css';
import { Auth, Amplify } from 'aws-amplify';

Amplify.configure({Auth: {
  region: 'us-east-1',
  userPoolId: 'us-east-1_IyKSccguL',
  userPoolWebClientId: '45goinacta98u48qst3311vnuh'
}});

async function signUp(event) {
  console.log('here');

  try {
    event.preventDefault();
    const userName = event.currentTarget.elements.usernameInput.value;
    const password = event.currentTarget.elements.passwordInput.value

      await Auth.signUp({
          username: userName,
          password: password,
      });
      // eslint-disable-next-line no-restricted-globals
      alert(`${userName} succesfully signed up`);
  } catch (error) {
      alert(error);
  }
}

async function confirmSignUp(event) {
    try {
      event.preventDefault();
      const username = event.currentTarget.elements.usernameInput.value;
      const code = event.currentTarget.elements.codeInput.value

      await Auth.confirmSignUp(username, code);

      alert(`${username} succesfully confirmed`);
    } catch (error) {
      alert(error);
    }
}

async function signIn(event) {
  try {
    event.preventDefault();
    const username = event.currentTarget.elements.usernameInput.value;
    const password = event.currentTarget.elements.passwordInput.value
    const user = await Auth.signIn(username, password);
    console.log('user: ', user);
    alert(`id_token: ${user.signInUserSession.idToken.jwtToken}`);
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

async function resendConfirmationCode(event) {
  try {
    event.preventDefault();
    const username = event.currentTarget.elements.usernameInput.value;
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
  } catch (err) {
    alert(err);
  }
}

async function forgotPassword(event) {
  try {
    event.preventDefault();
    const username = event.currentTarget.elements.usernameInput.value;
      await Auth.forgotPassword(username);
      console.log('password sent for your email');
  } catch (err) {
    alert(err);
  }
}

async function confirmationPasswordCode(event) {
  try {
    event.preventDefault();
    const username = event.currentTarget.elements.usernameInput.value;
    const code = event.currentTarget.elements.codeInput.value;
    const newPassword = event.currentTarget.elements.newPasswordInput.value;
      const result = await Auth.forgotPasswordSubmit(username, code, newPassword);
      console.log(result);
  } catch (err) {
    alert(err);
  }
}

async function signOut() {
  try {
      var result = await Auth.signOut();
      console.log(result);
  } catch (error) {
    alert(error);
  }
}

async function currentAuthenticatedUser() {
  try {
    var result = await Auth.currentAuthenticatedUser();
      console.log(result);
  } catch (error) {
    alert(error);
  }
}

function App() {
  return (
    <div className="App">
      <h2>Sign up</h2>
    <form onSubmit={signUp}>
      <div>
        <label htmlFor="usernameInput">Email:</label>
        <input id="usernameInput" type="email" />
      </div>
      <div>
        <label htmlFor="passwordInput">Password:</label>
        <input id="passwordInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
    ______________________________________________

    ______________________________________________
    <h2>Confirm sign up</h2>
    <form onSubmit={confirmSignUp}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
      </div>
      <div>
        <label htmlFor="codeInput">Code:</label>
        <input id="codeInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
    ______________________________________________

    ______________________________________________
    <h2>Resend sign up code</h2>
    <form onSubmit={resendConfirmationCode}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
    ______________________________________________

    ______________________________________________
    <h2>Sign in</h2>
    <form onSubmit={signIn}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
      </div>
      <div>
        <label htmlFor="passwordInput">Password:</label>
        <input id="passwordInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
    ______________________________________________

    ______________________________________________
    <h2>Forgot Password</h2>
    <form onSubmit={forgotPassword}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
    ______________________________________________


    ______________________________________________
    <h2>New Password</h2>
    <form onSubmit={confirmationPasswordCode}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
      </div>
      <div>
        <label htmlFor="codeInput">Code:</label>
        <input id="codeInput" type="text" />
      </div>
      <div>
        <label htmlFor="newPasswordInput">New Password:</label>
        <input id="newPasswordInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
    ______________________________________________
    <div>
      <button type="button" onClick={async () => {await signOut();}} >Sign out</button>
    </div>

    ______________________________________________
    <div>
      <button type="button" onClick={async () => {await currentAuthenticatedUser();}} >currentAuthenticatedUser</button>
    </div>
    </div>
  );
}

export default App;
