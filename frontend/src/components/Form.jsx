import { useState, useEffect, useContext } from 'react';
import CommsContext from '../context/CommsContext';
import { getComms } from '../helpers/getComms';
import { getCoordinatesDistance } from '../helpers/getCoordinatesDistance';
import { handleEntryButton } from '../helpers/handleEntryButton';
import { createComms, requestCommByCpf, requestCommByDate, updateComm } from '../services/requests';
import './Form.css';

function Form() {
  const [entryButton, setEntryButton] = useState(false);
  const [filterButton, setFilterButton] = useState(false);
  const [cpfFilter, setCpfFilter] = useState({
    cpf: ''
  });

  const { 
    editStatus,
    idToUpdate,
    formComm,
    setFormComm,
    setEditStatus,
    setCommunications
  } = useContext(CommsContext);

  const apiComms = '/communication/';

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setFormComm((prevComm) => ({
      ...prevComm, [name]: value
    }));
  }

  const handleFilterInput = ({ target }) => {
    const { name, value } = target;
    setCpfFilter((prevCpf) => ({
      ...prevCpf, [name]: value
    }));
  }

  useEffect(() => {
    handleEntryButton(formComm, setEntryButton, cpfFilter, setFilterButton);
  }, [cpfFilter, formComm])

  const handleEditClick = async () => {
    const apiUpdateComm = `/communication/update/${idToUpdate}`;
    const comm = await updateComm(apiUpdateComm, formComm);
    if (comm) {
      setEditStatus(false);
      setFormComm({
        name: '',
        email: '',
        cpf: '',
        latitude: '',
        longitude: '',
        croptype: '',
        harvestdate: '',
        lossevent: 'Chuva Excessiva'
      });
      getComms(apiComms, setCommunications);
    }
  }

  const handleAddClick = async () => {
    const apiGetDateComm = '/communication/date';
    const comms = await requestCommByDate(apiGetDateComm, {
      harvestdate: formComm.harvestdate
    });
    const distanceInRange = comms.map((comm) => {
      const response = getCoordinatesDistance(formComm.latitude, formComm.longitude, comm.latitude, comm.longitude);
      if (response && comm.lossevent !== formComm.lossevent) return true;
      return false;
    }).some((trueResponse) => trueResponse);
    if (distanceInRange) {
      alert('Há um evento de perda divergente criado na mesma data, em um raio de 10km');
    } else {
      await createComms(apiComms, formComm);
      setFormComm({
        name: '',
        email: '',
        cpf: '',
        latitude: '',
        longitude: '',
        croptype: '',
        harvestdate: '',
        lossevent: 'Chuva Excessiva'
      });
      getComms(apiComms, setCommunications);
    }
  };

  const handleFilterClick = async () => {
    const apiGetCpfComm = '/communication/cpf';
    const comm = await requestCommByCpf(apiGetCpfComm, cpfFilter);
    setCommunications(comm);
  };

  const handleClearFilterClick = () => {
    getComms(apiComms, setCommunications);
    setCpfFilter({
      cpf: ''
    });
  };

  return (
    <form className="add-comm-form-section">
      <div id="name-div">
        <label htmlFor="name">
          Nome
          </label>
          <input
            type="text"
            className="form-infos"
            name="name"
            value={ formComm.name }
            onChange={ handleInput }
            maxLength='50'
          />
      </div>
      <div>
        <label htmlFor="email">
          Email
          <input
            type="text"
            className="form-infos"
            name="email"
            value={ formComm.email }
            onChange={ handleInput }
            maxLength='50'
          />
        </label>
      </div>
      <div>
        <label htmlFor="cpf">
          CPF
          <input
            id="cpf"
            className="form-infos"
            name="cpf"
            placeholder="Apenas números"
            value={ formComm.cpf }
            onChange={ handleInput }
            maxLength='11'
          />
        </label>
      </div>
      <div id="location">
        <div id="location-name">
          Localização
        </div>
        <label htmlFor="latitude">
          Latitude
          <input
            id="latitude"
            className="form-infos"
            name="latitude"
            value={ formComm.latitude }
            onChange={ handleInput }
            maxLength='10'
          />
        </label>
        <label htmlFor="longitude">
          Longitude
          <input
            id="longitude"
            className="form-infos"
            name="longitude"
            value={ formComm.longitude }
            onChange={ handleInput }
            maxLength='11'
          />
        </label>
      </div>
      <div>
        <label htmlFor="croptype">
          Tipo da lavoura
          <input
            type="text"
            className="form-infos"
            name="croptype"
            placeholder="Ex.: Milho"
            value={ formComm.croptype }
            onChange={ handleInput }
            maxLength='10'
          />
        </label>
      </div>
      <div id="date">
        <label htmlFor="harvestdate">
          Data
          <input
            id="date"
            className="form-infos"
            name="harvestdate"
            placeholder="AAAA-MM-DD"
            value={ formComm.harvestdate }
            onChange={ handleInput }
            maxLength='10'
          />
        </label>
      </div>
      <div>
          <label htmlFor="event">
            Evento
            <select
              id="event"
              className="form-infos"
              name="lossevent"
              value={ formComm.lossevent }
              onChange={ handleInput }
            >
              <option value="Chuva Excessiva">Chuva Excessiva</option>
              <option value="Geada">Geada</option>
              <option value="Granizo">Granizo</option>
              <option value="Seca">Seca</option>
              <option value="Vendaval">Vendaval</option>
              <option value="Raio">Raio</option>
            </select>
          </label>
        </div>
      <div>
        { editStatus
          ? (
            <button
              type="button"
              className="form-button-input"
              onClick={ handleEditClick }
            >
              Editar Comunicação
            </button>)
          : (
            <button
              type="button"
              className={ !entryButton ? "form-button-input-disabled" : "form-button-input" }
              onClick={ handleAddClick }
              disabled={ !entryButton }
            >
              Adicionar Comunicação
            </button>)}
      </div>
      <div className="cpf-filter-section">
        <div className="cpf-input-section">
          <label htmlFor="cpfFilter">
            Filtrar por CPF
          </label>
          <input
            id="cpfFilter"
            className="form-filter"
            name="cpf"
            placeholder="Apenas números"
            value={ cpfFilter.cpf }
            onChange={ handleFilterInput }
            maxLength='11'
          />
        </div>
        <div className="cpf-button-section">
          <div>
            <button
              type="button"
              className={ !filterButton ? "filter-button-disabled" : "filter-button" }
              onClick={ handleFilterClick }
              disabled={ !filterButton }
            >
              Filtrar
            </button>
          </div>
          <div>
            <button
              type="button"
              className="clear-filter-button"
              onClick={ handleClearFilterClick }
            >
              Limpar filtro
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;