import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    getDoc,
    updateDoc,
} from 'firebase/firestore'
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
    readonly userCollection = collection(db, 'users').withConverter(
        new UserConverter()
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
        // First create the podcast refrence
        const podcastResult = await addDoc(this.podcastCollection, {
            name,
            owner: userId,
            status: 'draft',
        } as any)

        // add the auto generated id back to the podcast. There might be a better way of doing this
        await updateDoc(podcastResult, { id: podcastResult.id })

        // then update hte current user to include the new podcast
        const currentUser = doc(this.userCollection, userId)
        updateDoc(currentUser, { podcasts: arrayUnion(podcastResult.id) })
        return podcastResult.id
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

    async getPodcasts(ids: string[]) {
        const results = (
            await Promise.all(
                ids.map((id) =>
                    this.getPodcast({ id }).catch((e) =>
                        console.error('Could not get podcast', e)
                    )
                )
            )
        ).filter((r) => r !== null || r !== undefined)
        return results
    }

    async getPodcast({ id }: { id?: string }) {
        if (!id) {
            throw new Error('No id provided')
        }
        const data = await getDoc(doc(this.podcastCollection, id))
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
