import { Button } from '../../components/buttons'

function AddPodcast() {
    return (
        <div className="flex-col justify-center mt-10 p-5 bg-white rounded-md border-2 border-gray-200 shadow-sm ">
            <div className="flex flex-col gap-2 justify-center items-center">
                <h2 className="font-bold text-xl my-0">No Podcasts</h2>
                <p className="font-Merriweather mt-0">
                    Get Started by adding your first podcast
                </p>
                <Button onClick={() => alert('implement me')}>
                    Add New Podcast
                </Button>
            </div>
        </div>
    )
}
export default function PodcastsPage() {
    return (
        <div className="container flex-col p-8">
            <h1 className="text-3xl">Podcasts</h1>
            <AddPodcast />
        </div>
    )
}
