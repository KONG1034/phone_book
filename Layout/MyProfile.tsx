import classes from '../styles/myprofile.module.scss';
import MyProfileComponents from '../Components/MyProfileComponents';

export default function MyProfile() {
    return <>
        <section className={classes.profile}>
            <MyProfileComponents/>
        </section>
    </>
}