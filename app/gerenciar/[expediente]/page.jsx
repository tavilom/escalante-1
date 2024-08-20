'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import styles from '@/styles/Gerenciar.module.css';

export default function GerenciarExpediente() {
  const [guardas, setGuardas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const { expediente } = useParams();

  useEffect(() => {
    async function getGuardas() {
      const response = await fetch('http://localhost:3004/guardas?expediente=' + expediente);
      const dados = await response.json();
      setGuardas(dados);
      setIsLoading(false);
    }
    getGuardas();
  }, [expediente]);

  const handleEdit = (id, data) => {
    setEditMode(id);
    setFormData(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (id) => {
    await fetch('http://localhost:3004/guardas/' + id, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const updatedGuardas = guardas.map(guarda => 
      guarda.id === id ? { ...guarda, ...formData } : guarda
    );
    setGuardas(updatedGuardas);
    setEditMode(null);
    Swal.fire('Guarda atualizado com sucesso');
  };

  const handleDelete = async (id) => {
    await fetch('http://localhost:3004/guardas/' + id, {
      method: 'DELETE',
    });
    const novosDados = guardas.filter(guarda => guarda.id !== id);
    setGuardas(novosDados);
    Swal.fire('Guarda excluído com sucesso');
  };

  if (isLoading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Gerenciar Expediente: {expediente}</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Expediente</th>
            <th>Turno</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {guardas.map(guarda => (
            <tr key={guarda.id}>
              <td>
                {editMode === guarda.id ? (
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                ) : (
                  guarda.nome
                )}
              </td>
              <td>
                {editMode === guarda.id ? (
                  <input
                    type="text"
                    name="expediente"
                    value={formData.expediente}
                    onChange={handleChange}
                  />
                ) : (
                  guarda.expediente
                )}
              </td>
              <td>{guarda.turno}</td>
              <td>
                {editMode === guarda.id ? (
                  <button className={styles.button} onClick={() => handleSave(guarda.id)}>Salvar</button>
                ) : (
                  <>
                    <button className={styles.button} onClick={() => handleEdit(guarda.id, { nome: guarda.nome, expediente: guarda.expediente })}>Editar</button>
                    <button className={styles.button} onClick={() => handleDelete(guarda.id)}>Excluir</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
