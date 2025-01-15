import React, { useState, useEffect } from 'react';
import styles from './ModalDescritivo.module.css';

const ModalDescritivo = ({ tarefa, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Minha tarefa</h2>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="titulo">Título</label>
                        <p>{tarefa.titulo}</p>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="descricao">Descrição</label>
                        <div>{tarefa.descricao}</div>
                    </div>

                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.cancelButton} onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalDescritivo;

