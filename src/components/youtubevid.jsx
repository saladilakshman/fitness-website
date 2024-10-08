// eslint-disable-next-line react/prop-types
import { useEffect, useState } from "react";
import axios from "axios";
import { keys } from "../../keys";
import { Grid, Typography, Box } from "@mui/material";
import Loader from "./loader";
// eslint-disable-next-line react/prop-types
const YoutubeVideo = ({ videosearchtext }) => {
  const [exercisevideos, setExercisevideos] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [iserror, setIsError] = useState(false);
  useEffect(() => {
    const youtubevideo = async () => {
      const options = {
        method: "GET",
        url: "https://youtube-search-and-download.p.rapidapi.com/search",
        params: {
          query: videosearchtext,
        },
        headers: {
          "X-RapidAPI-Key": keys.youtube,
          "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setExercisevideos(response.data.contents);
        setIsloading(false);
        setIsError(false);
      } catch (error) {
        console.error(error);
        setExercisevideos([]);
        setIsloading(false);
        setIsError(true);
      }
    };
    youtubevideo();
  }, [videosearchtext]);
  return (
    <>
      {isloading && <Loader />}
      {iserror && (
        <Typography
          variant="h4"
          color="inherit"
          textAlign="center"
          sx={{
            paddingBlockStart: 4,
          }}
        >
          Oops!something went wrong
        </Typography>
      )}
      <Grid container spacing={5} rowSapcing={4}>
        {exercisevideos?.slice(0, 6)?.map((video, index) => {
          const { title, videoId, thumbnails } = video.video;
          console.log(title);
          return (
            <Grid
              item
              key={index}
              xs={12}
              sm={12}
              lg={4}
              sx={{ marginBlockStart: 4 }}
            >
              <Box
                component="a"
                href={`https://www.youtube.com/watch?v=${videoId}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Box
                  component="img"
                  alt=""
                  src={thumbnails[0]?.url}
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 1.8,
                  }}
                />
                <Typography variant="h6">{title}</Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default YoutubeVideo;
