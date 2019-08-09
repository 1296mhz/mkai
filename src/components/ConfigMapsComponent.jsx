import React from "react";
import ConfigMap from "./ConfigMapComponent";

class ConfigMapsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { configMaps } = this.props;
        return (
            <>
                {configMaps.map((configMap, i) => {
                    return (
                        <ConfigMap 
                        key={configMap.id}
                        id={configMap.id}
                        componentId={configMap.componentId}
                        label={configMap.label}
                        name={configMap.name}
                        env={[]}
                        title="Config Map"
                        configMap={configMap}
                        changeFieldNameConfigMap={configMap.changeFieldNameConfigMap}
                        deleteCopmponentHandler={configMap.deleteCopmponentHandler}
                        panelButton={[{
                            id: 0,
                            name: 'Add Env',
                            handler: configMap.addEnvToConfigMapHandler
                        }]}/>
                    );
                })}
            </>
        );
    }
}

export default ConfigMapsComponent;