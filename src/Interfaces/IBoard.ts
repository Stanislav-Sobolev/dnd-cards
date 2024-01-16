import IColumn from './IColumn';

interface  IBoard {
  id: String,
  name: String,
  columnsData: [IColumn],
  save: () => void
};

export default IBoard;
