import { api, Podcast } from 'api'
import placeholder from 'assets/placeholder.png'
import LabelTable from 'components/tables/label-table'
import { motion } from 'framer-motion'
import useCurrentUser from 'hooks/useCurrentUser'
import {
    CreateRouteMap,
    getCreateDetailRoute,
} from 'pages/create-podcast/routes'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RoutesMapBase } from 'routes'
import { StoreState } from 'store'
import podcastsSlice from 'store/podcast'
import { LinkButton } from '../../components/buttons'

function AddPodcast() {
    return (
        <div className="flex-col justify-center mt-10 p-5 bg-white rounded-md border-2 border-gray-200 shadow-sm ">
            <div className="flex flex-col gap-2 justify-center items-center">
                <h2 className="font-bold text-xl my-0">No Podcasts</h2>
                <p className="font-Merriweather mt-0">
                    Get Started by adding your first podcast
                </p>
                <LinkButton to={RoutesMapBase.create.path}>
                    Add New Podcast
                </LinkButton>
            </div>
        </div>
    )
}

interface PodcastCardProps {
    podcast: Podcast
}
function PodcastCard({ podcast }: PodcastCardProps) {
    return (
        <div>
            <div className="flex flex-col md:flex-row border-gray-200 border-2 p-3 rounded-lg shadow-sm gap-3">
                <div className="rounded-md">
                    <img
                        className="rounded-md w-44 h-44"
                        src={placeholder}
                        alt=""
                    />
                </div>
                <div className="flex flex-col justify-start items-start gap-2 p-4">
                    <h4 className="text-2xl tex-bold">{podcast.name}</h4>
                    {podcast.status === 'draft' && (
                        <LinkButton to={getCreateDetailRoute(podcast.id)}>
                            Continue Editing
                        </LinkButton>
                    )}
                </div>
            </div>
        </div>
    )
}
function DisplayPodcasts() {
    const podcasts = useSelector((state: StoreState) => state.podcasts)
    const podcastArray = Object.values(podcasts)
    return (
        <div className="flex flex-col gap-4">
            {podcastArray.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
        </div>
    )
}
export default function PodcastsPage() {
    const user = useCurrentUser()
    const podcasts = useSelector((state: StoreState) => state.podcasts)
    const podcastArray = Object.values(podcasts)
    const dispatch = useDispatch()
    const hasPodcasts = podcastArray.length > 0

    useEffect(() => {
        api.getPodcasts(user.podcasts).then((result) => {
            dispatch(
                podcastsSlice.actions.setPodcasts(
                    result.reduce((acc, curr) => {
                        if (!curr) {
                            return acc
                        }
                        return {
                            ...acc,
                            [curr.id]: curr,
                        }
                    }, {})
                )
            )
        })
    }, [dispatch, user])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="container flex flex-col p-8 justify-center m-auto"
        >
            <h1 className="text-3xl text-bold">Podcasts</h1>
            <div className="flex flex-col md:flex-row gap-3 mt-7">
                <div className="flex flex-col md:w-5/6 grid-4">
                    {!hasPodcasts && <AddPodcast />}
                    {hasPodcasts && <DisplayPodcasts />}
                </div>
                <LabelTable label="Actions" className="hidden md:flex max-h-52">
                    <div className="p-3">
                        <LinkButton to={CreateRouteMap.createBase.path}>
                            Create New Podcast
                        </LinkButton>
                    </div>
                </LabelTable>
                <div className="mt-14 md:hidden">
                    <LinkButton to={CreateRouteMap.createBase.path}>
                        Create New Podcast
                    </LinkButton>
                </div>
            </div>
        </motion.div>
    )
}
