import { useParams } from "react-router-dom";
import { useContext } from "react";
import { useGetExerciseByIdQuery } from "../services/apiservices";
import { Container, Box, Stack, Typography } from "@mui/material";
import Loader from "./loader";
import bodypart from "../assets/fitness-assets/bodypart.png";
import equipment from "../assets/fitness-assets/equipment.png";
import target from "../assets/fitness-assets/target.png";
import { Gymstate } from "../App";
import YoutubeVideo from "./youtubevid";
import "../App.css";
import TargetList from "./target";
import EquipmentList from "./equipment";
const Exercise = () => {
  const { isMobile } = useContext(Gymstate);
  const { exercisetype } = useParams();
  const { data, isError, isLoading } = useGetExerciseByIdQuery(exercisetype);
  const gymtools = [
    {
      src: bodypart,
      name: data?.bodyPart,
    },
    {
      src: equipment,
      name: data?.equipment,
    },
    {
      src: target,
      name: data?.target,
    },
  ];
  return (
    <Container sx={{
      p: 2,
      marginBlockEnd: 5
    }}>
      <Box
        sx={{
          paddingBlockStart: 5,
        }}
      >
        {isLoading && <Loader />}
        {isError && (
          <Typography variant="h5">Opps! something went wrong</Typography>
        )}
        {data && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={5}
            flexWrap={isMobile ? "wrap" : "nowrap"}
          >
            <Box>
              <Box component="img" alt="" src={data.gifUrl} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "baseline",
              }}
            >
              <Typography
                variant="h6"
                color="inherit"
                sx={{
                  width: "100%",
                  wordBreak: "break-word",
                }}
              >
                Exercises keep you strong. {data.name} is one of the best
                exercises to target your quads.It will help you improve mood and
                gain energy.
              </Typography>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="baseline"
                spacing={2}
                sx={{
                  alignSelf: "start",
                  paddingBlockStart: 5,
                }}
              >
                {Array.from(gymtools, ({ src, name }, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box
                        component="img"
                        alt=""
                        src={src}
                        sx={{
                          width: "100%",
                          backgroundColor: "pink",
                          borderRadius: "50%",
                          p: 1,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        {name}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Stack>
        )}
      </Box>

      {/** JSX component for displaying youtube videos**/}

      <Box sx={{
        paddingBlockStart: 12
      }}>
        <Typography variant="h4">
          Youtube videos realted to <span id="marker">{data?.name}</span>
        </Typography>
        <YoutubeVideo videosearchtext={data?.name} />
      </Box>

      {/**JSX component to view similar target exercises */}
      <Box
        sx={{
          marginBlockStart: 15,
          width: '100%'
        }}
      >
        <Typography variant="h4">
          Similar <span id="marker">Target Muscle</span> Exercises
        </Typography>
        <TargetList targetname={data?.target} />
      </Box>

      {/**JSX component to view similar equipment exercises */}
      <Box
        sx={{
          marginBlockStart: 12,
        }}
      >
        <Typography variant="h4">
          Similar <span id="marker">Equipment</span> Exercises
        </Typography>
        <EquipmentList equipmentname={data?.equipment} />
      </Box>
    </Container>
  );
};
export default Exercise;
