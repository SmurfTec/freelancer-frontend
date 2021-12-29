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
  Divider,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import useManyInputs from 'hooks/useManyInputs';

const useStyles = makeStyles((theme) => ({
  filter: {
    marginTop: theme.spacing(3),

    display: 'flex',
    // [theme.breakpoints.down('md')]: {
    //   flexDirection: 'row',
    // },
    // [theme.breakpoints.up('md')]: {
    //   flexDirection: 'column',
    //   flexWrap: 'nowrap',
    // },
    '& .MuiPaper-root': {
      boxShadow: 'none',
      borderRight: '1px solid #ccc',
      borderRadius: 0,
      width: 500,
    },
    '& .MuiAccordion-root': {
      marginTop: 0,
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
      flexGrow: 1,
    },
  },
  CategoriesList: {
    '&.MuiList-root': {
      paddingInline: '0',
      width: '100%',
      '& .MuiListItem-root': {
        padding: 0,
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
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
    <Box>
      {/* <Typography variant='h5'>Filter By</Typography> */}
      <div className={classes.filter}>
        <Accordion expanded>
          <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
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
                  label='$1k +'
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
                  label='$500 - $1k'
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
                  label='$100 - $500'
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
                  label='$50 - $100'
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
                  label='Less than $50'
                />
              </FormGroup>
              {/* <FormHelperText>Be careful</FormHelperText> */}
            </FormControl>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded>
          <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
            <Typography variant='subtitle2' className={classes.heading}>
              Categories
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List className={classes.CategoriesList}>
              {categories?.map((cat) => (
                <ListItem key={cat._id}>
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

        <Accordion expanded>
          <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
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
                  label='60+ days'
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
                  label='30 - 60 days'
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
                  label='10-30 days'
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
                  label='Less than 10 days'
                />
              </FormGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </div>
    </Box>
  );
};

export default JobsFilter;
