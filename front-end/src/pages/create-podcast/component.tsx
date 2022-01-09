import { AnimatePresence, domAnimation, LazyMotion } from 'framer-motion'
import { Route, Switch } from 'react-router-dom'
import { RoutesCreate } from './routes'

export default function CreatePodcast() {
    return (
        <div className="flex justify-center h-full w-full">
            <LazyMotion features={domAnimation}>
                <AnimatePresence exitBeforeEnter>
                    <Switch>
                        {RoutesCreate.map((item) => (
                            <Route {...item}></Route>
                        ))}
                    </Switch>
                </AnimatePresence>
            </LazyMotion>
        </div>
    )
}
