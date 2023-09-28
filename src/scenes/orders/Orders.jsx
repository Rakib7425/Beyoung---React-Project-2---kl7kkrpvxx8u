import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Orders = () => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 15,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function createData(id, name, quantity, status, orderDate, totalPrice) {
        return { id, name, quantity, status, orderDate, totalPrice };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 299),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 121),
        createData('Eclair', 262, 16.0, 24, 6.0, 50),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('t-Shirt', 356, 16.0, 49, 3.9),
    ];

    return (
        <TableContainer component={Paper} sx={{ maxWidth: '93%', margin: 'auto', marginTop: '5rem' }} >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Order Id </StyledTableCell>
                        <StyledTableCell align="center">Product Name</StyledTableCell>
                        <StyledTableCell align="center">Quantity</StyledTableCell>
                        <StyledTableCell align="center">Order status</StyledTableCell>
                        <StyledTableCell align="center">Order date</StyledTableCell>
                        <StyledTableCell align="center">Total Price&nbsp;(₹)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="center" component="th" scope="row">{row.id} </StyledTableCell>
                            <StyledTableCell align="center">{row.name}</StyledTableCell>
                            <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                            <StyledTableCell align="center">{row.status}</StyledTableCell>
                            <StyledTableCell align="center">{row.orderDate}</StyledTableCell>
                            <StyledTableCell align="center">{row.totalPrice}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default Orders; 