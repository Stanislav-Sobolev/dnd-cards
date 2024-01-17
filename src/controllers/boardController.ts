var cryptoModule = require('crypto');
var Board = require('../models/boardModel');

//imports for Typescript
import { Request, Response } from 'express';
import IBoard from '../Interfaces/IBoard';
import IColumn from '../Interfaces/IColumn';
import ICard from '../Interfaces/ICard';

const hashId = (id: string) => {
  const hash = cryptoModule.createHash('sha256');
  hash.update(id.toString());
  return hash.digest('hex');
};

exports.getBoardById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const board = await Board.findOne({ id: hashId(id) });

    if (!board) {
      return res.status(404).json({ message: 'Cannot find any board with ID ' + id });
    }

    res.status(200).json(board);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error });
    }
  }
};

exports.createBoard = async (req: Request, res: Response) => {
  try {
    req.body.id = hashId(req.body.id);
    const board = await Board.create(req.body);
    res.status(200).json(board);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error });
    }
  }
};


exports.updateBoardName = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const board: IBoard | null = await Board.findOneAndUpdate({ id }, { name }, { new: true });
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${id}` });
    }
    res.status(200).json(board);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error });
    }
  }
  };
  
exports.deleteBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const board: IBoard | null = await Board.findOneAndDelete({ id });
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${id}` });
    }
    res.status(200).json(board);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error });
    }
  }
};
  
exports.createCard = async (req: Request, res: Response) => {
  try {
    const { boardId, columnId } = req.params;
    const board: IBoard | null = await Board.findOne({ id: boardId });
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${boardId}` });
    }

    const column: IColumn | undefined = board.columnsData.find((col) => col.id === parseInt(columnId));
    if (!column) {
      return res.status(404).json({ message: `Cannot find any column with ID ${columnId}` });
    }

    const card: ICard = { ...req.body };
    column.items.push(card);

    await board.save();

    res.status(200).json(card);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error });
    }
  }
};
  
exports.updateCard = async (req: Request, res: Response) => {
  try {
    const { boardId, columnId, cardId } = req.params;
    const board: IBoard | null = await Board.findOne({ id: boardId });
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${boardId}` });
    }

    const column: IColumn | undefined = board.columnsData.find((col) => col.id === parseInt(columnId));

    if (!column) {
      return res.status(404).json({ message: `Cannot find any column with ID ${columnId}` });
    }

    const cardIndex: number = column.items.findIndex((c) => c.id === parseInt(cardId));
    if (cardIndex === -1) {
      return res.status(404).json({ message: `Cannot find any card with ID ${cardId}` });
    }

    column.items[cardIndex] = { ...req.body, id: cardId };

    await board.save();

    res.status(200).json(column.items[cardIndex]);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error });
    }
  }
};
  
exports.dragAndDropCard = async (req: Request, res: Response) => {
  try {
    const {
      boardId,
      columnId,
      cardId,
      toColumnId,
      toCardIndexId,
    } = req.params;
    const board: IBoard | null = await Board.findOne({ id: boardId });
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${boardId}` });
    }

    const columnFrom: IColumn | undefined = board.columnsData.find((col) => col.id === parseInt(columnId));
    const columnTo: IColumn | undefined = board.columnsData.find((col) => col.id === parseInt(toColumnId));

    if (!columnFrom || !columnTo) {
      return res.status(404).json({ message: `Cannot find any column with ID ${columnId} or ${columnTo}` });
    }

    const cardIndex: number = columnFrom.items.findIndex((c) => c.id === parseInt(cardId));
    if (cardIndex === -1) {
      return res.status(404).json({ message: `Cannot find any card with ID ${cardId}` });
    }

    const card: ICard = columnFrom.items[cardIndex];
    columnFrom.items.splice(cardIndex, 1);
    columnTo.items.splice(Number(toCardIndexId), 0, card);

    await board.save();

    res.status(200).json(card);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error });
    }
  }
};

exports.deleteCard = async (req: Request, res: Response) => {
  try {
    const { boardId, columnId, cardId } = req.params;
    const board: IBoard | null = await Board.findOne({ id: boardId });
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${boardId}` });
    }

    const column: IColumn | undefined = board.columnsData.find((col) => col.id === parseInt(columnId));
    if (!column) {
      return res.status(404).json({ message: `Cannot find any column with ID ${columnId}` });
    }

    const cardIndex: number = column.items.findIndex((c) => c.id === parseInt(cardId));
    if (cardIndex === -1) {
      return res.status(404).json({ message: `Cannot find any card with ID ${cardId}` });
    }

    const deletedCard: ICard = column.items.splice(cardIndex, 1)[0];

    await board.save();

    res.status(200).json(deletedCard);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: error });
    }
  }
};
