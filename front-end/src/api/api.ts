import { doc, getDoc, addDoc, collection } from 'firebase/firestore'
import {
    db,
    DefinedAuthProviders,
    PodcastConverter,
    signInWithProviderPopup,
    UserConverter,
} from '.'

function wrapInPromise(obj: any) {
    return new Promise((resolve) => {
        return resolve(obj)
    })
}

class Api {
    readonly podcastCollection = collection(db, 'podcasts').withConverter(
        new PodcastConverter()
    )
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
     * Creates a new podcast entity within the
     * @returns id of the new podcast
     */
    async createNewPodcast(name: string, userId: string) {
        const doc = await addDoc(this.podcastCollection, {
            name,
            owner: userId,
            status: 'draft',
        } as any)
        return doc.id
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
