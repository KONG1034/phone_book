import { useEffect, useState } from 'react';
import { myprofile } from '../Interface/myprofile';
import { myprofileProps } from '../Interface/myprofileProps';
import classes from '../styles/myprofile.module.scss';

export default function MyProfileComponents(arr:myprofileProps) {
    const [data,setData] = useState<myprofile>();
    
    //내 정보 파라미터로 받기
    useEffect(() => {
        setData(arr.vals);
    }, [arr])

    return <>
        <section className={classes.profile}>
            <div className={classes.img_div}>
                {
                    <img className={classes.img} src={data?.img} alt="MyImg"/>
                }
            </div>
            <div className={classes.my_name}>
                {
                    <h2>{data?.username}</h2>
                }
            </div>
        </section>
    </>
}