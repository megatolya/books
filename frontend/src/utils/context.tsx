import * as React from 'react';
import { createContext, Component } from 'react';
import type { AppState } from '../client';

interface ProviderProps {
  children: any; // TODO
  initialState: AppState;
}

let _Provider;
let Context;

export const create = (initialState: AppState) => {
  Context = createContext<AppState>(initialState);
  class Provider extends Component<ProviderProps> {
    constructor(props) {
      super(props);
      this.state = {
        ...props.initialState,
      };
    }
    render() {
      return (
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      );
    }
  }
  _Provider = Provider;
  return get();
};

export const get = () => {
  return {
    Provider: _Provider,
    Context,
  };
};
