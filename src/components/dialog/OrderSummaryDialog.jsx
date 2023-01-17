import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useDispatch, useSelector } from "react-redux"
import { selectIsOrderStatusLoading, selectOrderStatusResponse, selectOrderSummaryInfo, selectTotalValueOfItemsLoaded } from "../../features/order/order.slice"
import OrderItemCard from "../card/OrderItemCard"
import { OrderAddressForm } from "../form/OrderAddressForm"
import { postOrder } from "../../features/order/order.saga"
import { generatePDF } from "../pdf/generatePdfFromOrder"

export const OrderSummaryDialog = ({ open, handleClose, }) => {
    const dispatch = useDispatch();
    const orderedItems = useSelector(selectOrderSummaryInfo);
    const totalValueOfOrder = useSelector(selectTotalValueOfItemsLoaded);
    const isOrderStatusLoading = useSelector(selectIsOrderStatusLoading);
    const orderResponse = useSelector(selectOrderStatusResponse);

    const RenderOrderItems = ({ orderItems }) => orderItems.map((prop, key) => <OrderItemCard orderItem={prop} key={key.toString()} />)
    const onPlaceOrder = (user) => {
        const orderObj = { orderedItems, user }
        dispatch(postOrder(orderObj))
    }

    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                {orderResponse ? `Order ${orderResponse.orderId}` : 'Order Summary'}
            </DialogTitle>
            {
                !isOrderStatusLoading && !orderResponse ?
                    <DialogContent>
                        <DialogContentText>
                            {orderedItems.length > 0 ? 'Enter payment information and Complete Your order' : 'Cart is Empty'}
                        </DialogContentText>
                        <Box>
                            <RenderOrderItems orderItems={orderedItems} />
                        </Box>
                        <Box sx={{ marginY: 3 }}>
                            <Typography variant='h5'>
                                Total Value: ${totalValueOfOrder.toFixed(2)}
                            </Typography>
                        </Box>
                        <Divider />
                        <Typography variant='h6'>
                            Shipping Address
                        </Typography>
                        {
                            orderedItems.length > 0 && <OrderAddressForm onPlaceOrder={onPlaceOrder} />
                        }
                    </DialogContent>
                    :
                    <DialogContent>
                        <Box sx={{ marginY: 3 }}>
                            {
                                !orderResponse ? <> <CircularProgress color="inherit" /> Order is being Placed</> : (
                                    <>Order Placed Successfully</>
                                )
                            }
                        </Box>
                        <Divider />
                    </DialogContent>
            }

            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                {orderResponse && <Button onClick={() => generatePDF(orderResponse)} variant='contained'>Print Order</Button>}
            </DialogActions>
        </Dialog>
    )
}