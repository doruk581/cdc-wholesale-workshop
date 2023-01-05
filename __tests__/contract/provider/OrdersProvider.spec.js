const path = require("path")
const { Verifier } = require("@pact-foundation/pact")
const { server, importData } = require("../../../src/provider")

const SERVER_URL = "http://localhost:8081"

server.listen(8081, () => {
    importData()
    console.log(`Orders Service listening on ${SERVER_URL}`)
  })

  describe("Orders Service Verification", () => {
    it("validates the expectations of Orders Service", () => {
      let opts = {
            provider: "Orders Service",
            logLevel: "DEBUG",
            providerBaseUrl: SERVER_URL,
            pactUrls: ['http://localhost:9292/pacts/provider/OrdersService/consumer/Frontend/latest'],
            consumerVersionTags: ["dev"],
            providerVersionTags: ["dev"],
            publishVerificationResult: true,
            providerVersion: "1.0.1"
          }
        return new Verifier(opts).verifyProvider().then(output => {
            console.log("Pact Verification Complete!")
            console.log(output)
        })
    })
})