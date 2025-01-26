'use client';
import { ReactNode, useEffect, useState } from 'react';
import DataContext, { DataContextType } from './DataContext';
import { useAuthContext } from './AuthContext';
import axios from 'axios';

interface DataContextProviderProps {
  children: ReactNode;
}

const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const { token } = useAuthContext();
  const [tasksData, setTasksData] = useState<any>([]);

  function getTasksData() {
    axios.get("/api/tasks", { headers: { token } })
      .then(async (response) => {
        const tasks = await response.data.tasks.map((task: any) => {
          return {
            id: task.id,
            title: task.title,
            description: task.description,
            created_at: task.created_at,
            status: task.status,
          };
        });


        setTasksData(tasks);
      })
      .catch((err) => {
        console.log('Erro ao buscar tarefas');
        console.log(err);
      });
  }




  const contextValue: DataContextType = {
    tasksData,
    getTasksData,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
