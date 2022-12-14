import classes from '../styles/friends.module.scss';
import Link from 'next/link';
import {  useEffect, useRef, useState } from 'react';
import { friendsProps } from '../Interface/friendsProps';
import { friends } from '../Interface/friends';
import axios from 'axios';
import { useRouter } from 'next/router';


export default function FriendsComponents(arr:friendsProps) {
    const searchValue = useRef<HTMLInputElement>(null);
    const [checkSearch, setCheckSearch] = useState(false);
    const [search, setSearch] = useState<String>("");
    const [list, setList] = useState(arr.vals);
    const router = useRouter();

    //함수 정의
    //엔터 또는 백스페이스 입력 시
    const searchFnc = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key == 'Enter') {
            console.log('엔터');
            console.log(searchValue.current?.value)
            searchValue.current!.value !== "" ?
            arr.vals.map(item => {
                if(item.username == searchValue.current!.value) {
                    setSearch(searchValue.current!.value);
                    setCheckSearch(true);
                }
            })
            : setSearch("");
        } else if(e.key == "Backspace") {
            setCheckSearch(false);
        }
    }
    //돋보기 버튼 클릭 시
    const searchClick = () => {
        searchValue.current!.value !== "" ?
        arr.vals.map(item => {
            if(item.username == searchValue.current!.value) {
                setSearch(searchValue.current!.value);
                setCheckSearch(true);
            }
        })
        : setSearch("");
    }
    //정보 삭제
    const deleteInfo = (id:number) => {
        axios.delete('/api/deleteFriends', {
            data: {
                id: id
            }
        })
        .then(res => {
            setList(res.data);
            alert("삭제 완료되었습니다.");
        })
    }
    // 정보 수정
    const editInfo = async (id:number) => {
        router.push({pathname:'/friendFnc', query:{id: id}});
    }
    //검색 인지 아닌지 판별
    if(checkSearch === true) {
        if(search !== "") {
            return <>
            <section className={classes.friends_boder}>
                <section className={classes.search_border}>
                    <input className={classes.input} onKeyUp={searchFnc} ref={searchValue} type="text"/>
                    <img className={classes.img} onClick={searchClick} src="data:image/png;base64,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" alt="search icon"></img>
                </section>
                <ul>
                    {
                        list.map(item => (
                            item.username == search ?
                            <li key={item.id}><Link href={`/friends/${item.id}`}><img src={item.img}/><h3>{item.username}</h3></Link></li>
                            : ""
                        ))
                    }
                </ul>
            </section>
            </>
        } else if(search === "") {
            return <>
            <section className={classes.friends_boder}>
                <section className={classes.search_border}>
                    <input className={classes.input} onKeyUp={searchFnc} ref={searchValue} type="text"/>
                    <img className={classes.img} onClick={searchClick} src="data:image/png;base64,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" alt="search icon"></img>
                </section>
                <ul>
                    {
                        list.map(item => (
                            <li key={item.id}><Link href={`/friends/${item.id}`}><img src={item.img}/><h3>{item.username}</h3></Link></li>
                        ))
                    }
                </ul>
            </section>
            </>
        }
    }
    return <>
        <section className={classes.friends_boder}>
            <section className={classes.search_border}>
                <input className={classes.input} onKeyUp={(e) => searchFnc(e)} ref={searchValue} type="text"/>
                <img className={classes.img} onClick={searchClick} src="data:image/png;base64,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" alt="search icon"></img>
            </section>
            <ul>
                {
                    list.map((item:friends) => (
                        <li key={item.id}>
                            <Link href={`/friends/${item.id}`}><img src={item.img}/><h3>{item.username}</h3></Link>
                            <img onClick={() => {
                                editInfo(item.id)
                            }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9dRVvTc-PBFvPc4wXNJbHByXWWnezEm7Nf8mHJOo&s"></img>
                            <img onClick={() => {
                                deleteInfo(item.id)
                            }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn2rkz-sGf9flCCImyopjkH_onJnhIoZ49zZoTGyA&s'></img>
                        </li>
                    ))
                }
            </ul>
        </section>
    </>
}