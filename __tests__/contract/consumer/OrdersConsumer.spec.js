"use strict"

const { Matchers } = require("@pact-foundation/pact")
const { getOrders, addOrder } = require("../../../src/consumer")


describe("Orders Service", () => {
    const GET_EXPECTED_BODY = [
        {
            "firstName": "Erdinç",
            "lastName": "Özdemir",
            "quantity": 8,
            "id": 1,
            "contentId":"111"
        },
        {
            "firstName": "Doruk",
            "lastName": "Sü",
            "quantity": 30,
            "id": 2,
            "contentId":"222"
        },
        {
            "firstName": "Salih",
            "lastName": "Kılıç",
            "quantity": 39,
            "id": 3,
            "contentId":"333"
        }
    ]

    afterEach(() => provider.verify())

    describe("GET Orders", () => {
        beforeEach(() => {
            const interaction = {
                state: "i have a list of orders",
                uponReceiving: "a request for all orders",
                withRequest: {
                    method: "GET",
                    path: "/orders",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: GET_EXPECTED_BODY,
                },
            }
            return provider.addInteraction(interaction)
        })

        test("returns correct body, header and statusCode", async() => {
            const response = await getOrders()
            expect(response.headers['content-type']).toBe("application/json; charset=utf-8")
            expect(response.data).toEqual(GET_EXPECTED_BODY)
            expect(response.status).toEqual(200)
        })
    })

    const POST_BODY = {
        firstName: "Erdal",
        lastName: "Dalkıran",
        quantity: 29,
        contentId:"444"
    }

    const POST_EXPECTED_BODY = {
        firstName: POST_BODY.firstName,
        lastName: POST_BODY.lastName,
        quantity: POST_BODY.quantity,
        contentId: POST_BODY.quantity,
        id: 4
    }

    describe("POST Order", () => {
        beforeEach(() => {
            const interaction = {
                state: "i create a new order",
                uponReceiving: "a request to create order with firstname and lastname",
                withRequest: {
                    method: "POST",
                    path: "/orders",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: POST_BODY,
                },
                willRespondWith: {
                    status: 200,
                    body: Matchers.like(POST_EXPECTED_BODY).contents,
                },
            }

            return provider.addInteraction(interaction)
        })

        test("returns correct body, header and statusCode", async() => {
            const response = await addOrder(POST_BODY)
            console.log(response.data)
            expect(response.status).toEqual(200)
        })
    })
})