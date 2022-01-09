import CreatePodcastInitial from './components/CreatePodcastInitial'
import { CreatePodcastDetail } from './components/CreatePodcastDetail'

export const CreateRouteMap = {
    createBase: {
        key: 'create-base',
        path: '/create',
        component: CreatePodcastInitial,
        exact: true,
    },
    createDetail: {
        key: 'create-detail',
        path: '/create/:id',
        component: CreatePodcastDetail,
        exact: true,
    },
}

export const RoutesCreate = Object.values(CreateRouteMap)
