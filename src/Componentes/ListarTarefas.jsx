import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './Cards';

const ListaTarefas = ({ tarefaBuscada }) => {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        const buscaTarefa = async () => {
            try {
                const response = tarefaBuscada.trim()
                    ? await axios.get(`http://localhost:8080/v1/tarefas/buscar?titulo=${encodeURIComponent(tarefaBuscada.trim())}`)
                    : await axios.get('http://localhost:8080/v1/tarefas');
                setTarefas(tarefaBuscada.trim() ? [response.data] : response.data);
            } catch (err) {
                console.error(err);
            }
        };
        buscaTarefa();
    }, [tarefaBuscada]);

    // Função para remover a tarefa da lista após ser excluída
    const handleDelete = (tarefaId) => {
        setTarefas(tarefas.filter(tarefa => tarefa.tarefaId !== tarefaId));
    };

    return (
        <div>
            {tarefas.length > 0 ? (
                tarefas.map((tarefa) => (
                    <Cards key={tarefa.tarefaId} tarefa={tarefa} onDelete={handleDelete} />
                ))
            ) : (
                <div className="text-center" style={{ padding: '90px' }}>
                    Nenhuma tarefa encontrada.
                </div>
            )}
        </div>
    );
};

export default ListaTarefas;
