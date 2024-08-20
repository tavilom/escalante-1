'use client';
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from "react";
import styles from '../styles/Navbar.module.css';

export default function Titulo() {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
            <div className="container">
                <Link className="navbar-brand" href="/">
                    <img src="../s.png" alt="Logo" width="72" height="60" className="d-inline-block align-text-top" />
                    <h2 className={`${styles.title} ${styles.ms20}`}>Sistema de controle de horários Escalente</h2>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" href="/expediente">Expediente</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/cadastro">Cadastro</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/turnos">Turnos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/operacional">Operacional</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
