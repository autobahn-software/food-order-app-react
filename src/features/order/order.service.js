

export const postOrderInfo  = ({ orderInfo }) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({orderId: 'test-order-id', status: 'success', orderInfo }), 3000);
    })
}