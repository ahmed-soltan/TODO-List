import ListProvider from "./components/providers/listProvider";
import Home from "./pages/Home";

function App() {
  return (
    <ListProvider>
      <Home />
    </ListProvider>
  );
}

export default App;
