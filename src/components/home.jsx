import { useContext, useState, useEffect } from "react";
import {
  Container,
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Pagination,
  Grid,
  Chip,
} from "@mui/material";
import banner from "../assets/fitness-assets/banner.png";
import logo from "../assets/fitness-assets/Logo.png";
import gym from "../assets/fitness-assets/gym.png";
import hand from "../assets/fitness-assets/hand.png";
import "../App.css";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import {
  useGetGymTypeQuery,
} from "../services/apiservices";
import Loader from "./loader";
import { useNavigate } from "react-router-dom";
import { Gymstate } from "../App";
export const Homepage = () => {
  const { isMobile, appStyles, scroll_navigation } = useContext(Gymstate);
  const gymtypes = [
    "All",
    "Back",
    "Cardio",
    "Chest",
    "Lower Arms",
    "Lower Legs",
    "Neck",
    "Shoulders",
    "Upper Legs",
    "Waist",
  ];
  const [cardIndex, setCardIndex] = useState(0);
  const [ind, setInd] = useState([0, 10]);
  const [gymtext, setGymtext] = useState("all");
  const navigate = useNavigate();
  const scroll_element = () => {
    const element_scroll = document.querySelector(".element-to-visible");
    console.log(element_scroll);
    element_scroll.scrollIntoView({ behavior: "smooth" });
  };
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading, data, isError } = useGetGymTypeQuery(gymtext);
  const [gymdata, setGymdata] = useState([]);
  useEffect(() => {
    window.localStorage.setItem("exercises", JSON.stringify(data));
    setGymdata(data)
  }, [data])
  return (
    <>
      <Container
        sx={{
          marginBlockStart: isMobile ? 3 : 5,
        }}
      >
        <Stack direction="row" justifyContent={"space-between"}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "baseline",
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={5}
            >
              <Box component="img" alt="" src={logo} />
              <Typography
                variant="h6"
                sx={{
                  borderBottom: "2px solid red",
                }}
              >
                Home
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={scroll_element}
              >
                Exercise
              </Typography>
            </Stack>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "baseline",
                gap: 4,
                paddingBlockStart: isMobile ? 10 : 18,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#ff2625",
                }}
              >
                Fitness Club
              </Typography>
              <Typography variant="h3">
                Sweat, Smile
                <br /> and Repeat
              </Typography>
              <Typography variant="h5">
                Check out the most effective exercises
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff2625",
                }}
                onClick={scroll_element}
              >
                explore exercises
              </Button>
              {!isMobile && <div className="overlay"></div>}
            </Box>
          </Box>
          {!isMobile && (
            <Box
              component="img"
              alt=""
              src={banner}
              sx={{
                width: "50%",
              }}
            />
          )}
        </Stack>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          textAlign="center"
          sx={{
            marginBlockStart: isMobile ? 12 : 15,
          }}
        >
          Awesome Exercises You {isMobile ? "" : <br />}
          Should Know
        </Typography>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            marginBlockStart: 8,
          }}
        >
          <TextField
            type="search"
            fullWidth
            placeholder="search exercises"
            value={searchQuery}
            onChange={(e) => {
              let val = e.target.value;
              setSearchQuery(val);
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff2625",
              position: "absolute",
              right: 0.2,
              height: "100%",
              width: isMobile ? "25%" : 150,
            }}
            size="small"
            onClick={() => {
              if (searchQuery) {
                const storedItems = window.localStorage.getItem("exercises");
                const filterList = JSON.parse(storedItems);
                const list = filterList.filter((el) => el.name.includes(searchQuery))
                setGymdata(list)
                scroll_element()
              }

            }}
          >
            Search
          </Button>
        </Box>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={5}
            sx={{
              overflow: "auto",
              marginBlockStart: 8,
              paddingBottom: 2,
            }}
            className="gym-types"
          >
            {Array.from(gymtypes, (gymtype, index) => {
              return (
                <Paper
                  key={index}
                  sx={{
                    minWidth: 300,
                    minHeight: 250,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    borderBottomLeftRadius: 18,
                    borderTop: index === cardIndex ? "4px solid red" : "",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    setCardIndex(index);
                    setGymtext(gymtype.toLowerCase());
                    scroll_element();
                  }}
                >
                  <Box>
                    <Box
                      component="img"
                      src={gym}
                      alt=""
                      sx={{
                        width: 60,
                        display: "block",
                        margin: "auto",
                      }}
                      loading="lazy"
                    />
                    <Typography variant="h6" textAlign="center" sx={{ pt: 2 }}>
                      {gymtype}
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Stack>
          {!isMobile && (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                position: "absolute",
                right: 2,
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: "#ff2625",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ff2625",
                    color: "white",
                  },
                }}
                onClick={() => scroll_navigation(".gym-types", -700)}
              >
                <WestIcon />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: "#ff2625",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ff2625",
                    color: "white",
                  },
                }}
                onClick={() => scroll_navigation(".gym-types", 700)}
              >
                <EastIcon />
              </IconButton>
            </Stack>
          )}
        </Box>
        <Box
          sx={{
            marginBlockStart: 10,
          }}
          className="element-to-visible"
        >
          <Typography variant={isMobile ? "h6" : "h4"}>
            Showing results
          </Typography>
          {isLoading && (
            <div>
              <Loader />
            </div>
          )}
          {isError && (
            <Typography
              variant="h5"
              textAlign="center"
              sx={{
                paddingTop: 3,
                marginBottom: 3,
              }}
            >
              Oops! something went wrong
            </Typography>
          )}
          {data && (
            <Grid container spacing={2} rowSpacing={4}>
              {gymdata?.slice(ind[0], ind[1]).map((item) => {
                const { id, gifUrl, name, secondaryMuscles } = item;
                return (
                  <Grid item key={Number(id)} xs={6} sm={6} lg={4}>
                    <Paper
                      sx={appStyles.paper}
                      onClick={() =>
                        document.startViewTransition(() => navigate(`/${id}`))
                      }
                    >
                      <Box
                        component="img"
                        alt=""
                        src={gifUrl}
                        sx={{
                          width: "100%",
                        }}
                      />
                      <Stack
                        direction={isMobile ? "column" : "row"}
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                          paddingInlineStart: 2,
                        }}
                        spacing={2}
                      >
                        <Chip
                          variant="contained"
                          size="small"
                          sx={appStyles.gymbutton}
                          id="gym-element"
                          label={secondaryMuscles[0]}
                        />
                        <Chip
                          label={secondaryMuscles[1]}
                          variant="contained"
                          size="small"
                          sx={{
                            ...appStyles.gymbutton,
                            display: secondaryMuscles[1] ? "" : "none",
                            backgroundColor: "#fdaaaa",
                          }}
                          id="gym-element"
                        />
                      </Stack>
                      <Typography
                        variant={isMobile ? "body1" : "h6"}
                        sx={appStyles.gymtext}
                      >
                        {name}
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          )}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              marginBlockStart: 12,
            }}
          >
            <Pagination
              count={data?.length > 100 ? 1000 / 10 : 10}
              size={isMobile ? "small" : "medium"}
              color="primary"
              onChange={(event, value) => {
                const firstindex = value * 10 - 10;
                const secondindex = firstindex + 10;
                const indexes = [firstindex, secondindex];
                console.log(indexes);
                setInd(indexes);
              }}
            />
          </Stack>
        </Box>
      </Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#fff3f4",
          marginBlockStart: 8,
          gap: 2,
          p: 1,
        }}
      >
        <Box component="img" alt="" src={hand} />
        <Typography variant={isMobile ? "h6" : "h5"}>
          Thank you 🧡 for showing interest
        </Typography>
      </Box>
    </>
  );
};
