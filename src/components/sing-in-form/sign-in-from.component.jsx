import { useState } from 'react';
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      clearFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password': {
          alert('Incorrect password provided.');
          break;
        }
        case 'auth/user-not-found': {
          alert('Incorrect email or password.');
          break;
        }
        default: {
          console.log(error.message)
        }
      }
    }
  }

  const clearFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label='Password'
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className='buttons-container'>
          <Button type="submit">
            Sign In
          </Button>
          <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>
            Google sign in
          </Button>
        </div>
      </form >
    </div >
  );
}

export default SignInForm;