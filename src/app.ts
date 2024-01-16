var express = require('express');
var cryptoModule  = require('crypto');
var cors = require('cors');
var Board = require('./models/boardModel');
import IBoard from './Interfaces/IBoard';
import IColumn from './Interfaces/IColumn';
import ICard from './Interfaces/ICard';
var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var hashId = function (id: string) {
  var hash = cryptoModule .createHash('sha256');
  hash.update(id.toString());
  return hash.digest('hex');
};

// Get a board by ID
app.get('/board/:id', async function (req: any, res: any) {
  try {
    const id = req.params.id;
    
    const board = await Board.findOne({ id: hashId(id) });

    if (!board) {
      return res.status(404).json({ message: 'Cannot find any board with ID ' + id });
    }

    res.status(200).json(board);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create a board
app.post('/board', async (req: any, res: any) => {
  try {
    req.body.id = hashId(req.body.id);
    const board = await Board.create(req.body);
    res.status(200).json(board);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update a board name
app.put('/board/:id', async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const board: IBoard | null = await Board.findOneAndUpdate({ id }, { name }, { new: true });
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${id}` });
    }
    res.status(200).json(board);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a board
app.delete('/board/:id', async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const board: IBoard | null = await Board.findOneAndDelete({ id });
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${id}` });
    }
    res.status(200).json(board);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create a card
app.post('/card/:boardId/:columnId', async (req: any, res: any) => {
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

    const card: ICard = { ...req.body, id: Date.now().toString() };
    column.items.push(card);

    await board.save();

    res.status(200).json(card);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update a card
app.put('/card/:boardId/:columnId/:cardId', async (req: any, res: any) => {
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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Drag and Drop card
app.patch('/card/:boardId/:columnId/:cardId/:toColumnId/:toCardIndexId', async (req: any, res: any) => {
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

    if (!columnFrom) {
      return res.status(404).json({ message: `Cannot find any column with ID ${columnId}` });
    }

    const cardIndex: number = columnFrom.items.findIndex((c) => c.id === parseInt(cardId));
    if (cardIndex === -1) {
      return res.status(404).json({ message: `Cannot find any card with ID ${cardId}` });
    }

    const card: ICard = columnFrom.items[cardIndex];
    columnFrom.items.splice(cardIndex, 1);
    columnTo?.items.splice(Number(toCardIndexId), 0, card);

    await board.save();

    res.status(200).json(card);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a card
app.delete('/card/:boardId/:columnId/:cardId', async (req: any, res: any) => {
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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

module.exports= app;
