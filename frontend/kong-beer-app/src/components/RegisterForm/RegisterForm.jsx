import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../Button/Button'
import './RegisterForm.css';


const RegisterForm = () => {

    const { setAuth } = useContext(AuthContext); 
    const navigate = useNavigate();

    return (
        <div className='form-container'>


            <Formik initialValues = {{
                fname:'',
                lname:'',
                email:'',
                password:'',
                avatar:'',
                role:'user_role',
                }}
                validationSchema={Yup.object({
                    fname: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                    lname: Yup.string()
                    .max(20,'Must be 20 characters or less')
                    .required('Required'),
                    email: Yup.string()
                    .required('Required'),
                    password: Yup.string().required('Required')
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'),

                })}
                onSubmit={(values, {setSubmitting})=>{
                    setSubmitting(false); // para que no se envie el formulario mas de una vez
                    fetch('http://localhost:3000/api/v1/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    }).then((response) => response.json()) // convierte la respuesta en un objeto
                    .then((data) => { // data es el objeto json convertido que devuelve la promesa anterior
                        console.log( 'Datos devueltos del backend: ', data );
                        if(data.ok){
                            setAuth( prev => ({...prev, isAuth: true }) ); // actualiza el contexto
                            navigate('/'); // navega a la pagina de inicio
                        }else{
                            alert('Error al iniciar sesion');
                        }


                    }).catch((error) => {
                        console.log( 'Error al conectarse con el backend: ', error );
                    });
                
                }}>

                <Form className='form'>
                    <div className='form-group'>
                        <label htmlFor= 'fname'>Name</label>
                        <Field className="form-group_controls" name='fname' type='text'/>
                        <div className="form-group__error">
                            <ErrorMessage name='fname'/>   
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor= 'lname'>Last Name</label>
                        <Field className="form-group_controls" name='lname' type='text'/>
                        <div className="form-group__error">
                            <ErrorMessage name='lname'/>   
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor= 'email'>Email</label>
                        <Field className="form-group_controls" name='email' type='text'/>
                        <div className="form-group__error">
                            <ErrorMessage name='email'/>   
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <Field className="form-group_controls" name='password' type='text'/>
                        <div className="form-group__error">
                            <ErrorMessage name='password'/>  
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='avatar'>Avatar</label>
                        <Field className="form-group_controls" name='avatar' type='file'/>
                        <div className="form-group__error">
                            <ErrorMessage name='avatar'/>  
                        </div>
                    </div>

                    <Button title={'Create account'} color={'primary'} type={'submit'} handleClick={()=>{console.log('click')}}/>

                    <hr className='divider' />
                    <Link to="/auth/login"> Register </Link>
                </Form>

            
            </Formik>
        
        
        </div>
    )
}

export default RegisterForm