import { get_snipper_profiles } from "@/utils/profiles";

const generate_sitemap = (profiles) => {
    const apex_domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

    const get_profile_xml = () => profiles?.map((id) => (`
        <url>
            <loc>https://${id}.${apex_domain}</loc>
        </url>
    `))?.join('') ?? '';

    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://${apex_domain}</loc>
            </url>
            <url>
                <loc>https://${apex_domain}/snippr</loc>
            </url>
            <url>
                <loc>https://${apex_domain}/snippr-biz</loc>
            </url>
            <url>
                <loc>https://${apex_domain}/contact</loc>
            </url>
            <url>
                <loc>https://${apex_domain}/founder-scheme</loc>
            </url>
            ${get_profile_xml()}
        </urlset>
    `;
}

const SiteMap = () => {

}

export async function getServerSideProps({ res }) {
    const profiles = await get_snipper_profiles();
    const sitemap = generate_sitemap(profiles);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
    
    return {
        props: {},
    };
}

export default SiteMap;