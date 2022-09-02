import { Modal, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { login, clearEM } from "../../redux/features/account/accountSlice"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"

export default (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorText, setErrorText] = useState("")

    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    const dispatch = useDispatch()
    const account = useSelector((state) => state.account.account)
    const isLoading = useSelector((state) => state.account.isLoading)
    const isError = useSelector((state) => state.account.isError)
    const isSuccess = useSelector((state) => state.account.isSuccess)
    const resEM = useSelector((state) => state.account.EM)

    const sendLoginRequest = async () => {
        dispatch(clearEM())
        if (!username) {
            setUsernameError(true)
            setErrorText("Cannot be empty")
        } else {
            setUsernameError(false)
        }
        if (!password) {
            setPasswordError(true)
            setErrorText("Cannot be empty")
            return
        } else {
            setPasswordError(false)
        }
        if (username && password);
        else return

        setErrorText("")
        dispatch(login({ username, password }))
    }

    useEffect(() => {
        if (isSuccess) {
            props.onHide()
            dispatch(clearEM())
        }
    }, [isSuccess])
    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Log in</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                            type="text"
                            className={
                                usernameError
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            id="username"
                            value={username}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className={
                                passwordError
                                    ? "form-control  is-invalid"
                                    : "form-control"
                            }
                            id="password"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            value={password}
                        />
                    </div>
                    <div className="mb-3 text-danger error-text">
                        {errorText ? errorText : ""}{" "}
                    </div>
                    <div className="mb-3 text-danger">{resEM ? resEM : ""}</div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={sendLoginRequest}>
                        Log in
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
