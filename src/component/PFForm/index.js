'use client'
import { useState  } from 'react'
import { useRouter } from 'next/navigation'
import AdressForm from "@/component/AdressForm";
import ContactForm from "@/component/ContactForm";
import './style.scss'

export const PFForm = () => {
    const router = useRouter();
    const [ namePf, setNamePf ] = useState();
    const [ surname, setSurname ] = useState();
    const [ date, setDate ] = useState();
    const [ email, setEmail ] = useState();
    const [ cpf, setCpf ] = useState();
    const [ rg, setRg ] = useState();
    const [ adresses, setAdresses ] = useState([]);
    const [ contacts, setContacts ] = useState([]);

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
        if (name === 'cpf') setCpf(value)
        if (name === 'rg') setRg(value)
    }
    const onSubmit = (event) => {
        event.preventDefault()

        if(!namePf || !surname || !email || !date || !cpf || !rg ||
            adresses[0].logradouro == '' || adresses[0].numero == '' || adresses[0].cep == '' || adresses[0].cidade == '' || adresses[0].estado == '' ||
            contacts[0].nome == [] || adresses[0].contato == '' || adresses[0].tipo == ''
            ){
            alert('Preencha todos os campos!');
            return;
        }
        const arrayPF = JSON.parse(localStorage.getItem('pessoasFisicas')) || [];
        const newPF = {
            nome: namePf,
            sobrenome: surname,
            dataNascimento: date,
            email: email,
            cpf: cpf,
            rg: rg,
            enderecos: adresses,
            contatos: contacts
        }
        const cpfExists = arrayPF.some(pf => pf.cpf === newPF.cpf);
        if(cpfExists){
            alert('Esse CPF já esta cadastrado!!')
            return;
        }
        const rgExists = arrayPF.some(pf => pf.rg === newPF.rg);
        if(rgExists){
            alert('Esse RG já esta cadastrado!!')
            return;
        }
        arrayPF.push(newPF);
        alert('Cadastro de Pessoa Física realizado com sucesso!')
        localStorage.setItem('pessoasFisicas', JSON.stringify(arrayPF));
        localStorage.setItem('token', 'token');
        router.push('/users');
    }

    return (
        <div className='registerPF'>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 70px 40px 40px' }}>
                <h1 className='registerPF-title'>Cadastro de Usuário</h1>
                <div style={{ display: 'flex', flexDirection:'rown' }}>
                    <div className='registerPF-marginRight'>
                        <label className='registerPF-label'>Nome</label><br/>
                        <input className='registerPF-input' id='name' name='name' type='text' placeholder='Seu Nome' onChange={onChangeValue}/>
                    </div>
                    <div className='registerPF-marginRight'>
                        <label className='registerPF-label'>Sobrenome</label><br/>
                        <input className='registerPF-input' id='surname' name='surname' type='text' placeholder='Seu Sobrenome' onChange={onChangeValue}/>
                    </div>
                    <div>
                        <label className='registerPF-label'>Data de Nascimento</label><br/>
                        <input className='registerPF-input' id='date' name='date' type='date' onChange={onChangeValue}/>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection:'rown', marginTop: '15px' }}>
                    <div className='registerPF-marginRight'>
                        <label className='registerPF-label'>Email</label><br/>
                        <input className='registerPF-input' id='email' name='email' type='text' placeholder='email@email.com' onChange={onChangeValue}/>
                    </div>
                    <div className='registerPF-marginRight'>
                        <label className='registerPF-label'>CPF</label><br/>
                        <input className='registerPF-input' id='cpf' name='cpf' type='number' placeholder='999.999.999-99' onChange={onChangeValue}/>
                    </div>
                    <div>
                        <label className='registerPF-label'>RG</label><br/>
                        <input className='registerPF-input' id='rg' name='rg' type='number' placeholder='999.999.99-9' onChange={onChangeValue}/>
                    </div>
                </div>
                <div className='registerPF-underline'></div>

                <h1 className='registerPF-title'>Endereços</h1>
                <AdressForm onAddAddress={handleAddAddress}/>
                <h1 className='registerPF-title'>Contatos</h1>
                <ContactForm onAddContacts={handleAddContacts}/>

                <button onClick={onSubmit} className='registerPF-btn'>Cadastrar</button>
                <div>
                    <a className='registerPF-back' href='/users'>Voltar</a>
                </div>
            </div>  
        </div>
    )
}

export default PFForm;