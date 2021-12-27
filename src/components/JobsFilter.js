import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  Box,
  Grid,
  AccordionDetails,
  Typography,
  makeStyles,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import useManyInputs from 'hooks/useManyInputs';

const useStyles = makeStyles((theme) => ({
  filter: {
    marginTop: theme.spacing(3),

    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
      flexWrap: 'nowrap',
    },
    '& .MuiAccordionSummary-root.Mui-expanded': {
      minHeight: 'unset',
      height: 40,
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      margin: 0,
    },
    '& .MuiAccordionDetails-root': {
      paddingInline: 10,
      paddingTop: 0,
    },
  },
  CategoriesList: {
    '&.MuiList-root': {
      paddingInline: '0',
      '& .MuiListItem-root': {
        width: '49%',
        display: 'inline-block',
        padding: 0,
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
        },
        '& .MuiTypography-root': {
          fontSize: 11,
        },
      },
    },
  },
  priceFilters: {
    '& .MuiTypography-root': { fontSize: 14 },
  },
}));

const JobsFilter = ({
  categories,
  applyPriceFilter,
  applyCategoryFilter,
  applyDaysFilter,
}) => {
  const classes = useStyles();

  const [priceFilters, setPriceFilter] = useState({
    level1: false,
    level2: false,
    level3: false,
    level4: false,
    level5: false,
  });

  const [daysFilters, setDayFilter] = useState({
    level1: false,
    level2: false,
    level3: false,
    level4: false,
    level5: false,
  });

  useEffect(() => {
    //  * Get all True Values
    let pricesLevels = [];

    for (const [key, value] of Object.entries(priceFilters)) {
      console.log(`${key}: ${value}`);
      if (value === true) pricesLevels.push(key);
    }
    applyPriceFilter(pricesLevels);
  }, [priceFilters]);

  useEffect(() => {
    //  * Get all True Values
    let daysLevels = [];

    for (const [key, value] of Object.entries(daysFilters)) {
      console.log(`${key}: ${value}`);
      if (value === true) daysLevels.push(key);
    }
    applyDaysFilter(daysLevels);
  }, [daysFilters]);

  const handlePriceChange = (e) => {
    setPriceFilter((st) => ({ ...st, [e.target.name]: e.target.checked }));
  };

  const handleDaysChange = (e) => {
    setDayFilter((st) => ({ ...st, [e.target.name]: e.target.checked }));
  };

  return (
    <Grid item sm={12} md={2}>
      <Typography variant='h5'>Filter By</Typography>
      <div className={classes.filter}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography variant='subtitle2' className={classes.heading}>
              Price
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component='fieldset' className={classes.formControl}>
              <FormGroup className={classes.priceFilters}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={priceFilters.level1}
                      onChange={handlePriceChange}
                      name='level1'
                    />
                  }
                  label='$5k +'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={priceFilters.level2}
                      onChange={handlePriceChange}
                      name='level2'
                    />
                  }
                  label='$1k - $5k'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={priceFilters.level3}
                      onChange={handlePriceChange}
                      name='level3'
                    />
                  }
                  label='$500 - $1k'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={priceFilters.level4}
                      onChange={handlePriceChange}
                      name='level4'
                    />
                  }
                  label='$100 - $500'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={priceFilters.level5}
                      onChange={handlePriceChange}
                      name='level5'
                    />
                  }
                  label='Less than $100'
                />
              </FormGroup>
              {/* <FormHelperText>Be careful</FormHelperText> */}
            </FormControl>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography variant='subtitle2' className={classes.heading}>
              Categories
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List className={classes.CategoriesList}>
              {categories?.map((cat) => (
                <ListItem>
                  <ListItemText
                    data-catid={cat._id}
                    primary={cat.title}
                    onClick={applyCategoryFilter}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
          {/* <MenuList> */}

          {/* </MenuList> */}
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography variant='subtitle2' className={classes.heading}>
              Time
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component='fieldset' className={classes.formControl}>
              <FormGroup className={classes.priceFilters}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={daysFilters.level1}
                      onChange={handleDaysChange}
                      name='level1'
                    />
                  }
                  label='100+ days'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={daysFilters.level2}
                      onChange={handleDaysChange}
                      name='level2'
                    />
                  }
                  label='100 - 500 days'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={daysFilters.level3}
                      onChange={handleDaysChange}
                      name='level3'
                    />
                  }
                  label='50 - 100 days'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={daysFilters.level4}
                      onChange={handleDaysChange}
                      name='level4'
                    />
                  }
                  label='10-50 days'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      checked={daysFilters.level5}
                      onChange={handleDaysChange}
                      name='level5'
                    />
                  }
                  label='Less than 10 days'
                />
              </FormGroup>
              {/* <FormHelperText>Be careful</FormHelperText> */}
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </div>
    </Grid>
  );
};

export default JobsFilter;
