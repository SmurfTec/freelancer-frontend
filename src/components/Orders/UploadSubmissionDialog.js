import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  makeStyles,
} from '@material-ui/core';
import useToggle from 'hooks/useToggle';
import useCommonStyles from 'styles/commonStyles';
import axios from 'axios';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 5,
    // boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
  },
  uploadFile: {
    '& input': {
      display: 'none',
    },
  },
  uploadFileBox: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: 100,
      width: 100,
      objectFit: 'cover',
    },
  },
  marginBetween: {
    marginBlock: theme.spacing(2),
  },
}));

const UploadSubmission = ({ open, toggleDialog, handleCreate }) => {
  const classes = useCommonStyles();
  const classes_s = useStyles();

  const [isSubmitting, toggleSubmitting] = useToggle(false);
  const [submission, setSubmission] = useState('');

  const handleSubmit = (e) => {
    handleCreate(submission);

    e.preventDefault();
  };

  const handleUpload = async (e, callback) => {
    const selectedFile = e.target.files[0];
    try {
      // console.log(`selectedFile.type`, selectedFile.type);
      if (
        !selectedFile.name.includes('rar') &&
        !selectedFile.name.includes('zip')
      ) {
        return toast.error('Only Rar/Zip files are acceptable !');
      }

      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async (e) => {
        // console.log(`result onLoadEnd`, e.target.result);
        const file = e.target.result;
        // * 1 Upload File on Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append(
          'upload_preset',
          process.env.REACT_APP_CLOUDINARY_PRESET
        );

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          formData
        );
        const uploadedImage = res.data.url;
        console.log(`res`, res);

        callback(uploadedImage);
      };
    } catch (err) {
      toast(
        err?.response?.data?.message || err.message || 'Something Went Wrong'
      );
      console.log(`err`, err);
    }
  };

  const handleSubmission = (e) => {
    handleUpload(
      e,
      (uploadedCode) => {
        setSubmission(uploadedCode);
      },
      ['application/zip']
    );
  };

  return (
    <Dialog open={open} onClose={toggleDialog}>
      <DialogTitle>Submit Project</DialogTitle>
      <DialogContent>
        <Box
          className={`${classes_s.paper} ${classes_s.marginBetween}`}
          sx={{ borderRadius: 0, boxShadow: 'none' }}
        >
          <form id='form1' onSubmit={handleSubmit}>
            <Box
              sx={{
                pt: 3,
                display: 'flex',
                flexDirection: 'column',
                rowGap: 20,
              }}
            >
              <TextField
                autoFocus
                margin='dense'
                id='submission'
                label='submission'
                name='submission'
                onChange={handleSubmission}
                type='file'
                required
              />
            </Box>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isSubmitting}
          form='form1'
          type='submit'
          variant='contained'
          color='primary'
        >
          Submit
        </Button>
        <Button
          onClick={toggleDialog}
          form='form'
          type='submit'
          variant='contained'
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadSubmission;
