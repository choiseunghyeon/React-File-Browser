// /// <reference types="cypress" />

// import { CLOSE_SIDE_NODE_TEST_ID, FILES_TEST_ID, FILE_TYPE_TEST_ID, PATH_LAYER_BUTTON_TEST_ID, PATH_TEST_ID, SIDE_NODE_TEST_ID } from "../../src/constants/test"

// describe("file browser", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000/")
//   })

//   it("render", () => {
//     // navigtaion
//     cy.getById(PATH_TEST_ID).then(paths => {
//       cy.wrap(paths[0]).contains("C:")
//       cy.wrap(paths[0]).findById(PATH_LAYER_BUTTON_TEST_ID)

//       cy.wrap(paths[1]).contains("새폴더")
//       cy.wrap(paths[1]).findById(PATH_LAYER_BUTTON_TEST_ID)
//     })

//     // sidebar
//     cy.getById(SIDE_NODE_TEST_ID).then(sideNodes => {
//       cy.wrap(sideNodes[0]).contains("C:")
//       cy.wrap(sideNodes[0]).findById(CLOSE_SIDE_NODE_TEST_ID)

//       cy.wrap(sideNodes[1]).contains("새폴더")
//       cy.wrap(sideNodes[1]).findById(CLOSE_SIDE_NODE_TEST_ID)

//       // OPEN_SIDE_NODE_TEST_ID / CLOSE_SIDE_NODE_TEST_ID 둘다 있으면 안됌
//       cy.wrap(sideNodes[2]).contains("새폴더2")
//       // cy.wrap(sideNodes[1]).findById(CLOSE_SIDE_NODE_TEST_ID)
//     })

//     // main
//     cy.getById(FILES_TEST_ID).then(files => {
//       cy.wrap(files[0]).contains("새폴더2").findById(FILE_TYPE_TEST_ID).contains("폴더")
//     })
//   })

//   it("navigation", () => {
//     cy.getById(PATH_TEST_ID).contains("C:").click()
//     cy.getById(FILES_TEST_ID).contains("새폴더").findById(FILE_TYPE_TEST_ID).contains("폴더")
//     // side bar 변하는거 테스트
//   })

//   it.only("side bar", () => {
//     cy.getById(SIDE_NODE_TEST_ID).contains("새폴더2").click()
//     cy.getById(PATH_TEST_ID).then(paths => {
//       cy.wrap(paths[0]).contains("C:")
//       cy.wrap(paths[0]).findById(PATH_LAYER_BUTTON_TEST_ID)

//       cy.wrap(paths[1]).contains("새폴더")
//       cy.wrap(paths[1]).findById(PATH_LAYER_BUTTON_TEST_ID)

//       cy.wrap(paths[2]).contains("새폴더2")
//       cy.wrap(paths[2]).findById(PATH_LAYER_BUTTON_TEST_ID)
//     })
//     cy.getById(FILES_TEST_ID).then(files => {
//       cy.wrap(files[0]).contains("index.ts").findById(FILE_TYPE_TEST_ID).contains("파일")
//     })
//   })

//   it("main", () => {
//     cy.getById(FILES_TEST_ID).contains("새폴더").dblclick()
//     cy.getById(PATH_TEST_ID).then(paths => {
//       cy.wrap(paths[0]).contains("C:")
//       cy.wrap(paths[0]).findById(PATH_LAYER_BUTTON_TEST_ID)

//       cy.wrap(paths[1]).contains("새폴더")
//       cy.wrap(paths[1]).findById(PATH_LAYER_BUTTON_TEST_ID)

//       cy.wrap(paths[2]).contains("새폴더2")
//       cy.wrap(paths[2]).findById(PATH_LAYER_BUTTON_TEST_ID)
//     })
//     cy.getById(FILES_TEST_ID).then(files => {
//       cy.wrap(files[0]).contains("index.ts").findById(FILE_TYPE_TEST_ID).contains("파일")
//     })
//   })
// })
