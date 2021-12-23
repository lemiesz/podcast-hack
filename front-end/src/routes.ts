import { ComponentType, LazyExoticComponent } from 'react'
import { Home } from './components/home/component'
import UploadPodcast from './components/upload-podcast'
import TestSoundView from './components/sound-view/test-page'

interface Route {
    path: string
    component: ComponentType | LazyExoticComponent<any>
    exact: boolean
}

export const Routes: Route[] = [
    {
        path: '/',
        component: Home,
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
