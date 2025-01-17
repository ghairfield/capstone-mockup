import {
    Button,
    Grid,
    InputAdornment,
    FormControl,
    makeStyles,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core';
import {selectDonation, setDonation} from '../features/donationSlice';
import { appSelector, useAppDispatch } from '../app/hooks'
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& :first-child': {
            marginTop: 0,
        },
        '& p': {
            marginTop: theme.spacing(2),
        },
    },
    heading: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(5),
    },
    donationForm: {
        display: 'flex',
        marginTop: '15px',
        marginBottom: '15px',
    },
    donationField: {
        width: '100%',
    },
    donationBtn: {
        marginLeft: theme.spacing(3),
    },
}))

export default function DonationPage({onNext}: {onNext: () => any}) {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const donation = appSelector(selectDonation)
    const [amount, setAmount] = useState(0)

    useEffect(() => { setAmount(donation) }, [donation])

    return(
        <div className={classes.root}>
            <Typography component='h1' variant='h4' className={classes.heading}>
                Everyone has something they bring to the table.
            </Typography>
            <Typography variant='body1'>
                <b>Artists</b> bring open hearts, creativity, and bucketfuls of talent. <b>Volunteers</b> give time pouring beer, rolling towels, and seating patrons. Green thumbed <b>neighbors</b> keep up our garden. Staff members use their skills to make the theatre hum. <b>Audience</b> members come through the doors with their curiosity and a sense of wonder. And our <b>donors</b> give us the essential financial support we need to thrive.     
            </Typography>
            <Typography>
                Our theatre is a testament to the power of friends and neighbors coming together to create something special!
            </Typography>


            <Typography component='h2' variant="h4" className={classes.heading}>
                Please consider making a donation
            </Typography>

            <div className={classes.donationForm}>
                <FormControl className={classes.donationField}>
                    <TextField
                        label="donation amount"
                        onChange={e => setAmount(+e.target.value)} 
                        type="number" 
                        value={amount || undefined}
                        fullWidth
                        variant="outlined"
                        InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
                    />
                </FormControl>

                <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    className={classes.donationBtn}
                    onClick={() => {
                        if (amount >= 0) {
                            dispatch(setDonation(amount));
                        }
                        onNext();
                    }}
                >
                    Continue
                </Button>
            </div>
        </div>
    )
}
