'use client'
import { useRouter } from 'next/navigation';
import Navbar from "@/component/Navbar";
import UserCard from "@/component/UserCard";
import './style.scss'
import AuthChecker from '@/component/AuthChecker';
import { useEffect, useState } from 'react';

export default function Users() {
  const router = useRouter();
  const [dadosObj, setDadosObj] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const totalPF = localStorage.getItem('pessoasFisicas');
      setDadosObj(JSON.parse(totalPF) || []);
    }
  }, []); 

  const handleExcluir = (pessoaFisica) => {
    const novosDados = dadosObj.filter((pf) => pf !== pessoaFisica);
    setDadosObj(novosDados);
    alert('Pessoa Fisica excluida com sucesso!')
    localStorage.setItem('pessoasFisicas', JSON.stringify(novosDados));
  };
  const handleClick = () => {
    router.push('/user')
  };

  return (
    <div className="usersPage">
      <AuthChecker>
        <div className="usersPage-list">
          <button className="usersPage-list-btn" onClick={handleClick}>Adicionar novo</button>
          {dadosObj.map((pf, index) => (
            <UserCard key={index} pessoaFisica={pf} onDelete={handleExcluir} />
          ))}
        </div>
      </AuthChecker>
      <Navbar/>
    </div>
  );
}