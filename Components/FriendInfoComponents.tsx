import classes from '../styles/friendInfo.module.scss';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { friends } from "../Interface/friends";
import axios from "axios";

export default function FriendInfoComponents(infodata:any) {
    // const router = useRouter();
    // const [data, setData] = useState<friends>();
    // const url = `/api/${router.query.friendsId}`;
    
    // useEffect(() => {
    //     axios.get(url)
    //     .then(res => setData(res.data))
    //     .catch(err => console.log(err));
    // }, [url])
    
    return <div className={classes.info_border}>
        <div>생년월일 : {infodata.info.birth}</div>
        <div>번호 : {infodata.info.phone}</div>
        <div className={classes.fnc_border}>
            <Link className={classes.img_box} href="#">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6ttymreoYakJnE6TRuiVftjMVR3c5QdO88Q&usqp=CAU" alt="메시지" />
            </Link>
            <Link className={classes.img_box} href="#">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVaLT0yzqnRruUVciHBmxW23XUhHTh3u0hIg&usqp=CAU" alt="영상통화" />
            </Link>
            <Link className={classes.img_box} href="#">
                <img src="data:image/jpeg;base64,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" alt="통화" />
            </Link>
        </div>
    </div>
}