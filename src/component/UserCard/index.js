'use client'
import './style.scss'
import { useRouter } from 'next/navigation'

export const userCard = ({ pessoaFisica, onDelete }) => {
    const { nome, sobrenome, cpf, rg, email,enderecos, contatos } = pessoaFisica;
    const router = useRouter();

    const handleExcluirClick = () => {
      onDelete(pessoaFisica);
    };
    const handleEditarClick = () => {
      router.push(`/user/${pessoaFisica.cpf}`)
    };

    return (
      <div className='userCard'>
        <div className='userCard-center'>
          <h3>Nome: {nome} {sobrenome}</h3>
          <h3>E-mail: {email}</h3>
          <h3>CPF: {cpf}</h3>
          <h3>RG: {rg}</h3>
          
        </div>
        <div className='userCard-center'>
          <h3>Contato</h3>
          {contatos.map((contato, index) => (
            <h3 key={index}>{contato.tipo}: {contato.contato} - {contato.nome}</h3>  
          ))}
        </div>
        <div className='userCard-center'>
          <h3>Endereço</h3>
          {enderecos.map((endereco, index) => (
            <h3 key={index}>{endereco.logradouro}, n° {endereco.numero} {endereco.complemento}. {endereco.cidade}-{endereco.estado}</h3>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button className='userCard-editar' onClick={handleEditarClick} >Editar</button>
          <button className='userCard-excluir' onClick={handleExcluirClick}>Excluir</button>
        </div>
      </div>
    )
}

export default userCard;