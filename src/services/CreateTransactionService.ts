import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionRequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    value,
    type,
  }: CreateTransactionRequestDTO): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (value !== 0 && balance.total < value) {
        throw Error(
          'not be able to create outcome transaction without a valid balance',
        );
      }
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
