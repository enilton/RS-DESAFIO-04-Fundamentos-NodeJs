import { Router } from 'express';

import TransactionRepository from '../repositories/TransactionsRepository';

import CreateTransactionService from '../services/CreateTransactionService';
import GetTransactionWithBalance from '../services/GetTransactionsWithBalanceService';

const transactionRouter = Router();
const transactionRepository = new TransactionRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const getTransactionWithBalance = new GetTransactionWithBalance(
      transactionRepository,
    );
    const all = getTransactionWithBalance.execute();
    return response.json(all);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const createTransactionService = new CreateTransactionService(
      transactionRepository,
    );
    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
