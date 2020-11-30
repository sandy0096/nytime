import styles from './../styles/Card.module.css'
import { DAYS } from './../data'
// import Image from 'next/image'

const CardPhoto = props => {
    const { src, alt } = props;
    return <img title={alt} src={src} className={styles.coverImage} alt={alt} />
}

const CardTitle = props => {
    const { title } = props;
    return <div className={styles.cardTitle}>
        {title}
    </div>
}

const CardSub = props => {
    const { subheading } = props;
    return <div className={styles.cardSub}>
        {subheading}
    </div>
};

const CardBy = props => {
    const { byline } = props;
    return <span className={styles.cardBy}>
        {byline}
    </span>
}

const CardPublish = props => {
    const { publish } = props;
    const JD = new Date(publish);
    const date = DAYS[JD.getDay()] + ', ' + JD.getDate() + '/' + JD.getMonth();
    return <span className={styles.cardPublish}>{date}</span>
}


export const Card = props => {
    const { data } = props;
    const { multimedia } = data;
    const photo = !multimedia
        ? 'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/12/04/760969-open-spaces.jpg'
        : multimedia[0].url;
    const alt = !multimedia ? 'Image not present' : multimedia[0].caption;
    return <div className={styles.card}>
        <CardPhoto src={photo} alt={alt} />
        <CardTitle title={data.title} />
        <CardSub subheading={data.abstract} />
        <CardBy byline={data.byline} />
        <CardPublish publish={data.published_date} />
    </div>
}