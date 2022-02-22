# Product-Overview-Service

A microservice providing product data to an e-commerce website: [Atelier](https://github.com/tm2838/Atelier)

## Endpoints
- __GET__ /product/:product_id

  - Parameters

    | Parameter | Type | Description |
    | --- | --- | --- |
    | product_id | integer | Required ID of the product requested |

  - Response: 200 OK
    ```
    {
      _id: new ObjectId("617b748d414f9f20de8ff35e"),
      id: 1,
      name: 'Camo Onesie',
      slogan: 'Blend in to your crowd',
      description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
      category: 'Jackets',
      default_price: '140',
      features: [
        {
          _id: new ObjectId("62156fd980d4210c659e3749"),
          feature: 'Fabric',
          value: 'Canvas'
        },
        {
          _id: new ObjectId("62156fd980d4210c659e374a"),
          feature: 'Buttons',
          value: 'Brass'
        }
      ],
      related: [ 3, 2, 7, 8 ]
    }


    ```

- __GET__ /product/:productId/styles
  - Parameters

    | Parameter | Type | Description |
    | --- | --- | --- |
    | product_id | integer | Required ID of the product requested |

  - Response: 200 OK
    ```
    {
      productId: 1,
      results: [
        {
          _id: new ObjectId("617b755803c3ac83edec34d5"),
          productId: 1,
          name: 'Desert Brown & Tan',
          sale_price: 'null',
          original_price: 140,
          photos: [ { thumbnail_url: '', url: '' } ],
          style_id: 2,
          'default?': false,
          skus: {
            '7': { size: "S", quantity: 16 },
            '8': { size: "XS", quantity: 8 },
            '9': { size: "M", quantity: 17 },
            '10': { size: "L", quantity: 10 },
            '11': { size: "XL", quantity: 15 },
            '12': { size: "XXL", quantity: 6 },
          }
        },
        ...
      ],
    }

    ```


- __GET__ /product/:productId/related
  - Parameters

    | Parameter | Type | Description |
    | --- | --- | --- |
    | product_id | integer | Required ID of the product requested |

  - Response: 200 OK
    ```
    {
      _id: new ObjectId("617b748d414f9f20de8ff35e"),
      id: 1,
      name: 'Camo Onesie',
      slogan: 'Blend in to your crowd',
      description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
      category: 'Jackets',
      default_price: '140',
      features: [
        {
          _id: new ObjectId("62156fd980d4210c659e3749"),
          feature: 'Fabric',
          value: 'Canvas'
        },
        {
          _id: new ObjectId("62156fd980d4210c659e374a"),
          feature: 'Buttons',
          value: 'Brass'
        }
      ],
      related: [ 3, 2, 7, 8 ]
    }

    ```



## Architecture
<img width="1032" alt="Screen Shot 2022-01-19 at 1 58 20 PM" src="https://user-images.githubusercontent.com/43324065/150204631-b26a3b1d-d713-43cc-8178-95695331b1e6.png">

## Tech Stack
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [NGINX](https://www.nginx.com/)
- [Docker](https://www.docker.com/)
- [REDIS](https://redis.io/)

## For developers
To start the server locally, fork and clone this repo, install its dependencies by `npm install` and `npm start`

To test the repo, run `npm test`

To find linting problems, run `npm lint`
