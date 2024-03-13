export const get_snipper_profiles = async (slug = null) => {
    try {    
        const response = await fetch(`${process.env.NEXT_PUBLIC_SNIPPR_API_URL}/web/profiles${slug ? `/${slug}` : ''}`);
        const data = await response.text() ?? null;
        return data?.length ? JSON.parse(data) : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}