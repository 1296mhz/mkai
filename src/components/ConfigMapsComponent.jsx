import React from "react";
import ConfigMapComponent from "./ConfigMapComponent";

class ConfigMapsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { configMaps } = this.props;
        return (
            <>
                {configMaps.map((configMap, i) => {
                    console.log("configMap ", configMap)
                    return (
                        <ConfigMapComponent 
                        key={configMap.id}
                        id={configMap.id}
                        componentId={configMap.componentId}
                        label={configMap.label}
                        name={configMap.name}
                        envs={configMap.envs}
                        title="Config Map"
                        changeFieldNameConfigMap={configMap.changeFieldNameConfigMap}
                        addEnvToConfigMapHandler={configMap.addEnvToConfigMapHandler}
                        deleteConfigMapComponent={configMap.deleteConfigMapComponent}
                        deleteEnvConfigMapComponent={configMap.deleteEnvConfigMapComponent}
                        changeEnvConfigMapHandler={configMap.changeEnvConfigMapHandler}
                        />
                    );
                })}
            </>
        );
    }
}

export default ConfigMapsComponent;