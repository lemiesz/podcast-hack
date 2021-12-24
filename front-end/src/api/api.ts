import { doc, getDoc } from 'firebase/firestore'
import {
    db,
    DefinedAuthProviders,
    signInWithProviderPopup,
    UserConverter,
} from '.'
import { Podcast } from './types'

function wrapInPromise(obj: any) {
    return new Promise((resolve) => {
        return resolve(obj)
    })
}

class Api {
    async login({ provider }: { provider: DefinedAuthProviders }) {
        switch (provider) {
            case 'google':
            case 'facebook':
                return await signInWithProviderPopup(provider)
            default:
                throw new Error(`Provider ${provider} is not supported`)
        }
    }

    logout() {
        return wrapInPromise(true)
    }

    /**
     * This is called when a user attempt to upload a podcast
     */
    uploadPodcast({
        // Buffer of sound file of type File
        fileLocation,
        // string
        name,
        // string
        description,
    }: Omit<Podcast, 'id'>) {
        alert('This has not be implemented yet')
        return wrapInPromise(
            new Podcast({
                name: 'fake',
                description: 'this is the description of the podcast',
                fileLocation: 'file.com',
                id: '123',
                relatedAds: [],
            })
        )
    }

    async getUserData({ id }: { id?: string }) {
        if (!id) {
            throw Error('Must provide valid id for user')
        }
        const user = await getDoc(
            doc(db, 'users', id).withConverter(new UserConverter())
        )

        return user.exists() ? user.data() : null
    }

    async getPodcast({ id }: { id?: string }) {
        if (!id) {
            throw new Error('No id provided')
        }
        const data = await getDoc(doc(db, 'podcasts', id))
        return data.exists() ? data.data() : null
    }

    /**
     * Define on advertisment associated with podcast
     */
    defineAdOnPodcast({
        podcastId,
        name,
        timeStartMs,
        timeEndMs,
        adFileRef,
    }: any) {
        return wrapInPromise(true)
    }

    /**
     * Creates a new spliced together sound file containing
     * the new ads that we wanted to splice in.
     *
     * Returns a url refrence of that sound file.
     */
    publishPodcast({ id = '' }) {
        return wrapInPromise('https://sound.com')
    }
}

export default new Api()
