import { Request, Response } from 'express';
import * as podService from '../services/pod.service';

export const createPod = async (req: Request, res: Response) => {
  try {
    const pod = await podService.createPod(req.body);
    res.status(201).json(pod);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getPodById = async (req: Request, res: Response) => {
  try {
    const pod = await podService.getPodById(req.params.id);
    if (pod) {
      res.status(200).json(pod);
    } else {
      res.status(404).json({ message: 'Pod not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePod = async (req: Request, res: Response) => {
  try {
    const pod = await podService.updatePod(req.params.id, req.body);
    res.status(200).json(pod);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePod = async (req: Request, res: Response) => {
  try {
    await podService.deletePod(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPods = async (req: Request, res: Response) => {
  try {
    const pods = await podService.getAllPods();
    res.status(200).json(pods);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
