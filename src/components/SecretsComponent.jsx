import React from "react";
import SecretComponent from "./SecretComponent";

class SecretsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { secrets } = this.props;
        return (
            <>
                {secrets.map((secret, i) => {
                    console.log("secret ", secret)
                    return (
                        <SecretComponent
                            key={secret.id}
                            id={secret.id}
                            componentId={secret.componentId}
                            label={secret.label}
                            name={secret.name}
                            envs={secret.envs}
                            secretType={secret.secretType}
                            secretTypes={secret.secretTypes}
                            envTypes={secret.envTypes}
                            title="Secret"
                            changeFieldNameSecretHandler={secret.changeFieldNameSecretHandler}
                            addEnvToSecretHandler={secret.addEnvToSecretHandler}
                            deleteConfigMapComponent={secret.deleteConfigMapComponent}
                            deleteEnvConfigMapComponent={secret.deleteEnvConfigMapComponent}
                            changeEnvConfigMapHandler={secret.changeEnvConfigMapHandler}
                            changeSelectorTypeHandler={secret.changeSelectorTypeHandler}
                        />
                    );
                })}
            </>
        );
    }
}

export default SecretsComponent;