import classes from '../styles/friends.module.scss';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { friends } from '../Interface/friends';


export default function FriendsComponents() {
    const [list, setList] = useState<friends[]>([]);
    const url = '/api/friends';
    
    useEffect(() => {
        axios.get(url)
        .then(res => setList(res.data))
        .catch(err => console.log(err));
    }, [url])

    return <>
    <ul>
        {
            list?.map(item => (
                <li key={item.id}><Link href={`/friends/${item.id}`}><img src={item.img}/><h3>{item.username}</h3></Link></li>
            ))
        }
    </ul>
    </>
}