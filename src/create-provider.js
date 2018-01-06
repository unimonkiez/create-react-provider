import guid from 'uuid/v4';
import { Component } from 'react';
import PropTypes from 'prop-types';
import getHoc from './get-hoc.js';
import getRenderChildren from './get-render-children.js';

export default (contextTypesObj) => {
  const contextObjectName = `context-provider-${guid()}`;
  const contextObjectMapFn = ctx => ctx[contextObjectName];
  const contextTypes = {
    [contextObjectName]: PropTypes.shape(contextTypesObj),
  };
  class ReactProvider extends Component {
    static childContextTypes = contextTypes;

    static propTypes = {
      children: PropTypes.node,
      ...contextTypesObj,
    };

    static defaultProps = {
      children: undefined,
    };

    getChildContext() {
      // Filtering out children
      // eslint-disable-next-line no-unused-vars
      const { children, ...otherProps } = this.props;
      return {
        [contextObjectName]: otherProps,
      };
    }
    render() {
      return this.props.children;
    }
  }

  return {
    Provider: ReactProvider,
    Hoc: getHoc(contextTypes, contextObjectMapFn),
    RenderChildren: getRenderChildren(contextTypes, contextObjectMapFn),
  };
};
