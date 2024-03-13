import Head from 'next/head'
import Redirect from '@/components/Redirect/Redirect';
import useAppRedirect from '@/hooks/useAppRedirect';

export default function AppRedirect() {
    const [target, error] = useAppRedirect();

    return (
        <>
            <Head>
                <title>SNIPPR - Redirecting...</title>
                <meta name="description" content="The home of SNIPPR and SNIPPR BIZ" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="noindex"></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Redirect error={error} target={target} />
        </>
    )
}