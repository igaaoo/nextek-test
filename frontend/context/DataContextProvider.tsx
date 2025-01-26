'use client';
import { ReactNode, useState } from 'react';
import DataContext, { DataContextType } from './DataContext';
import { useAuthContext } from './AuthContext';
import axios from 'axios';

interface DataContextProviderProps {
  children: ReactNode;
}

export function getBrasilDate(date: string) {
  if (date == null) return 'N/A';

  const oracleDate = date.split('T')[0];
  const dateArray = oracleDate.split('-');
  return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
}

const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const { token } = useAuthContext();

  const [tasksData, setTasksData] = useState<any>([]);

  function getTasksData() {
    axios.get("/api/tasks", { headers: { token: token } })
      .then(async (response) => {
        const tasks = await response.data.tasks.map((task: any) => {
          task.created_at = getBrasilDate(task.created_at);

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
    getTasksData
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
