import React from 'react';
import {Field, reduxForm} from 'redux-form';

const renderError = ({error, touched}) =>{
  if(touched && error){
    return (<div className="ui error message">
      <div className="header">{error}</div>
    </div>)
  }
  return null
}
const renderInput = ({input, label, meta}) =>{ 
  return (
  <div className={`field ${meta.error && meta.touched ? 'error': ''}`}>
    <label> {label}</label>
    <input {...input} autoComplete="off"/>
    {renderError(meta)}
  </div>
  )
}


const validate = formValues =>{
  const errors = {}
  if(!formValues.title){
    errors.title = 'You must enter a title'
  }
  if(!formValues.description){
    errors.description = 'You must enter a description'
  }
  return errors
}
const StreamForm = (props) =>{
  
  return (
  <form className="ui form error" onSubmit={props.handleSubmit(props.onSubmit)}>
    <Field name="title" component={renderInput} label="Enter Title"/>
    <Field name="description" component={renderInput} label="Enter Description"/>
    <button className="ui button grey">Submit</button>
  </form>
  )

 
}

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm)

