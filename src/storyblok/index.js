// --------------------------------------
// --------------- Blocks ---------------
// --------------------------------------

import AccordionsBlock from "./blocks/Accordions";
import AppStripBlock from "./blocks/AppStrip";
import BannerBlock from "./blocks/Banner"
import CardsBlock from "./blocks/Cards";
import CarouselBlock from "./blocks/Carousel";
import CtaBannerBlock from "./blocks/CtaBanner";
import CtaStripBlock from "./blocks/CtaStrip";
import DividerBlock from "./blocks/Divider";
import FeaturesBlock from "./blocks/Features";
import FormBlock from "./blocks/Form";
import LogoBlock from "./blocks/Logo";
import MarqueeBlock from "./blocks/Marquee";
import MediaBlock from "./blocks/Media";
import WysiwygBlock from "./blocks/Wysiwyg";

const blocks = {
    accordions: AccordionsBlock,
    app_strip: AppStripBlock,
    banner: BannerBlock,
    cards: CardsBlock,
    carousel: CarouselBlock,
    cta_banner: CtaBannerBlock,
    cta_strip: CtaStripBlock,
    divider: DividerBlock,
    features: FeaturesBlock,
    form: FormBlock,
    logo: LogoBlock,
    marquee: MarqueeBlock,
    media: MediaBlock,
    wysiwyg: WysiwygBlock,
};

// --------------------------------------


// -------------------------------------
// --------------- Types ---------------
// -------------------------------------

import Page from "./types/Page";

const types = {
    page: Page,
};

// -------------------------------------


// ------------------------------------------
// --------------- Universals ---------------
// ------------------------------------------

const universals = {};

// ------------------------------------------

export const bloks = {
    ...blocks,
    ...types,
    ...universals,
};