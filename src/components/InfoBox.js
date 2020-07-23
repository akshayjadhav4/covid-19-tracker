import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../InfoBox.css"
function InfoBox({ isRed,active,title, cases, total,...props }) {
  return (
    <Card className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`} onClick={props.onClick}>
      <CardContent>
        <Typography color="textSecondary" className="infoBox_title">
          {title}
        </Typography>
        <h2 className={`infoBox_cases  ${!isRed && "infoBox_cases--green"}`}>{cases}</h2>
        <Typography color="textSecondary" className="infoBox_total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
