const addTrip = (trip) => {
    console.log("hello", trip)
  const {
    
    //   userId = 1, //where is this coming from? current user id needs to be sent from front end?
      budgetTotal,
      budgetHotel,
      budgetFood,
      budgetTransport,
      budgetActivities,
      budgetOther,
      homeCurrency,
      destination,
      dates: { startDate, endDate, startDateIncluded, endDateIncluded },
    
  } = trip;
  return `INSERT INTO trips (user_id, budget_total, budget_hotel, budget_food, budget_transport, budget_activities, budget_other, home_currency, destination, start_date, end_date, start_date_included, end_date_included) 
    VALUES ("1", "${budgetTotal}", "${budgetHotel}", "${budgetFood}", "${budgetTransport}", "${budgetActivities}", "${budgetOther}", "${homeCurrency}", "${destination}", "${startDate}", "${endDate}", "${startDateIncluded}", "${endDateIncluded}");
`;
};

module.exports = {addTrip}
