import { signInWithGoogle } from "./firebase";

class User {
  constructor({ name, email, uid, podcasts }) {
    // name string
    this.name = name;
    // string
    this.email = email;
    // unique string
    this.id = uid;
    // array of refrences to podcasts
    this.podcasts = podcasts || [];
  }
}

class Podcast {
  constructor({ name, descrtion, fileLocation, id, relatedAds }) {
    // string
    this.name = name;
    // string
    this.descrtion = descrtion;
    // unique storage url for this podcast
    this.fileLocation = fileLocation;
    // unique id of podcast
    this.id = id;
    // a list of related ads with timestamps
    this.relatedAds = relatedAds;
  }
}

function wrapInPromise(obj) {
  return new Promise((resolve) => {
    return resolve(obj);
  });
}

class Api {
  async login({ provider }) {
    switch (provider) {
      case "google":
      default:
        return await signInWithGoogle();
    }
  }

  logout() {
    return wrapInPromise(true);
  }

  /**
   * This is called when a user attempt to upload a podcast
   */
  uploadPodcast({
    // Buffer of sound file of type File
    fileRef,
    // string
    name,
    // string
    description,
  }) {
    alert("This has not be implemented yet");
    return wrapInPromise(
      new Podcast({
        name: "fake",
        descrtion: "this is the description of the podcast",
        fileLocation: "file.com",
        id: "123",
      })
    );
  }

  getPodcast({
    // uniqe id that refresnces this podcast
    id,
  }) {
    return wrapInPromise(
      new Podcast({
        name: "fake",
        descrtion: "this is the description of the podcast",
        fileLocation: "file.com",
        id: "123",
      })
    );
  }

  /**
   * Define on advertisment associated with podcast
   */
  defineAdOnPodcast({ podcastId, name, timeStartMs, timeEndMs, adFileRef }) {
    return wrapInPromise(true);
  }

  /**
   * Creates a new spliced together sound file containing
   * the new ads that we wanted to splice in.
   *
   * Returns a url refrence of that sound file.
   */
  publishPodcast({ id }) {
    return wrapInPromise("https://sound.com");
  }
}

export default new Api();
