import * as React from 'react';
import { IBookFull } from 'src/grpc.interface';

import './styles.scss';

interface IBookProps {
  book: IBookFull;
}

export default class BookSnippet extends React.Component<IBookProps> {
  render() {
    return (
        <div className="book">
            <h1 className="book__title">{this.props.book.title}</h1>
            <img 
                className="book__image"
                src={this.props.book.image} 
            />
            <div className="book__year">{this.props.book.year}</div>
            <div className="book__description">{this.props.book.description}</div>
        </div>
    );
  }
}
