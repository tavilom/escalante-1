'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import styles from '@/styles/Expediente.module.css';
import Pesquisa from '@/components/Pesquisa';

export default function Listagem() {
  const [guardas, setGuardas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function getGuardas() {
      const response = await fetch('http://localhost:3004/guardas');
      const dados = await response.json();
      setGuardas(dados);
      setIsLoading(false);
    }
    getGuardas();
  }, []);

  async function excluiGuarda(id) {
    await fetch('http://localhost:3004/guardas/' + id, {
      method: 'DELETE',
    });
    const novosDados = guardas.filter(guarda => guarda.id !== id);
    setGuardas(novosDados);
  }

  async function destacaGuarda(id, status_atual) {
    await fetch('http://localhost:3004/guardas/' + id, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ destaque: !status_atual }),
    });
    const indiceAlterado = guardas.findIndex(guarda => guarda.id === id);
    const novosDados = [...guardas];
    novosDados[indiceAlterado].destaque = !status_atual;
    setGuardas(novosDados);
  }

  const agrupadosPorExpediente = guardas.reduce((acc, guarda) => {
    if (!acc[guarda.expediente]) {
      acc[guarda.expediente] = [];
    }
    acc[guarda.expediente].push(guarda);
    return acc;
  }, {});




  const listaAgrupada = Object.entries(agrupadosPorExpediente).map(([expediente, guardas]) => {
    const coordenador = guardas.find(guarda => guarda.coordenador) || { nome: "Não atribuído" };
    const fiscal = guardas.find(guarda => Array.isArray(guarda.fiscal) && guarda.fiscal.includes("on")) || { nome: "Não atribuído" };

    return (
      <div key={expediente} className={styles.coluna}>
        <div className={styles.header}>
          <h2 className={styles.title}>EXPEDIENTE: {expediente}</h2>
        </div>
        <div className={styles.card}>
          <div className={styles.body}>
            <div className={styles.item}>
              <span>Coordenador:</span>
              <span>{coordenador.nome}</span>
            </div>
            <div className={styles.item}>
              <span>Fiscal:</span>
              <span>{fiscal.nome}</span>
            </div>
          </div>
        </div>
        {guardas
          .filter(guarda => !guarda.coordenador && !(Array.isArray(guarda.fiscal) && guarda.fiscal.includes("on")))
          .map(guarda => (
            <div key={guarda.id} className={styles.card}>
              <div className={styles.body}>
                <div className={styles.item}>
                  <span>Nome:</span>
                  <span>{guarda.nome}</span>
                </div>
              </div>
            </div>
          ))}
        <button className={styles.buttonGerenciar} onClick={() => router.push('/gerenciar/' + expediente)}>Gerenciar</button>
      </div>
    )
  });

  async function filtraDados(data) {
    if (data.pesq.length < 2) {
      Swal.fire('Digite, NO MINIMO, 2 caracteres');
      return;
    }

    const pesquisa = data.pesq.toUpperCase();

    const response = await fetch('http://localhost:3004/guardas');
    const dados = await response.json();

    const novosDados = dados.filter(
      guarda =>
        guarda.nome.toUpperCase().includes(pesquisa) ||
        guarda.expediente.toUpperCase().includes(pesquisa) ||
        guarda.turno.toUpperCase().includes(pesquisa)
    );

    if (novosDados.length === 0) {
      Swal.fire('Nenhum registro encontrado');
      return;
    }

    setGuardas(novosDados);
  }

  async function mostrarTodos() {
    const response = await fetch('http://localhost:3004/guardas');
    const dados = await response.json();
    setGuardas(dados);
  }

  if (isLoading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Pesquisa onSubmit={filtraDados} />
      <div className={styles.buttonContainer}>
        <button onClick={mostrarTodos} className={styles.mostrarTodos}>Mostrar Todos</button>
      </div>
      <div className={styles.grid}>
        {listaAgrupada}
      </div>
    </div>
  );
}
