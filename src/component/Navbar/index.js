'use client'
import './style.scss'
import { useRouter } from 'next/navigation'

export const UserSection = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
      };
    const handleHome = () => {
        router.push('/users');
      };

    return (
        <div className='navbar'>
            <div>
                <img onClick={handleHome} className='navbar__img' src='/logo.png' alt='logo'/>
            </div>
            <div style={{ width: '100px' }}>
                <button onClick={handleLogout} className='navbar__btn'>Sair</button>
            </div>
        </div>
    )
}

export default UserSection;