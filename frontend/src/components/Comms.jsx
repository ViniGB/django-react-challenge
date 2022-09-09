import { useEffect, useContext } from 'react';
// import axios from "axios";
import './Comms.css';
import { deleteComm, requestCommById } from '../services/requests';
import CommsContext from '../context/CommsContext';
import { getComms } from '../helpers/getComms';

function Comms() {
  const { 
    setEditStatus,
    setIdToUpdate,
    setFormComm,
    communications,
    setCommunications
  } = useContext(CommsContext)

  const apiComms = '/communication';

  useEffect(() => {
    if (!communications.length) {
      getComms(apiComms, setCommunications);
    }
  }, [communications, setCommunications])

  const handleDeleteClick = async ({ target }) => {
    const { id } = target;
    const apiDeleteComm = `/communication/delete/${id}`;
    await deleteComm(apiDeleteComm);
    getComms(apiComms, setCommunications);
  }

  const handleEditClick = async ({ target }) => {
    const { id } = target;
    const apiCommById = `/communication/${id}`;
    const comm = await requestCommById(apiCommById);
    if (comm) {
      setFormComm({
        name: comm.name,
        email: comm.email,
        cpf: comm.cpf,
        latitude: comm.latitude,
        longitude: comm.longitude,
        croptype: comm.croptype,
        harvestdate: comm.harvestdate,
        lossevent: comm.lossevent
      });
      setIdToUpdate(id);
      setEditStatus(true);
      getComms(apiComms, setCommunications);
    }
  }

  return (
    <table className="table-section">
      <thead>
        <tr>
          <th>
            <span>Nome</span>
          </th>
          <th>
            <span>Email</span>
          </th>
          <th>
            <span>CPF</span>
          </th>
          <th>
            <span>Latitude</span>
          </th>
          <th>
            <span>Longitude</span>
          </th>
          <th>
            <span>Tipo de Lavoura</span>
          </th>
          <th>
            <span>Data de Colheita</span>
          </th>
          <th>
            <span>Evento</span>
          </th>
          <th>
            <span>
              Editar/Excluir
            </span>
          </th>
        </tr>
        { communications && communications.map((comm) => (
          <tr
            key={ comm.id }
            className="table-data"
          >
            <td>
              { comm.name }
            </td>
            <td>
              { comm.email }
            </td>
            <td>
              { comm.cpf }
            </td>
            <td>
              { Number(comm.latitude) }
            </td>
            <td>
              { Number(comm.longitude) }
            </td>
            <td>
              { comm.croptype }
            </td>
            <td>
              { comm.harvestdate }
            </td>
            <td>
              { comm.lossevent }
            </td>
            <td>
              <button
                id={ comm.id }
                className="edit-button"
                type="button"
                onClick={ handleEditClick }
              >
                Editar
              </button>
              <button
                id={ comm.id }
                className="delete-button"
                type="button"
                onClick={ handleDeleteClick }
              >
                Excluir
              </button>
            </td>
          </tr>
        )) }
      </thead>
    </table>
  );
}

export default Comms;