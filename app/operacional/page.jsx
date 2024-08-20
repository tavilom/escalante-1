'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import styles from '@/styles/Operacional.module.css';

export default function Operacional() {
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

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Lista de Guardas', 14, 20);
        
        const tableColumn = ["Nome", "Expediente", "Turno"];
        const tableRows = [];

        guardas.forEach(guarda => {
            const guardaData = [
                `${guarda.nome} ${guarda.coordenador ? ' - Coordenador' : ''} ${guarda.fiscal ? ' - Fiscal' : ''}`,
                guarda.expediente,
                guarda.turno
            ];
            tableRows.push(guardaData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('guardas.pdf');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Lista Operacional de Guardas</h1>
            <button className={styles.button} onClick={generatePDF}>Exportar para PDF</button>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Expediente</th>
                        <th>Turno</th>
                    </tr>
                </thead>
                <tbody>
                    {guardas.map(guarda => (
                        <tr key={guarda.id}>
                            <td className={`${guarda.coordenador ? styles.bold : ''} ${guarda.fiscal ? styles.bold : ''}`}>
                                {guarda.nome} {guarda.coordenador ? ' - Coordenador' : ''} {guarda.fiscal ? ' - Fiscal' : ''}
                            </td>
                            <td>{guarda.expediente}</td>
                            <td>{guarda.turno}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
