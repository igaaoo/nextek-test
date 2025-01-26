import { createContext, useContext } from 'react';


export interface DataContextType {
  tasksData: any[];
  getTasksData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useMyContext deve ser usado dentro de um provedor MyContext');
  }
  return context;
};

export default DataContext;
