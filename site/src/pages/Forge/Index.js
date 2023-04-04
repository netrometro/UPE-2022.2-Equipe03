import './Style.css';
import Navbar from '../Components/Navbar';
import { Formik,  Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import React from 'react'
import PinpointsColumn from '../Components/PinPoints';
import { useState, useEffect } from 'react';
export function Forge(){
  const userId = parseInt(localStorage.getItem('userId'));
  console.log(userId)
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:3030/usuario/'+ userId + '/money')
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, [userId]);

    return(
        <div className='container2'>
          <Navbar />
          {user && <p className='gatoedas'>Gatoedas: {user.money}</p>}
          <div className='container1'>
          <PinpointsColumn/>
            <Formik
      initialValues={{ name: '', image: '', type: '', description: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
        image: Yup.string().required('Required'),
        type: Yup.string().oneOf(['Common', 'Rare','Epic', 'Legendary'], 'Invalid Type').required('Required'),
        description: Yup.string().required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {

        let price;
        if (values.type === 'Common') {
          price = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        } else if (values.type === 'Rare') {
          price = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
        } else if (values.type === 'Epic'){
          price = Math.floor(Math.random()*(100- 50 + 1)) + 100;
        } 
        else if (values.type === 'Legendary') {
          price = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
        }
        

        axios.post("http://localhost:3030/gaturinha/"+userId, {
          name: values.name,
          image: values.image,
          price: price,
          type: values.type,
          desc: values.description
        })
          .then(response => {
            console.log(response.data)
            if(response.data === false){
              alert("Você não tem dinheiro suficiente para criar uma gaturinha")
            }else{
              alert("Você criou sua figurinha")
            }
            
   
            setSubmitting(false);
          })
          .catch(error => {
            console.log(error);

            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" placeHolder="Gato Exemplo"/>
          <ErrorMessage
                  component="span"
                  name="name"
                  className="form-error"
                  />

          <label htmlFor="image">Image</label>
          <Field type="text" id="image" name="image" placeHolder="Link da imagem"/>
          <ErrorMessage
                  component="span"
                  name="image"
                  className="form-error"
                  />

         <label htmlFor='type'>Type</label>
              <Field
                as='select'
                id='type'
                name='type'
              
              >
                <option value=''>Select Type</option>
                <option value='Common'>Common</option>
                <option value='Rare'>Rare</option>
                <option value='Epic'>Epic</option>
                <option value='Legendary'>Legendary</option>
              </Field>
              <ErrorMessage
                component='span'
                name='type'
                className='form-error'
              />

          <label htmlFor="description">Description</label>
          <Field as="textarea" id="description" name="description" placeHolder="Digite a descrição do seu gato"/>
          <ErrorMessage
                  component="span"
                  name="description"
                  className="form-error"
                  />

          <button type="submit" disabled={isSubmitting}>Forge</button>
        </Form>
      )}
    </Formik>
    </div>
        </div>
    )
}

export default Forge;