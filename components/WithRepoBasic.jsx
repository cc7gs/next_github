import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Repo from './Repo'
import Link from 'next/link';
import api from '../lib/api'
import { getCache, setCache } from '../lib/repo-cache'
const isServer = typeof window === 'undefined'

export default (Comp, type = 'index') => {
    const Detail = ({ repoBaisc, ...props }) => {
        useEffect(() => {
            if (!isServer) {
                setCache(repoBaisc)
            }
        }, [repoBaisc])

        const router = useRouter();
        // console.log(router, 'router')
        const query = makeQuery(router.query);
        return (
            <div className="root">
                <div className="repo-baisc">
                    <div className="tabs">
                        <Repo {...repoBaisc} />
                        {
                            type === 'index' ?
                                (<span className="tab">Readme</span>)
                                :
                                (
                                    <Link href={`/detail?${query}`}>
                                        <a className="tab index">Readme</a>
                                    </Link>
                                )
                        }
                        {
                            type === 'issues' ?
                                (<span className="tab">Issues</span>)
                                : (
                                    <Link href={`/detail/issues?${query}`}>
                                        <a className="tab issues">Issues</a>
                                    </Link>
                                )
                        }

                    </div>
                </div>
                <Comp {...props} />
                <style jsx>{`
                    .root{
                        padding-top:20px;
                    }
                    .repo-baisc{
                        padding: 20px;
                        border:1px solid #eee;
                        margin-bottom: 20px;
                        border-radius: 5px;
                    }
                    .tabs{
    
                    }
                    .tab + .tab{
                        margin-left: 10px;
                    }
                    `}</style>
            </div>
        )
    }
    Detail.getInitialProps = async (ctx) => {
        const { req, res, query } = ctx;
        const { owner, name } = query
        const full_name = `${owner}/${name}`
        let props = {};
        if (Comp.getInitialProps) {
            props = await Comp.getInitialProps(ctx);
        }
        //?????????????????????????????????
        if (!isServer) {
            const cacheResult = getCache(full_name)
            if (cacheResult) {
                return {
                    ...props,
                    repoBaisc: cacheResult
                }
            }
        }

        const result = await api.request({ url: `/repos/${owner}/${name}` }, req, res)

        return {
            ...props,
            repoBaisc: result,
        }
    }
    return Detail
}
function makeQuery(queryObject) {
    return Object.entries(queryObject)
        .reduce((acc, cur) => ([...acc, cur.join('=')]), [])
        .join('&');
}