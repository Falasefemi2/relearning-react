import { Provider } from "react-redux"
import { store } from "./services/store"
import Header from "./components/Header"
import TaskForm from "./components/TaskForm"
import FilterBar from "./components/FilterBar"
import TaskList from "./components/TaskList"


function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Header />
          <TaskForm />
          <FilterBar />
          <TaskList />
        </div>
      </div>
    </Provider>
  )
}

export default App