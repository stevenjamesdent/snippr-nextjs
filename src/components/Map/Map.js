import { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import classNames from 'classnames';
import clsx from 'clsx';

import styles from './Map.module.scss';

const default_center = { lat: 54.444, lng: -3.988 };

const Map = ({className, style, center = default_center, zoom = 5, radius = { center: { lat: null, lng: null }, miles: null }}) => {
    const class_names = classNames(styles.wrapper, {
        [className]: className,
    });

    const map_ref = useRef();

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
            version: "weekly",
            libraries: ['maps']
        });

        loader.importLibrary('maps').then(({ Map, Circle }) => {
            const map = new Map(map_ref.current, {
                center: (center?.lat && center?.lng) ? center : default_center,
                disableDefaultUI: true,
                disableDoubleClickZoom: true,
                draggable: false,
                mapId: '7acf2550d2c59bdc',
                scrollwheel: false,
                zoom: zoom,
                zoomControl: false,
            });

            if ((center?.lat && center?.lng) && radius?.miles) {
                const circle = new Circle({
                    center: radius.center?.lat ? radius.center : center,
                    fillColor: '#FF6B6B',
                    fillOpacity: 0.15,
                    map: map,
                    radius: radius.miles * 1609.34,
                    strokeColor: '#FF6B6B',
                    strokeOpacity: 1,
                    strokeWeight: 1,
                });

                map.fitBounds(circle.getBounds())
            }
        });
    }, [center, radius, map_ref.current]);

    return (
        <div className={class_names} style={style}>
            <div ref={map_ref} className={styles.map} />
        </div>
    );
};

export default Map;