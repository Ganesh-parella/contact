
import React, { useEffect, useRef, useState } from 'react';
import './Form.css';
import ContactService,{Contact} from '../services/contact.service';
import { useNavigate, useParams } from 'react-router-dom';

export const Form:React.FC = () => {
  
  const { id } = useParams< { id : any}>()
  const navigate = useNavigate()
  const contact = new ContactService()
  const intialConatct = {
    id: 0,
    name: '',
    email: '',
    mobile: '',
    landline: '',
    website:'',
    address: ''
  }
  const [formData, setformData] = useState<Contact>(intialConatct)
  const [errors, setErrors] = useState<Contact>({
    name: '',
    email: '',
    mobile: '',
    landline: '',
    address: '',
    website: ''
  });

  useEffect(() => {
    if (id) {
      const currentContact:Contact = contact.getId(id)
      setformData(currentContact)

    }
  }, [id])

  const handleSubmit = () => {


    if (id) {
      contact.update(formData)

      navigate('/')
    }
    else {
      contact.add(formData)
      navigate('/')
    }


  }

  const handleChange = (e:any) => {

    const { name, value } = e.target
    setformData({ ...formData, [name]: value })
    validateField(name, value);

  }


  const validateField = (name:string, value:string) => {
    switch (name) {
      case 'name':
        setErrors((prevErrors) => ({
          ...prevErrors, name: value.trim().length >= 3 ? '' : 'name must contain atleast three letters'
        }))
        break;
      case 'email':
        setErrors((prevErrors) => ({
          ...prevErrors, email: value.trim() ? 
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(value) ? '' : 'invalid email address'
           : 'email is required'
        }))
        break;
      case 'mobile' :
        setErrors((prevErrors) => ({
          ...prevErrors, mobile: value.trim().length ==10 ? '' : 'enter valid mobile number'
        }))
        break;
        case 'landline' :
          setErrors((prevErrors) => ({
            ...prevErrors, landline: value.trim().length ==10 ? '' : 'enter valid landline number'
          }))
          break;
          case 'website':
        setErrors((prevErrors) => ({
          ...prevErrors, website: value.trim() ? 
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(value) ? '' : 'invalid website address'
           : 'website is required'
        }))
        break; 
        case 'address':
        setErrors((prevErrors) => ({
          ...prevErrors, address: value.trim() ? '' : 'address is required'
        }))
        break;
        
    }
  }
  return (
    <form className="form " id="form" onSubmit={handleSubmit} >

      <label htmlFor="name">Name</label>

      <input type="text" name="name" id="Name" value={formData.name} onChange={handleChange} />
      {errors.name && <p className='validations'>{errors.name}</p>}
      <label htmlFor="Email"> Email</label>
      <input type="email" name="email" id="Email" value={formData.email} onChange={handleChange} />
      {errors.email && <p className='validations'>{errors.email}</p>}
      <div className="contact_number">

        <div><label htmlFor="Mobile">Mobile</label><br />
          <input type="number" name="mobile" id="Mobile" value={formData.mobile} onChange={handleChange} />
          {errors.mobile && <p id='validations'>{errors.mobile}</p>}
        </div>
        <div>
          <label htmlFor="Landline" >Landline</label><br />
          <input type="text" name="landline"  id="Landline" value={formData.landline} onChange={handleChange} />
          {errors.landline && <p id='validations'>{errors.landline}</p>}
        </div>
      </div>
      <label htmlFor="website">Website</label>
      <input type="text" name="website" id="Website" value={formData.website} onChange={handleChange} />
      {errors.website && <p className='validations'>{errors.website}</p>}
      <label htmlFor="Address">Address</label>
      <textarea rows={4} name="address" id="Address" value={formData.address} onChange={handleChange}></textarea>
      {errors.address && <p className='validations'>{errors.address}</p>}
      <br />
      <div className="buttonbox">
        <input type="reset" name="reset" id="reset" value="Reset" onClick={() => setformData(intialConatct)}></input>
        <input type="submit" disabled={Object.values(errors).some((value)=>value)} name="Add" id="Add" value={id?"Update":"Add"} ></input>
      </div>
    </form>


  )
}
export default Form;
