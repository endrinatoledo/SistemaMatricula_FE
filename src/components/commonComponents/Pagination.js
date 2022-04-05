import React from 'react'
import TablePagination from '@mui/material/TablePagination';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    "& .MuiTablePagination-selectLabel" :{
      marginTop: 10
      },
    "& .MuiTablePagination-displayedRows":{
      marginTop: 10
    }
  },
});

const Pagination = ({dataSource}) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };


  return (
    <TablePagination
          className={classes.root}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataSource.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
  )
}

export default Pagination