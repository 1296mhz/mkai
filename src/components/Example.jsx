import React from 'react';
import { findIndex, filter } from "lodash";
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ControlShelfComponent from './ControlShelfComponent';
import BaseFieldsComponent from './BaseFieldsComponent';
import { map, set } from "lodash";



const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    buttonStyle: {
        margin: theme.spacing(2)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        width: '100%',
        flexGrow: 1,
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
}
);

class StackComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainFields: {
                hostnameId: "1",
                hostnameLabel: "Hostname",
                hostname: "",
                namespaceId: "2",
                namespaceLabel: "Namespace",
                namespace: "",
                branchId: "3",
                branchLabel: "Branch",
                branch: ""
            },
            configMaps: {},
        };
        this.addComponentHadler = this.addComponentHadler.bind(this);
    }

    addComponentHadler(){
        const d = new Date();
        const id = d.getTime();
        console.log("Add id " + id)
        // let newState = Object.assign({}, this.state);
        // newState.configMap[id] = {
            // name: "залупа"
        // }
        console.log(this.state);
        this.setState({...this.state, configMaps: {
            ...this.state.configMaps,
            [id]: {
                name: "zalupa",
                envs: {
                }
            },
        }});
        console.log(this.state)
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Paper className={classes.paper}>
                    <Grid item >
                        <Grid item xs>
                            <Typography variant="h6" gutterBottom>
                                Kubernetes Application Integrate
                                </Typography>
                        </Grid>
                        <Grid container item xs>
                            <ControlShelfComponent
                                shelf={[
                                    { id: 1, icon: 'no_encryption', handler: this.addComponentHadler },
                                ]}
                            />
                        </Grid>
                        <Divider />
                        <BaseFieldsComponent fields={
                            [
                                {
                                    id: this.state.mainFields.namespaceId,
                                    name: "namespace",
                                    label: this.state.mainFields.namespaceLabel,
                                    value: this.state.mainFields.namespace,
                                    handler: this.changeFieldHandler
                                },
                                {
                                    id: this.state.mainFields.hostnameId,
                                    name: "hostname",
                                    label: this.state.mainFields.hostnameLabel,
                                    value: this.state.mainFields.hostname,
                                    handler: this.changeFieldHandler
                                },
                                {
                                    id: this.state.mainFields.branchId,
                                    name: "branch",
                                    label: this.state.mainFields.branchLabel,
                                    value: this.state.mainFields.branch,
                                    handler: this.changeFieldHandler
                                }
                            ]
                        } />
                        {
                            map(this.state.configMaps, (item, index)=>{
                                console.log(index)
                                console.log(item)
                            })
                        }

                    </Grid>
                    <Divider />
                    <Button onClick={this.saveStateHandler} color="primary" className={classes.buttonStyle}>
                        Save
                    </Button>

                </Paper>
            </>
        )
    }

}

export default withStyles(styles)(StackComponent);