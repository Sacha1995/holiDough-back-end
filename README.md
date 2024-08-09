![Assignments - Copy](https://github.com/Sacha1995/thirdspacelearning/assets/169173663/3daabe1c-b8a5-4976-9f7d-9e2a48d2ca89)
[Redux Toolkit Shop]( https://github.com/Sacha1995/redux-toolbox-shop) | [Disney Classics Game]( https://github.com/Sacha1995/disney) | [Form with validator](https://github.com/Sacha1995/form-validator) | [Simpsons Quotes]( https://github.com/Sacha1995/simpsons) | [Weather Website]( https://github.com/Sacha1995/Weather-Website) | [Traffic Light]( https://github.com/Sacha1995/traffic-light) | [Homage Piece]( https://github.com/Sacha1995/thirdspacelearning)

# HoliDough back-end
[Project website]() | [LinkedIn](https://www.linkedin.com/in/sachauijlen/)

We developed the back-end for our holiday budgeting app using SQL. User authentication is handled through token validation. All data related to users, trips, expenses, and splits is stored in a MySQL database and also cached locally on the user's device.

For currency conversion, we integrate with an external API, and the results are cached for up to 3 hours to optimize performance and minimize repeated API calls. To ensure security, we utilize Helmet for protection and employ prepared statements with parameterized queries to prevent SQL injection.

We rigorously validate all user inputs to prevent the acceptance of invalid data. Before making any changes to the database, we verify the token and user ID to ensure that only authorized modifications are allowed. Additionally, users can only alter information associated with their own accounts.

Used tech: Express, mySQL, Joi, Axios
