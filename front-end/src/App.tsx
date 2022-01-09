import { Route, Switch } from 'react-router-dom'
import Login from './pages/login/component'
import NavBar from './components/navbar/component'
import { Routes } from './routes'
import { auth } from './api'
function App() {
    if (auth.currentUser) {
        // console.log("Redirect");
        return <Login />
    }
    return (
        <div className="App">
            <NavBar />
            <Switch>
                {Routes.map((item) => (
                    <Route
                        key={item.path}
                        path={item.path}
                        component={item.component}
                        exact={true}
                    />
                ))}
            </Switch>
        </div>
    )
}

export default App
