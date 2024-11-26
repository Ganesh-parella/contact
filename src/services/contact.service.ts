export interface Contact {
    id?: number,
    name: string,
    email: string,
    mobile: string,
    landline: string,
    website: string,
    address: string
}
var contacts: Contact[] = [
    {
        id: 1,
        name: 'ganesh',
        email: "ganeshparella123@gmail.com",
        mobile: '9515997668',
        landline: '9640257816',
        website: 'www.xyz.com',
        address: '1-102 main road'

    }];
export default class ContactService {
    localStorageKey:string = "contactService";

    constructor() {

    }

    get():Contact[] {
        const _contact = localStorage.getItem(this.localStorageKey);
        if (_contact) {
            return JSON.parse(_contact)
        }
        else {
            localStorage.setItem(this.localStorageKey, JSON.stringify(contacts))
            return contacts;
        }
    }

    getId(id:number):Contact{
        const contacts = this.get();
       let contact= contacts.find((ele) => ele.id == id)
        return contact as Contact;
    
    }

    add(contact:Contact) :Contact[]{
        let contacts = this.get();
        contact.id = Math.random() * 100;
        contacts.push(contact);
        localStorage.setItem(this.localStorageKey, JSON.stringify(contacts))
        return contacts
    }
    update(contact:Contact):boolean {
        let contacts = this.get();
        const element = contacts.find((ele) => ele.id == contact.id)
        contacts = contacts.map((ele) => {
            if (ele == element)
                return contact;
            else
                return ele;
        })
        localStorage.setItem(this.localStorageKey, JSON.stringify(contacts))
        return true;
    }
    delete(id:number) :boolean{
        let contacts = this.get();
        const element = contacts.find((ele) => ele.id == id)
        contacts = contacts.filter((e) => e != element)
        localStorage.setItem(this.localStorageKey, JSON.stringify(contacts))
        return true;
    }


}