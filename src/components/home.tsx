import { Link, useNavigate, Outlet } from 'react-router-dom'
import './App.css';
import './home.css';
import logo from '../images/blog-icon.png'
import ContactService,{Contact} from '../services/contact.service'
import React from 'react';

const Header:React.FC=()=> {
    return (<>
        <>
            <h1 className='heading'>Address Book</h1>
            <nav>
                <ul className="navbar">
                    <li><Link to='/'>HOME</Link></li>
                    <li><Link to='home/Add' id="+Add" >+ADD</Link></li>
                </ul>
                <img id="blog" src={logo} alt="blog icon" />
            </nav>
            <div>

            </div>
        </>

    </>)
}
const Contacts:React.FC=()=> {
    const navigate = useNavigate()
    const contact = new ContactService()
    let contactlist = contact.get();
    const displayContact = (id:number) => {
        navigate(`/home/details/${id}`)
    }


    return (<>
        {contactlist.map((p:Contact) =>
            <div className='contactlistdiv ' onClick={() => {p.id && displayContact(p.id) }
            }>

                <p >{p.name}</p>
                <p>{p.email}</p>

                <p>{p.mobile}</p>

            </div>

        )
        }

    </>)

}


const Home:React.FC=()=> {


    return (<>
        <Header />
        <div className='column grid-2-col'>
            <section className="section1">
                <p id="contacts"><b>CONTACTS</b></p>
                <div className='contaclist' >
                    <Contacts/>
                </div>
            </section>

            <section className="section3">
                <Outlet />
            </section>
        </div>

    </>
    )

}
export default Home;