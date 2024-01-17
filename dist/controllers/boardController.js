"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cryptoModule = require('crypto');
var Board = require('../models/boardModel');
const hashId = (id) => {
    const hash = cryptoModule.createHash('sha256');
    hash.update(id.toString());
    return hash.digest('hex');
};
exports.getBoardById = async (req, res) => {
    try {
        const id = req.params.id;
        const board = await Board.findOne({ id: hashId(id) });
        if (!board) {
            return res.status(404).json({ message: 'Cannot find any board with ID ' + id });
        }
        res.status(200).json(board);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error });
        }
    }
};
exports.createBoard = async (req, res) => {
    try {
        req.body.id = hashId(req.body.id);
        const board = await Board.create(req.body);
        res.status(200).json(board);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error });
        }
    }
};
exports.updateBoardName = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const board = await Board.findOneAndUpdate({ id }, { name }, { new: true });
        if (!board) {
            return res.status(404).json({ message: `Cannot find any board with ID ${id}` });
        }
        res.status(200).json(board);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error });
        }
    }
};
exports.deleteBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const board = await Board.findOneAndDelete({ id });
        if (!board) {
            return res.status(404).json({ message: `Cannot find any board with ID ${id}` });
        }
        res.status(200).json(board);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error });
        }
    }
};
exports.createCard = async (req, res) => {
    try {
        const { boardId, columnId } = req.params;
        const board = await Board.findOne({ id: boardId });
        if (!board) {
            return res.status(404).json({ message: `Cannot find any board with ID ${boardId}` });
        }
        const column = board.columnsData.find((col) => col.id === parseInt(columnId));
        if (!column) {
            return res.status(404).json({ message: `Cannot find any column with ID ${columnId}` });
        }
        const card = { ...req.body, id: Date.now().toString() };
        column.items.push(card);
        await board.save();
        res.status(200).json(card);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error });
        }
    }
};
exports.updateCard = async (req, res) => {
    try {
        const { boardId, columnId, cardId } = req.params;
        const board = await Board.findOne({ id: boardId });
        if (!board) {
            return res.status(404).json({ message: `Cannot find any board with ID ${boardId}` });
        }
        const column = board.columnsData.find((col) => col.id === parseInt(columnId));
        if (!column) {
            return res.status(404).json({ message: `Cannot find any column with ID ${columnId}` });
        }
        const cardIndex = column.items.findIndex((c) => c.id === parseInt(cardId));
        if (cardIndex === -1) {
            return res.status(404).json({ message: `Cannot find any card with ID ${cardId}` });
        }
        column.items[cardIndex] = { ...req.body, id: cardId };
        await board.save();
        res.status(200).json(column.items[cardIndex]);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error });
        }
    }
};
exports.dragAndDropCard = async (req, res) => {
    try {
        const { boardId, columnId, cardId, toColumnId, toCardIndexId, } = req.params;
        const board = await Board.findOne({ id: boardId });
        if (!board) {
            return res.status(404).json({ message: `Cannot find any board with ID ${boardId}` });
        }
        const columnFrom = board.columnsData.find((col) => col.id === parseInt(columnId));
        const columnTo = board.columnsData.find((col) => col.id === parseInt(toColumnId));
        if (!columnFrom) {
            return res.status(404).json({ message: `Cannot find any column with ID ${columnId}` });
        }
        const cardIndex = columnFrom.items.findIndex((c) => c.id === parseInt(cardId));
        if (cardIndex === -1) {
            return res.status(404).json({ message: `Cannot find any card with ID ${cardId}` });
        }
        const card = columnFrom.items[cardIndex];
        columnFrom.items.splice(cardIndex, 1);
        columnTo?.items.splice(Number(toCardIndexId), 0, card);
        await board.save();
        res.status(200).json(card);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error });
        }
    }
};
exports.deleteCard = async (req, res) => {
    try {
        const { boardId, columnId, cardId } = req.params;
        const board = await Board.findOne({ id: boardId });
        if (!board) {
            return res.status(404).json({ message: `Cannot find any board with ID ${boardId}` });
        }
        const column = board.columnsData.find((col) => col.id === parseInt(columnId));
        if (!column) {
            return res.status(404).json({ message: `Cannot find any column with ID ${columnId}` });
        }
        const cardIndex = column.items.findIndex((c) => c.id === parseInt(cardId));
        if (cardIndex === -1) {
            return res.status(404).json({ message: `Cannot find any card with ID ${cardId}` });
        }
        const deletedCard = column.items.splice(cardIndex, 1)[0];
        await board.save();
        res.status(200).json(deletedCard);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error });
        }
    }
};
//# sourceMappingURL=boardController.js.map