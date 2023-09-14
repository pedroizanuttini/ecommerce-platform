import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../Button/Button'
import './LoginForm.css';

const LoginForm = () => {

    const { setAuth } = useContext(AuthContext); // hook de react para acceder al contexto
    const navigate = useNavigate(); // hook de react router dom para navegar entre paginas

    return (
        <div className='form-container'>
        
            <Formik initialValues={{
                email: '',
                password:'',
            }}
                validationSchema={Yup.object({
                    email:Yup.string().required('Required'),
                    password: Yup.string().required('Required')
                })}
                onSubmit={(values, {setSubmitting})=>{
                        setSubmitting(false); // para que no se envie el formulario mas de una vez
                        fetch('http://localhost:3000/api/v1/auth/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(values)
                        }).then((response) => response.json()) // convierte la respuesta en un objeto
                        .then((data) => { // data es el objeto json convertido que devuelve la promesa anterior
                            console.log( 'Datos devueltos del backend: ', data );
                            if(data.ok){
                                setAuth( prev => ({...prev, isAuth: true , user: data.user }) ); // actualiza el contexto
                                localStorage.setItem('user', JSON.stringify(data.user)); // guarda la informacion del usuario en el local storage
                                localStorage.setItem('isAuth', JSON.stringify(true)); // guarda la informacion del logueo en el local storage
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
                        <label htmlFor= 'email'>Email</label>
                        <Field className="form-group_controls" name='email' type='text'/>
                        <div className="form-group__error">
                            <ErrorMessage name='email'/>   
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <Field className="form-group_controls" name='password' type='password'/>
                        <div className="form-group__error">
                            <ErrorMessage name='password'/>  
                        </div>
                    </div>

                    <Button title={'Sign in'} color={'primary'} type={'submit'} handleClick={()=>{console.log('click')}}/>

                    <hr className='divider' />
                    <Link to="/auth/register"> Create account </Link>
                </Form>

            </Formik>
        </div>

    )
}

export default LoginForm