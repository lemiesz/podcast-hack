import { Route, Switch, useLocation } from 'react-router-dom'
import { RoutesCreate } from './routes'

export default function CreatePodcast() {
    const location = useLocation()
    return (
        <div className="flex justify-center h-full w-full">
            <Switch location={location} key={location.pathname}>
                {RoutesCreate.map((item) => (
                    <Route {...item} key={item.key} />
                ))}
            </Switch>
        </div>
    )
}
