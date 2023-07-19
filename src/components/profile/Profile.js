import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  profileContainer: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
  },
  profilePhotoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(0),
    height: theme.spacing(32),
  },
  profilePhoto: {
    width: theme.spacing(24),
    height: theme.spacing(24),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  editButton: {
    marginLeft: theme.spacing(11),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoup, setPhotoup] = useState("");
  const [email, setEmail] = useState("");
  const [isNameEditMode, setNameEditMode] = useState(false);
  const [isContactEditMode, setContactEditMode] = useState(false);
  const [isPhotoEditMode, setPhotoEditMode] = useState(false);
  const id = window.localStorage.getItem("userEmail");
  useEffect(() => {
    axios
      .post(
        "https://hfbmbjl766dlrq2ddbj4rbskse0pghjb.lambda-url.us-east-1.on.aws/",
        { id }
      )
      .then((response) => {
        setName(window.localStorage.getItem("userFullName"));
        setContact(response.data.contact);
        setPhoto(response.data.image);
        setEmail(response.data.id);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleNameEdit = () => {
    setNameEditMode(true);
  };

  const handleContactEdit = () => {
    setContactEditMode(true);
  };

  const handleFileChange = (event) => {
    const photo = event.target.files[0];
    setPhotoup(event.target.files[0]);
    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(photo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageRef = ref(storage, `images/${id}`);
    uploadBytes(imageRef, photoup).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          const updatedUser = {
            id: id,
            name: name,
            contact: contact,
            image: url,
          };

          axios
            .post(
              "https://dsjlppyl6iqxdasjaqh7kyq6dy0abokk.lambda-url.us-east-1.on.aws/",
              updatedUser
            )
            .then((response) => {
              setName(response.data.name);
              setContact(response.data.contact);
              setPhoto(url);
              setNameEditMode(false);
              setContactEditMode(false);
            })
            .catch((error) => {
              console.error("Error updating user details:", error);
            });
        })
        .catch((error) => {
          console.error("Error retrieving image download URL:", error);
        });
    });
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} className={classes.profileContainer}>
            <Grid container>
              <Grid item xs={4}>
                <div className={classes.profilePhotoContainer}>
                  <Avatar
                    className={classes.profilePhoto}
                    alt="Profile"
                    src={photo}
                  />
                </div>
                <div>
                  <InputAdornment position="absolute" left={5}>
                    <IconButton
                      component="label"
                      className={classes.editButton}
                    >
                      <EditIcon />
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </IconButton>
                  </InputAdornment>
                </div>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6">Update Details</Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    className={classes.formField}
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                    fullWidth
                    InputProps={{
                      readOnly: !isNameEditMode,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            component="label"
                            onClick={handleNameEdit}
                            disabled={isNameEditMode}
                          >
                            <EditIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    className={classes.formField}
                    label="Contact"
                    value={contact}
                    onChange={handleContactChange}
                    fullWidth
                    InputProps={{
                      readOnly: !isContactEditMode,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            component="label"
                            onClick={handleContactEdit}
                            disabled={isContactEditMode}
                          >
                            <EditIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    className={classes.formField}
                    label="email"
                    value={email}
                    fullWidth
                    InputProps={{
                      readOnly: !isPhotoEditMode,
                      endAdornment: (
                        <InputAdornment position="end"></InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                  >
                    Update
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
