export class User {
    readonly name: string
    readonly email: string
    readonly id: string
    readonly podcasts: Podcast[]
    constructor({ name, email, id, podcasts }: User) {
        // name string
        this.name = name
        // string
        this.email = email
        // unique string
        this.id = id
        // array of refrences to podcasts
        this.podcasts = podcasts || []
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

export type DefinedAuthProviders = 'google'
