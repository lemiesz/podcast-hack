import { Route, Switch } from 'react-router-dom'
import { RoutesCreate } from './routes'

export default function CreatePodcast() {
    return (
        <div className="flex justify-center h-full w-full">
            <Switch>
                {RoutesCreate.map((item) => (
                    <Route {...item}></Route>
                ))}
            </Switch>
        </div>
    )
}
