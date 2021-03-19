import * as React from 'react';
import { IBookShort } from 'src/grpc.interface';

import './styles.scss';

interface IBookSnippetProps {
  book: IBookShort;
}

export default class BookSnippet extends React.Component<IBookSnippetProps> {
  render() {
    return (
      <a href={`/book/${this.props.book.id}`} className="book-snippet">
        <img className="book-snippet__image" src={this.props.book.image} />
        <div className="book-snippet__title">{this.props.book.title}</div>
      </a>
    );
  }
}
