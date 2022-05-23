import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  IconButton,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "./index.css";
import { deletePosts, getAllPosts, upDatePosts } from "./ApiOper";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function App() {
  const [value, setValue] = useState([]);
  const [open, setOpen] = useState(false);
  const [divOpen, setDivOpen] = useState(false);
  const [input, setInput] = useState({
    title: "",
    body: "",
    id: "",
  });
  let { title, body, id } = input;
  // console.log(value);
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleDialogeOpen = () => {
    setDivOpen(true);
  };
  const handleDialogeClose = () => {
    setDivOpen(false);
  };
  const handleClickOpen = (title, body, id) => {
    setOpen(true);
    setInput({ ...input, title, body, id });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllpost = async () => {
    try {
      let { data, status } = await getAllPosts();
      // console.log(data, status);
      setValue(data.slice(0, 21));
    } catch (error) {
      console.log(error);
    }
  };

  const deletepost = async (id) => {
    console.log(id);
    try {
      let data = await deletePosts(id);
      console.log(data);
      getAllpost();
    } catch (error) {
      console.log(error);
    }
  };

  const updatepost = async (id, body, title) => {
    console.log(id, body);
    try {
      let data = await upDatePosts(id, body, title);
      console.log(data);
      getAllpost();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllpost();
    console.log("data", value);
  }, []);

  return (
    <Box>
      <Box className="text-center  p-4">
        <h1>Post From JSON Placeholder By Huzaifa HaRRY</h1>
        <p>
          I'm building a CRUD operation app. In which we can delete, update and
          create the card
        </p>
      </Box>

      <Box className="App">
        {value.map(({ title, body, id }, i) => {
          // console.log(it);
          return (
            <Card
              sx={{
                maxWidth: 345,
                margin: "1rem",
              }}
            >
              <CardContent>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://source.unsplash.com/random/900×400/?posts/${i}`}
                  alt="green iguana"
                />
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="titleSetting"
                >
                  {title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.liht"
                  className="paraSetting"
                >
                  {body}
                </Typography>
                <a className="text-primary">Read Me</a>
              </CardContent>
              <CardActions sx={{ float: "right" }}>
                <IconButton
                  variant="outlined"
                  onClick={() => handleClickOpen(title, body, id)}
                >
                  <ModeEditOutlineIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => deletepost(id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={handleDialogeOpen}
                  // onClick={() => handleClickOpen(title, body, id)}
                >
                  <RemoveRedEyeIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>UpDate Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={handleChange}
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="body"
            label="Description"
            type="text"
            multiline
            rows={3}
            onChange={handleChange}
            value={body}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={() => updatepost(id, body, title)}
            color="success"
            variant="contained"
          >
            UpDate
          </Button>
        </DialogActions>
      </Dialog>
      {/* {input.map(({ title, body }) => ( */}
      <BootstrapDialog
        onClose={handleDialogeClose}
        aria-labelledby="customized-dialog-title"
        open={divOpen}
      >
        {/* {value.map((ele) => ( */}
        <>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleDialogeClose}
          >
            kdjgudh
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              lkfjiuhf ufh ihf fih fi f hdfihfioruti s,nmxgcufi jro
            </Typography>
          </DialogContent>
        </>
        {/* ))} */}
        <DialogActions>
          <Button autoFocus onClick={handleDialogeClose} color="error">
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {/* ))} */}
    </Box>
  );
}

export default App;
