import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { BUY_NOW_API_URL } from "../../utils/api";
import { toast } from "react-toastify";
import Success from "./Success";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

/**
 * 
 * @returns 
import { loadStripe } from "@stripe/stripe-js";
 const stripePromise = loadStripe(
  "pk_test_51LgU7yConHioZHhlAcZdfDAnV9643a7N1CMpxlKtzI1AUWLsRyrord79GYzZQ6m8RzVnVQaHsgbvN1qSpiDegoPi006QkO0Mlc"
);
*/

const Checkout = () => {
  const user = useSelector((state) => state.user.userDetails)

  const [isSuccess, setIsSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const navigate = useNavigate();

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // this copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };



  async function makePayment(values) {
    /* const stripe = await stripePromise;
     const requestBody = {
       userName: [values.firstName, values.lastName].join(" "),
       email: values.email,

       products: cart.map(({ _id, count, price }) => ({
         _id,
         count,
       })),
     };
    */

    try {
      setIsLoading(true);
      const requestBody = {
        productId: cart[0]._id,
        quantity: cart[0].count,
        addressType: "HOME",

        address: {
          street: values.shippingAddress.street,
          city: values.shippingAddress.city,
          state: values.shippingAddress.state,
          country: values.shippingAddress.country,
          zipCode: values.shippingAddress.zipCode,
        }
      }

      const headersList = {
        "projectId": "kl7kkrpvxx8u",
        "Authorization": "Bearer " + user.token,
        "Content-Type": "application/json"
      };

      const response = await fetch(BUY_NOW_API_URL, {
        method: "POST",
        headers: headersList,
        body: JSON.stringify(requestBody),
      });
      const result = await response.json();
      // console.log(result);

      if (result.status === 'success') {
        setIsLoading(false);
        setIsSuccess(true);
        toast.success('Order Placed!')
      } else {
        toast.warn('Something Going Wrong!');
      }

    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      navigate('/')
      toast.warn('Login Required, login and order any item!');

    }


    /*
     await stripe.redirectToCheckout({
      sessionId: result.id,
     });*/
  }
  useEffect(() => {
    if (isSuccess && user) navigate('/checkout/success');

    // eslint-disable-next-line
  }, [isSuccess, isSecondStep]);



  return isLoading ? <Loading /> : (
    <Box width="80%" m="100px auto">

      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      {
        isSuccess ?
          <Box>
            <Success />
          </Box> : ""
      }
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                // onClick={(e) => { (!isSuccess && isSecondStep) && navigate('/user/orders') }}
                >
                  {!isSecondStep ? "Next" : "Place Order"}

                </Button>

              </Box>
            </form>
          )}
        </Formik>

      </Box>
    </Box >
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};


const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.number().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export default Checkout;
