import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BookService } from './book.service';
import type { ISumOfArray, IBookShort, IBookFull } from './book.service';

interface INumberArray {
  data: number[];
}

@Controller()
export class AppController {
  constructor(private readonly books: BookService) {}

  @GrpcMethod('AppController', 'getBookById')
  getBookById({id}: {id: string}): IBookFull {
    return this.books.getBookById(id);
  }

  @GrpcMethod('AppController', 'getBooks')
  getBooks(): {books: IBookShort[]} {
    return {
      books: this.books.getBooks()
    };
  }
}
