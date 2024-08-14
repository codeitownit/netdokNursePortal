
import AppProvider from "./Provider";

import AllRoutes from "./Routes";

function APP() {
  return (
    <AppProvider>
      <AllRoutes />
    </AppProvider>
  );
}

export default APP;
