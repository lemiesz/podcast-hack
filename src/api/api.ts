import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    getDoc,
    onSnapshot,
    setDoc,
    updateDoc,
} from 'firebase/firestore'
import {
    getDownloadURL,
    ref,
    StorageReference,
    uploadBytesResumable,
    UploadTask,
} from 'firebase/storage'
import {
    db,
    DefinedAuthProviders,
    Podcast,
    PodcastConverter,
    signInWithProviderPopup,
    storage,
    User,
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

    // Root folder for a podcast
    readonly podcastRootFolderRef = ref(storage, 'podcasts')

    // Podcast are store with all related items in the same package, keyed by id
    readonly podcastPackageRef = (id: string) =>
        ref(this.podcastRootFolderRef, id)

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

    async setUserData(id: string, email: string, name: string) {
        const newUser = doc(this.userCollection, id)
        await setDoc(newUser, {
            id,
            email,
            name,
            podcasts: [],
        })
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

    subscribeToUser(uid: string, cb: (user: User) => void) {
        return onSnapshot(doc(this.userCollection, uid), (snap) => {
            const user = snap.data()
            if (!user) {
                throw Error(
                    'Could not find user data for current authenticated user.'
                )
            }
            cb(user)
        })
    }

    async storeImage(
        file: File,
        relatedPodcastId: string,
        progressCb?: (n: number) => void
    ) {
        return this.resumableUpload(
            ref(this.podcastPackageRef(relatedPodcastId), file.name),
            file
        )
    }

    async storePodcast(
        file: File,
        relatedPodcastId: string,
        progressCb?: (n: number) => void
    ) {
        return this.resumableUpload(
            ref(this.podcastPackageRef(relatedPodcastId), file.name),
            file
        )
    }

    private async resumableUpload(
        toStoreIn: StorageReference,
        file: File,
        progressCb?: (n: number) => void
    ) {
        return new Promise<UploadTask>((resolve, reject) => {
            const task = uploadBytesResumable(toStoreIn, file)
            task.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    switch (snapshot.state) {
                        case 'running':
                            progressCb && progressCb(progress)
                            return
                    }
                },
                (error) => {
                    reject(error)
                },
                () => {
                    resolve(task)
                }
            )
        })
    }

    async storageLoactionToUrl(location: string) {
        return getDownloadURL(ref(storage, location))
    }

    async updatePodcast(podcast: Podcast) {
        await updateDoc(doc(this.podcastCollection, podcast.id), {
            ...podcast,
            status: 'published',
        } as Podcast)
    }
}

export default new Api()
