'use client'
import { useState  } from 'react'
import AdressFormUpdate from "@/component/AdressFormUpdate";
import ContactFormUpdate from "@/component/ContactFormUpdate";
import './style.scss'

export const PFFormAtt = ({ cpf }) => {
    const [ namePf, setNamePf ] = useState();
    const [ surname, setSurname ] = useState();
    const [ date, setDate ] = useState();
    const [ email, setEmail ] = useState();
    const [ cpfForm, setCpfForm ] = useState();
    const [ rg, setRg ] = useState();
    const [ adresses, setAdresses ] = useState([]);
    const [ contacts, setContacts ] = useState([]);

    useState(() => {
        if (typeof window !== 'undefined') {
            const dadosLocalStorage = localStorage.getItem('pessoasFisicas');
            const arrayPF = dadosLocalStorage ? JSON.parse(dadosLocalStorage) : [];
            const pessoaFisicaBD = arrayPF.find((pf) => pf.cpf === cpf);
            setNamePf(pessoaFisicaBD.nome)
            setSurname(pessoaFisicaBD.sobrenome)
            setDate(pessoaFisicaBD.dataNascimento)
            setEmail(pessoaFisicaBD.email)
            setCpfForm(pessoaFisicaBD.cpf)
            setRg(pessoaFisicaBD.rg)
            setAdresses(pessoaFisicaBD.enderecos)
            setContacts(pessoaFisicaBD.contatos)
          } else {
          }
    },[])

    const handleAddAddress = (newAddress) => {
        setAdresses(newAddress);
      };
    const handleAddContacts = (newContacts) => {
        setContacts(newContacts);
      };
    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'name') setNamePf(value)
        if (name === 'surname') setSurname(value)
        if (name === 'date') setDate(value)
        if (name === 'email') setEmail(value)
        if (name === 'cpf') setCpfForm(value)
        if (name === 'rg') setRg(value)
    }
    const onSubmit = (event) => {
        event.preventDefault()
        if(!namePf || !surname || !email || !date || !cpfForm || !rg || adresses.length === 0){
            alert('Preencha todos os campos!');
            return;
        }
        const arrayPF = JSON.parse(localStorage.getItem('pessoasFisicas')) || [];
        const updatePF = {
            nome: namePf,
            sobrenome: surname,
            dataNascimento: date,
            email: email,
            cpf: cpfForm,
            rg: rg,
            enderecos: adresses,
            contatos: contacts
        }
        const indexToUpdate = arrayPF.findIndex((pf) => pf.cpf === cpf);
        if(indexToUpdate !== -1) {
            arrayPF[indexToUpdate] = updatePF;
        }else{
            arrayPF.push(newPF);
        }
        localStorage.setItem('pessoasFisicas', JSON.stringify(arrayPF));
        alert('Pessoa Fisica alterada com sucesso!')
        window.location.href = '/users'
    }

    return (
        <div className='registerPF'>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '40px 70px 40px 40px' }}>
                <h1 className='registerPF-title'>Cadastro de Usuário</h1>
                <div style={{ display: 'flex', flexDirection:'rown' }}>
                    <div className='registerPF-marginRight'>
                        <label className='registerPF-label'>Nome</label><br/>
                        <input className='registerPF-input' value={namePf} id='name' name='name' type='text' placeholder='Seu Nome' onChange={onChangeValue}/>
                    </div>
                    <div className='registerPF-marginRight'>
                        <label className='registerPF-label'>Sobrenome</label><br/>
                        <input className='registerPF-input' value={surname} id='surname' name='surname' type='text' placeholder='Seu Sobrenome' onChange={onChangeValue}/>
                    </div>
                    <div>
                        <label className='registerPF-label'>Data de Nascimento</label><br/>
                        <input className='registerPF-input' value={date} id='date' name='date' type='date' onChange={onChangeValue}/>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection:'rown', marginTop: '15px' }}>
                    <div className='registerPF-marginRight'>
                        <label className='registerPF-label'>Email</label><br/>
                        <input className='registerPF-input' value={email} id='email' name='email' type='text' placeholder='email@email.com' onChange={onChangeValue}/>
                    </div>
                    <div className='registerPF-marginRight'>
                        <label className='registerPF-label'>CPF</label><br/>
                        <input className='registerPF-input' value={cpf} id='cpf' name='cpf' type='number' placeholder='999.999.999-99' onChange={onChangeValue}/>
                    </div>
                    <div>
                        <label className='registerPF-label'>RG</label><br/>
                        <input className='registerPF-input' value={rg} id='rg' name='rg' type='number' placeholder='999.999.99-9' onChange={onChangeValue}/>
                    </div>
                </div>
                <div className='registerPF-underline'></div>
                <h1 className='registerPF-title'>Endereços</h1>
                <AdressFormUpdate onAddAddress={handleAddAddress} addressesList={adresses}/>
                <h1 className='registerPF-title'>Contatos</h1>
                <ContactFormUpdate onAddContacts={handleAddContacts} contactArray={contacts}/>

                <button onClick={onSubmit} className='registerPF-btn'>Cadastrar</button>
                <div>
                    <a className='registerPF-back' href='/users'>Voltar</a>
                </div>
            </div>  
        </div>
    )
}

export default PFFormAtt;