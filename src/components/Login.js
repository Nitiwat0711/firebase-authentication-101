import React, {useRef, useState} from 'react'
import { Form, Button,Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login, loginWithgoogle, loginWithMicrosoft} = useAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value) 
            history.push("/")
        } catch {
            setError('Failed to Login')
        }
        setLoading(false)
        
    }

    async function handleLoginWithGoogle(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await loginWithgoogle()
            history.push("/")
        } catch {
            setError('Failed to Login with google')
        }
        setLoading(false)
    }

    async function handleLoginWithMicrosoft(e){
        e.preventDefault()
        try {
            setError("");
            setLoading(true)
            await loginWithMicrosoft()
            history.push("/")
        }catch {
            setError('Failed to Login with microsoft')
        }
        setLoading(false)
    }
    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button  disabled={loading} className="w-100 mt-4" type="submit">Log In</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <p>Need an account? <Link to="/signup">Sign Up</Link></p>
            </div>
            <div className="w-100 text-center mt-2">
                <p><Button  variant="outline-secondary" onClick={handleLoginWithGoogle}>
                    <i className="fab fa-google"></i> Continue with Google</Button></p>
                <p><Button variant="outline-secondary" onClick={handleLoginWithMicrosoft}>
                    <i className="fab fa-microsoft"></i> Continue with Microsoft
                </Button></p>
            </div>
        </div>
    )
}

