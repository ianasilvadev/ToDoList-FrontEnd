import React, { useState } from 'react';
import styles from './Tarefa.module.css';
import axios from 'axios';

const CriarTarefa = ({ onClose }) => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('');
    const [erro, setErro] = useState('');

    const validaCampos = () => {
        if (!titulo || !status) {
            setErro('Os campos de título e status são obrigatórios.');
            return false;
        }
        setErro('');
        return true;
    };

    // Validação dos campos de Titulo e Status e envio de tarefas.
    const criaTarefa = async () => {
        if (!validaCampos()) return;  
        try {
            await axios.post('http://localhost:8080/v1/tarefas', {
                titulo,
                descricao,
                status,
            });
            onClose();
        } catch {
            console.error('Erro ao criar tarefa');
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Criar Tarefa</h2>
                </div>
                <div className={styles.modalBody}>
                    {erro && <div className={styles.mensagemErro}>{erro}</div>} 
                    <div className={styles.inputGroup}>
                        <label htmlFor="titulo">Título</label>
                        <input
                            id="titulo"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Digite o título da tarefa"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Digite a descrição da tarefa"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="status">Status</label>
                        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Selecione o status</option>
                            <option value="pendente">Pendente</option>
                            <option value="em progresso">Em Progresso</option>
                            <option value="concluido">Concluído</option>
                        </select>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancelar
                    </button>
                    <button className={styles.saveButton} onClick={criaTarefa}>
                        Criar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CriarTarefa;
