import Base from '../components/base'
import { Card } from './../components/card'
import Search from './../components/search'
import { useState } from 'react'

export default function Content(props) {
    const { data } = props;
    const [search, setSearch] = useState('')
    const update = v => {
        if (v) setSearch(v);
    }
    return <Base callback={update}>
        {!search && data.results.map((item, i) => {
            return <Card key={i} data={item} />
        })}
        {search && <Search value={search} />}
    </Base>
}

export async function getServerSideProps({ query }) {
    if (process.env.PAGE.indexOf(query.name) < 0) return {
        redirect: {
            destination: '/',
            permanent: false,
        },
    }
    const url = `${process.env.URL}` + `${query.name}.json` + '?api-key=' + `${process.env.KEY}`
    const res = await fetch(url)
    const data = await res.json()

    if (!data) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { data },
    }
}