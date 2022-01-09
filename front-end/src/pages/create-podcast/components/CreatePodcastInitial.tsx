import { Button } from 'components/buttons'
import { LabeledInput } from 'components/forms'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import { CreateRouteMap } from '../routes'
import { animationCommon } from './animation-common'
import * as Yup from 'yup'

/**
 *  The intial state of the form. This is displayed to a user before any database entry is created.
 *  Once the user enters the required information, the form is submitted to the database. This should create the podcast
 *  in a draft state, and give it a unique ID.
 *
 *  From there the user can edit the podcast, and then publish it.
 */
export default function CreatePodcastInitial() {
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            podcastName: '',
        },
        validationSchema: Yup.object().shape({
            podcastName: Yup.string()
                .required('A podcast name is required')
                .min(10, 'Name must be at least 10 characters long.')
                .max(120, 'Name must be less than 120 characters long.'),
        }),
        onSubmit: (values) => {
            history.push(
                `${CreateRouteMap.createDetail.path.replace(':id', '2')}`
            )
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
                <form
                    className="space-y-6"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <LabeledInput
                        id="podcastName"
                        label="Podcast Title"
                        type="text"
                        placeholder="Enter a title for your podcast"
                        onChange={formik.handleChange}
                        value={formik.values.podcastName}
                        error={formik.errors.podcastName}
                    />
                    <Button onClick={formik.handleSubmit}>Continue</Button>
                </form>
            </div>
        </motion.div>
    )
}
