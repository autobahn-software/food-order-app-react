import { Box, TextField, Button, Typography } from "@mui/material"
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    name: yup.string().required('Enter name').nullable(),
    street: yup.string().required('Enter street').nullable(),
    postalCode: yup.number().nullable().integer().required('Enter Postal Code').test('isValid', 'Enter valid postal code 6 numbers', (val) => val ? val.toString().length === 6 : false),
    city: yup.string().nullable().required('Enter City')

})
export const OrderAddressForm = ({ onPlaceOrder }) => {
    const {
        watch,
        register,
        setValue,
        trigger,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            street: '',
            city: '',
            postalCode: null,
        },
        resolver: yupResolver(schema),
    });
    const name = watch('name');
    const street = watch('street');
    const city = watch('city');
    const postalCode = watch('postalCode');

    const handleChangeValue = (event) => {
        const { name, value } = event.target;
        setValue(name, value, { shouldValidate: true })
    };

    const handleSubmit = async () => {
        await trigger();
        if (!isValid) return;
        onPlaceOrder({ name, city, street, postalCode })
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
            borderRadius: 1,
            flex: 1,
        }}>
            <Box sx={{ flex: 1, marginY: 1 }}>
                <TextField variant='outlined' label='Name' value={name} name='name' type='text' {...register('name', { onChange: handleChangeValue })} />
                {errors && errors.name && <Typography variant="span" color='error'>{errors.name.message}</Typography>}
            </Box>
            <Box sx={{ flex: 1, marginY: 1 }}>
                <TextField variant='outlined' label='Street' value={street} name='street' type='text' {...register('street', { onChange: handleChangeValue })} />
                {errors && errors.street && <Typography variant="span" color='error'>{errors.street.message}</Typography>}
            </Box>
            <Box sx={{ flex: 1, marginY: 1 }}>
                <TextField variant='outlined' label='City' value={city} name='city' type='text' {...register('city', { onChange: handleChangeValue })} />
                {errors && errors.city && <Typography variant="span" color='error'>{errors.city.message}</Typography>}
            </Box>
            <Box sx={{ flex: 1, marginY: 1 }}>
                <TextField variant='outlined' label='Postal Code' value={postalCode || ''} name='postalCode' type='number' {...register('postalCode', { onChange: handleChangeValue })} />
                {errors && errors.postalCode && <Typography variant="span" color='error'>{errors.postalCode.message}</Typography>}
            </Box>
            <Box sx={{ flex: 1, marginY: 1 }}>
                <Button onClick={handleSubmit} variant='contained'>Place Order</Button>
            </Box>
        </Box>
    )
}