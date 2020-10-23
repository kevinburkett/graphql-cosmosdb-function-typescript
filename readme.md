# https://www.apollographql.com/docs/apollo-server/
# https://graphql.org/

# Initial Setup
    func init graphqlcosmosdbts --worker-runtime node --language typescript
    cd .\graphqlcosmosdbts\
    func new --template "HTTP trigger" --name graphql
    npm init -y
    npm install --save apollo-server-azure-functions

    npm install --save @azure/cosmos

# Write your query or mutation here
```javascript
{
  getUser(partitionkey: "data") {
    id
    first_name
    last_name
    photo_url
    emails {
      email
      is_primary
    }
    addresses {
      address
      is_primary
    }
    phones {
      phone
      is_primary
    }
    spouse {
      first_name
      last_name
    }
    children {
      first_name
      last_name
    }
  }
}

{
  "partitionkey": "username_data",
  "password": "173467321476c32789777643t732v73117888732476789764376",
  "first_name": "Data",
  "last_name": "",
  "photo_url": "http://images.enterprise.space/images/data.jpg",
  "emails": [
      {
          "email": "data@enterprise.space",
          "is_primary": true
      }
  ],
  "addresses": [
      {
          "address": "Sector 001, Alpha Quandrant, Milky Way Galaxy",
          "is_primary": true
      }
  ],
  "phones": [
      {
          "phone": "communicator56",
          "is_primary": true
      }
  ],
  "father": {
      "first_name": "Noonian",
      "last_name": "Soong"
  },
  "mother": {
      "first_name": "Julianna",
      "last_name": "Soong"
  },
  "siblings": [
      {
          "first_name": "B_4",
          "last_name": ""
      },
      {
          "first_name": "Lore",
          "last_name": ""
      },
      {
          "first_name": "Altan Inigo",
          "last_name": "Soong"
      }
  ],
  "children": [
      {
          "first_name": "Lai",
          "last_name": "Soong"
      },
      {
          "first_name": "Dahj",
          "last_name": "Asha"
      },
      {
          "first_name": "Soji",
          "last_name": "Asha"
      }
  ]
}
```
