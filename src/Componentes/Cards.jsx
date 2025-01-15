import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrashAlt, FaCircle, FaCheckCircle } from "react-icons/fa";
import axios from 'axios';
import ModalDescritivo from './ModalDescritivo/ModalDescritivo';

const Cards = ({ tarefa, onDelete }) => {
    const [conclusaoTarefa, setConclusaoTarefa] = useState(tarefa.status === "concluido");
    const [statusTarefa, setStatusTarefa] = useState(tarefa.status);
    const [modalDescritivo, setModalDescritivo] = useState(false); 

    const concluindoTarefa = () => {
        if (!conclusaoTarefa) {
            setConclusaoTarefa(true);
            setStatusTarefa("concluido");
    
            // Mantendo atividas no localStorage.   
            const tarefaSalva = JSON.parse(localStorage.getItem("tarefas")) || {};
            tarefaSalva[tarefa.tarefaId] = { ...tarefa, status: "concluido" };
            localStorage.setItem("tarefas", JSON.stringify(tarefaSalva));
        }
    };

    //Capturando atividades existentes
    useEffect(() => {
        const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || {};
        if (tarefasSalvas[tarefa.tarefaId]?.status === "concluido") {
            setConclusaoTarefa(true);
            setStatusTarefa("concluido");
        }
    }, [tarefa.tarefaId]);
    
    

    // Estilizando atividade caso seja concluída.
    const tarefaConcluida = conclusaoTarefa ? 
        { textDecoration: "line-through", color: "#D3D3D3" } : {};

    const iconConcluido = conclusaoTarefa ? (
        <FaCheckCircle size={20} className="me-3" color="#699BF7" onClick={concluindoTarefa} role="button" />
    ) : (
        <FaCircle size={20} className="me-3" color="#C4C4C4" onClick={concluindoTarefa} role="button" />
    );

    const exibeStatus = () => {
        if (statusTarefa === "concluido") {
            return "Concluída";
        } else if (statusTarefa === "em progresso") {
            return "Em Progresso";
        } else {
            return "Pendente";
        }
    };

    // Deletar tarefa utilizando API criada no Back-end
    const deletarTarefa = async () => {
        try {
            await axios.delete(`http://localhost:8080/v1/tarefas/${tarefa.tarefaId}`);
            onDelete(tarefa.tarefaId); 
        } catch (err) {
            console.error("Erro ao excluir tarefa:", err);
        }
    };

    const handleCardClick = () => {
        setModalDescritivo(true);
    };

    const closeModal = () => {
        setModalDescritivo(false);
    };

    return (
        <div style={{ padding: "0 5%", marginTop: "20px" }}>
            <div className="card shadow-sm" style={{ height: "80px", width: "106%" }}>
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div style={{ flex: 1 }} className="d-flex align-items-center">
                        {iconConcluido}
                        <span onClick={handleCardClick}  style={tarefaConcluida}>{tarefa.titulo}</span>
                    </div>
                    <div 
                        style={{ flex: 1, textAlign: "center" }} 
                        className="text-secondary" 
                        onClick={handleCardClick}
                    >
                        {tarefa.descricao.length > 30 ? `${tarefa.descricao.substring(0, 30)}...` : tarefa.descricao}
                    </div>
                    <div style={{ flex: 1, textAlign: "right", marginRight: "40px" }} className="text-secondary">
                        {exibeStatus()}
                    </div>
                    <div className="d-flex gap-3">
                        <FaTrashAlt
                            style={{
                                color: "#699BF7",
                                fontSize: "19px",
                                pointerEvents: "auto"
                            }}
                            role="button"
                            onClick={deletarTarefa}
                        />
                    </div>
                </div>
            </div>

            {modalDescritivo && <ModalDescritivo onClose={closeModal} tarefa={tarefa} />}
        </div>
    );
};

export default Cards;
