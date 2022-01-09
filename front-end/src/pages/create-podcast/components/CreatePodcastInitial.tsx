import { Button } from 'components/buttons'
import { LabeledInput } from 'components/forms'
import { useFormik } from 'formik'

export default function CreatePodcastInitial() {
    const formik = useFormik({
        initialValues: {
            podcastName: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        },
    })
    return (
        <div className="flex h-full flex-row container flex-grow">
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
                    />
                    <Button onClick={formik.handleSubmit}>Continue</Button>
                </form>
            </div>
        </div>
    )
}
