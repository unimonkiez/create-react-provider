# Create react provider
[![npm version](https://badge.fury.io/js/create-react-provider.svg)](https://badge.fury.io/js/create-react-provider)[![Build Status](https://travis-ci.org/unimonkiez/create-react-provider.svg?branch=master)](https://travis-ci.org/unimonkiez/create-react-provider)

## Introdution
Providers are a powerful tools in react, we all have used them by popular libraries such as `redux`, `mobx`, `material-ui`.  

The thing is, providers can be created even for a smaller purpose than data management and UI library, you can create `ModalManager`, `translations` injections, `NotificationManager` and so much more!  

This library creates a Provider for you to use, and a [Hoc](https://reactjs.org/docs/higher-order-components.html) and a [`RenderChildrenComponent`](https://medium.com/tandemly/im-breaking-up-with-higher-order-components-44b0df2db052) for you to use in your sub-components.

## Usage
* Install
  ```bash
    npm install --save create-react-provider
    # or yarn
    yarn add create-react-provider
  ```
* import and use!
  ```js
  import createReactProvider from 'create-react-provider';
  import PropTypes from 'prop-types';

  const {
    Provider: ThemeProvider,
    Hoc: ThemeHoc,
    RenderChildren: ThemeRenderChildren,
  } = createReactProvider({
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
  });

  // ****************
  // Use provider in top layer of your react app
  // ****************
  class App extends Component {
    render () {
      return (
        <ThemeProvider>
          <SomeComponent />
        </ThemeProvider>
      );
    }
  }

  // ****************
  // Consume provided props in either way (Hoc or renderChildren)
  // ****************

  // renderChildren way
  class SomeComponentUsingRenderChildren extends Component {
    render() {
      return (
        <ThemeRenderChildren
          render={({ primaryColor: backgroundColor, secondaryColor: titleColor }) => (
            <div style={{ backgroundColor }}>
              <h1 style={{ color: titleColor }}>
                I'm a title!
              </h1>
            </div>
          )}
        />
      );
    }
  }

  // Higher order component way
  @ThemeHoc(ctx => ({
    titleColor: ctx.primaryColor,
    backgroundColor: ctx.secondaryColor,
  }))
  class SomeComponentUsingHoc extends Component {
    render() {
      const { titleColor, backgroundColor } = this.props;

      return (
        <div style={{ backgroundColor }}>
          <h1 style={{ color: titleColor }}>
            I'm a title!
          </h1>
        </div>
      );
    }
  }

  // You can override Hoc props
  <SomeComponentUsingHoc /> // Will use titleColor from provider
  <SomeComponentUsingHoc titleColor="red" /> // Will use from given prop
  ```
