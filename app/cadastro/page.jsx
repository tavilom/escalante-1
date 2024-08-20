'use client'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Cadastro.module.css';

export default function Cadastro() {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            nome: "",
            expediente: "",
            turno: "",
            fiscal: false,
            coordenador: false
        }
    });

    async function enviaDados(data) {
        const guarda = await fetch("http://localhost:3004/guardas",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ ...data })
            },
        )
        if (guarda.status == 201) {
            toast.success("Guarda inserido com sucesso")
        } else {
            toast.error("Erro ao inserir o guarda")
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cadastro de Guardas</h1>
            <form onSubmit={handleSubmit(enviaDados)}>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="nome" className={styles.formLabel}>Nome do Guarda</label>
                        <input type="text" className={`form-control ${styles.formControl}`} id="nome" {...register("nome")} required />
                    </div>
                    <div className="col-6">
                        <label htmlFor="expediente" className={styles.formLabel}>Expediente</label>
                        <select id="expediente" className={`form-select ${styles.formSelect}`} {...register("expediente")} required>
                            <option value="23">23</option>
                            <option value="41">41</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <label htmlFor="turno" className={styles.formLabel}>Turno</label>
                        <select id="turno" className={`form-select ${styles.formSelect}`} {...register("turno")} required>
                            <option value="241">Turno 241</option>
                            <option value="242">Turno 242</option>
                            <option value="243">Turno 243</option>
                            <option value="244">Turno 244</option>
                        </select>
                    </div>
                    <div className="col-2">
                        <div className={styles.checkboxContainer}>
                            <input type="checkbox" className={`form-check-input ${styles.formCheckInput}`} id="fiscal" {...register("fiscal")} />
                            <label htmlFor="fiscal" className={styles.formLabel}>Fiscal</label>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className={styles.checkboxContainer}>
                            <input type="checkbox" className={`form-check-input ${styles.formCheckInput}`} id="coordenador" {...register("coordenador")} />
                            <label htmlFor="coordenador" className={styles.formLabel}>Coordenador</label>
                        </div>
                    </div>
                </div>

                <input type="submit" value="Enviar" className={`btn btn-primary me-3 ${styles.btn} ${styles.btnPrimary}`} />
                <input type="button" value="Limpar" className={`btn btn-danger ${styles.btn} ${styles.btnDanger}`} onClick={() => reset()} />
            </form>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}
