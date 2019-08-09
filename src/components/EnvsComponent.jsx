import React from "react";
import EnvComponent from "./EnvComponent";

class EnvsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { componentId, deleteEnvConfigMapComponent, envs } = this.props;

        return (
            <>
                {envs.map((env, i) => {
                    return <EnvComponent
                        key={env.id}
                        id={env.id}
                        envKey={env.key}
                        envValue={env.value}
                        componentId={componentId}
                        deleteEnvConfigMapComponent={deleteEnvConfigMapComponent}
                    />
                })}
            </>
        );
    }
}

export default EnvsComponent;