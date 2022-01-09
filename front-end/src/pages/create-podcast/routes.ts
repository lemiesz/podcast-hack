import { Route } from 'routes'
import CreatePodcastInitial from './components/CreatePodcastInitial'
import { CreatePodcastDetail } from './components/CreatePodcastDetail'

export const RoutesCreateMap: Record<string, Route> = {
    createBase: {
        path: '/create',
        component: CreatePodcastInitial,
        exact: true,
    },
    createDefault: {
        path: '/create/:id',
        component: CreatePodcastDetail,
        exact: true,
    },
}

export const RoutesCreate = Object.values(RoutesCreateMap)
