export default function ItemLista({ guarda, exclui, altera, consulta, destaca }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{guarda.nome}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.item}>
          <span>Expediente:</span>
          <span>{guarda.expediente}</span>
        </div>
        <div className={styles.item}>
          <span>Turno:</span>
          <span>{guarda.turno}</span>
        </div>
      </div>
      <button className={styles.button} onClick={exclui}>Excluir</button>
      <button className={styles.button} onClick={altera}>Alterar</button>
      <button className={styles.button} onClick={consulta}>Consultar</button>
      <button className={styles.button} onClick={destaca}>{guarda.destaque ? 'Retirar Destaque' : 'Destacar'}</button>
    </div>
  );
}
