import { Observable } from 'rxjs';

export interface IGrpcService {
    getBooks(empty: any): Observable<{books: IBookShort[]}>;
    
    getBookById({id: string}): Observable<IBookFull>;
}

export interface IBookShort {
  id: string,
  title: string,
  image: string
};
  
export interface IBookFull extends IBookShort {
  description: string
  year: string,
};

