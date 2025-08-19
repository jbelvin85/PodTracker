import { Request, Response } from 'express';
import * as deckService from '../services/deck.service';

export const createDeck = async (req: Request, res: Response) => {
  try {
    const deck = await deckService.createDeck(req.body);
    res.status(201).json(deck);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getDeckById = async (req: Request, res: Response) => {
  try {
    const deck = await deckService.getDeckById(req.params.id);
    if (deck) {
      res.status(200).json(deck);
    } else {
      res.status(404).json({ message: 'Deck not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDeck = async (req: Request, res: Response) => {
  try {
    const deck = await deckService.updateDeck(req.params.id, req.body);
    res.status(200).json(deck);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDeck = async (req: Request, res: Response) => {
  try {
    await deckService.deleteDeck(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDecks = async (req: Request, res: Response) => {
  try {
    const decks = await deckService.getAllDecks();
    res.status(200).json(decks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
