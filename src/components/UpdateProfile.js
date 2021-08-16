import React, {useRef, useState} from 'react'
import { Form, Button,Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword, updateDisplayName } = useAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const firstNameRef = useRef();
    const lastNameRef = useRef();

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match!")
        }

        const promises = []
        setError("")
        setLoading(true)
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        if (currentUser.displayName){
            if (firstNameRef.current.value !== currentUser.displayName.split(" ")[0] || lastNameRef.current.value !== currentUser.displayName.split(" ")[1]){
                promises.push(updateDisplayName(firstNameRef.current.value.trim(), lastNameRef.current.value.trim()))
            }
        }else {
            if (firstNameRef.current.value && lastNameRef.current.value){
                promises.push(updateDisplayName(firstNameRef.current.value.trim(), lastNameRef.current.value.trim()))
            }
        }
        

        Promise.all(promises).then(() => {
            history.push("/")
        }).catch(() => {
            setError("Failed to update account")
        }).finally(()=> {
            setLoading(false)
        })
        
    }
    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required 
                            defaultValue={currentUser.email}/>
                        </Form.Group>
                        <Form.Group id="first-name">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" ref={firstNameRef} required
                            defaultValue={currentUser.displayName.split(" ")[0]} />
                        </Form.Group>
                        <Form.Group id="last-name">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" ref={lastNameRef} required
                            defaultValue={currentUser.displayName.split(" ")[1]} />
                        </Form.Group>
                        {/* <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef}
                            placeholder="Leave blank to keep the same"/>
                
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef}
                            placeholder="Leave blank to keep the same"/>
                        </Form.Group> */}
                        <Button  disabled={loading} className="w-100 mt-4" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
            <Link to="/" >Cancel</Link>
            </div>
        </div>
    )
}

