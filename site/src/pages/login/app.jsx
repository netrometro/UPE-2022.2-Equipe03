import './Style.css';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import Axios from "axios";
function Login() {

  const handleClickRegister = (values) => {
    Axios.post("http://localhost:3030/usuarios", {
      email: values.email,
      password: values.password
    }).then((response)=>{
       console.log(response);
    })};
  const handleClickLogin = (values) => console.log(values);

  const validationRegister = yup.object().shape({
    email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("Este campo é obrigatório"),

    password: yup
    .string()
    .min(8, "A senha deve ter 8 caracteres")
    .required("Este campo é obrigatório"),

    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não são iguais"),

  });

  const validationLogin = yup.object().shape({
    email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("Este campo é obrigatório"),

    password: yup
    .string()
    .min(8, "A senha deve ter 8 caracteres")
    .required("Este campo é obrigatório"),

  });

  return (
    <div className="container">
      <div className="login-logo"> <img
                    src="https://cdn.discordapp.com/attachments/440326168491720705/1080932513213579445/logo-removebg-preview.png"
                    alt = "Login App"/>
                    </div>
      <div className='loginImage'>
        <div className='loginregister'>
        <div className='login'>
        <img
         src="https://cdn.discordapp.com/attachments/440326168491720705/1080934140049891439/image.png"
         alt="gaturinhas"
           
        />
        </div>
        <div className='register'>
        <img 
        src='https://cdn.discordapp.com/attachments/440326168491720705/1081044392523083816/image.png'
        alt ="register"/>
      </div>
      </div>
        <div className='formsimagems'>
            <Formik initialValues={{}}
      onSubmit={handleClickLogin}
      validationSchema={validationLogin}>
        <Form className='login-form'>
          <div className='login-form-group'>
               <Field name ="email" className="form-field" 
               placeHolder="E-mail"/>

                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                  />
          </div>

          <div className='login-form-group'>
               <Field name ="password" className="form-field" 
               placeHolder="Senha"/>
               
                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                  />
            </div>
            <button className='button' type="submit">
              Logar
            {/* <img 
            src="https://cdn.discordapp.com/attachments/440326168491720705/1081051943813795861/image.png"
            alt="ok" /> */}

            </button>



        </Form>
      </Formik>
      
      <Formik initialValues={{}}
      onSubmit={handleClickRegister}
      validationSchema={validationRegister}>
        <Form className='login-form'>
          <div className='login-form-group'>
               <Field name ="email" className="form-field"
                placeHolder="E-mail"/>

                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                  />
          </div>

          <div className='login-form-group'>
               <Field type= "password" name ="password" className="form-field" 
               placeHolder="Crie uma senha"/>
               
                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                  />
            </div>
            <div className='login-form-group'>
               <Field type= "password"name ="confirmPassword" className="form-field" 
               placeHolder="Confirme sua senha"/>
               
                <ErrorMessage
                  component="span"
                  name="confirmPassword"
                  className="form-error"
                  />
            </div>
            <button className='button' type="submit">
              Registrar
            </button>



        </Form>
      </Formik>
      </div>
      
      </div>

    </div>
  );
}

export default Login;