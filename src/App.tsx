import { Route, Switch, useLocation } from 'react-router-dom'
import Login from './pages/login/component'
import NavBar from './components/navbar/component'
import { Routes } from './routes'
import useCurrentUser from 'hooks/useCurrentUser'
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'

function App() {
    const currentUser = useCurrentUser()
    const location = useLocation()
    if (!currentUser?.id) {
        return <Login />
    }
    return (
        <div className="App w-full h-full">
            <NavBar />
            <main className="overflow-auto w-full h-full">
                <LazyMotion features={domAnimation}>
                    <AnimatePresence exitBeforeEnter>
                        <Switch location={location} key={location.pathname}>
                            {Routes.map((item) => (
                                <Route
                                    key={item.path}
                                    path={item.path}
                                    component={item.component}
                                    exact={item.exact}
                                />
                            ))}
                        </Switch>
                    </AnimatePresence>
                </LazyMotion>
            </main>
        </div>
    )
}

export default App
