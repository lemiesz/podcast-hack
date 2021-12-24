import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from 'firebase/firestore'
export interface User {
    readonly name: string
    readonly email: string
    readonly id: string
    readonly podcasts: Podcast[]
}

export class UserConverter implements FirestoreDataConverter<User> {
    toFirestore(
        modelObject: any,
        options?: any
    ): import('@firebase/firestore').DocumentData {
        return {
            name: modelObject.name,
            email: modelObject.email,
            podcasts: modelObject.podcasts,
        }
    }
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options?: SnapshotOptions
    ): User {
        const data = snapshot.data()
        return {
            name: data.name,
            email: data.email,
            id: snapshot.id,
            podcasts: data.podcasts,
        }
    }
}

export class Podcast {
    readonly name: string
    readonly description: string
    readonly fileLocation: string
    readonly id: string
    readonly relatedAds: any[]
    constructor({ name, description, fileLocation, id, relatedAds }: Podcast) {
        // string
        this.name = name
        // string
        this.description = description
        // unique storage url for this podcast
        this.fileLocation = fileLocation
        // unique id of podcast
        this.id = id
        // a list of related ads with timestamps
        this.relatedAds = relatedAds
    }
}

export type DefinedAuthProviders = 'google' | 'facebook'
