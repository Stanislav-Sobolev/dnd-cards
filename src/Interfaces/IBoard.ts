import { IColumn } from './IColumn';

export interface IBoard { 
  id: string; 
  name: string; 
  columnsData: IColumn[]; 
  save(): void;
}