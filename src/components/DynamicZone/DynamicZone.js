import Banner from "../Banner/Banner";
import ContactForm from "../ContactForm/ContactForm";
import Hero from "../Hero/Hero";
import Wysiwyg from "../Wysiwyg/Wysiwyg";

const get_block_component = ({__component, ...props}, i) => {
    let Block;

    switch (__component) {
        case 'blocks.banner':
            Block = Banner;
            break;
        case 'blocks.hero':
            Block = Hero;
            break;
        case 'blocks.wysiwyg':
            Block = Wysiwyg;
            break;
        case 'blocks.form':
            Block = ContactForm;
            break;
    }

    return Block ? <Block key={'block-' + i} {...props} /> : null;
}

const DynamicZone = ({blocks}) => {
    return (
        <div>
            {blocks && blocks.map(get_block_component)}
        </div>
    );
};

DynamicZone.defaultProps = {
    blocks: [],
};

export default DynamicZone;