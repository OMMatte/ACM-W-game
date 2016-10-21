import * as state from "./state.js";
import * as core from "./core.js";

describe("core", function () {

    describe("validMoves", function () {
        it("basic test", function () {
            var gameState = state.createState({board: state.createBoard(".bbw ...."), playerInTurn: "white"});
            expect(core.validMoves(gameState)).toEqual([{x: 0, y: 0}]);
        });
    });

    describe("isValidMove", function () {
        it("basic test", function () {
            var gameState = state.createState({board: state.createBoard(".bw ..."), playerInTurn: "white"});
            expect(core.isValidMove(gameState, {x: 0, y: 0})).toBe(true);
            expect(core.isValidMove(gameState, {x: 1, y: 0})).toBe(false);
            expect(core.isValidMove(gameState, {x: 2, y: 0})).toBe(false);
            expect(core.isValidMove(gameState, {x: 1, y: 1})).toBe(false);
        });

        it("advanced test", function () {
            var gameState = state.createState({board: state.createBoard(".bbw ...."), playerInTurn: "white"});
            expect(core.isValidMove(gameState, {x: 0, y: 0})).toBe(true);
            expect(core.isValidMove(gameState, {x: 1, y: 0})).toBe(false);
            expect(core.isValidMove(gameState, {x: 2, y: 0})).toBe(false);
            expect(core.isValidMove(gameState, {x: 1, y: 1})).toBe(false);
        });

        it("diagonal test", function () {
            var gameState = state.createState({board: state.createBoard("..w .b. ..."), playerInTurn: "white"});
            expect(core.isValidMove(gameState, {x: 0, y: 2})).toBe(true);
            expect(core.isValidMove(gameState, {x: 1, y: 0})).toBe(false);
            expect(core.isValidMove(gameState, {x: 2, y: 0})).toBe(false);
            expect(core.isValidMove(gameState, {x: 1, y: 1})).toBe(false);
        });
    });

    describe("makeMove", function () {
        it("basic test", function () {
            var gameState = state.createState({board: state.createBoard(".bbw .bw."), playerInTurn: "white"});
            core.makeMove(gameState, {x: 0, y: 0});
            expect(gameState).toEqual(state.createState({board: state.createBoard("wwww .bw."), playerInTurn: "black"}));
        });

        it("no more moves test", function () {
            var gameState = state.createState({board: state.createBoard(".bbw ...."), playerInTurn: "white"});
            core.makeMove(gameState, {x: 0, y: 0});
            expect(gameState).toEqual(state.createState({board: state.createBoard("wwww ...."), playerInTurn: "white"}));
        });

        it("make diagonal move", function () {
            var gameState = state.createState({board: state.createBoard("..w .b. ..."), playerInTurn: "white"});
            core.makeMove(gameState, {x: 0, y: 2});
            expect(gameState).toEqual(state.createState({board: state.createBoard("..w .w. w.."), playerInTurn: "white"}));
        });
    })
});

