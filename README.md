
If you are running your pact broker locally following these [instructions](https://github.com/pact-foundation/pact_broker#to-have-a-play-around-on-your-local-machine) then you can run the provider and the publish the way it is, otherwise you will need to modify the pactUrls to the local path and if you are using docker as your pact broker than you need to update the publish script accordingly.

## Running via CLI

- Open your terminal on your project's folder

- Install Node packages:
`npm install`

- Run the consumer contract tests (Generate the contracts):
`npm run test:consumer`

- Run the provider contract tests (Verify the contracts):
`npm run test:provider`

- Run the provider server  `http://localhost:8081`  (Order API/Service):
`npm run provider`

- Run the consumer server `http://localhost:8080` (Frontend):
`npm run consumer`

- Publish the contracts:
`npm run publish:contract`

