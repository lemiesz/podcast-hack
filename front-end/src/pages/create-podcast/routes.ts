import CreatePodcastInitial from './components/CreatePodcastInitial'
import { CreatePodcastDetail } from './components/CreatePodcastDetail'

export const CreateRouteMap = {
    createBase: {
        path: '/create',
        component: CreatePodcastInitial,
        exact: true,
    },
    createDetail: {
        path: '/create/:id',
        component: CreatePodcastDetail,
        exact: true,
    },
}

export const RoutesCreate = Object.values(CreateRouteMap)
