import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';





import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { hashToArr } from '../../../utils/Functions';

import styles from './styles';
import theme from '../../../themes/default';

const headCells = [
   { id: 'name', numeric: false, disablePadding: true, label: 'Nome' },
   { id: 'ratings', numeric: true, disablePadding: false, label: 'Avaliações' },
   { id: 'options', numeric: false, disablePadding: false, label: 'Opções' }
];

class FilterableTable extends React.Component {

   constructor(props) {
      super(props);
      
      this.state = {
         order: 'asc',
         orderBy: 'ratings',
         selected: [],
         page: 0,
         dense: true,
         rowsPerPage: 5,
         rows: []
      }
      
   }

   componentDidMount() {
      
   }

   static getDerivedStateFromProps(nextProps, prevState){
      return {
         ...prevState,
         rows: hashToArr(nextProps.accounts)
      }
   }

   desc = (a, b, orderBy) => {
      if (b[orderBy] < a[orderBy]) {
         return -1;
      }
      if (b[orderBy] > a[orderBy]) {
         return 1;
      }
      return 0;
   }

   stableSort = (array, cmp) => {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
         const order = cmp(a[0], b[0]);
         if (order !== 0) return order;
         return a[1] - b[1];
      });
      return stabilizedThis.map(el => el[0]);
   }

   getSorting = (order, orderBy) => {
      return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
   }

   handleRequestSort = (property) => {
      const isDesc = this.state.orderBy === property && this.state.order === 'desc';

      this.setState({
         order: isDesc ? 'asc' : 'desc',
         orderBy: property
      });
   };

   handleSelectAllClick = (event) => {
      if (event.target.checked) {
         const newSelecteds = this.state.rows.map(n => n.id);

         this.setState({
            selected: newSelecteds
         })

         return;
      }
      this.setState({
         selected: []
      })
   };

   handleClick = (event, id) => {
      const selectedIndex = this.state.selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
         newSelected = newSelected.concat(this.state.selected, id);
      } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(this.state.selected.slice(1));
      } else if (selectedIndex === this.state.selected.length - 1) {
         newSelected = newSelected.concat(this.state.selected.slice(0, -1));
      } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(
            this.state.selected.slice(0, selectedIndex),
            this.state.selected.slice(selectedIndex + 1),
         );
      }

      this.setState({
         selected: newSelected
      })
   };

   handleChangePage = (event, newPage) => {
      this.setState({
         page: newPage
      })
   };

   handleChangeRowsPerPage = (event) => {
      this.setState({
         page: 0,
         rowsPerPage: parseInt(event.target.value, 10)
      })
   };

   handleChangeDense = (event) => {
      this.setState({
         dense: event.target.checked
      })
   };

   isSelected = name => {
      return this.state.selected.indexOf(name) !== -1
   };

   emptyRows = () => {
      return this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.rows.length - this.state.page * this.state.rowsPerPage)
   };

   deleteAccounts = () => {
      this.props.deleteFunc(this.props.session, this.state.selected);
   }

   render() {
      const { classes } = this.props;
      const { order, orderBy, selected, page, dense, rowsPerPage } = this.state;

      return (
         <div className={classes.root}>
            <Paper className={classes.paper}>
               <Toolbar
                  className={clsx(classes.root, {
                     [classes.highlight]: selected.length > 0,
                  })}
               >
                  {selected.length > 0 ? (
                     <Typography className={classes.title} color="inherit" variant="subtitle1">
                        {selected.length} selecionados
                     </Typography>
                  ) : (
                        <Typography className={classes.title} variant="h6" id="tableTitle">
                           {this.props.title ? this.props.title : "Carregando..."}
                        </Typography>
                     )}

                  {selected.length > 0 ? (
                     <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={this.deleteAccounts}>
                           <DeleteIcon />
                        </IconButton>
                     </Tooltip>
                  ) : (
                        <Tooltip title="Adicionar">
                           <IconButton aria-label="Adicionar">
                              <PersonAddIcon />
                           </IconButton>
                        </Tooltip>
                     )}
               </Toolbar>
               <div className={classes.tableWrapper}>
                  <Table
                     className={classes.table}
                     aria-labelledby="tableTitle"
                     size={dense ? 'small' : 'medium'}
                     aria-label="enhanced table"
                  >
                     <TableHead>
                        <TableRow>
                           <TableCell padding="checkbox">
                              <Checkbox
                                 color="primary"
                                 indeterminate={selected.length > 0 && selected.length < this.state.rows.length}
                                 checked={selected.length === this.state.rows.length}
                                 onChange={(event) => this.handleSelectAllClick(event)}
                                 inputProps={{ 'aria-label': 'select all desserts' }}
                              />
                           </TableCell>
                           {headCells.map(headCell => (
                              <TableCell
                                 key={headCell.id}
                                 align={headCell.numeric || headCell.id === "options" ? 'right' : 'left'}
                                 padding={headCell.disablePadding ? 'none' : 'default'}
                                 sortDirection={orderBy === headCell.id ? order : false}
                              >
                                 {headCell.id === "options" ? (
                                    headCell.label
                                 ) : (
                                    <TableSortLabel
                                       active={orderBy === headCell.id}
                                       direction={order}
                                       onClick={() => this.handleRequestSort(headCell.id)}
                                    >
                                       {headCell.label}
                                       {orderBy === headCell.id ? (
                                          <span className={classes.visuallyHidden}>
                                             {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                          </span>
                                       ) : null}
                                    </TableSortLabel>
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {this.stableSort(this.state.rows, this.getSorting(order, orderBy))
                           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                           .map((row, index) => {
                              const isItemSelected = this.isSelected(row.id);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                 <ThemeProvider theme={theme} key={row.id}>
                                    <TableRow
                                       hover
                                       role="checkbox"
                                       aria-checked={isItemSelected}
                                       tabIndex={-1}
                                       key={row.id}
                                       selected={isItemSelected}
                                    >
                                       <TableCell padding="checkbox" onClick={(event) => this.handleClick(event, row.id)}>
                                          <Checkbox
                                             color="primary"
                                             checked={isItemSelected}
                                             inputProps={{ 'aria-labelledby': labelId }}
                                          />
                                       </TableCell>
                                       <TableCell component="th" id={labelId} scope="row" padding="none" onClick={(event) => this.handleClick(event, row.id)}>
                                          {row.fullname}
                                       </TableCell>
                                       <TableCell align="right" onClick={(event) => this.handleClick(event, row.id)}>{row.ratings}</TableCell>
                                       <TableCell align="right">
                                          <Tooltip title="Editar">
                                             <IconButton aria-label="Editar" className={classes.margin0}>
                                                <EditIcon />
                                             </IconButton>
                                          </Tooltip>
                                          <Tooltip title="Ver">
                                             <IconButton aria-label="Ver" className={classes.margin0}>
                                                <VisibilityIcon />
                                             </IconButton>
                                          </Tooltip>
                                       </TableCell>
                                    </TableRow>
                                 </ThemeProvider>
                              );
                           })}
                        {this.emptyRows() > 0 && (
                           <TableRow style={{ height: (dense ? 33 : 53) * this.emptyRows() }}>
                              <TableCell colSpan={6} />
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </div>
               <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={this.state.rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
               />
            </Paper>
            <ThemeProvider theme={theme}>
               <Grid container direction="row" alignItems="center">
                  <Switch color="primary" checked={dense} onChange={this.handleChangeDense} />
                  <Typography>Compactar</Typography>
               </Grid>
            </ThemeProvider>

         </div>
      );
   }
}

FilterableTable.propTypes = {
   classes: PropTypes.object.isRequired,
   theme: PropTypes.object.isRequired,
   accounts: PropTypes.object.isRequired,
   title: PropTypes.string.isRequired,
   session: PropTypes.string.isRequired,
   deleteFunc: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(withStyles(styles(theme), { withTheme: true })(withCookies(FilterableTable)));
