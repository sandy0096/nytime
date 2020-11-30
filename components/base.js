import styles from './../styles/Base.module.css'
import React, { useRef } from 'react'
import { SECTION_TOPIC } from './../data'
import Link from 'next/link'
import { DAYS } from './../data'
import { MONTHS } from './../data'

const Search = props => {
    const { callback } = props;
    const inputEl = useRef(null)
    return <>
        <input type='search' className={styles.searchNews} placeholder='SEARCH' ref={inputEl} />
        <button style={{
            backgroundColor: '#567b95',
            marginLeft: 10,
            height: 29,
            border: 0,
            color: '#fff',
            borderRadius: 4
        }} onClick={() => callback(inputEl.current.value)}>OK</button>
    </>
}

const Heading = props => {
    const { callback } = props;
    return <>
        <div className={styles.title}><Today />The New York Times</div>
        <Search callback={callback} />
    </>
};

const Section = _ => {
    return <>
        <hr style={{ opacity: 0.5 }} />
        <div className={styles.section}>
            {SECTION_TOPIC.map((item, index) => {
                return <Link key={index} href={item.path}>
                    <span className={styles.subsect}>{item.name}</span>
                </Link>
            })}
        </div>
        <hr />
    </>
};

const Container = props => {
    const { children } = props;
    return <div className={styles.contentContainer}>{children}</div>
}

const Today = _ => {
    const date = new Date();
    return <span className={styles.today}>
        {DAYS[date.getDay()] + ', ' + MONTHS[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()}
    </span>
}

export default function Base(props) {
    const { children, callback } = props;
    return <div className={styles.container}>
        <Heading callback={callback} />
        <Section />
        <Container>
            {children}
        </Container>
    </div >
}