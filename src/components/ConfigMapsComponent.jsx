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
                            collectionInState={configMap.collectionInState}
                            name={configMap.name}
                            envs={configMap.envs}
                            envTypes={configMap.envTypes}
                            changeFieldNameConfigMap={configMap.changeFieldNameConfigMap}
                            changeSelectorHandler={configMap.changeSelectorHandler}
                            addEnvToComponentHandler={configMap.addEnvToComponentHandler}
                            deleteComponent={configMap.deleteComponent}
                            deleteEnvComponent={configMap.deleteEnvComponent}
                            changeEnvConfigMapHandler={configMap.changeEnvConfigMapHandler}
                        />
                    );
                })}
            </>
        );
    }
}

export default ConfigMapsComponent;