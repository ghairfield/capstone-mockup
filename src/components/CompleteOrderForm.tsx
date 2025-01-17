import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField, Checkboxes } from 'mui-rff';
import Grid  from '@material-ui/core/Grid';
import { Form } from 'react-final-form'
import {makeStyles} from '@material-ui/core';

export interface CheckoutFormInfo {
    'opt-in':                boolean,
    'first-name':            string,
    'last-name':             string,
    'street-address':        string,
    'postal-code':           string,
    country:                 string,
    phone?:                  string,
    email:                   string,
    'visit-source'?:         string,
    'seating-accommodation': boolean,
    comments?:               string
}

type CompleteOrderFormProps = {
    onSubmit: (formData: CheckoutFormInfo) => any,
    onBack: () => any,
    disabled: boolean,
    donationForm?: boolean
}

const required = (value: any) => (value ? undefined : 'Required')

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// ...don't ask (because I don't know)
function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = re.test(String(email).toLowerCase());
    return valid ? undefined : "Invalid e-mail"
}

const useStyles = makeStyles({
    pageTitle: {
        marginBottom: "0.5em"
    },
    contactTitle: {}
})

export default function CompleteOrderForm({onSubmit, onBack, disabled, donationForm}: CompleteOrderFormProps) {
    const classes = useStyles()
    return (<>
        <Typography variant="h4" gutterBottom className={classes.contactTitle}>Contact</Typography>
        <Form 
            onSubmit={onSubmit}
            initialValues={{"opt-in": false, "seating-accommodation": false}}
            render={({ handleSubmit, values, valid }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField fieldProps={{validate: required}} required name="first-name" label="First Name" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fieldProps={{validate: required}} required name="last-name" label="Last Name" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fieldProps={{validate: required}} required name="street-address" label="Street Address" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fieldProps={{validate: required}} required name="postal-code" label="Postal Code" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fieldProps={{validate: required}} required name="country" label="Country" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name="phone" label="Phone" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fieldProps={{validate: validateEmail}} required name="email" label="Email" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="visit-source" label="How did you hear about us?" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <Checkboxes name="opt-in" data={{ label: 'I would like to recieve email info from portland playhouse', value: true }} />
                        </Grid>
                        {!donationForm && <Grid item xs={12}>
                            <Checkboxes name="seating-accommodation" data={{ label: 'I need seating accommodations', value: true }} />
                        </Grid>
                        }
                        <Grid item xs={12}>
                            <TextField name="comments" label="Comments" variant="outlined" fullWidth multiline/>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" onClick={onBack} fullWidth>Back</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button disabled={disabled || !valid} type="submit" variant="contained" color="primary" fullWidth>Next</Button>
                        </Grid>
                    </Grid>
                    {false && JSON.stringify(values)}
                </form>
            )}
        />
    </>)}
