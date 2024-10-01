import { MainLayout } from "./components";
import { useTitleHook } from "./hooks/useTitleHook";

function App() {
  useTitleHook();

  return <MainLayout />;
}

export default App;

