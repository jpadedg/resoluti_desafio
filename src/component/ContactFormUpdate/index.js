import { useEffect, useState } from 'react';
import './style.scss'

const ContactForm = ({ onAddContacts, contactArray }) => {
  const typeContact = [
    { nome: 'Email' },
    { nome: 'Telefone' },
  ];
  let [contacts, setContacts] = useState([
    {
      nome: '',
      contato: '',
      tipo: '',
    },
  ]);
  useEffect(() => {
    setContacts(contactArray)
  }, [])
  const handleInputChange = (index, name, value) => {
    const newContacts = [...contacts];
    newContacts[index] = { ...newContacts[index], [name]: value };
    setContacts(newContacts);
  }
  const handleAddContacts = () => {
      setContacts([...contacts, { nome: '', contato: '', tipo: '' }])
  };
  const handleChange = (e, index, name) => {
    handleInputChange(index, name, e.target.value || '');
  };
  const handleRemoveContact = (index) => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };
  useEffect(() => {
    onAddContacts([...contacts]);
  }, [contacts])
  const renderAddressForms = () => {
    return contacts.map((contact, index) => (
      <div key={index} className='contactForm'>
        <div style={{ display: 'flex', flexDirection:'row' }}>
          <div className='contactForm-marginRight'>
            <label className='contactForm-label'>Nome</label><br/>
            <input className='contactForm-input' value={contacts[index].nome} type='text' placeholder='Nome contato' onChange={(e) => handleChange(e, index, 'nome')}/>
          </div>
          <div className='contactForm-marginRight'>
            <label className='contactForm-label'>Contato</label><br/>
              <input className='contactForm-input' value={contacts[index].contato} type='text' placeholder='Email/Telefone'  onChange={(e) => handleChange(e, index, 'contato')}/>
          </div>
          <div>
            <label className='contactForm-label'>Tipo contato</label><br/>
            <select className='contactForm-select' value={contacts[index].tipo} onChange={(e) => handleInputChange(index, 'tipo', e.target.value)} >
              <option value=''>Selecione o tipo</option>
                {typeContact.map((tipo) => (
                  <option key={tipo.nome} value={tipo.nome}>
                    {tipo.nome}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <button className='contactForm-buttons-remove' onClick={() => handleRemoveContact(index)}>Remover Contato</button>
        </div>
      </div>
    ));
  };

  return (
    <div className='contactForm'>
      {renderAddressForms()}
      <div className='contactForm-buttons'>
        <button className='contactForm-buttons-add' onClick={handleAddContacts}>Adicionar Novo Contato</button>
      </div>
      <div className='contactForm-underline'></div>
    </div>
  );
};

export default ContactForm;