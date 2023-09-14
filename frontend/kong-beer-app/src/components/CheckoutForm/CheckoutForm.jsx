import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/AuthContext'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../Button/Button'
import './CheckoutForm.css'
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

const CheckoutForm = () => {

    const [ status, setStatus ] = useState('idle') // ['idle', 'loading', 'success', 'error']
    const [data, setData] = useState(null) // almacena la respuesta del servidor
    const { cart, clearCart, total } = useContext(CartContext)
    const { auth } = useContext(AuthContext)

    const newPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('se resolvio')
        }, 3000)
    })

    const handleOnSubmit = async (values, { setSubmitting }) => {
        // Si entramos aca es porque el formulario es valido
        try {
            setStatus('loading') // Cambiamos el estado a loading para mostrar un mensaje de carga
            console.log('enviando formulario');
            // Cambiamos el estado a loading para mostrar un mensaje de carga
            await newPromise // Simulamos una peticion a un servidor
            
            const data = { // data es el cuerpo del POST que vamos a enviar
                user_id: auth.user.id,
                address: values.address,
                cart,
                total
            }

            console.log(data)

            const response = await fetch('http://localhost:3000/api/v1/order',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:  JSON.stringify(data) // body es el cuerpo del POST que vamos a enviar
            })

            console.log(response);
            if (response.ok) {
                clearCart()
                setData(response)
                setStatus('success')
            }


        } catch (error) {
            console.log(error)
            setData(error);
            setStatus('error')
        }
    }


    switch (status) {
        case 'idle':
            return (
                <div className='main-container'>
                    <Formik initialValues={{
                        fname: '',
                        lname: '',
                        address: '',
                    }}
                        validationSchema={Yup.object({
                            fname: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            lname: Yup.string()
                                .max(20, 'Must be 20 characters or less')
                                .required('Required'),
                            address: Yup.string()
                                .max(20, 'Must be 20 characters or less')
                                .required('Required'),
                        })}
                        onSubmit={handleOnSubmit}>
                        <Form className='form-container'>
                            <div className='form-group'>
                                <label htmlFor="fname">First Name</label>
                                <Field className="form-group_controls" name="fname" type="text" placeholder="First Name" />
                                <div className="form-group__error">
                                    <ErrorMessage name="fname" />
                                </div>
                            </div>
        
                            <div className='form-group'>
                                <label htmlFor="lname">Last Name</label>
                                <Field className="form-group_controls" name="lname" type="text" placeholder="Last Name" />
                                <div className="form-group__error">
                                    <ErrorMessage name="lname" />
                                </div>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="address">Address</label>
                                <Field className="form-group_controls" name="address" type="text" placeholder="Address" />
                                <div className="form-group__error">
                                    <ErrorMessage name="lname" />
                                </div>
                            </div>
                            <Button title={'Finalizar compra'} color={'primary'} type={'submit'} />
                        </Form>
                    </Formik>
                </div>
            );
        case 'loading':
            return (
            <div className='loading-container'>
                <PropagateLoader type="Oval" color="#00BFFF" height={80} width={80} />
                <p>Procesando compra...</p> 
            </div>          
            
            );

        case 'success':
            return (
                    <div className='success-container'>
                        <h1 className='processing-message'>Compra realizada con exito!</h1>
                        <Link to="/">
                            <Button title={'Volver al menu'} color={'primary'} /> 
                        </Link>
                    </div>
                ) 

        case 'error':
            return (
                <div className='error-message'>
                    <h1>Hubo un error al procesar la compra</h1>
                    <Link to="/">
                         <Button title={'Volver al menu'} color={'primary'} /> 
                    </Link>
                </div>
            )
    }

}

export default CheckoutForm