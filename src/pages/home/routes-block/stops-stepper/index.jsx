import React, { useMemo } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Stepper, Step, StepLabel, StepContent, Typography, IconButton } from '@material-ui/core';
import { AssignmentTurnedIn, CheckCircleOutline, Directions } from '@material-ui/icons';
import clsx from 'clsx';
import PropTypes from 'prop-types';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > div': {
            padding: theme.spacing(0, 0, 3.5, 0),
            '& > .MuiStepConnector-vertical': {
                marginLeft: theme.spacing(3.5)
            }
        }
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    actionsContainer: {
        marginBottom: theme.spacing(2)
    },
    resetContainer: {
        padding: theme.spacing(3)
    },
    singleStop: {
        padding: theme.spacing(1.5, 2),
        '&.isActive': {
            backgroundColor: fade(theme.palette.primary.main, 0.07)
        }
    },
    stopHeadIcon: {
        '& > svg': {
            '& > circle': {
                display: 'none'
            },
            '& > text': {
                fill: theme.palette.primary.main,
                fontSize: '17px'
            }
        },
        '& > .MuiStepIcon-active': {
            '& > text': {
                fontWeight: 'bold',
                fontSize: '21px'
            }
        }
    },
    stopHeadInner: {
        display: 'flex',
        justifyContent: 'space-between',
        '& > div': {
            display: 'flex',
            flexDirection: 'column'
        },
        '& > div:first-child': {
            width: '70%',
            maxWidth: 'calc(100% - 100px)'
        },
        '& > div:last-child': {
            width: '30%',
            minWidth: '100px',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: theme.spacing(0, 1)
        }
    },
    stopContent: {
        // borderLeft: `2px solid ${theme.palette.primary.main}`
        position: 'relative',
        borderLeft: 'none',
        '&::before': {
            content: '""',
            position: 'absolute',
            width: '3px',
            top: '-10px',
            left: 0,
            height: 'calc(100% + 30px)',
            transform: 'translateX(-50%)',
            backgroundColor: theme.palette.primary.main
        }
    },
    stopContentInner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: '5px',
        borderTop: '1px solid #bdbdbd4f',
        '& > *': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > span': {
                fontSize: '12px'
            }
        }
    }
}));


export default function StopsList({ className, currentStop, nextStep, goToPoint, stops, deliveryStops }) {
    const classes = useStyles();

    function stepFinish() {
        nextStep();

        let nextStop;
        if (currentStop < deliveryStops.length - 1) {
            nextStop = deliveryStops[currentStop + 1];
        } else {
            nextStop = stops[stops.length - 1];
        }

        goToPoint(nextStop.address);
    }

    const contentButton = (text, Icon, handler) => useMemo(() => (
        <Box>
            <IconButton
                color="primary"
                aria-label="Directions"
                onClick={handler}
            >
                <Icon/>
            </IconButton>
            <Typography color="primary" component="span">{text}</Typography>
        </Box>
    ), [handler]);

    return (
        <div className={clsx(classes.root, className)}>
            <Stepper activeStep={currentStop} orientation="vertical">
                {deliveryStops.map((stop, index) => (
                    <Step key={stop.id}
                          className={clsx(classes.singleStop, { 'isActive': currentStop === index })}
                          completed={false}
                          connector={false}
                    >
                        <StepLabel classes={{
                            iconContainer: classes.stopHeadIcon
                        }}
                        >
                            <Box className={classes.stopHeadInner}>
                                <Box>
                                    <Typography component="span" variant="body1">
                                        <small>{stop.information.street}</small>
                                    </Typography>
                                    <Typography component="span" variant="body2">
                                        <small>{stop.information.city}, {stop.information.country}</small>
                                    </Typography>
                                </Box>
                                <Box>
                                    {index < currentStop ? (
                                        <CheckCircleOutline color="primary"/>
                                    ) : (
                                        <>
                                            <Typography component="span" variant="body1">
                                                {stop.arr_time_string || stop.end_time_string}
                                            </Typography>
                                            {stop.time_window_earliest && (
                                                <Typography component="span" variant="body2" noWrap>
                                                    {stop.time_window_earliest} - {stop.time_window_latest}
                                                </Typography>
                                            )}
                                        </>
                                    )}
                                </Box>
                            </Box>
                        </StepLabel>
                        <StepContent className={classes.stopContent}>
                            <Box className={classes.stopContentInner}>
                                {contentButton('Directions', Directions, () => goToPoint(stop.address))}
                                {contentButton('Finish', AssignmentTurnedIn, stepFinish)}
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {currentStop === deliveryStops.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography align="center">{'You\'re done'}</Typography>
                </Paper>
            )}
        </div>
    );
}

StopsList.propTypes = {
    className: PropTypes.string,
    currentStop: PropTypes.number.isRequired,
    nextStep: PropTypes.func.isRequired,
    goToPoint: PropTypes.func.isRequired,
    stops: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    deliveryStops: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

StopsList.defaultProps = {
    className: ''
};