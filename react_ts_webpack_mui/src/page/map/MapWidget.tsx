import * as React from 'react'

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import 'ol/ol.css';

//AmITitsdQDqkWIPcggVg5cCnNPiTZVrPN4ajsskMDt6Or47jnGgZsRbA2y0K2CtT

interface MapWidgetProps {
    id?: string,
    initMap?: (target: HTMLElement) => Map
}

const Maps: { [id: string]: Map } = {}
const MapContext = {
    extent: null
}

class MapWidget extends React.Component<MapWidgetProps>{

    static defaultProps = {
        id: 'myMap',
        initMap: (target) => {
            return new Map({
                target: target,
                layers: [
                    new TileLayer({
                        source: new XYZ({
                            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        })
                    })
                ],
                view: new View({
                    center: [0, 0],
                    zoom: 2
                })
            })
        }
    }

    setupMap() {
        const target = this.mapDiv.current
        if (!this.map) {
            Maps[this.props.id] = this.props.initMap(target)
        } else {
            this.map.setTarget(target)
        }
    }

    get map() {
        return Maps[this.props.id] as Map
    }

    onResize = () => {
        this.map.updateSize()
    }

    componentDidMount() {
        this.setupMap()
        if (MapContext.extent) {
            this.map.getView().fit(MapContext.extent, {
                nearest: true
            })
        }
        window.addEventListener('resize', this.onResize)
    }
    componentWillUnmount() {
        const extent = this.map.getView().calculateExtent()
        //console.log(extent)
        //need to handle different projection
        MapContext.extent = extent
        window.removeEventListener('resize', this.onResize)
    }

    mapDiv = React.createRef<HTMLDivElement>()
    render() {
        return (
            <div className="mapDiv" ref={this.mapDiv}></div>
        );
    }
}

export { MapWidget }