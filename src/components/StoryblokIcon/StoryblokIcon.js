const StoryblokIcon = ({className, style, source, size = 25}) => {
    const icon_src = source.replace('//a.storyblok.com', '//a2.storyblok.com');

    return (
        <div
            className={className}
            style={{
                ...style,
                backgroundColor: 'currentcolor',
                height: size,
                mask: `url(${icon_src}) no-repeat center / contain`,
                WebkitMask: `url(${icon_src}) no-repeat center / contain`,
                width: size,
            }}
        />
    );
};

export default StoryblokIcon;