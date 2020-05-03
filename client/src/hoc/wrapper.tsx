import { Subscribe } from "unstated";
import React from "react";

export interface ApiProps {}

const withApi = <P extends object>(
  WrappedComponent: React.ComponentType<P & ApiProps>
) =>
  class withApi extends React.Component<P> {
    render() {
      return (
        <Subscribe to={[]}>
          {(api: any) => <WrappedComponent api={api} {...this.props} />}
        </Subscribe>
      );
    }
  };

export default withApi;
