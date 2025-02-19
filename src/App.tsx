import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home'
import NotFound from './pages/not-found'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="step-3" element={<StepThree />}> */}
      </Routes>

    </BrowserRouter>
  )
}

export default App
