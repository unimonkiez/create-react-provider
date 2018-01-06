import { Component } from 'react';
import PropTypes from 'prop-types';

export default (contextTypes, contextObjectMapFn) => {
  class ReactProviderRenderChildren extends Component {
    static contextTypes = contextTypes;

    static propTypes = {
      render: PropTypes.func.isRequired,
      map: PropTypes.func,
    }

    static defaultProps = {
      map: undefined,
    }

    render() {
      const { render, map } = this.props;

      const contextObj = contextObjectMapFn(this.context);
      const renderParam = map !== undefined ? map(contextObj) : contextObj;

      return render(renderParam);
    }
  }

  return ReactProviderRenderChildren;
};
