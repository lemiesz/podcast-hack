import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Login from './components/login/component'
import NavBar from './components/navbar/component'
import { Routes } from './routes'
import { userSelector } from './store/user'

function App() {
    const user = useSelector(userSelector)

    if (user.id === '') {
        // console.log("Redirect");
        return <Login />
    }
    return (
        <div className="App">
            <NavBar />
            <Switch>
                {Routes.map((item) => (
                    <Route
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
