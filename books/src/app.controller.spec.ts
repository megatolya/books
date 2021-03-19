import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { BookService } from './book.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [BookService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return 10 books', () => {
      expect(appController.getBooks().books).toHaveLength(10);
    });

    it('should return book', () => {
      expect(appController.getBookById({ id: 'keep-sharp' })).toEqual({
        id: 'keep-sharp',
        year: '2021',
        title: 'Keep Sharp: Build a Better Brain at Any Age',
        description:
          'Throughout our life, we look for ways to keep our mind sharp and effortlessly productive. Now, globetrotting neurosurgeon Dr. Sanjay Gupta offers insights from top scientists all over the world, whose cutting-edge research can help you heighten and protect brain function and maintain cognitive health at any age.',
        image: '/images/2.jpg',
      });
    });
  });
});
