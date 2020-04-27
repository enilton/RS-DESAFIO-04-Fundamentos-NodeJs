import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface GetTransactionsWithBalanceRequestDTO {
  transactions: Transaction[];
  balance: Balance;
}

class GetTransactionsWithBalance {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): GetTransactionsWithBalanceRequestDTO {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();

    const obj: GetTransactionsWithBalanceRequestDTO = {
      transactions,
      balance,
    };

    return obj;
  }
}

export default GetTransactionsWithBalance;
