'use client';
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from 'sweetalert2';
import styles from '@/styles/GerenciarTurnos.module.css';

export default function GerenciarTurnos() {
    const [guardas, setGuardas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { turno } = useParams();
    const router = useRouter();

    useEffect(() => {
        async function getGuardas() {
            const response = await fetch(`http://localhost:3004/guardas?turno=${turno}`);
            if (response.ok) {
                const dados = await response.json();
                setGuardas(dados);
                setIsLoading(false);
            } else {
                Swal.fire("Erro ao carregar dados do servidor");
            }
        }
        getGuardas();
    }, [turno]);

    const handleInputChange = (id, field, value) => {
        const updatedGuardas = guardas.map(guarda => {
            if (guarda.id === id) {
                return { ...guarda, [field]: value };
            }
            return guarda;
        });
        setGuardas(updatedGuardas);
    };

    const handleSave = async () => {
        try {
            for (const guarda of guardas) {
                await fetch(`http://localhost:3004/guardas/${guarda.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(guarda),
                });
            }
            Swal.fire('Salvo com sucesso!');
            router.push('/turnos');
        } catch (error) {
            Swal.fire('Erro ao salvar dados');
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3004/guardas/${id}`, {
                method: 'DELETE',
            });
            const novosDados = guardas.filter(guarda => guarda.id !== id);
            setGuardas(novosDados);
            Swal.fire('Excluído com sucesso!');
        } catch (error) {
            Swal.fire('Erro ao excluir guarda');
        }
    };

    const listaGuardas = guardas.map(guarda => (
        <div key={guarda.id} className={styles.item}>
            <label className={styles.label}>Nome:</label>
            <input 
                className={styles.input} 
                type="text" 
                value={guarda.nome} 
                onChange={(e) => handleInputChange(guarda.id, 'nome', e.target.value)} 
            />
            <label className={styles.label}>Turno:</label>
            <input 
                className={styles.input} 
                type="text" 
                value={guarda.turno} 
                onChange={(e) => handleInputChange(guarda.id, 'turno', e.target.value)} 
            />
            <label className={styles.label}>Coordenador:</label>
            <input 
                className={styles.input} 
                type="text" 
                value={guarda.coordenador || ''} 
                onChange={(e) => handleInputChange(guarda.id, 'coordenador', e.target.value)} 
            />
            <label className={styles.label}>Fiscal:</label>
            <input 
                className={styles.input} 
                type="text" 
                value={guarda.fiscal || ''} 
                onChange={(e) => handleInputChange(guarda.id, 'fiscal', e.target.value)} 
            />
            <button className={styles.buttonExcluir} onClick={() => handleDelete(guarda.id)}>Excluir</button>
        </div>
    ));

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Gerenciar Turno: {turno}</h1>
            <div className={styles.tableContainer}>
                <div className={styles.grid}>
                    {listaGuardas}
                </div>
            </div>
            <button className={styles.buttonSalvar} onClick={handleSave}>Salvar</button>
        </div>
    );
}
