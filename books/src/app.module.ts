import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BookService } from './book.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [BookService],
})
export class AppModule {}
