import { Button } from 'components/buttons'
import { LabeledInput } from 'components/forms'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import { getCreateDetailRoute } from '../routes'
import { animationCommon } from './animation-common'
import * as Yup from 'yup'
import { api, podcastSchema } from 'api'
import useCurrentUser from 'hooks/useCurrentUser'

/**
 *  The intial state of the form. This is displayed to a user before any database entry is created.
 *  Once the user enters the required information, the form is submitted to the database. This should create the podcast
 *  in a draft state, and give it a unique ID.
 *
 *  From there the user can edit the podcast, and then publish it.
 */

export default function CreatePodcastInitial() {
    const history = useHistory()
    const currentUser = useCurrentUser()
    const formik = useFormik({
        initialValues: {
            podcastName: '',
        },
        validationSchema: Yup.object().shape({
            podcastName: podcastSchema.fields.name.clone(),
        }),
        onSubmit: async (values) => {
            if (!currentUser.id) {
                throw Error(
                    'Should not be attempting to create a podcast when no current user is logged in.'
                )
            }
            const id = await api.createNewPodcast(
                values.podcastName,
                currentUser.id
            )
            history.push(getCreateDetailRoute(id))
        },
    })
    return (
        <motion.div
            key="create-podcast-initial"
            {...animationCommon}
            className="flex h-full flex-row container flex-grow"
        >
            <div className="flex flex-col w-1/2 pt-48 gap-11 bg-purple-600 p-10">
                <h1 className="text-4xl font-bold text-white">
                    <span>Lets Give Your</span>
                    <br />
                    <span>Podcast a Name</span>
                </h1>
                <p className="text-white">
                    Dont worry, you can always change this later...
                </p>
            </div>
            <div className="flex flex-col w-1/2 pt-48 p-10">
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <LabeledInput
                        id="podcastName"
                        label="Podcast Title"
                        type="text"
                        placeholder="Enter a title for your podcast"
                        onChange={formik.handleChange}
                        value={formik.values.podcastName}
                        error={formik.errors.podcastName}
                    />
                    <Button type="submit">Continue</Button>
                </form>
            </div>
        </motion.div>
    )
}
