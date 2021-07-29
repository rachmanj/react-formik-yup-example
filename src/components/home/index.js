import React from 'react';
import {
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
  FormControlLabel,
  FormGroup,
  Box,
  Button,
} from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { object, string, number, boolean, array, mixed } from 'yup';

const initialValues = {
  fullName: '',
  initialInvestment: 0,
  investmentRisk: [],
  commentAboutInvestmentRisk: '',
  dependents: -1,
  acceptedTermsAndConditions: false,
};

const Home = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">New Account</Typography>

        <Formik
          validationSchema={object({
            fullName: string().required('Harus diisi').min(2).max(100),
            initialInvestment: number().required().min(100),
            dependents: number().required().min(0).max(5),
            acceptedTermsAndConditions: boolean().oneOf([true]),
            investmentRisk: array(
              string().oneOf(['High', 'Medium', 'Low'])
            ).min(1),
            commentAboutInvestmentRisk: mixed().when('investmentRisk', {
              is: investmentRisk => investmentRisk.find(ir => ir === 'High'),
              then: string().required().min(20).max(100),
              otherwise: string().min(20).max(100),
            }),
          })}
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            return new Promise(res => {
              setTimeout(() => {
                console.log(values);
                console.log(formikHelpers);
                console.log('----------');
                res();
              }, 5000);
            });
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <Form>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="fullName" as={TextField} label="Full Name" />
                  <ErrorMessage name="fullName" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="initialInvestment"
                    type="number"
                    as={TextField}
                    label="Initial Investment"
                  />
                  <ErrorMessage name="initialInvestment" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Field
                        name="investmentRisk"
                        value="High"
                        type="checkbox"
                      />
                    }
                    label="High - Danger"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        name="investmentRisk"
                        value="Medium"
                        type="checkbox"
                      />
                    }
                    label="Medium"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        name="investmentRisk"
                        value="Low"
                        type="checkbox"
                      />
                    }
                    label="Low"
                  />
                  <ErrorMessage name="investmentRisk" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="commentAboutInvestmentRisk"
                    as={TextField}
                    multiline
                    rowsmin={3}
                    maxRows={10}
                    label="Comment"
                  />
                  <ErrorMessage name="commentAboutInvestmentRisk" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="dependents"
                    label="Dependents"
                    as={TextField}
                    select
                  >
                    <MenuItem value={-1}>Select ...</MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Field>
                  <ErrorMessage name="dependents" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Field
                        name="acceptedTermsAndConditions"
                        type="checkbox"
                      />
                    }
                    label="Accept terms and conditions"
                  />
                  <ErrorMessage name="acceptedTermsAndConditions" />
                </FormGroup>
              </Box>

              <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>

              <pre>{JSON.stringify(values, null, 4)}</pre>
              <pre>{JSON.stringify(errors, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default Home;
