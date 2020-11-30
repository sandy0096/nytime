import styles from './../styles/Search.module.css'
import { useState, useEffect } from 'react'
import { MONTHS } from './../data'

const Heading = props => {
    const { heading } = props;
    return <div className={styles.heading}>
        {heading}
    </div>
}

const ArticleBy = props => {
    const { byline } = props;
    return <span className={styles.by}>
        {byline}
    </span>
}

const Article = props => {
    const { content } = props;
    return <p className={styles.articleBody}>{content}
    </p>
}

const Published = props => {
    const { date } = props;
    const d = new Date(date);
    return <span style={{
        color: 'grey',
        fontSize: 12,
        textAlign: 'left',
    }}>
        {MONTHS[d.getMonth()] + ', ' + d.getDate()}
    </span>
}

const SinglePane = props => {
    const { data } = props;
    return <div className={styles.content}>
        <Heading heading={data.headline.main} />
        <Article content={data.abstract} />
        <ArticleBy byline={data.byline.original} />
        <Published date={data.pub_date} />
        <hr style={{ opacity: 0.2, borderRadius: 2, color: '#afb2d5' }} />
    </div>
}

export default function Search(props) {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ page: 0 })

    const update = v => {
        if (v) {

            fetch(process.env.SEARCH + `?q=${v}` + `&page=${pagination.page}` + '&api-key=' + `${process.env.KEY}`)
                .then(res => res.json())
                .then(d => {
                    if (pagination.page === 0) {
                        setData(d.response.docs)
                    }
                    else setData(prevData => [...prevData, ...d.response.docs])
                });
        }
    }

    useEffect(() => {
        setPagination({ ...pagination, page: 0 })
        setData([])
        update(props.value)
    }, [props.value])

    const onNext = _ => {
        const np = { page: pagination.page + 1 }
        setPagination(np);
        update(props.value);
    };

    return <div className={styles.container}>
        {data.length > 0 && data.map((item, i) => {
            return <SinglePane key={i} data={item} />
        })}
        {data.length > 0 ? <div onClick={onNext} className={styles.showmore}>MORE</div> : null}
    </div>
}