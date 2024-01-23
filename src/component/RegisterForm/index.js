'use client'
import { useState  } from 'react'
import { useRouter } from 'next/navigation'
import bcrypt from 'bcryptjs'
import './style.scss'

export const RegisterForm = () => {
    const saltRounds = 10
    const router = useRouter();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ username, setUsername ] = useState();
    const [ phone, setPhone ] = useState();

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'email') setEmail(value)
        if (name === 'password') setPassword(value)
        if (name === 'phone') setPhone(value)
        if (name === 'username') setUsername(value)
    }
    const onSubmit = async (event) => {
        event.preventDefault()

        if(!email || !password || !phone || !username ){
            alert('Preencha todos os campos!');
            return;
        }
        const senhaCrypt = await bcrypt.hash(password, saltRounds);
        const arrayUsers = JSON.parse(localStorage.getItem('usuarios')) || [];
        const newUser = {
            username: username,
            email: email,
            password: senhaCrypt,
            phone: phone
        }
        const emailExists = arrayUsers.some(user => user.email === newUser.email);
        if(emailExists){
            alert('Esse e-mail já existe!!')
            return;
        }
        arrayUsers.push(newUser);
        localStorage.setItem('usuarios', JSON.stringify(arrayUsers));
        localStorage.setItem('token', 'token')   
        router.push('/');
    }

    return (
        <div className='register'>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '40px 70px 40px 40px' }}>
                <h1 className='register-title'>Cadastro de Usuário</h1>
                <div style={{ display: 'flex', flexDirection:'rown' }}>
                    <div className='register-doubleRegister'>
                        <label className='register-label'>Username</label><br/>
                        <input className='register-input' id='username' name='username' type='text' placeholder='Seu nome de usuário' onChange={onChangeValue}/>
                    </div>
                    <div>
                        <label className='register-label'>E-mail</label><br/>
                        <input className='register-input' id='email' name='email' type='text' placeholder='Seu E-mail' onChange={onChangeValue}/>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection:'rown', marginTop: '15px' }}>
                    <div className='register-doubleRegister'>
                        <label className='register-label'>Telefone</label><br/>
                        <input className='register-input' id='phone' name='phone' type='number' placeholder='(DDD) 99999-9999' onChange={onChangeValue}/>
                    </div>
                    <div>
                        <label className='register-label'>Senha</label><br/>
                        <input className='register-input' id='password' name='password' type='password' placeholder='********' onChange={onChangeValue}/>
                    </div>
                </div>
                <button onClick={onSubmit} className='register-btn'>Cadastrar</button>
                <div>
                    <a className='register-back' href='/'>Voltar</a>
                </div>
            </div>  
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img className='logo' src='logo.png' alt='logo'/>
            </div>
        </div>
    )
}

export default RegisterForm;