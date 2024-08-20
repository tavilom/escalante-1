import { useState } from 'react';
import style from '@/styles/Pesquisa.module.css'

export default function Pesquisa({ onSubmit }) {
  const [pesq, setPesq] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ pesq });
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        type="text"
        value={pesq}
        onChange={(e) => setPesq(e.target.value)}
        placeholder="Pesquisar..."
      />
      <button type="submit">Pesquisar</button>
    </form>
  );
}
