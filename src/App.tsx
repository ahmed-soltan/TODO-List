import { Provider } from "react-redux";
import ListProvider from "./components/providers/listProvider";
import Home from "./pages/Home";
import store from "./features/tasks";

function App() {
  return (
    <Provider store={store}>
      <ListProvider>
        <Home />
      </ListProvider>
    </Provider>
  );
}

export default App;
