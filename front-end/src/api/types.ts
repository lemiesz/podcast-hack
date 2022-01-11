import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from 'firebase/firestore'
import * as yup from 'yup'
export interface User {
    readonly name: string
    readonly email: string
    readonly id: string
    readonly podcasts: string[]
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

enum PodcastStatus {
    draft = 'draft',
    published = 'published',
}
export let podcastSchema = yup.object().shape({
    status: yup
        .string()
        .required()
        .oneOf(Object.values(PodcastStatus))
        .default('draft'),
    name: yup
        .string()
        .required('A podcast name is required')
        .min(10, 'Name must be at least 10 characters long.')
        .max(120, 'Name must be less than 120 characters long.'),
    owner: yup.string().required(),
    description: yup.string().nullable(),
    fileLocation: yup.string().url(),
    id: yup.string().required(),
    relatedAds: yup.array().nullable(),
    keywords: yup.array().nullable(),
    seriesNum: yup.number().positive().nullable(),
    episodeNum: yup.number().positive().nullable(),
})
export interface Podcast extends yup.InferType<typeof podcastSchema> {}
export class PodcastConverter implements FirestoreDataConverter<Podcast> {
    toFirestore(
        modelObject: Podcast,
        options?: any
    ): import('@firebase/firestore').DocumentData {
        return podcastSchema.omit(['id']).validateSync(modelObject)
    }
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options?: SnapshotOptions
    ): Podcast {
        const data = snapshot.data()
        return podcastSchema.validateSync(data)
    }
}

export type DefinedAuthProviders = 'google' | 'facebook'
