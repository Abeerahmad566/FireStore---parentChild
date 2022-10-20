import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { auth } from '../utils/firebase-config';
import Cookie from 'js-cookie';
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('abeerahmad389@gmail.com');
  const [password, setPassword] = useState('1234567');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onSubmit = async () => {
    if (email === '') {
      setEmailError('Please Enter Email');
    }
    if (password === '') {
      setPasswordError(true);
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          Cookie.set('token', response.user.accessToken);
          router.push('/employeeform');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handlePasswordValidation = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (password) {
      setPasswordError(false);
    }
  };
  const handleEmailValidation = (e) => {
    const Email = e.target.value;
    setEmail(Email);
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!Email.match(validRegex)) {
      setEmailError('Please Enter Valid Email Address');
    } else {
      setEmailError('');
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={6}>
          <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000" />
        </Col>

        <Col lg={6}>
          <h1>Login</h1>
          <div className="input-fields-wrapper">
            <label>Email</label>
            <input
              placeholder="Enter Email"
              type="email"
              value={email}
              onChange={(e) => handleEmailValidation(e)}
            />
            {emailError && <p>{emailError}</p>}
            <label>Password</label>
            <input
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => handlePasswordValidation(e)}
            />
            {passwordError ? <p>Please Enter Password</p> : null}
            <button className="login-btn" onClick={onSubmit}>
              Login
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
