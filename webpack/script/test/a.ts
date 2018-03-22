// 这里是它的用法
// e.x   author: zhaoweilong
const someRouteContainer = asyncRoute(() => import('../componet'), {
  loading: <Loading>loading...</Loading>
})
<Route exact path='/router' componet={someRouteContainer} />

function Loading(props) {
  if (props.error) {
    return <div>Error!</div>;
  } else {
    return <div>Loading...</div>;
  }
}

const asyncRoute = (getComponent, opts) => {
  return class AsyncRoute extends React.Component {
    static Component = null

    state = {
      Component: AsyncRoute.Component,
      error: null,
    }

    componentWillMount() {
      if (!this.state.Component) {
        getComponent()
          .then(module => module.default || module)
          .then(Component => {
            AsyncRoute.Component = Component
            this.setState({ Component })
          })
          .catch(error => {
            this.setState({ error })
          })
      }
    }

    render() {
      const { Component, error } = this.state
      const loading = opts.loading

      if (loading && !Component) {
        return React.createElement(loading, {
          error,
        })
      } else if (Component) {
        return <Component {...this.props}/>
      }
      return null
    }
  }
}




//以前
class ExampleComponent extends React.Component {
  state = {
    derivedData: computeDerivedState(this.props)
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.someValue !== nextProps.someValue) {
      this.setState({
        derivedData: computeDerivedState(nextProps)
      });
    }
  }
}

//以后
class ExampleComponent extends React.Component {
  state = {};

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.someMirroredValue !== nextProps.someValue) {
      return {
        derivedData: computeDerivedState(nextProps),
        someMirroredValue: nextProps.someValue
      };
    }
    return null;
    }
  }
}

