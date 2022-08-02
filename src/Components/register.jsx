import React, { useState, useEffect, createRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addUserAction } from '../Store/actions/user'

const DEFAULT_VALUE = {
    id: '',
    username: '',
    fullname: '',
    email: '',
    password: '',
    phonenumber: '',
    type: 'Client',
}

export default function Register() {
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userReducer)

    const [values, setValues] = useState(DEFAULT_VALUE)
    const [errors, setErrors] = useState(DEFAULT_VALUE)

    const formRef = createRef(null)

    useEffect(() => {
        if (userState.selectedUser) {
            setValues(userState.selectedUser)
        }
    }, [userState.selectedUser])

    const handleChange = (event) => {
        const { value, name } = event.target

        setValues({ ...values, [name]: value })
    }

    const handleBlur = (event) => {
        let message = ''
        const {
            name,
            title,
            maxLength,
            minLength,
            validity: { patternMismatch, tooLong, tooShort, valueMissing },
        } = event.target

        if (valueMissing) {
            message = `Vui lòng nhập ${title}`
        }

        if (tooLong || tooShort) {
            message = `Vui lòng nhập từ ${minLength} đến ${maxLength} ký tự`
        }

        if (patternMismatch) {
            message = 'Vui lòng nhập đúng định dạng email'
        }

        setErrors({ ...errors, [name]: message })

        console.log(formRef.current?.checkValidity())
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!event.target.checkValidity()) {
            return
        }

        dispatch(addUserAction(values))

        setValues(DEFAULT_VALUE)
    }

    const { username, fullname, email, password, phonenumber, type } = values || {}

    return (
        <div className="card p-0">
            <div className="card-header bg-warning text-white font-weight-bold">REGISTER FORM</div>
            <div className="card-body">
                <form ref={formRef} noValidate onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    title="Username"
                                    onBlur={handleBlur}
                                    required
                                    minLength={4}
                                    maxLength={20}
                                    value={username}
                                    name="username"
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                />
                                {errors.username && (
                                    <p className="text-danger">{errors.username}</p>
                                )}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    title="Full Name"
                                    onBlur={handleBlur}
                                    required
                                    minLength={6}
                                    maxLength={20}
                                    value={fullname}
                                    name="fullname"
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                />
                                {errors.fullname && (
                                    <p className="text-danger">{errors.fullname}</p>
                                )}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    title="Password"
                                    minLength={4}
                                    maxLength={20}
                                    onBlur={handleBlur}
                                    required
                                    value={password}
                                    name="password"
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                />
                                {errors.password && (
                                    <p className="text-danger">{errors.password}</p>
                                )}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    title="Phone Number"
                                    onBlur={handleBlur}
                                    required
                                    value={phonenumber}
                                    name="phonenumber"
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                />
                                {errors.phonenumber && (
                                    <p className="text-danger">{errors.phonenumber}</p>
                                )}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    title="Email"
                                    pattern="^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$"
                                    onBlur={handleBlur}
                                    required
                                    value={email}
                                    name="email"
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                />{' '}
                                {errors.email && <p className="text-danger">{errors.email}</p>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Type</label>
                                <select
                                    onBlur={handleBlur}
                                    required
                                    value={type}
                                    name="type"
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option>Client</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button
                        disabled={!formRef.current?.checkValidity()}
                        type="submit"
                        className="btn btn-warning mr-2"
                    >
                        SAVE
                    </button>
                    <button type="reset" className="btn btn-outline-dark">
                        RESET
                    </button>
                </form>
            </div>
        </div>
    )
}
