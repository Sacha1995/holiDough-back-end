const addTrip = (trip) => {
  const {
    details: {
      user_id, //where is this coming from? current user id needs to be sent from front end?
      budget_total,
      budget_hotel,
      budget_food,
      budget_transport,
      budget_activities,
      budget_other,
      home_currency,
      destination,
      dates: { start_date, end_date, start_date_included, end_date_included },
    },
  } = trip;
  return `INSERT INTO trips (user_id, budget_total, budget_hotel, budget_food, budget_transport, budget_activities, budget_other, home_currency, destination, start_date, end_date, start_date_included, end_date_included) 
    VALUES ("${user_id}", "${budget_total}", "${budget_hotel}", "${budget_food}", "${budget_transport}", "${budget_activities}", "${budget_other}", "${home_currency}", "${destination}", "${start_date}", "${end_date}", "${start_date_included}", "${end_date_included}");
`;
};

module.exports = {addTrip}
