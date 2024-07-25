const addTrip = () => {

  return `INSERT INTO trips (user_id, budget_total, budget_hotel, budget_food, budget_transport, budget_activities, budget_other, home_currency, destination, start_date, end_date, start_date_included, end_date_included) 
    VALUES ("1", ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;
};

module.exports = {addTrip}
