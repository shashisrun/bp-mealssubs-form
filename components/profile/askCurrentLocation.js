import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Title from "../title";

export default function AsskCurrentLocation(){
  const render = (status) => {
    return <h1>{status}</h1>;
  };

    return(
        <>
          <Wrapper apiKey={"AIzaSyBRB_v3kerIoYi7bS6d9kfuNqL-VTRrr1E"} render={render}>
            
          </Wrapper>
        </>
    )
}