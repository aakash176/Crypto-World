import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { CryptoState } from "../CryptoContext";


export default function Profile() {
  const [state, setState] = React.useState({
    
    right: false,
  });
  const {user, setUser} = CryptoState()

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  return (
    <div>
      {
        <React.Fragment key={"right"}>
          <Button onClick={toggleDrawer("right", true)}>{"right"}</Button>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >Username: <span>{user}</span>
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}
