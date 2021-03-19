import { join } from 'path';

import { Get, Controller, Render as NestRender, Logger, OnModuleInit, Body, Post, Param } from '@nestjs/common';
import {Client, ClientGrpc, Transport, ClientOptions } from '@nestjs/microservices';

import { ReactService } from './react.service';
import { IBookShort, IGrpcService } from './grpc.interface';

import type { Page } from './react.service';

const RenderReact = () => NestRender('app');

interface IReactPage {
  reactApp: string
}

// TODO should it be common?
const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:3001',
    package: 'app',
    protoPath: join(__dirname, '../../proto/app.proto'),
  }
};

@Controller()
export class AppController implements OnModuleInit {
  private logger = new Logger('FrontendController');

  @Client(microserviceOptions)
  private client: ClientGrpc;

  private booksService: IGrpcService;

  constructor(private readonly reactService: ReactService) {}

  onModuleInit() {
    this.booksService = this.client.getService<IGrpcService>('AppController');
  }

  @Get()
  @RenderReact()
  async getMainPage(): Promise<IReactPage> {
    let books: IBookShort[] = [];

    try {
      books = (await this.booksService.getBooks({}).toPromise()).books;
    } catch (err) {
      console.log(err);
    }
    return this.reactService.renderApp({
      initialState: {
        page: 'main' as unknown as Page,
        books
      }
    });
  }
  
  @Get('/book/:id')
  @RenderReact()
  async getBookPage(@Param('id') bookId): Promise<IReactPage> {
    let book = null;
    try {
      book = await this.booksService.getBookById({id: bookId}).toPromise();
    } catch (err) {
      console.log(err, '<<<<<,');
    }
    
    return this.reactService.renderApp({
      initialState: {
        page: 'book' as unknown as Page,
        book
      }
    })
  }

  @Post('test-sum')
  async accumulate(@Body('data') data: number[]) {
    this.logger.log('accumulate called on client with: ' + data);
    return this.booksService.accumulate({data});
  }
 }
