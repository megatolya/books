import { Injectable } from '@nestjs/common';

import books from './database';

export interface ISumOfArray {
  sum: number;
}

export interface IBookShort {
  id: string;
  title: string;
  image: string;
}

export interface IBookFull extends IBookShort {
  description: string;
  year: string;
}

const shortify = (book: IBookFull): IBookShort => ({
  id: book.id,
  title: book.title,
  image: book.image,
});

@Injectable()
export class BookService {
  getBookById(id: string): IBookFull {
    if (!(id in books)) {
      throw new Error('Not found'); // TODO 404
    }

    return books[id];
  }

  getBooks(): IBookShort[] {
    return Object.entries(books).map(([id, book]) => shortify(book));
  }

  getSum(nums: number[]): { sum: number } {
    return {
      sum: nums.reduce((sum, num) => sum + num, 0),
    };
  }
}
