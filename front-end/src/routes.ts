import { ComponentType, LazyExoticComponent } from 'react'
import UploadPodcast from './pages/upload-podcast'
import TestSoundView from './components/sound-view/test-page'
import PodcastsPage from './pages/podcasts-page/component'

interface Route {
    path: string
    component: ComponentType | LazyExoticComponent<any>
    exact: boolean
}

export const Routes: Route[] = [
    {
        path: '/',
        component: PodcastsPage,
        exact: true,
    },
    {
        path: '/upload',
        component: UploadPodcast,
        exact: true,
    },
    {
        path: '/test-sound-view',
        component: TestSoundView,
        exact: true,
    },
]
