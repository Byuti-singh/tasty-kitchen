This app will fetch data from server using a class component, display that data, using **component lifecycle** methods, **routing** concepts, **authentication**, and **authorization**, with responsiveness to the website.

This is an individual assessment. All work must be your own. You will also be given feedback by code reviewers after your project submission.

### Prerequisites

### Set Up Instructions

<details>
<summary>Click to view</summary>

- Download dependencies by running `npm install`
- Start up the app using `npm start`
</details>

### Resources

<details>
<summary>Data fetch URLs</summary>

- **Note:** To fetch the data from server below APIS are used.

  - Use the particular Restraunt id in place of `restrauntId`.

  - The value of the query parameter **offset** can be calculated using the below formula.

    ```js
    const offset = (activePage - 1) * limit
    ```

  - Use the below sample code snippet to make a POST request on Login using valid username and password.

    ```js
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    ```

- Login Route:

  - Get Request Token:

    ```js
    'https://apis.ccbp.in/login'

    ```

    - Sample request object:

      ```json
      {
        "username": "rahul",
        "password": "rahul@2021"
      }
      ```

    - Valid credentials:

      ```example
        username: rahul
        password: rahul@2021
      ```

    - Sample response object:

      ```json
      {
        "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9.nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y"
      }
      ```

- Home Route:

  - Get Carousel Images:

    ```js
    'https://apis.ccbp.in/restaurants-list/offers'

    ```

    - Sample response object:

      ```example
      {
        "offers": [
           {
            "image_url": "https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-jammu-special.jpg",
            "id": 1
           },
            .....
          ]
      }
      ```

  - Get Restaurants List:

    ```js
    'https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}'

    ```

    - Sample response object:

      ```example
        {
        "restaurants": [
        {
            "has_online_delivery": true,
            "user_rating": {
            "rating_text": "Very Good",
            "rating_color": "5BA829",
            "total_reviews": 155,
            "rating": 4.3
            },
            "name": "Broasted Friend Chicken (BFC)",
            "has_table_booking": 0,
            "is_delivering_now": 0,
            "cost_for_two": 1500,
            "cuisine": "North Indian, Fast Food",
            "image_url": "https://www.franchisezing.com/franchise/wp-content/uploads/2016/02/chole-bhature.jpg",
            "id": "2300058",
            "menu_type": "NON-VEG",
            "location": "plot no 23, Silicon Valley, Hyderabad, Telangana 500081",
            "opens_at": "10:00 AM Tomorrow",
            "group_by_time": true
        },
        ....
      ],
      "total": 30
      }
      ```

  - SortBy Functionality:

    ```js
    'https://apis.ccbp.in/restaurants-list?sort_by_rating={selectedSortByValue}'

    ```

    ```js
    // Example URL with query parameters and values
    const apiUrl = 'https://apis.ccbp.in/restaurants-list?offset=0&limit=9&sort_by_rating=Highest'
    ```

  - Search Functionality:

    ```js
    'https://apis.ccbp.in/restaurants-list?search=${searchInput}'

    ```

    ```js
    // Example URL with query parameters and values
    const apiUrl = 'https://apis.ccbp.in/restaurants-list?search=hotel&offset=0&limit=9&sort_by_rating=Lowest'
    ```

- Specific Restaurant Details Route:

  - Get Restaurant Details:

    ```js
    'https://apis.ccbp.in/restaurants-list/${restrauntId}'

    ```

  - Sample response object:

    ```example
    {
        "rating": 3.6,
        "id": "3200283",
        "name": "Miss.Ice Cream",
        "cost_for_two": 700,
        "cuisine": "Bakery",
        "image_url":"https://b.zmtcdn.com/data/pictures/3/2200283/2f0442152a13a183aaf62065e4689158_featured_v2.jpg",
        "reviews_count": 51,
        "opens_at": "12:00 PM, Tomorrow",
        "location": "Domalguda, Himayatnagar, Hyderabad",
        "items_count": 45,
        "food_items": [
                {
                    "name": "Chicken Roast",
                    "cost": 660,
                    "food_type": "NON-VEG",
                    "image_url":"https://americanhomecook.com/wp-content/uploads/2019/11/Thanksgiving-Roast-Chicken2.jpg",
                    "id": "7352a58f-3228-4c7c-bd98-f66423f6bdcf"
                },
            .....
        ]
    }
    ```

</details>
