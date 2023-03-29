const email = "ekrem@outlook.de"
const password = "TestTest1."
const username = "Hellolo"

describe('template spec', () => {
  before(() => {
    cy.visit("/")
    // cy.get('a[href="/Signup"]').click()
    cy.get('a[href="/Signin"]').click()

    // cy.get("label").contains("Email").type(email)
    // cy.get("label").contains("Username").type(username)
    // cy.get("label").contains("Password").type(password)
    // cy.get("label").contains("Confirm password").type(password)
    // cy.get("button[type='submit']").click()

    cy.get("label").contains("Username").type(username)
    cy.get("label").contains("Password").type(password)
    cy.get("button[type='submit']").click()
  })

  it("Can create a question", () => {
    cy.get('a[href="/CreateQuestion"]').click()
    cy.get("label").contains("Title").type(username)
    // cy.get("label").contains("Desc").type(password)
    cy.get("label").contains("Option One").type(password)
    cy.get("label").contains("Option Two").type(password)
    cy.get("button[type='submit']").click()
  })

  // it("Can like a question", () => {
  //   cy.get("#vote1").click()
  // })
})
