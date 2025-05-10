import Layout, { templates } from '../components/Layout/Layout'

function NotFound() {
    return (
        <Layout template={templates.noLoader} title='404' ></Layout>
    )
}

export default NotFound