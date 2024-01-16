import ICard from './ICard';

interface IColumn { 
  id: number; 
  title: string; 
  items: ICard[]; 
}

export default IColumn;