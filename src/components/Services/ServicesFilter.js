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

const JobsFilter = ({ categories, applyPriceFilter, applyCategoryFilter }) => {
  const classes = useStyles();

  const [priceFilters, setPriceFilter] = useState({
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

  const handlePriceChange = (e) => {
    setPriceFilter((st) => ({ ...st, [e.target.name]: e.target.checked }));
  };

  return (
    <Box>
      {/* <Typography variant='h5'>Filter By</Typography> */}
      <div className={classes.filter}>
        <Accordion expanded>
          <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
            <Typography variant='subtitle2' className={classes.heading}>
              Rating
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
                  label={`4.5 & up`}
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
                  label={`4.0 & up`}
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
                  label={`3.5 & up`}
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
                  label={`3.0 & up`}
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
                <React.Fragment key={cat._id}>
                  <ListItem>
                    <ListItemText
                      data-catid={cat._id}
                      primary={cat.title}
                      onClick={applyCategoryFilter}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </AccordionDetails>
          {/* <MenuList> */}

          {/* </MenuList> */}
        </Accordion>
      </div>
    </Box>
  );
};

export default JobsFilter;
