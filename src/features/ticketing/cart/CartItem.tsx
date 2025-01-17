import { useState, useEffect } from 'react'
import { editItemQty, selectNumAvailable, CartItem } from '../ticketingSlice'
import { appSelector, useAppDispatch } from '../../../app/hooks'
import { IconButton, Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import theme from '../../../theme'
import { toDollarAmount } from '../../../utils'

interface CartRowProps {item: CartItem, removeHandler: (id: number) => void}
const CartRow = ({item, removeHandler}: CartRowProps) => {
    const dispatch = useAppDispatch()
    const classes = useStyles(theme)
    const [cost, setCost] = useState(item.price * item.qty)
    const numAvailable = appSelector(state => selectNumAvailable(state, item.product_id))

    useEffect(() => setCost(item.qty * item.price), [item.qty])

    const decrement = () => {
        if (item.qty > 1) {
            dispatch(editItemQty({id: item.product_id, qty: item.qty-1}))
        } else {
            removeHandler(item.product_id)
        }
    }

    const handleIncrement = () => {
        if (numAvailable && item.qty < numAvailable) {
            dispatch(editItemQty({id: item.product_id, qty: item.qty+1}))
        }
    }

    return (
        <Paper elevation={1} className={classes.cartItem}>
            <img src={item.product_img_url} className={classes.image} alt='foo'/>
            <span className={classes.itemDescriptors}>
                <Typography
                    component='h2'
                    variant='body2'
                    color='textPrimary'
                    className={classes.itemName}
                >
                    {item.name}
                </Typography>
                <p>{item.desc}</p>
            </span>

            <div className={classes.qtyPicker}>
                <IconButton aira-label={`remove one ${item.name} to cart`} onClick={decrement}>
                    <RemoveOutlinedIcon />
                </IconButton>
                <span className={classes.qtyValue}>{item.qty}</span>
                <IconButton aria-label={`add one ${item.name} to cart`} onClick={handleIncrement}>
                    <AddOutlinedIcon />
                </IconButton>
            </div>

            {toDollarAmount(cost)}
            <IconButton
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => removeHandler(item.product_id)}
            >
                <CloseOutlinedIcon />
            </IconButton>
        </Paper>
    )
}
export default CartRow


const useStyles = makeStyles(() => 
    createStyles({
        cartItem: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 30px',
            margin: '15px',
        },
        image: {
            width: '150px',
            borderRadius: '3px',
        },
        itemDescriptors: {
            width: '250px',
            color: 'rgb(64, 88, 96)',
        },
        itemName: {
            fontSize: '1.1rem',
            fontWeight: 'bold',
        },
        qtyValue: {
            fontSize: '1.2rem',
            border: 'none',
            margin: '1.2rem',
        },
        qtyPicker: {
            width: '100px',
            display: 'flex',
            alignItems: 'center',
        },
    })
)


