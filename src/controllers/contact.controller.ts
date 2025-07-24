import { Request, Response, NextFunction } from 'express';
import { processContact } from '../services/contact.service';
import { validateContactRequestBody } from '../utils/validator';
import { Error } from 'mongoose';

export const contactController = async (req: Request, res: Response) => {
  try {
    
    const {email,phoneNumber}= validateContactRequestBody(req.body)
    const result = await processContact(email,phoneNumber);
    
    res.status(200).json(result);
  
  } catch (err) {
    res.status(400).json({message: err})
  }
};