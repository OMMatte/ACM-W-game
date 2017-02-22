import * as sf from "./state-functions.js";

describe("state", function () {
    describe("createState", function () {
        it("test basic state creation", function () {
            expect(sf.createState(
                {
                    playerInTurn: "white",
                    board: [
                        "wb.",
                        "wb."
                    ]
                })).toEqual({
                playerInTurn: "white",
                board: [
                    [
                        {player: "white"},
                        {player: "black"},
                        {player: null}
                    ],
                    [
                        {player: "white"},
                        {player: "black"},
                        {player: null}
                    ]
                ]
            });
        });

        it("white should be default player in turn", function () {
            expect(sf.getPlayerInTurn(sf.createState({board: [".wb"]}))).toEqual("white");
        });
    });

    describe("getPosition", function () {
        it("test basic functionality", function () {
            expect(sf.getPosition(sf.createState({board: ["..w"]}), {x: 0, y: 0}))
                .toEqual({player: null});
            expect(sf.getPosition(sf.createState({board: ["..w"]}), {x: 2, y: 0}))
                .toEqual({player: "white"});
        });
    });

    describe("getPlayerInTurn", function () {
        it("test basic functionality", function () {
            expect(sf.getPlayerInTurn(sf.createState({playerInTurn: "black", board: [""]})))
                .toEqual("black");
        });
    });

    describe("isOccupied", function () {
        it("test basic functionality", function () {
            expect(sf.isOccupied(sf.createState({board: [".bw"]}), {x: 0, y: 0}))
                .toEqual(false);
            expect(sf.isOccupied(sf.createState({board: [".bw"]}), {x: 1, y: 0}))
                .toEqual(true);
            expect(sf.isOccupied(sf.createState({board: [".bw"]}), {x: 2, y: 0}))
                .toEqual(true);
        });
    });

    describe("isPositionsInsideBoar", function () {
        it("test basic functionality", function () {
            expect(sf.isPositionInsideBoard(sf.createState({board: ["..w"]}), {x: 0, y: 0}))
                .toBe(true);
            expect(sf.isPositionInsideBoard(sf.createState({board: ["..w"]}), {x: 2, y: 0}))
                .toBe(true);

            expect(sf.isPositionInsideBoard(sf.createState({board: ["..w"]}), {x: -1, y: 0}))
                .toBe(false);
            expect(sf.isPositionInsideBoard(sf.createState({board: ["..w"]}), {x: 0, y: 1}))
                .toBe(false);
        });
    });

    describe("mark", function () {
        it("test basic functionality", function () {
            expect(sf.mark(sf.createState({board: ["..w"]}), {x: 0, y: 0, player: "white"}))
                .toEqual(sf.createState({board: ["w.w"]}));

            expect(sf.mark(sf.createState({board: ["..w"]}), {x: 2, y: 0, player: "black"}))
                .toEqual(sf.createState({board: ["..b"]}));

            expect(sf.mark(sf.createState({board: ["..w"]}), {x: 0, y: 0, player: "black"}))
                .toEqual(sf.createState({board: ["b.w"]}));
        });
    });

    describe("setPlayerInTurn", function () {
        it("test basic functionality", function () {
            expect(sf.getPlayerInTurn(sf.setPlayerInTurn(sf.createState(
                {board: []}),
                {playerInTurn: "black"})))
                .toEqual("black");

            expect(sf.getPlayerInTurn(sf.setPlayerInTurn(sf.createState(
                {playerInTurn: "black", board: []}),
                {playerInTurn: "white"})))
                .toEqual("white");
        });
    })
});
