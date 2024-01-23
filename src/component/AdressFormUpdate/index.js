import { useEffect, useState } from 'react';
import './style.scss'

const AddressFormUpdate = ({ onAddAddress, addressesList }) => {
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
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    setAddresses(addressesList);
  }, []);
  useEffect(() => {
    onAddAddress([...addresses]);
  }, [addresses])

  const handleInputChange = (index, name, value) => {
    const newAddresses = [...addresses];
    newAddresses[index] = { ...newAddresses[index], [name]: value };
    setAddresses(newAddresses);
  }
  const handleAddAddress = () => {
      setAddresses([
        ...addresses, 
        { logradouro: '', numero: '', cep: '', complemento: '', cidade: '', estado: '' 
      }])
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
      <div key={index} className='adressFormUpdt'>
        <div style={{ display: 'flex', flexDirection:'row' }}>
          <div className='adressFormUpdt-marginRight'>
            <label className='adressFormUpdt-label'>Logradouro</label><br/>
            <input className='adressFormUpdt-input' value={addresses[index].logradouro} type='text' placeholder='Rua Sem Nome' onChange={(e) => handleChange(e, index, 'logradouro')}/>
          </div>
          <div className='adressFormUpdt-marginRight'>
            <label className='adressFormUpdt-label'>Número</label><br/>
              <input className='adressFormUpdt-input' value={addresses[index].numero} type='number' placeholder='99999'  onChange={(e) => handleChange(e, index, 'numero')}/>
          </div>
          <div>
            <label className='adressFormUpdt-label'>CEP</label><br/>
            <input className='adressFormUpdt-input' value={addresses[index].cep} type='number' placeholder='99999-999'  onChange={(e) => handleChange(e, index, 'cep')}/>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection:'row' }}>
          <div className='adressFormUpdt-marginRight'>
            <label className='adressFormUpdt-label'>Complemento</label><br/>
            <input className='adressFormUpdt-input' value={addresses[index].complemento} type='text' placeholder='Casa 9999'  onChange={(e) => handleChange(e, index, 'complemento')}/>
          </div>
          <div className='adressFormUpdt-marginRight'>
            <label className='adressFormUpdt-label'>Cidade</label><br/>
            <input className='adressFormUpdt-input' value={addresses[index].cidade} type='text' placeholder='Rio de Janeiro'  onChange={(e) => handleChange(e, index, 'cidade')}/>
          </div>
          <div>
            <label className='adressFormUpdt-label'>Estado</label><br/>
            <select className='adressFormUpdt-select' value={addresses[index].estado} onChange={(e) => handleInputChange(index, 'estado', e.target.value)} >
              <option value=''>Selecione um estado</option>
                {estados.map((estado) => (
                  <option key={estado.sigla} value={estado.sigla}>
                    {estado.nome}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <button  
            className='adressFormUpdt-buttons-remove' 
            onClick={() => handleRemoveAddress(index)}
            >
              Remover Endereço
            </button>
        </div>
      </div>
    ));
  };

  return (
    <div className='adressFormUpdt'>
      {renderAddressForms()}
      <div className='adressFormUpdt-buttons'>
        <button className='adressFormUpdt-buttons-add' onClick={handleAddAddress}>Adicionar Novo Endereço</button>
      </div>
      <div className='adressFormUpdt-underline'></div>
    </div>
  );
};

export default AddressFormUpdate;