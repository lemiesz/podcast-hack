import { Route, Switch } from 'react-router-dom'
import Login from './pages/login/component'
import NavBar from './components/navbar/component'
import { Routes } from './routes'
import useCurrentUser from 'hooks/useCurrentUser'

function App() {
    const currentUser = useCurrentUser()
    if (!currentUser?.id) {
        return <Login />
    }
    return (
        <div className="App w-full h-full">
            <NavBar />
            <main className="overflow-auto w-full h-full">
                <Switch>
                    {Routes.map((item) => (
                        <Route
                            key={item.path}
                            path={item.path}
                            component={item.component}
                            exact={item.exact}
                        />
                    ))}
                </Switch>
            </main>
        </div>
    )
}

export default App
