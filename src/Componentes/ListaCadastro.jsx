import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import adicionar from './Imagens/adicionarTarefa.png';
import CriarTarefa from './ModalTarefa/CriarTarefa';
import ListaTarefas from './ListarTarefas';
import { FaSearch } from "react-icons/fa";

const ListaCadastro = () => {
    const [mostrarModalTarefa, setMostrarModalTarefa] = useState(false);
    const [dataAtual, setDataAtual] = useState('');
    const [tarefaBuscada, setTarefaBuscada] = useState('');

    useEffect(() => {
        const hoje = new Date();
        setDataAtual(hoje.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Minhas tarefas</h2>
            </div>
            <p>Hoje</p>
            <p>{dataAtual}</p>
            <hr style={{ borderTop: "2px solid #E5E5E5", margin: "0" }} />

            <div className="d-flex justify-content-start align-items-center gap-3 mt-4">
                <div className="d-flex align-items-center" style={{ position: "relative" }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Pesquisar tarefa..."
                        style={{ width: "261.1px" }}
                        value={tarefaBuscada}
                        onChange={(e) => setTarefaBuscada(e.target.value)}
                    />
                    <FaSearch
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#C4C4C4",
                            cursor: "pointer",
                        }}
                    />
                </div>
                <img src={adicionar} alt="Adicionar tarefa" style={{ height: '40px' }} onClick={() => setMostrarModalTarefa(true)} />
            </div>

            <div
                className="d-flex justify-content-between align-items-center mt-5"
                style={{
                    padding: "0 10%",
                    fontWeight: "bold",
                    paddingBottom: "10px",
                }}
            >
                <div style={{ flex: 1, textAlign: "left" }} className="text-secondary">Título</div>
                <div style={{ flex: 1, textAlign: "center" }} className="text-secondary">Descrição</div>
                <div style={{ flex: 1, textAlign: "right" }} className="text-secondary">Status</div>
            </div>

            <ListaTarefas tarefaBuscada={tarefaBuscada} />
            {mostrarModalTarefa && <CriarTarefa onClose={() => setMostrarModalTarefa(false)} />}
        </div>
    );
};

export default ListaCadastro;
