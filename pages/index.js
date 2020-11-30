import styles from '../styles/Home.module.css'
import Base from './../components/base';
import { Card } from './../components/card'
import { useState } from 'react'
import Search from './../components/search'

export default function Home(props) {
	const { data } = props;
	const [ search, setSearch ] = useState('')
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

export async function getServerSideProps() {
	const url = `${process.env.URL}` + "home.json" + '?api-key=' + `${process.env.KEY}`
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
