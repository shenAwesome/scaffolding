import * as React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { MapWidget } from './util/MapWidget'

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';
import XYZ from 'ol/source/XYZ';

function initMap(target) {
    var styles = [
        'Road',
        //'RoadOnDemand',
        //'Aerial',
        //'AerialWithLabels',
        //'collinsBart',
        //'ordnanceSurvey'
    ];
    var layers = [];
    var i, ii;
    for (i = 0, ii = styles.length; i < ii; ++i) {
        layers.push(new TileLayer({
            visible: true,
            preload: Infinity,
            source: new BingMaps({
                key: 'AmITitsdQDqkWIPcggVg5cCnNPiTZVrPN4ajsskMDt6Or47jnGgZsRbA2y0K2CtT',
                imagerySet: styles[i]
                // use maxZoom 19 to see stretched tiles instead of the BingMaps
                // "no photos at this zoom level" tiles
                //maxZoom: 19
            })
        }));
    }
    var map = new Map({
        layers: layers,
        // Improve user experience by loading tiles while dragging/zooming. Will make
        // zooming choppy on mobile or slow devices.
        loadTilesWhileInteracting: true,
        target: target,
        view: new View({
            center: [-6655.5402445057125, 6709968.258934638],
            zoom: 13
        })
    });
    console.log(map)
    return map
}
class Main extends React.Component {
    render() {
        const { classes } = this.props as any
        return <div className={classes.full}>
            <MapWidget id='map2' initMap={initMap} />
        </div>
    }
}

//set styles 
//set styles 
const Map2 = withStyles((theme => {
    console.log(theme.mixins.toolbar)
    return {
        button: {
            margin: theme.spacing.unit,
        },
        full: {
            height: 'calc(100vh - 56px)',
            [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
                height: 'calc(100vh - 48px)'
            },
            [theme.breakpoints.up('sm')]: {
                height: 'calc(100vh - 64px)'
            }
        }
    }
}) as any)(Main) as any

export { Map2 }