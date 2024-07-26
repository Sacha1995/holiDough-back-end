const joi = require("joi");

const userSchema = {
  email: joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string().min(8).required(),
};

const tripSchema = joi.object({
  destination: joi.string().min(1).max(58).required(),
  dates: {
    startDate: joi.date().required(),
    endDate: joi.date().greater(joi.ref("startDate")).required(),
    startDateIncluded: joi.boolean(),
    endDateIncluded: joi.boolean(),
  },
  budgetTotal: joi.number().min(1).required(),
  homeCurrency: joi.string().length(3).required(),
  homeCurrencySymbol: joi.string(),
  destinationCurrency: joi.string().length(3),
  budgetHotel: joi.number().min(0).max(joi.ref("budgetTotal")).required(),
  budgetFood: joi.number().min(0).max(joi.ref("budgetTotal")).required(),
  budgetTransport: joi.number().min(0).max(joi.ref("budgetTotal")).required(),
  budgetActivities: joi.number().min(0).max(joi.ref("budgetTotal")).required(),
  budgetOther: joi.number().min(0).max(joi.ref("budgetTotal")).required(),
});

const profileSchema = joi.object({
  userID: joi.string().required(), //change to number later?
  userName:joi.string().min(3).max(15).required(),
  profilePictureSrc:joi.string().required()
  
})

module.exports = {userSchema, tripSchema, profileSchema}