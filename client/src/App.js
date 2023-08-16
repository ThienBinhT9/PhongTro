import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { publicRouter, userRouter } from './router/index'
import Home from './pages/Home'
import User from './pages/User';


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/*' element={<Home />}>
            {publicRouter.map((router, index) => {
              const Comp = router.element
              return <Route key={index} path={router.path} element={<Comp />}/>
             })}
          </Route> 
          <Route path='/user/:userId/' element={<User />}>
            {userRouter.map((router, index) => {
              const Comp = router.element
              return <Route key={index} path={router.path} element={<Comp />}/>
            })}
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
