import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    let income = 0;
    incomes.map(transaction => (income += transaction.value));

    const outcomes = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );
    let outcome = 0;
    outcomes.map(transaction => (outcome += transaction.value));

    const total = income - outcome;
    return new Balance({ income, outcome, total });
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
