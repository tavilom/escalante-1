'use client'
import { useEffect, useState } from "react"
import ItemLista from "@/components/ItemLista"
import { useRouter } from "next/navigation"
import Pesquisa from "@/components/Pesquisa"
import Swal from 'sweetalert2'

export default function Listagem() {
    const [ guardas, setGuardas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        async function getGuardas() {
            const response = await fetch("http://localhost:30004/guardas")
            const dados = await response.json()
            setGuardas(dados)
            setIsLoading(false)
        }
        getGuardas()
    }, [])

    async function excluiGuarda(id) {
        const response = await fetch("http://localhost:3004/guardas/" + id, {
            method: "DELETE"
        })
        const novosDados = guardas.filter(guarda => guarda.id != id)
        setGuardas(novosDados)
    }

    async function destacaGuarda(id, status_atual) {
        await fetch("http://localhost:3004/guardas/" + id,
            {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ destaque: !status_atual })
            })
        const indiceAlterado = guardas.findIndex(guarda => guarda.id == id)
        const novosDados = [...guardas]
        novosDados[indiceAlterado].destaque = !status_atual
        setGuardas(novosDados)
    }

    const listaGuardas = guardas.map(guarda => [
        <ItemLista Key={guarda.id}
        guarda={guarda}
        exclui={() => excluiGuarda(guarda.id)}
        altera={() => router.push('altera/' + guarda.id)}
        consulta={() => router.push('consulta/' + guarda.id)}
        // descata={() = destacaGuarda(guarda.id, guarda.destaque)}
        />
    ])

    async function filtraDados(data) {
        if (data.pesq.length < 2) {
            Swal.fire("Digite, NO MINIMO, 2 caracteres")
            return
        }

        const pesquisa = data.pesq.toUpperCase()

        const response = await fetch("http://localhost:3004/guardas")
        const dados = await response.json()

        const novosDados = dados.filter(guarda => guarda.nome.  toUpperCase().includes(pesquisa) || guarda.turno.toUpperCase().includes(pesquisa)
        )
        
        if (novosDados.length == 0) {
            Swal.fire("Nenhum registro encontrado")
            return
        }

        setGuardas(novosDados)
        //TODO
    }
}