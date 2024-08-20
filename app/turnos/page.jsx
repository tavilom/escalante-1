'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Swal from 'sweetalert2'
import styles from '@/styles/Turnos.module.css'
import Pesquisa from '@/components/Pesquisa';

export default function ListagemTurnos() {
    const [guardas, setGuardas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        getGuardas()
    }, [])

    async function getGuardas() {
        const response = await fetch("http://localhost:3004/guardas")
        if (response.ok) {
            const dados = await response.json()
            setGuardas(dados)
            setIsLoading(false)
        } else {
            Swal.fire("Erro ao carregar dados do servidor")
        }
    }

    const agrupadosPorTurno = guardas.reduce((acc, guarda) => {
        if (!acc[guarda.turno]) acc[guarda.turno] = []
        acc[guarda.turno].push(guarda)
        return acc
    }, {})

    const listaAgrupada = Object.entries(agrupadosPorTurno).map(([turno, guardas]) => {
        const coordenador = guardas.find(guarda => guarda.coordenador) || { nome: "Não atribuído" };
        const fiscal = guardas.find(guarda => Array.isArray(guarda.fiscal) && guarda.fiscal.includes("on")) || { nome: "Não atribuído" };
    
        return (
            <div key={turno} className={styles.coluna}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Turno: {turno}</h2>
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
                <button className={styles.buttonGerenciar} onClick={() => router.push('/gerenciar-turnos/' + turno)}>Gerenciar Turno</button>
            </div>
        )
    });

    async function filtraDados(data) {
        if (data.pesq.length < 2) {
            Swal.fire("Digite, NO MINIMO, 2 caracteres")
            return
        }

        const pesquisa = data.pesq.toUpperCase()

        const response = await fetch("http://localhost:3004/guardas")
        if (response.ok) {
            const dados = await response.json()
            const novosDados = dados.filter(guarda =>
                guarda.nome.toUpperCase().includes(pesquisa) ||
                guarda.turno.toUpperCase().includes(pesquisa)
            )

            if (novosDados.length == 0) {
                Swal.fire("Nenhum registro encontrado")
                return
            }

            setGuardas(novosDados)
        } else {
            Swal.fire("Erro ao carregar dados do servidor")
        }
    }

    return (
        <div className={styles.container}>
            <Pesquisa onSubmit={filtraDados} />
            <button className={styles.mostrarTodos} onClick={getGuardas}>Mostrar Todos</button>
            <div className={styles.grid}>
                {listaAgrupada}
            </div>
        </div>
    )
}
