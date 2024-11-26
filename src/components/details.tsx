import { useNavigate, useParams } from 'react-router-dom';
import ContactService,{Contact} from '../services/contact.service';
import delImage from '../images/delete2.png' ;
import editImage from '../images/edit1.jpg';
export const Details:React.FC=()=> {
    const { id } = useParams<{ id: any }>();
     const navigate = useNavigate();
    const contact = new ContactService();
    const currentContact:Contact = contact.getId(id);
    const editHandler = () => {
        navigate(`/home/edit/${id}`)
    }
    let deleteHandler = () => {
        contact.delete(id);
        navigate('/');
    }
    return (
        <div className="displayContainer" >
            <div>
                <h1>{currentContact.name}</h1>
                <p>Email:{currentContact.email}</p>
                <p>Mobile:{currentContact.mobile}</p>
                <p>Landline:{currentContact.landline}</p>
                <p>Website: {currentContact.website}</p>
                <p>Address:{currentContact.address}</p>
            </div>

            <div className="ed" onClick={editHandler}>
                <img src={editImage} style={{ height: '18px' }} alt="edit-icon" />
                <p id="edit" >EDIT</p>
            </div>
            <div className="ed" onClick={deleteHandler}>
                <img src={delImage} alt="delete-icon" />
                <p id="delete" >DELETE</p>
            </div>


        </div>
    )
}
