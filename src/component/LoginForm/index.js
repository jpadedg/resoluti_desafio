'use client'
import { useState  } from 'react'
//import  axios  from 'axios'
import { useRouter } from 'next/navigation'
import bcrypt from 'bcryptjs'
import './style.scss'

export const LoginForm = () => {
    const router = useRouter();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
      };
    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'email') setEmail(value)
        if (name === 'password') setPassword(value)
    }
    const onSubmit = async () => {
        if(!email || !password){
            alert('Preencha todos os campos!');
            return;
        }
        const arrayUsers = JSON.parse(localStorage.getItem('usuarios')) || [];
        const userBD = arrayUsers.find(user => user.email === email);
        if(!userBD){
            alert('Usuário ou senha incorreto!!')
            return;
        }
        const isPasswordMatch = await bcrypt.compare(password, userBD.password);
        if(isPasswordMatch===false){
            alert('Usuário ou senha incorreto!!')
            return;
        }
        alert('Login realizado com sucesso!!')
        localStorage.setItem('token', 'token')       
        router.push('/users');
    }

    return (
        <div className='login'>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '40px 70px 40px 40px' }}>
                <h1 className='login-title'>Login de Usuário</h1>
                <label className='login-label'>E-mail</label>
                <input onKeyDown={handleKeyPress} className='login-input' id='email' name='email' type='text' placeholder='Seu E-mail' onChange={onChangeValue}/>
                <label className='login-label'>Senha</label>
                <input onKeyDown={handleKeyPress} className='login-input' id='password' name='password' type='password' placeholder='*************' onChange={onChangeValue}/>
                <button onClick={onSubmit} className='login-btn'>Entrar</button>
                <div>
                    <a className='login-cadastro' href='/register'>Cadastre-se aqui</a>
                </div>
            </div>  
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img className='logo' src='logo.png' alt='logo'/>
            </div>
        </div>
    )
}

export default LoginForm;