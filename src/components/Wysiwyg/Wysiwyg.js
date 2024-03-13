import Content from "../Content/Content";

const Wysiwyg = ({content}) => {
    return (
        <section className='section gutter'>
            <Content>
                <Content.Html data={content} />
            </Content>
        </section>
    );
};

export default Wysiwyg;