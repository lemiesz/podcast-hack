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

export function getCreateDetailRoute(id: string) {
    return CreateRouteMap.createDetail.path.replace(':id', id)
}

export const RoutesCreate = Object.values(CreateRouteMap)
