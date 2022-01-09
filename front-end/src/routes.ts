import { ComponentType, LazyExoticComponent } from 'react'
import UploadPodcast from './pages/upload-podcast'
import TestSoundView from './components/sound-view/test-page'
import PodcastsPage from './pages/podcasts-page/component'
import CreatePodcast from 'pages/create-podcast/component'

export interface Route {
    path: string
    component: ComponentType | LazyExoticComponent<any>
    exact: boolean
}

export const RoutesMapBase = {
    podcasts: {
        path: '/',
        component: PodcastsPage,
        exact: true,
    },
    upload: {
        path: '/upload',
        component: UploadPodcast,
        exact: true,
    },
    create: {
        path: '/create',
        component: CreatePodcast,
        // use exact: false to allow /create/:id to match /create. This is useful since create is a nested Route
        // internal routeing is defeined in the create-podcast module
        exact: false,
    },
    testSoundView: {
        path: '/test-sound-view',
        component: TestSoundView,
        exact: true,
    },
}

export const Routes: Route[] = Object.values(RoutesMapBase)
