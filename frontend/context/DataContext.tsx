import { Dispatch, SetStateAction, createContext, useContext } from 'react';

import { DataType } from '@/components/table/Columns';

export interface DataContextType {
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
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
