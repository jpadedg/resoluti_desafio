import { useEffect, useState } from 'react';
import './style.scss'

const AddressForm = ({ onAddAddress }) => {
  const estados = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' },
  ];
  const [addresses, setAddresses] = useState([
    {
      logradouro: '',
      numero: '',
      cep: '',
      complemento: '',
      cidade: '',
      estado: '',
    },
  ]);
  useEffect(() => {
    onAddAddress([...addresses]);
  }, [addresses])
  const handleInputChange = (index, name, value) => {
    const newAddresses = [...addresses];
    newAddresses[index] = { ...newAddresses[index], [name]: value };
    setAddresses(newAddresses);
  }
  const handleAddAddress = () => {
      setAddresses([...addresses, { logradouro: '', numero: '', cep: '', complemento: '', cidade: '', estado: '' }])
  };
  const handleChange = (e, index, name) => {
    handleInputChange(index, name, e.target.value || '');
  };
  const handleRemoveAddress = (index) => {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
  };
  const renderAddressForms = () => {
    return addresses.map((address, index) => (
      <div key={index} className='adressForm'>
        <div style={{ display: 'flex', flexDirection:'row' }}>
          <div className='adressForm-marginRight'>
            <label className='adressForm-label'>Logradouro</label><br/>
            <input className='adressForm-input' value={addresses[index].logradouro} type='text' placeholder='Rua Sem Nome' onChange={(e) => handleChange(e, index, 'logradouro')}/>
          </div>
          <div className='adressForm-marginRight'>
            <label className='adressForm-label'>Número</label><br/>
              <input className='adressForm-input' value={addresses[index].numero} type='number' placeholder='99999'  onChange={(e) => handleChange(e, index, 'numero')}/>
          </div>
          <div>
            <label className='adressForm-label'>CEP</label><br/>
            <input className='adressForm-input' value={addresses[index].cep} type='number' placeholder='99999-999'  onChange={(e) => handleChange(e, index, 'cep')}/>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection:'row' }}>
          <div className='adressForm-marginRight'>
            <label className='adressForm-label'>Complemento</label><br/>
            <input className='adressForm-input' value={addresses[index].complemento} type='text' placeholder='Casa 9999'  onChange={(e) => handleChange(e, index, 'complemento')}/>
          </div>
          <div className='adressForm-marginRight'>
            <label className='adressForm-label'>Cidade</label><br/>
            <input className='adressForm-input' value={addresses[index].cidade} type='text' placeholder='Rio de Janeiro'  onChange={(e) => handleChange(e, index, 'cidade')}/>
          </div>
          <div>
            <label className='adressForm-label'>Estado</label><br/>
            <select className='adressForm-select' onChange={(e) => handleInputChange(index, 'estado', e.target.value)} >
              <option value={addresses[index].estado}>Selecione um estado</option>
                {estados.map((estado) => (
                  <option key={estado.sigla} value={estado.sigla}>
                    {estado.nome}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <button className='adressForm-buttons-remove' onClick={() => handleRemoveAddress(index)}>Remover Endereço</button>
        </div>
      </div>
    ));
  };

  return (
    <div className='adressForm'>
      {renderAddressForms()}
      <div className='adressForm-buttons'>
        <button className='adressForm-buttons-add' onClick={handleAddAddress}>Adicionar Novo Endereço</button>
      </div>
      <div className='adressForm-underline'></div>
    </div>
  );
};

export default AddressForm;