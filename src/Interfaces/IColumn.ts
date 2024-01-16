import { ICard } from './ICard';

export interface IColumn { 
  id: number; 
  title: string; 
  items: ICard[]; 
}