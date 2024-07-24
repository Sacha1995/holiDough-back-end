const getTripsFromIdUser = (id) => {
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
                FROM trips WHERE user_id LIKE ${id};`;
};

const getExpensesFromIdTrip = (id) => {
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
                FROM expenses WHERE trip_id LIKE ${id};`;
};

const getSplitsFromIdExpenses = (id) => {
  return `SELECT id,
            description,
            date,
            paid,
            name,
            shared_id AS sharedId,
            expense_id AS expenseId,
            from_value AS fromValue,
            from_currency AS fromCurrency,
            to_value AS toValue,
            to_currency as toCurrency
                FROM splits WHERE expense_id LIKE ${id};`;
};

const getProfileFromUserId = (id) => {
  return `SELECT username AS userName,
            profile_picture_src AS profilePictureSrc
                FROM profile WHERE user_id LIKE ${id};`;
};

const deleteSingleExpense = (id) => {
  return `DELETE FROM expenses
              WHERE id LIKE ${id};`;
};

const addProfile = (userID, userName, profilePictureSrc) => {
    return `INSERT INTO profile (user_id, username, profile_picture_src) 
              VALUES ("${userID}","${userName}","${profilePictureSrc}")`
}

module.exports = {
  getTripsFromIdUser,
  getExpensesFromIdTrip,
  getSplitsFromIdExpenses,
  getProfileFromUserId,
  // deleteSingleExpense,
  addProfile
};
