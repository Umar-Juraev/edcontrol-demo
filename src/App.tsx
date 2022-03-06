import React, { FC, Suspense } from "react";
import { Route } from "react-router-dom";

import routes from "routes";
import { Layout } from "components/shared";
import "./App.scss";
  
const App: FC = () => {

  return (
    <div className="App">
      <Layout>
        <Suspense fallback="">
          {routes.map(({ exact, path, component, ...rest }, key) => (
            <Route {...{ exact, key, path, component, ...rest }} />
          ))}
        </Suspense>
      </Layout>
    </div >
  );
};

export default App;
