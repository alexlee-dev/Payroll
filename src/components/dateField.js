import React, { useEffect, useState } from "react";
import { Box, FormLabel, FormControl } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import siteInformationStyles from "./siteInformation.module.scss";
import moment from "moment";
import { connect } from "react-redux";
import { graphql, useStaticQuery } from "gatsby";

const DateField = ({ handleChange, values }) => {
  const [userHasInput, setUserHasInput] = useState(false);
  const data = useStaticQuery(graphql`
    query {
      allSitesJson {
        edges {
          node {
            name
            camps {
              name
              dates {
                max
                min
              }
            }
          }
        }
      }
    }
  `);

  const siteData = values.site
    ? data.allSitesJson.edges.find(edge => edge.node.name === values.site)
    : null;

  const campData = values.camp
    ? siteData.node.camps.find(jsonCamp => jsonCamp.name === values.camp)
    : null;

  useEffect(() => {
    if (campData && !userHasInput) {
      handleChange({
        target: {
          name: "date",
          value: moment(campData.dates.min, "MM/DD/YYYY")
        }
      });
    }
  }, [campData, handleChange, userHasInput]);

  return (
    <Box className={siteInformationStyles.dateContainer}>
      <FormControl component="fieldset" required>
        <FormLabel component="legend" required>
          Date
        </FormLabel>
        {values.camp ? (
          <KeyboardDatePicker
            maxDate={
              campData ? moment(campData.dates.max, "MM/DD/YYYY") : undefined
            }
            minDate={
              campData ? moment(campData.dates.min, "MM/DD/YYYY") : undefined
            }
            onChange={date => {
              setUserHasInput(true);
              handleChange({
                target: {
                  name: "date",
                  value: date
                }
              });
            }}
            value={values.date}
          />
        ) : (
          <i className={siteInformationStyles.noChoice}>Please select a camp</i>
        )}
      </FormControl>
    </Box>
  );
};

const mapStateToProps = ({ data }) => ({
  camp: data.camp,
  date: data.date,
  site: data.site
});

export default connect(mapStateToProps)(DateField);
