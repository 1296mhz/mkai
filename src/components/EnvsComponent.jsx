import React from "react";
import EnvComponent from "./EnvComponent";

class EnvsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { envTypes, componentId, envs, handlers } = this.props;

        return (
            <>
                {envs.map((env, i) => {
                    console.log(env)
                    return <EnvComponent
                        key={env.id}
                        envId={env.id}
                        collectionInState={env.collectionInState}
                        envKey={env.key}
                        envValue={env.value}
                        envTypes={envTypes}
                        envType={env.type}
                        componentId={componentId}
                        collectionInState={env.collectionInState}
                        parentComponentId={handlers.parentComponentId}
                        changeSelectorHandler={handlers.changeSelectorHandler}
                        deleteEnvComponent={handlers.deleteEnvComponent}
                        changeEnvConfigMapHandler={handlers.changeEnvConfigMapHandler}
                    />
                })}
            </>
        );
    }
}

export default EnvsComponent;