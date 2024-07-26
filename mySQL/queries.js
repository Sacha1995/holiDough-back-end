const getTripsFromIdUser = () => {
  return `SELECT id, 
            budget_total AS budgetTotal, 
            budget_hotel AS budgetHotel,
            budget_food AS budgetFood, 
            budget_transport AS budgetTransport,
            budget_activities AS budgetActivities,
            budget_other AS budgetOther,
            home_currency AS homeCurrency,
            start_date AS startDate,
            end_date AS endDate,
            start_date_included AS startDateIncluded,
            end_date_included AS endDateIncluded,
            destination
                FROM trips WHERE user_id = ?;`;
};

const getExpensesFromIdTrip = () => {
  return `SELECT id,
            category,
            description,
            date,
            split,
            shared_id AS sharedId,
            from_value AS fromValue,
            from_currency AS fromCurrency,
            to_value AS toValue,
            to_currency as toCurrency
                FROM expenses WHERE trip_id = ?;`;
};

const getSplitsFromIdExpenses = () => {
  return `SELECT id,
            description,
            date,
            paid,
            name,
            expense_id AS expenseId,
            from_value AS fromValue,
            from_currency AS fromCurrency,
            to_value AS toValue,
            to_currency as toCurrency
                FROM splits WHERE expense_id = ?;`;
};

const getProfileFromUserId = () => {
  return `SELECT username AS userName,
            profile_picture_src AS profilePictureSrc
                FROM profile WHERE user_id = ?;`;
};

const getHomeCurrencyFromTripId = () => {
  return `SELECT home_currency
              FROM trips 
                  WHERE id = ?;`;
};

const addProfile = () => {
  return `INSERT INTO profile (user_id, username, profile_picture_src) 
              VALUES (?, ?, ?)`;
};

const addTrip = () => {
  return `INSERT INTO trips (user_id, budget_total, budget_hotel, budget_food, budget_transport, budget_activities, budget_other, home_currency, destination, start_date, end_date, start_date_included, end_date_included) 
    VALUES ("1", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;
};

const addExpense = () => {
  return `INSERT INTO expenses (trip_id, shared_id, category, description, date, split, from_value, from_currency, to_value, to_currency) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
};

module.exports = {
  getTripsFromIdUser,
  getExpensesFromIdTrip,
  getSplitsFromIdExpenses,
  getProfileFromUserId,
  getHomeCurrencyFromTripId,
  // deleteSingleExpense,
  addProfile,
  addTrip,
  addExpense,
};
